import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <div className="inline-block text-[10px] px-3 py-1 rounded-full bg-white border border-gray-200 mb-5 font-medium text-gray-600">
            BANKING-GRADE SECURITY
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#111827]">
            The Future of
            <br />
            <span className="text-[#4F8DFD]">
              Secure Banking.
            </span>
          </h1>

          <p className="text-gray-500 mt-6 max-w-lg leading-relaxed text-lg">
            Protect your wealth with behavioral biometrics and real-time
            fraud detection. Experience AI-powered precision designed for
            the modern enterprise.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <Link
              href="/login"
              className="bg-[#031B4E] text-white px-8 py-4 rounded-md hover:bg-[#052768] transition-all duration-300"
            >
              Open Secure Account
            </Link>

            <button className="text-[#111827] font-medium">
              ⏺ Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <Image
            src="/images/hero-card.png"
            alt="Sentinel AI Score"
            width={600}
            height={600}
            priority
            className="w-full max-w-[500px] h-auto"
          />
        </div>

      </div>
    </section>
  );
}