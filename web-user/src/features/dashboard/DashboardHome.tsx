import {
  CreditCard,
  KeyRound,
  Shield,
  TriangleAlert,
  Wallet,
} from "lucide-react";

const activities = [
  ["Apple Store", "Electronics", "Oct 24, 2023", "-$1,299.00", CreditCard],
  ["The Nomad Bistro", "Dining", "Oct 23, 2023", "-$84.50", Wallet],
  ["Tesla Supercharger", "Travel", "Oct 21, 2023", "-$22.40", TriangleAlert],
] as const;

const actions = [
  ["Transfer Funds", "Instant global rails", TriangleAlert],
  ["Pay Bills", "Automated scheduling", CreditCard],
  ["Security Keys", "Update biometrics", KeyRound],
] as const;

export function DashboardHome() {
  return (
    <section className="px-5 py-8 lg:px-8">
      <p className="mb-2 text-xs font-bold tracking-[0.25em] text-blue-500">
        WELCOME BACK, USER
      </p>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="text-4xl font-bold tracking-[-0.04em] lg:text-5xl">
          Account Overview
        </h1>

        <button className="w-fit rounded-xl bg-[#062747] px-5 py-3 text-sm font-bold text-white">
          Generate Report
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr_1fr]">
        <div className="rounded-3xl bg-[#020817] p-7 text-white shadow-xl lg:p-8">
          <p className="mb-4 text-xs tracking-[0.25em] text-white/50">
            TOTAL BALANCE
          </p>

          <h2 className="mb-5 text-4xl font-bold lg:text-5xl">$42,950.00</h2>

          <p className="text-xs text-white/40">24H CHANGE</p>
          <p className="mb-10 font-bold text-emerald-400">↗ +2.4%</p>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-black">
              Add Funds
            </button>

            <button className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold">
              Details
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mb-8 flex justify-between gap-4 text-left">
            <h3 className="text-lg font-bold">Security Health</h3>
            <span className="h-fit rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700">
              ● OPTIMAL
            </span>
          </div>

          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-[7px] border-blue-400">
            <div>
              <div className="text-3xl font-bold">98</div>
              <div className="text-xs text-slate-500">SAFETY SCORE</div>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Your account metrics are within the safest 1% of the network.
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex justify-between">
            <h3 className="text-lg font-bold">Fraud Alerts</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Shield size={20} />
            </div>
          </div>

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-600">
              ✓
            </div>

            <h3 className="font-bold">Zero Detected Threats</h3>
            <p className="text-sm text-slate-500">142 events audited in last 24h</p>
          </div>

          <button className="rounded-xl border border-slate-300 py-3 text-sm font-bold">
            View Deep Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_304px]">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between p-6 lg:p-8">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <button className="text-sm font-bold text-blue-500">Full History</button>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.map(([name, sub, date, amount, Icon]) => (
              <div
                key={name}
                className="grid grid-cols-[44px_1fr] items-center gap-4 px-6 py-5 md:grid-cols-[52px_1fr_120px_120px_100px] lg:px-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ff]">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>

                <p className="hidden font-mono text-sm text-slate-600 md:block">
                  {date}
                </p>

                <p className="hidden font-mono text-sm md:block">{amount}</p>

                <span className="hidden justify-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 md:inline-flex">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside>
          <h2 className="mb-4 text-lg font-bold">Priority Actions</h2>

          {actions.map(([title, sub, Icon]) => (
            <button
              key={title}
              className="mb-4 flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <Icon size={22} />
              </div>

              <div className="flex-1">
                <h3 className="font-bold">{title}</h3>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>

              <span className="text-2xl text-slate-400">›</span>
            </button>
          ))}

          <div className="rounded-3xl bg-[#062747] p-6 text-white shadow-xl">
            <p className="text-xs font-bold tracking-widest text-emerald-400">
              ● SENTINEL AI CORE ACTIVE
            </p>

            <div className="my-5 grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-white/40">SCANNING RATE</p>
                <p className="font-mono text-xl">4.2 GB/s</p>
              </div>

              <div>
                <p className="text-xs text-white/40">LATENCY</p>
                <p className="font-mono text-xl">12ms</p>
              </div>
            </div>

            <p className="text-sm italic leading-6 text-white/60">
              “Analyzing 1,402 outbound requests for pattern anomalies.”
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}