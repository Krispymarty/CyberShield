import Navbar from "@/features/landing/Navbar";
import Hero from "@/features/landing/Hero";
import Features from "@/features/landing/Features";
import PhoneSection from "@/features/landing/PhoneSection";
import RiskTable from "@/features/landing/RiskTable";
import CTA from "@/features/landing/CTA";
import Footer from "@/features/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <PhoneSection />
      <RiskTable />
      <CTA />
      <Footer />
    </main>
  );
}