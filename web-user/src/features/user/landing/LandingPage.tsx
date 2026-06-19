import Navbar from "./Navbar";
import Hero from "./Hero";
import TrustBar from "./TrustBar";
import Features from "./Features";
import PhoneSection from "./PhoneSection";
import RiskTable from "./RiskTable";
import CTA from "./CTA";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <TrustBar />
      <PhoneSection />
       <HowItWorks/>
      <RiskTable />
      <CTA />
      <Footer />
    </main>
  );
}
