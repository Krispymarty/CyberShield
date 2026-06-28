"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, KeyRound } from "lucide-react";
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
        location: "India",
        ip_address: "127.0.0.1",
      });

      saveAuth(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f5f7fc]">
      <section className="relative overflow-hidden bg-[#062747] text-white px-6 sm:px-10 lg:px-12 pt-10 lg:pt-14 pb-20 lg:pb-12 min-h-[520px] lg:min-h-screen">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#1e88e5_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

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
            Sign in securely to access real-time banking security, fraud alerts,
            and transaction intelligence.
          </p>
        </div>

        <div className="absolute bottom-8 lg:bottom-16 left-6 sm:left-10 lg:left-12 z-10 flex gap-4 sm:gap-8">
          <div className="w-[92px] rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
            <p className="text-xs tracking-wide text-slate-400 mb-2">UPTIME</p>
            <p className="text-sm">
              99.999% <span className="text-blue-400">●</span>
            </p>
          </div>

          <div className="w-[126px] rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
            <p className="text-xs tracking-wide text-slate-400 mb-2">
              DETECTIONS
            </p>
            <p className="text-sm">2.4M / hr</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-[#f8fafc] px-8 lg:px-20">
  <div className="w-full max-w-md">
    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#062747] text-white">
      <KeyRound size={26} />
    </div>

    <h2 className="text-4xl font-bold tracking-tight text-slate-900">
      Welcome back
    </h2>

    <p className="mt-3 text-slate-600">
      Sign in with your registered Sentinel account.
    </p>

    <div className="mt-10 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Work Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>
    </div>

    {error && (
      <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
        {error}
      </p>
    )}

    <button
      onClick={handleLogin}
      disabled={loading || !email || !password}
      className="mt-8 h-12 w-full rounded-xl bg-[#020817] font-semibold text-white transition hover:bg-[#0b3564] disabled:opacity-50"
    >
      {loading ? "Signing in..." : "Login"}
    </button>

    <p className="mt-6 text-center text-sm text-slate-600">
      Don't have an account?{" "}
      <Link href="/register" className="font-semibold text-blue-600">
        Register
      </Link>
    </p>

    <div className="mt-10 text-center text-sm text-slate-500">
      <span className="text-emerald-500">●</span> System Status: All Clear
    </div>

    <div className="mt-6 flex justify-center gap-8 text-sm text-slate-500">
      <a href="#" className="hover:text-slate-800">
        Privacy Policy
      </a>
      <a href="#" className="hover:text-slate-800">
        Contact Support
      </a>
    </div>
  </div>
</section>
    </div>
  );
}