import Hero from "@/components/Hero";
import ClassroomProDeepDive from "@/components/ClassroomProDeepDive";
import ExamsProDeepDive from "@/components/ExamsProDeepDive";
import TutorsProDeepDive from "@/components/TutorsProDeepDive";
import ResultsProDeepDive from "@/components/ResultsProDeepDive";
import Ecosystem from "@/components/Ecosystem";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <div id="ecosystem">
        <Ecosystem />
      </div>

      <div id="products" className="space-y-0">
        <ClassroomProDeepDive />
        <ExamsProDeepDive />
        <TutorsProDeepDive />
        <ResultsProDeepDive />
      </div>

      <Newsletter />
    </main>
  );
}
