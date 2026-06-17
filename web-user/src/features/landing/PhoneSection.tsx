

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "No more phishing attacks",
  "Zero-knowledge proof encryption",
  "Instant multi-device synchronization",
];

export default function PhoneSection() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 lg:px-8">
        <div className="flex justify-center">
          <Image
            src="/images/phone-mockup.png"
            alt="Secure Passkey Authentication"
            width={700}
            height={700}
            className="h-auto w-full max-w-[520px] animate-float-soft"
          />
        </div>

        <div>
          <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Passwordless Authentication
          </div>

          <h2 className="text-5xl font-bold leading-tight tracking-tight text-[#07132f]">
            Login Effortlessly,
            <br />
            Securely.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Sentinel AI uses FIDO2 and passkey technology to bind login access
            to trusted devices and biometric verification.
          </p>

          <div className="mt-8 space-y-5">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" size={22} />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}