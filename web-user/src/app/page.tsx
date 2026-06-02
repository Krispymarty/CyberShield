import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import PhoneSection from "@/components/landing/PhoneSection";
import RiskTable from "@/components/landing/RiskTable";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
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