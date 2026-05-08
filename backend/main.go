package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Models
type Ticket struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	FullName  string         `json:"full_name"`
	Email     string         `json:"email"`
	Subject   string         `json:"subject"`
	Message   string         `json:"message"`
	Status    string         `gorm:"default:'open'" json:"status"`
}

type Category struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string         `gorm:"uniqueIndex" json:"name"`
	Slug      string         `gorm:"uniqueIndex" json:"slug"`
	Posts     []BlogPost     `json:"posts"`
}

type Tag struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string         `gorm:"uniqueIndex" json:"name"`
	Slug      string         `gorm:"uniqueIndex" json:"slug"`
	Posts     []BlogPost     `gorm:"many2many:post_tags;" json:"posts"`
}

type BlogPost struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
	Title      string         `json:"title"`
	Slug       string         `gorm:"uniqueIndex" json:"slug"`
	Content    string         `json:"content"` // HTML content from WYSIWYG
	Author     string         `json:"author"`
	Status     string         `gorm:"default:'draft'" json:"status"`
	CategoryID *uint          `json:"category_id"`
	Category   *Category      `json:"category"`
	Tags       []Tag          `gorm:"many2many:post_tags;" json:"tags"`
	Comments   []Comment      `json:"comments"`
	Likes      []Like         `json:"likes"`
}

type Comment struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
	BlogPostID uint           `json:"blog_post_id"`
	BlogPost   *BlogPost      `json:"blog_post"`
	Author     string         `json:"author"`
	Content    string         `json:"content"`
}

type Like struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	BlogPostID uint      `json:"blog_post_id"`
	UserID     string    `json:"user_id"` // Simple representation of a user
}

type Subscriber struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Email     string         `gorm:"uniqueIndex" json:"email"`
	Name      string         `json:"name"`
	Status    string         `gorm:"default:'active'" json:"status"`
}

// New Email System Models
type MailingList struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Contacts    []Contact      `json:"contacts"`
}

type Contact struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
	Email         string         `gorm:"uniqueIndex" json:"email"`
	FullName      string         `json:"full_name"`
	Phone         string         `json:"phone"`
	Address       string         `json:"address"`
	State         string         `json:"state"`
	LGA           string         `json:"lga"`
	MailingListID *uint          `json:"mailing_list_id"`
	Status        string         `gorm:"default:'active'" json:"status"`
}

type Campaign struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
	Subject       string         `json:"subject"`
	Content       string         `json:"content"`
	ScheduledAt   *time.Time     `json:"scheduled_at"`
	Status        string         `gorm:"default:'draft'" json:"status"` // draft, scheduled, sent
	MailingListID *uint          `json:"mailing_list_id"`
	MailingList   *MailingList   `json:"mailing_list"`
}

var db *gorm.DB

func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("scholars.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Ticket{}, &Category{}, &Tag{}, &BlogPost{}, &Comment{}, &Like{}, &Subscriber{}, &MailingList{}, &Contact{}, &Campaign{})
	seedDB()
}

