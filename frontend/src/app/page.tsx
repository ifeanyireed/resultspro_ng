import Hero from "@/components/Hero";
import SuiteShowcase from "@/components/SuiteShowcase";
import Ecosystem from "@/components/Ecosystem";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <div id="ecosystem">
        <Ecosystem />
      </div>

      <div id="products">
        <SuiteShowcase />
      </div>

      <Newsletter />
    </main>
  );
}
