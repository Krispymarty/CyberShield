"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Fingerprint, KeyRound, ScanFace } from "lucide-react";
import { login } from "@/lib/api";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Dubai");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const data = await login({
        email,
        password,
        device_id: "web-browser",
        location,
      });

      saveAuth(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f5f7fc]">
      <section className="relative overflow-hidden bg-[#062747] text-white px-6 sm:px-10 lg:px-12 pt-10 lg:pt-14 pb-20 lg:pb-12 min-h-[520px] lg:min-h-screen">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#1e88e5_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative z-10 h-9 w-9 rounded-full border border-blue-300/30 flex items-center justify-center mb-12 lg:mb-16">
          <Check size={18} />
        </div>

        <div className="relative z-10 max-w-[610px]">
          <h1 className="text-[38px] sm:text-[46px] lg:text-[48px] leading-[1.12] font-bold tracking-[-0.04em]">
            Invisible protection for
            <br className="hidden sm:block" />
            every <span className="text-[#3b82f6]">transaction.</span>
          </h1>

          <p className="mt-7 max-w-[520px] text-[15px] sm:text-[16px] leading-7 text-slate-400">
            The enterprise-grade security layer that leverages advanced neural
            networks to identify and neutralize fraud before it happens.
          </p>
        </div>

        <div className="absolute bottom-8 lg:bottom-16 left-6 sm:left-10 lg:left-12 z-10 flex gap-4 sm:gap-8">
          <div className="w-[84px] rounded-lg border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs tracking-wide text-slate-400 mb-2">UPTIME</p>
            <p className="text-sm">
              99.999% <span className="text-blue-400">●</span>
            </p>
          </div>

          <div className="w-[116px] rounded-lg border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs tracking-wide text-slate-400 mb-2">
              DETECTIONS
            </p>
            <p className="text-sm">2.4M / hr</p>
          </div>
        </div>

        <div className="absolute top-[150px] left-[160px] h-[190px] w-[190px] border border-cyan-400/20 bg-cyan-400/5" />
        <div className="absolute bottom-[95px] left-[158px] h-[190px] w-[190px] border border-cyan-400/20 bg-cyan-400/5" />
        <div className="absolute top-[145px] right-[-28px] h-[190px] w-[190px] border border-cyan-400/20 bg-cyan-400/5" />
        <div className="absolute bottom-[95px] right-[-28px] h-[190px] w-[190px] border border-cyan-400/20 bg-cyan-400/5" />
      </section>

      <section className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0">
        <div className="w-full max-w-[448px]">
          <h2 className="text-[30px] sm:text-[32px] font-bold tracking-[-0.04em] text-[#020817]">
            Welcome back
          </h2>

          <p className="mt-2 text-[14px] text-slate-600">
            Sign in with your registered Sentinel account.
          </p>

          <div className="mt-9 flex h-[56px] sm:h-[60px] items-center justify-center gap-3 rounded bg-[#062747] text-white text-[18px] sm:text-[20px] font-bold">
            <KeyRound size={22} />
            Secure Login
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button className="h-9 sm:h-6 rounded border border-slate-300 text-[13px] font-bold text-slate-800 flex items-center justify-center gap-2">
              <Fingerprint size={18} />
              Biometric
            </button>

            <button className="h-9 sm:h-6 rounded border border-slate-300 text-[13px] font-bold text-slate-800 flex items-center justify-center gap-2">
              <ScanFace size={18} />
              Face ID
            </button>
          </div>

          <div className="my-9 flex items-center">
            <div className="flex-1 border-t border-slate-300" />
            <span className="px-4 text-[12px] sm:text-[13px] font-bold tracking-wide text-slate-500 whitespace-nowrap">
              OR USE EMAIL LOGIN
            </span>
            <div className="flex-1 border-t border-slate-300" />
          </div>

          <label className="block text-[13px] font-bold text-slate-800 mb-2">
            Work Email
          </label>

          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 sm:h-10 w-full rounded border border-slate-300 bg-[#eef3fb] px-4 text-[16px] outline-none"
          />

          <label className="mt-4 block text-[13px] font-bold text-slate-800 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 sm:h-10 w-full rounded border border-slate-300 bg-[#eef3fb] px-4 text-[16px] outline-none"
          />

          <label className="mt-4 block text-[13px] font-bold text-slate-800 mb-2">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-11 sm:h-10 w-full rounded border border-slate-300 bg-[#eef3fb] px-4 text-[16px] outline-none"
          />

          {error && (
            <p className="mt-4 rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="mt-6 flex h-10 sm:h-8 w-full items-center justify-center rounded border border-[#020817] text-[18px] sm:text-[20px] font-bold text-[#020817] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm font-semibold text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Register
            </Link>
          </p>

          <div className="mt-12 text-center text-[13px] font-bold tracking-wide text-slate-600">
            <span className="text-emerald-500">●</span> System Status: All Clear
          </div>

          <div className="mt-5 flex justify-center gap-6 sm:gap-8 text-[13px] font-bold text-slate-600">
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}