func seedDB() {
	var count int64
	db.Model(&BlogPost{}).Count(&count)
	if count > 0 {
		return // Database already seeded
	}

	// Seed Category
	cat1 := Category{Name: "General", Slug: "general"}
	cat2 := Category{Name: "Product Updates", Slug: "product-updates"}
	cat3 := Category{Name: "Education Trends", Slug: "education-trends"}
	db.Create(&cat1)
	db.Create(&cat2)
	db.Create(&cat3)

	// Seed Tag
	tag1 := Tag{Name: "Education", Slug: "education"}
	tag2 := Tag{Name: "Technology", Slug: "technology"}
	tag3 := Tag{Name: "Africa", Slug: "africa"}
	db.Create(&tag1)
	db.Create(&tag2)
	db.Create(&tag3)

	blogPosts := []BlogPost{
		{
			Title:      "Building the Future of African Education",
			Slug:       "building-future-african-education",
			Content:    "<h1>Bridging the Education Gap</h1><p>Our mission at Scholars.ng is to ensure that every student has access to high-quality learning resources, regardless of their location.</p>",
			Author:     "Admin",
			Status:     "published",
			CategoryID: &cat1.ID,
			Tags:       []Tag{tag1, tag3},
			Comments: []Comment{
				{Author: "Jane Doe", Content: "This is a great initiative! Looking forward to seeing it scale."},
				{Author: "John Smith", Content: "Very inspiring. How can schools sign up?"},
			},
		},
		{
			Title:      "Introducing ClassroomPRO 2.0",
			Slug:       "introducing-classroompro-2-0",
			Content:    "<h1>Next Gen Classroom Management</h1><p>We are excited to announce the launch of ClassroomPRO 2.0 with enhanced offline capabilities.</p>",
			Author:     "Product Team",
			Status:     "published",
			CategoryID: &cat2.ID,
			Tags:       []Tag{tag2},
		},
	}

	for _, p := range blogPosts {
		db.Create(&p)
	}

	// Seed Mailing List
	list1 := MailingList{Name: "General Newsletter", Description: "Primary subscribers list"}
	list2 := MailingList{Name: "Product Beta", Description: "Beta testers for new features"}
	db.Create(&list1)
	db.Create(&list2)

	// Seed Contacts
	contacts := []Contact{
		{Email: "admin@scholars.ng", FullName: "Main Admin", Status: "active", MailingListID: &list1.ID, Phone: "08012345678", Address: "123 Education Way, Lagos", State: "Lagos", LGA: "Ikeja"},
		{Email: "info@scholars.ng", FullName: "Info Desk", Status: "active", MailingListID: &list1.ID, Phone: "08087654321", Address: "456 Knowledge St, Abuja", State: "FCT", LGA: "Garki"},
		{Email: "support@scholars.ng", FullName: "Support Team", Status: "active", MailingListID: &list2.ID, Phone: "09011223344", Address: "789 Help Blvd, Port Harcourt", State: "Rivers", LGA: "Obio-Akpor"},
		{Email: "ade.bayo@gmail.com", FullName: "Adebayo Kola", Status: "active", MailingListID: &list1.ID, Phone: "08022334455", Address: "12 Victoria Island", State: "Lagos", LGA: "Lagos Island"},
		{Email: "chioma.n@yahoo.com", FullName: "Chioma Nwosu", Status: "unsubscribed", MailingListID: &list1.ID, Phone: "07033445566", Address: "45 Enugu Rd", State: "Enugu", LGA: "Enugu North"},
	}
	for _, c := range contacts {
		db.Create(&c)
	}

	// Seed Campaigns
	campaigns := []Campaign{
		{Subject: "Welcome to Scholars.ng", Content: "<h1>Welcome!</h1><p>Thank you for joining our community.</p>", Status: "sent", MailingListID: &list1.ID},
		{Subject: "Monthly Education Update", Content: "<h1>New Features</h1><p>Check out our latest learning tools.</p>", Status: "draft", MailingListID: &list1.ID},
		{Subject: "Beta Test Invitation", Content: "<h1>Join our Beta</h1><p>Be the first to try out our new AI tools.</p>", Status: "scheduled", MailingListID: &list2.ID},
	}
	for _, camp := range campaigns {
		db.Create(&camp)
	}
}

