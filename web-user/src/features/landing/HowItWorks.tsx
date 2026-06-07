import { Ban, ScanSearch, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Analyze user signals",
    description:
      "Device, location, behavior, IP, and transaction data are checked instantly.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Calculate risk score",
    description:
      "Sentinel AI assigns a trust score and identifies suspicious patterns.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Approve or block",
    description:
      "Trusted activity continues while high-risk activity is blocked or reviewed.",
    icon: Ban,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/40 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            How It Works
          </p>

          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-[#07132f] md:text-5xl">
            Fraud prevention before the transaction completes.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Sentinel AI evaluates every login and transaction in real time,
            helping banking systems decide whether to approve, verify, or block
            an action.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-950/10">
          <div className="space-y-4">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex gap-5 rounded-3xl border border-slate-100 bg-slate-50/70 p-5 transition hover:bg-blue-50"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Icon size={24} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    Step {number}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#07132f]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}