
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fbff] to-[#eaf3ff]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-10 h-[760px] w-[760px] rounded-full border border-blue-100" />
        <div className="absolute -right-20 top-28 h-[600px] w-[600px] rounded-full border border-blue-100" />
        <div className="absolute right-10 top-48 h-[420px] w-[420px] rounded-full border border-blue-100" />

        <div className="absolute right-[42%] top-36 h-3 w-3 rounded-full bg-blue-300 animate-float-slow" />
        <div className="absolute right-[49%] top-[520px] h-3 w-3 rounded-full bg-blue-400 animate-float-soft" />
        <div className="absolute right-10 bottom-44 h-3 w-3 rounded-full bg-blue-400 animate-float-slow" />

        <div className="absolute bottom-8 left-8 grid grid-cols-8 gap-3 opacity-20">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-blue-300"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Shield size={14} />
            Banking-Grade Security
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#07132f] sm:text-5xl md:text-6xl">
            AI-Powered Banking
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Security.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Protect users with behavioral biometrics, device intelligence,
            and real-time fraud detection built for modern digital banking.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="flex w-fit items-center gap-3 rounded-2xl bg-[#031B4E] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#05256B]"
            >
              <Shield size={18} />
              Open Secure Account
            </Link>

            <button className="flex w-fit cursor-pointer items-center gap-3 text-base font-semibold text-blue-600 transition hover:text-blue-700">
              <PlayCircle size={22} />
              Watch Demo
            </button>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200 pt-6">
            <div>
              <p className="text-xl font-bold text-[#07132f] md:text-2xl">
                99.8%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Fraud Accuracy
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-[#07132f] md:text-2xl">
                &lt;50ms
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Risk Decision
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-[#07132f] md:text-2xl">
                24/7
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-xl animate-float-soft lg:-translate-y-4">
          <div className="absolute -inset-10 rounded-[3rem] bg-blue-300/20 blur-3xl animate-pulse-glow" />

          <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-blue-950/10 backdrop-blur md:p-8">
            <Image
              src="/images/hero-card.png"
              alt="Sentinel AI Score"
              width={600}
              height={600}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

