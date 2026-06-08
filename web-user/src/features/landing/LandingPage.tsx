

import Navbar from "@/features/landing/Navbar";
import Hero from "@/features/landing/Hero";
import TrustBar from "@/features/landing/TrustBar";
import Features from "@/features/landing/Features";
import PhoneSection from "@/features/landing/PhoneSection";
import RiskTable from "@/features/landing/RiskTable";
import CTA from "@/features/landing/CTA";
import Footer from "@/features/landing/Footer";
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
