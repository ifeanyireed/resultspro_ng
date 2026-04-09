import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import RootCause from "@/components/RootCause";
import Solution from "@/components/Solution";
import ResultsProDeepDive from "@/components/ResultsProDeepDive";
import ExamGuideDeepDive from "@/components/ExamGuideDeepDive";
import EduNodeDeepDive from "@/components/EduNodeDeepDive";
import Ecosystem from "@/components/Ecosystem";
import MarketOpportunity from "@/components/MarketOpportunity";
import WhyDats from "@/components/WhyDats";
import Traction from "@/components/Traction";
import TheAsk from "@/components/TheAsk";
import Vision from "@/components/Vision";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="problem">
        <Problem />
      </div>
      <RootCause />
      <div id="solution">
        <Solution />
      </div>
      <ResultsProDeepDive />
      <ExamGuideDeepDive />
      <EduNodeDeepDive />
      <div id="ecosystem">
        <Ecosystem />
      </div>
      <div id="market">
        <MarketOpportunity />
      </div>
      <WhyDats />
      <div id="traction">
        <Traction />
      </div>
      <TheAsk />
      <Vision />
    </main>
  );
}
