"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Shield } from "lucide-react";

import { Step } from "./components/Step";
import { IdentityProfile } from "./steps/IdentityProfile";
import { DeviceLink } from "./steps/DeviceLink";
import { SecuritySetup } from "./steps/SecuritySetup";

export function EnrollmentPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const goNext = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/dashboard");
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fd] text-slate-950">
      <header className="h-16 lg:h-20 bg-[#062747] text-white flex items-center justify-between px-5 sm:px-8 lg:px-14">
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="h-7 w-7 rounded-full border border-white/15 flex items-center justify-center">
            <Check size={14} />
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/15" />

          <span className="font-semibold text-sm lg:text-base">
            Enrollment Portal
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <span className="text-white/70">Need help?</span>
          <span className="font-semibold">Support Center</span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <aside className="w-full lg:w-[345px] bg-[#eef4ff] border-b lg:border-b-0 lg:border-r border-slate-300 px-5 sm:px-8 lg:px-9 py-7 lg:py-10">
          <h2 className="tracking-[0.18em] text-xs lg:text-sm font-medium text-slate-700 mb-7 lg:mb-10">
            REGISTRATION PROGRESS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4 lg:gap-0">
            <Step
              active={step === 1}
              completed={step > 1}
              number="1"
              title="Identity Profile"
              subtitle="Personal & Work Details"
            />

            <Step
              active={step === 2}
              completed={step > 2}
              number="2"
              title="Device Link"
              subtitle="Biometric Verification"
            />

            <Step
              active={step === 3}
              number="3"
              title="Security Setup"
              subtitle="Passkey & MFA"
            />
          </div>

          <div className="hidden lg:block mt-[300px] bg-[#062747] text-white rounded-xl p-5">
            <h3 className="tracking-wide text-sm mb-3">SECURITY NOTICE</h3>
            <p className="text-sm font-semibold leading-6">
              All data is encrypted with AES-256 standard and processed via
              Sentinel Core.
            </p>
          </div>
        </aside>

        <section className="flex-1 flex flex-col items-center px-5 sm:px-8 py-10 lg:pt-14">
          <div className="w-full max-w-[660px]">
            {step === 1 && <IdentityProfile onNext={goNext} onBack={goBack} />}
            {step === 2 && <DeviceLink onNext={goNext} onBack={goBack} />}
            {step === 3 && <SecuritySetup onNext={goNext} onBack={goBack} />}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-10 lg:mt-14 text-slate-600 font-medium text-sm">
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