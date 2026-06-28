"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Shield } from "lucide-react";
import { register } from "@/lib/api";
import { saveAuth } from "@/lib/auth";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
  full_name: "",
  email: "",
  phone: "",
  password: "",
  location: "Dubai",
  national_id: "",
  device_id: "web-browser",
  ip_address: "127.0.0.1",
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleRegister() {
    setError("");
    setLoading(true);

    try {
      const data = await register(form);
      saveAuth(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fd] text-slate-950">
      <header className="h-20 bg-[#062747] text-white flex items-center justify-between px-14 rounded-t-[28px]">
        <div className="flex items-center gap-8">
          <div className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center">
            <Check size={14} />
          </div>
          <div className="h-8 w-px bg-white/15" />
          <span className="font-semibold">Enrollment Portal</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <span className="text-white/70">Need help?</span>
          <span className="font-semibold">Support Center</span>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-80px)]">
        <aside className="w-[345px] bg-[#eef4ff] border-r border-slate-300 px-9 py-10">
          <h2 className="tracking-[0.18em] text-sm font-medium text-slate-700 mb-10">
            REGISTRATION PROGRESS
          </h2>

          <Step active number="1" title="Identity Profile" subtitle="Personal & Work Details" />
          <Step number="2" title="Device Link" subtitle="Biometric Verification" />
          <Step number="3" title="Security Setup" subtitle="Passkey & MFA" />

          <div className="mt-[380px] bg-[#062747] text-white rounded-lg p-5">
            <h3 className="tracking-wide text-sm mb-3">SECURITY NOTICE</h3>
            <p className="text-sm font-semibold leading-6">
              All data is encrypted with AES-256 standard and processed via Sentinel Core.
            </p>
          </div>
        </aside>

        <section className="flex-1 flex flex-col items-center pt-14">
          <div className="w-[660px]">
            <h1 className="font-semibold mb-3">Verify Identity</h1>
            <p className="text-slate-600 mb-10">
              Confirm your details to begin the secure onboarding process.
            </p>

            <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
              <Field
                label="Full Name"
                value={form.full_name}
                onChange={(value) => updateField("full_name", value)}
                placeholder="John Doe"
                className="mb-7"
              />

              <Field
                label="Work Email Address"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="j.doe@company.com"
                className="mb-7"
                type="email"
              />

              <Field
                label="Phone Number"
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
                placeholder="9876543210"
                className="mb-7"
              />

              <Field
                label="Password"
                value={form.password}
                onChange={(value) => updateField("password", value)}
                placeholder="Enter password"
                className="mb-7"
                type="password"
              />

              <div className="grid grid-cols-2 gap-5 mb-7">
                <Field
                  label="Location"
                  value={form.location}
                  onChange={(value) => updateField("location", value)}
                  placeholder="Dubai"
                />

                <Field
                  label="National ID"
                  value={form.national_id}
                  onChange={(value) => updateField("national_id", value)}
                  placeholder="A12345678"
                />
              </div>

              {error && (
                <p className="mb-5 rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}

              <div className="border-t border-slate-300 mt-7 pt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="flex items-center gap-3 font-semibold"
                >
                  <ArrowLeft size={22} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="bg-[#020817] text-white px-9 py-2 rounded font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-10 mt-14 text-slate-600 font-medium">
              <span className="flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                Bank-grade Security
              </span>
              <span>Terms of Enrollment</span>
              <span>Privacy Shield</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Step({
  number,
  title,
  subtitle,
  active,
}: {
  number: string;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-4 mb-8">
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center border text-lg ${
          active
            ? "bg-[#020817] text-white border-[#020817]"
            : "text-slate-400 border-slate-400"
        }`}
      >
        {number}
      </div>
      <div>
        <h3 className={`font-semibold ${active ? "text-slate-950" : "text-slate-500"}`}>
          {title}
        </h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-semibold mb-3">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-11 rounded border border-slate-300 bg-[#eef4ff] px-5 text-slate-700 outline-none"
      />
    </label>
  );
}