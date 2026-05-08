import DeepDiveCard from "./DeepDiveCard";

export default function ResultsProDeepDive() {
  return (
    <DeepDiveCard 
      title="ResultsPRO"
      subtitle="Administrative Speed & School Revenue."
      tag="Admin & Monetization"
      color="text-primary"
      features={[
        "Master Sheet CSV Upload",
        "Instant Grade Book Gen",
        "Shareable Social Cards",
        "Scratch Card Monetization",
        "Admin Workflow Sync",
        "Automated Result Portals"
      ]}
    />
  );
}
