'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Edit3, X, Save, Globe, AlertCircle, 
  CheckCircle2, FileText, Layers, Hash, MessageSquare,
  Search, Filter, Loader2, ChevronRight, MessageCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full glass animate-pulse rounded-3xl" />
});
import 'react-quill-new/dist/quill.snow.css';

// Types
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  blog_post_id: number;
  blog_post?: BlogPost;
  created_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  status: string;
  category_id?: number;
  category?: Category;
  tags?: Tag[];
  created_at: string;
}

const TABS = [
  { id: 'posts', label: 'Posts', icon: FileText },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'tags', label: 'Tags', icon: Hash },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
];

export default function AdminBlogPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'post' | 'category' | 'tag' | 'comment'>('post');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes, tagsRes, commentsRes] = await Promise.all([
        fetch('http://localhost:8080/api/blog').then(res => res.json()),
        fetch('http://localhost:8080/api/categories').then(res => res.json()),
        fetch('http://localhost:8080/api/tags').then(res => res.json()),
        fetch('http://localhost:8080/api/comments').then(res => res.json())
      ]);

      setPosts(Array.isArray(postsRes) ? postsRes : []);
      setCategories(Array.isArray(catsRes) ? catsRes : []);
      setTags(Array.isArray(tagsRes) ? tagsRes : []);
      setComments(Array.isArray(commentsRes) ? commentsRes : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Is the backend running?');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!editingItem) return;
    setError(null);
    setSuccess(null);
    
    let endpoint = 'blog';
    if (modalType === 'category') endpoint = 'categories';
    if (modalType === 'tag') endpoint = 'tags';
    if (modalType === 'comment') endpoint = 'comments';

    const method = editingItem.id ? 'PUT' : 'POST';
    const url = editingItem.id 
      ? `http://localhost:8080/api/${endpoint}/${editingItem.id}` 
      : `http://localhost:8080/api/${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(`${modalType} saved successfully!`);
        setTimeout(() => {
          setIsModalOpen(false);
          setEditingItem(null);
          setSuccess(null);
          fetchData();
        }, 1000);
      } else {
        setError(result.error || 'Failed to save');
      }
    } catch (err) {
      setError('A network error occurred.');
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    let endpoint = 'blog';
    if (type === 'category') endpoint = 'categories';
    if (type === 'tag') endpoint = 'tags';
    if (type === 'comment') endpoint = 'comments';

    try {
      const res = await fetch(`http://localhost:8080/api/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const renderPosts = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Blog <span className="text-primary">Articles</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Publish and manage your site content</p>
        </div>
        <button 
          onClick={() => { setModalType('post'); setEditingItem({ title: '', slug: '', content: '', author: 'Admin', status: 'draft' }); setIsModalOpen(true); }}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
          <div className="glass p-20 rounded-[3rem] text-center border-white/5">
            <p className="text-gray-500 font-black uppercase tracking-widest">No blog posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="glass p-6 rounded-[2.5rem] border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${post.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/{post.slug}</span>
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">• {post.author}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setModalType('post'); setEditingItem(post); setIsModalOpen(true); }}
                  className="p-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete('post', post.id)}
                  className="p-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Content <span className="text-primary">Categories</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Structure your blog by topics</p>
        </div>
        <button 
          onClick={() => { setModalType('category'); setEditingItem({ name: '', slug: '' }); setIsModalOpen(true); }}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="glass p-8 rounded-[3rem] border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setModalType('category'); setEditingItem(cat); setIsModalOpen(true); }} className="p-2 hover:text-primary transition-colors"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete('category', cat.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-black mb-1">{cat.name}</h4>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">/{cat.slug}</p>
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Browse Posts</span>
              </div>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTags = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-black uppercase tracking-tight">Blog <span className="text-primary">Tags</span></h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Fine-grained content indexing</p>
        </div>
        <button 
          onClick={() => { setModalType('tag'); setEditingItem({ name: '', slug: '' }); setIsModalOpen(true); }}
          className="bg-primary text-background px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Tag
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tags.map((tag) => (
          <div key={tag.id} className="glass p-5 rounded-2xl border-white/5 hover:border-primary/20 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Hash className="w-4 h-4 text-primary" />
              <span className="font-bold text-xs uppercase tracking-widest">{tag.name}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { setModalType('tag'); setEditingItem(tag); setIsModalOpen(true); }}
                className="p-1 hover:text-primary transition-colors"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleDelete('tag', tag.id)}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h3 className="text-2xl font-display font-black uppercase tracking-tight">User <span className="text-primary">Comments</span></h3>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Moderate community discussion</p>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="glass p-20 rounded-[3rem] text-center border-white/5">
            <p className="text-gray-500 font-black uppercase tracking-widest">No comments found.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass p-6 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all flex items-start justify-between group">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                  {comment.author?.[0] || 'A'}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-xs uppercase tracking-widest">{comment.author}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">• {new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{comment.content}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg w-fit">
                    <MessageCircle className="w-3 h-3" />
                    On: {comment.blog_post?.title || 'Post deleted'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete('comment', comment.id)}
                className="p-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <style jsx global>{`
        .ql-container {
          font-family: inherit;
          font-size: 1rem;
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          min-height: 300px;
        }
        .ql-toolbar {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-top-left-radius: 1.5rem;
          border-top-right-radius: 1.5rem;
          padding: 1rem !important;
        }
        .ql-stroke { stroke: #9ca3af !important; }
        .ql-fill { fill: #9ca3af !important; }
        .ql-picker { color: #9ca3af !important; }
        .ql-editor { color: var(--foreground); padding: 1.5rem; }
      `}</style>
      
      <header className="flex justify-between items-end">
        <div>
          <h1 className="heading-premium text-4xl md:text-5xl mb-2">Editorial <span className="text-primary">Center</span></h1>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated Blog & Content Management</p>
        </div>
        <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  active ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className={active ? 'block' : 'hidden lg:block'}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'posts' && renderPosts()}
          {activeTab === 'categories' && renderCategories()}
          {activeTab === 'tags' && renderTags()}
          {activeTab === 'comments' && renderComments()}
        </AnimatePresence>
      )}

      {/* Shared Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] border-white/10 relative z-10 p-10 md:p-14"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter">
                  {editingItem?.id ? 'Edit' : 'Create'} <span className="text-primary">{modalType}</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-2xl hover:bg-white/5 text-gray-500 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-primary/10 border border-primary/20 text-primary px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    {success}
                  </div>
                )}

                {modalType === 'post' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Title</label>
                        <input 
                          type="text" value={editingItem?.title || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="Post title"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Slug</label>
                        <input 
                          type="text" value={editingItem?.slug || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50" placeholder="post-slug"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Author</label>
                        <input 
                          type="text" value={editingItem?.author || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Category</label>
                        <select 
                          value={editingItem?.category_id || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, category_id: parseInt(e.target.value) })}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Status</label>
                        <select 
                          value={editingItem?.status || 'draft'}
                          onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                          className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Content</label>
                      <div className="min-h-[400px]">
                        <ReactQuill theme="snow" value={editingItem?.content || ''} onChange={(content) => setEditingItem({ ...editingItem, content })} modules={modules} />
                      </div>
                    </div>
                  </>
                )}

                {(modalType === 'category' || modalType === 'tag') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Name</label>
                      <input 
                        type="text" value={editingItem?.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Slug</label>
                      <input 
                        type="text" value={editingItem?.slug || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        className="w-full glass border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: '#00E65F' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full bg-primary text-background py-5 rounded-2xl font-black transition-all shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-3 uppercase tracking-widest mt-8"
                >
                  Save {modalType} <Save className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
