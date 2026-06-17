import {
  Bot,
  Clock,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  ["Device Verified", Fingerprint],
  ["FIDO2 Compliant", ShieldCheck],
  ["Risk Score Calculated", Bot],
  ["VPN Detection Active", LockKeyhole],
  ["Behavioral Biometrics Enabled", Fingerprint],
  ["24/7 Threat Monitoring", Clock],
] as const;

export default function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white py-4">
      <div className="marquee flex">
        {[...trustItems, ...trustItems].map(([label, Icon], index) => (
          <div
            key={`${label}-${index}`}
            className="mx-3 flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-600"
          >
            <Icon size={16} className="text-blue-600" />
            <span>✓ {label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}