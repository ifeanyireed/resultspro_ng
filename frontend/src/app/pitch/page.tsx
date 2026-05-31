import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import RootCause from "@/components/RootCause";
import Solution from "@/components/Solution";
import MarketOpportunity from "@/components/MarketOpportunity";
import WhyDats from "@/components/WhyDats";
import Traction from "@/components/Traction";
import TheAsk from "@/components/TheAsk";
import Vision from "@/components/Vision";

export default function PitchPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div id="problem">
        <Problem />
      </div>
      <div id="root-cause">
        <RootCause />
      </div>
      <div id="solution">
        <Solution />
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
