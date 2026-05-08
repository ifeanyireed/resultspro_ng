import DeepDiveCard from "./DeepDiveCard";

export default function ClassroomProDeepDive() {
  return (
    <DeepDiveCard 
      title="ClassroomPRO"
      subtitle="Standardized Learning, Even Offline."
      tag="Learning Infrastructure"
      color="text-blue"
      features={[
        "Offline-First Notes",
        "Lesson Standardization",
        "Parent-Teacher Messaging",
        "Daily Flashcards",
        "Digital Class Logs",
        "Teacher Lesson Support"
      ]}
    />
  );
}