func main() {
	initDB()

	r := mux.NewRouter()

	// API Routes
	api := r.PathPrefix("/api").Subrouter()

	// Tickets
	api.HandleFunc("/tickets", getTickets).Methods("GET")
	api.HandleFunc("/tickets", createTicket).Methods("POST")

	// Blog
	api.HandleFunc("/blog", getBlogPosts).Methods("GET")
	api.HandleFunc("/blog/{id}", getBlogPost).Methods("GET")
	api.HandleFunc("/blog", createBlogPost).Methods("POST")
	api.HandleFunc("/blog/{id}", updateBlogPost).Methods("PUT")
	api.HandleFunc("/blog/{id}", deleteBlogPost).Methods("DELETE")

	// Categories
	api.HandleFunc("/categories", getCategories).Methods("GET")
	api.HandleFunc("/categories", createCategory).Methods("POST")
	api.HandleFunc("/categories/{id}", updateCategory).Methods("PUT")
	api.HandleFunc("/categories/{id}", deleteCategory).Methods("DELETE")

	// Tags
	api.HandleFunc("/tags", getTags).Methods("GET")
	api.HandleFunc("/tags", createTag).Methods("POST")
	api.HandleFunc("/tags/{id}", updateTag).Methods("PUT")
	api.HandleFunc("/tags/{id}", deleteTag).Methods("DELETE")

	// Comments Management
	api.HandleFunc("/comments", getAllComments).Methods("GET")
	api.HandleFunc("/comments/{id}", deleteComment).Methods("DELETE")

	// Subscribers (Legacy)
	api.HandleFunc("/subscribers", getSubscribers).Methods("GET")
	api.HandleFunc("/subscribers", createSubscriber).Methods("POST")

	// New Email System Routes
	// Mailing Lists
	api.HandleFunc("/mailing-lists", getMailingLists).Methods("GET")
	api.HandleFunc("/mailing-lists", createMailingList).Methods("POST")
	api.HandleFunc("/mailing-lists/{id}", updateMailingList).Methods("PUT")
	api.HandleFunc("/mailing-lists/{id}", deleteMailingList).Methods("DELETE")

	// Contacts
	api.HandleFunc("/contacts", getContacts).Methods("GET")
	api.HandleFunc("/contacts", createContact).Methods("POST")
	api.HandleFunc("/contacts/upload", uploadContactsCSV).Methods("POST")
	api.HandleFunc("/contacts/{id}", updateContact).Methods("PUT")
	api.HandleFunc("/contacts/{id}", deleteContact).Methods("DELETE")

	// Campaigns
	api.HandleFunc("/campaigns", getCampaigns).Methods("GET")
	api.HandleFunc("/campaigns", createCampaign).Methods("POST")
	api.HandleFunc("/campaigns/{id}", updateCampaign).Methods("PUT")
	api.HandleFunc("/campaigns/{id}", deleteCampaign).Methods("DELETE")

	// Public Subscribe/Unsubscribe
	api.HandleFunc("/subscribe", subscribe).Methods("POST")
	api.HandleFunc("/unsubscribe", unsubscribe).Methods("POST")

	// Metrics
	api.HandleFunc("/metrics/engagement", getEngagementMetrics).Methods("GET")

	// Health check
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Scholars NG Backend API!")
	})

	// CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Adjust for frontend URL
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	fmt.Println("Backend server starting on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}

// Handlers

func getTickets(w http.ResponseWriter, r *http.Request) {
	var tickets []Ticket
	db.Find(&tickets)
	json.NewEncoder(w).Encode(tickets)
}

func createTicket(w http.ResponseWriter, r *http.Request) {
	var ticket Ticket
	json.NewDecoder(r.Body).Decode(&ticket)
	db.Create(&ticket)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(ticket)
}

func getBlogPosts(w http.ResponseWriter, r *http.Request) {
	var posts []BlogPost
	db.Preload("Comments").Preload("Likes").Preload("Category").Preload("Tags").Find(&posts)
	json.NewEncoder(w).Encode(posts)
}

func getBlogPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var post BlogPost
	if err := db.Preload("Comments").Preload("Likes").Preload("Category").Preload("Tags").Where("id = ? OR slug = ?", vars["id"], vars["id"]).First(&post).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(post)
}

func createBlogPost(w http.ResponseWriter, r *http.Request) {
	var post BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}
	if err := db.Create(&post).Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

func updateBlogPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var post BlogPost
	if err := db.Where("id = ? OR slug = ?", vars["id"], vars["id"]).First(&post).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Blog post not found"})
		return
	}

	var updateData BlogPost
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	// Update fields
	post.Title = updateData.Title
	post.Slug = updateData.Slug
	post.Content = updateData.Content
	post.Author = updateData.Author
	post.Status = updateData.Status
	post.CategoryID = updateData.CategoryID

	// Replace tags
	if updateData.Tags != nil {
		db.Model(&post).Association("Tags").Replace(updateData.Tags)
	}

	if err := db.Save(&post).Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	json.NewEncoder(w).Encode(post)
}

func deleteBlogPost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&BlogPost{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Category Handlers
func getCategories(w http.ResponseWriter, r *http.Request) {
	var categories []Category
	db.Find(&categories)
	json.NewEncoder(w).Encode(categories)
}

func createCategory(w http.ResponseWriter, r *http.Request) {
	var cat Category
	json.NewDecoder(r.Body).Decode(&cat)
	db.Create(&cat)
	json.NewEncoder(w).Encode(cat)
}

func updateCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var cat Category
	if err := db.First(&cat, vars["id"]).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&cat)
	db.Save(&cat)
	json.NewEncoder(w).Encode(cat)
}

func deleteCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&Category{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Tag Handlers
func getTags(w http.ResponseWriter, r *http.Request) {
	var tags []Tag
	db.Find(&tags)
	json.NewEncoder(w).Encode(tags)
}

func createTag(w http.ResponseWriter, r *http.Request) {
	var tag Tag
	json.NewDecoder(r.Body).Decode(&tag)
	db.Create(&tag)
	json.NewEncoder(w).Encode(tag)
}

func updateTag(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var tag Tag
	if err := db.First(&tag, vars["id"]).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&tag)
	db.Save(&tag)
	json.NewEncoder(w).Encode(tag)
}

