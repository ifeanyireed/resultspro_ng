import DeepDiveCard from "./DeepDiveCard";

export default function ClassroomProDeepDive() {
  return (
    <DeepDiveCard 
      title="ClassroomPRO"
      subtitle="The Command Center for Educational Efficiency."
      tag="LMS Infrastructure"
      color="text-blue"
      features={[
        "Real-time Attendance",
        "Automated Grading",
        "Lesson Planning",
        "Parent Portals",
        "Behavior Tracking",
        "Fee Management"
      ]}
    />
  );
}
