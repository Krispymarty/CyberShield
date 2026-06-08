// features/landing/Features.tsx

import { Fingerprint, Globe, Smartphone } from "lucide-react";

const features = [
  {
    title: "SIM Swap Protection",
    description: "Detect SIM changes before they compromise user accounts.",
    icon: Smartphone,
  },
  {
    title: "Impersonation Shield",
    description:
      "Behavioral biometrics distinguish genuine users from fraudsters.",
    icon: Fingerprint,
  },
  {
    title: "VPN Detection",
    description:
      "Identify risky network activity and suspicious access patterns.",
    icon: Globe,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#07132f]">
          Next-Gen Threat Protection
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Proactive defense against sophisticated banking attacks using device,
          network, and behavior intelligence.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={26} />
              </div>

              <h3 className="text-lg font-bold text-[#07132f]">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}