func deleteTag(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&Tag{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Comment Handlers
func getAllComments(w http.ResponseWriter, r *http.Request) {
	var comments []Comment
	db.Preload("BlogPost").Find(&comments)
	json.NewEncoder(w).Encode(comments)
}

func deleteComment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&Comment{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Subscriber Handlers (Legacy)
func getSubscribers(w http.ResponseWriter, r *http.Request) {
	var subscribers []Subscriber
	db.Find(&subscribers)
	json.NewEncoder(w).Encode(subscribers)
}

func createSubscriber(w http.ResponseWriter, r *http.Request) {
	var sub Subscriber
	json.NewDecoder(r.Body).Decode(&sub)
	db.Create(&sub)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(sub)
}

// New Email System Handlers

// Mailing Lists
func getMailingLists(w http.ResponseWriter, r *http.Request) {
	var lists []MailingList
	db.Preload("Contacts").Find(&lists)
	json.NewEncoder(w).Encode(lists)
}

func createMailingList(w http.ResponseWriter, r *http.Request) {
	var list MailingList
	json.NewDecoder(r.Body).Decode(&list)
	db.Create(&list)
	json.NewEncoder(w).Encode(list)
}

func updateMailingList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var list MailingList
	if err := db.First(&list, vars["id"]).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&list)
	db.Save(&list)
	json.NewEncoder(w).Encode(list)
}

func deleteMailingList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&MailingList{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Contacts
func getContacts(w http.ResponseWriter, r *http.Request) {
	var contacts []Contact
	db.Find(&contacts)
	json.NewEncoder(w).Encode(contacts)
}

func createContact(w http.ResponseWriter, r *http.Request) {
	var contact Contact
	json.NewDecoder(r.Body).Decode(&contact)
	db.Create(&contact)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(contact)
}

func uploadContactsCSV(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20) // 10MB max
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "File too large"})
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid file"})
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	// Skip header
	_, err = reader.Read()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Empty or invalid CSV"})
		return
	}

	var contacts []Contact
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}

		if len(record) < 2 {
			continue
		}

		contact := Contact{
			Email:    record[0],
			FullName: record[1],
			Status:   "active",
		}
		
		if len(record) > 2 {
			contact.Phone = record[2]
		}
		if len(record) > 3 {
			contact.Address = record[3]
		}
		if len(record) > 4 {
			contact.State = record[4]
		}
		if len(record) > 5 {
			contact.LGA = record[5]
		}

		// Check if exists
		var existing Contact
		if err := db.Where("email = ?", contact.Email).First(&existing).Error; err != nil {
			db.Create(&contact)
			contacts = append(contacts, contact)
		}
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": fmt.Sprintf("Successfully uploaded %d contacts", len(contacts)),
		"count":   len(contacts),
	})
}

func updateContact(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var contact Contact
	if err := db.First(&contact, vars["id"]).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&contact)
	db.Save(&contact)
	json.NewEncoder(w).Encode(contact)
}

func deleteContact(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&Contact{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Campaigns
func getCampaigns(w http.ResponseWriter, r *http.Request) {
	var campaigns []Campaign
	db.Preload("MailingList").Find(&campaigns)
	json.NewEncoder(w).Encode(campaigns)
}

func createCampaign(w http.ResponseWriter, r *http.Request) {
	var campaign Campaign
	json.NewDecoder(r.Body).Decode(&campaign)
	db.Create(&campaign)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(campaign)
}

func updateCampaign(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var campaign Campaign
	if err := db.First(&campaign, vars["id"]).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewDecoder(r.Body).Decode(&campaign)
	db.Save(&campaign)
	json.NewEncoder(w).Encode(campaign)
}

func deleteCampaign(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.Delete(&Campaign{}, vars["id"])
	w.WriteHeader(http.StatusNoContent)
}

// Public Flow
func subscribe(w http.ResponseWriter, r *http.Request) {
	var contact Contact
	if err := json.NewDecoder(r.Body).Decode(&contact); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid payload"})
		return
	}

	// Try to find existing contact by email
	var existing Contact
	if err := db.Where("email = ?", contact.Email).First(&existing).Error; err == nil {
		// Update existing contact
		existing.FullName = contact.FullName
		existing.State = contact.State
		existing.LGA = contact.LGA
		existing.Status = "active"
		db.Save(&existing)
		json.NewEncoder(w).Encode(existing)
		return
	}

	// Create new contact
	contact.Status = "active"
	db.Create(&contact)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(contact)
}

func unsubscribe(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := db.Model(&Contact{}).Where("email = ?", req.Email).Update("status", "unsubscribed").Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Unsubscribed successfully"})
}

func getEngagementMetrics(w http.ResponseWriter, r *http.Request) {
	// Mock metrics for the dashboard
	metrics := map[string]interface{}{
		"open_rate":   24.8,
		"click_rate":  12.3,
		"bounce_rate": 1.2,
		"total_sent":  1540,
	}
	json.NewEncoder(w).Encode(metrics)
}
