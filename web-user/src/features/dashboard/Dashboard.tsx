import {
  Bell,
  CreditCard,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  Search,
  Shield,
  TriangleAlert,
  Wallet,
} from "lucide-react";

const navItems = [
  ["Dashboard", LayoutDashboard, true],
  ["Accounts", Wallet],
  ["Security", Shield],
  ["Risk Engine", TriangleAlert],
  ["Support", HelpCircle],
] as const;

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#eaf6ff] text-[#020817] lg:flex">
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#062747] text-white px-4 py-7 flex-col">
        <h2 className="text-xl font-bold text-white">Sentinel AI</h2>
        <p className="text-sm text-white/40 mb-10">Secure Banking</p>

        <nav className="space-y-2">
          {navItems.map(([label, Icon, active]) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {label}
            </div>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white/60">
          Sentinel Core is actively monitoring account activity.
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center justify-between px-5 lg:px-8">
          <h3 className="font-bold flex items-center gap-3">
            <Shield size={20} className="text-blue-500" />
            Sentinel AI
          </h3>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#f2f6ff] rounded-xl px-4 py-2 text-sm text-slate-500 w-64">
              <Search size={16} />
              Search insights...
            </div>

            <button className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
              <Bell size={18} />
            </button>

            <div className="h-9 w-9 rounded-full bg-[#062747]" />
          </div>
        </header>

        <section className="px-5 lg:px-8 py-8">
          <p className="tracking-[0.25em] text-xs text-blue-500 font-bold mb-2">
            WELCOME BACK, USER
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-[-0.04em]">
              Account Overview
            </h1>

            <button className="w-fit rounded-lg bg-[#062747] text-white px-5 py-3 text-sm font-bold">
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr_1fr] gap-6 mb-6">
            <div className="bg-[#020817] text-white rounded-3xl p-7 lg:p-8 shadow-xl">
              <p className="tracking-[0.25em] text-xs text-white/50 mb-4">
                TOTAL LIQUIDITY
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold mb-5">
                $42,950.00
              </h2>

              <p className="text-xs text-white/40">24H CHANGE</p>
              <p className="text-emerald-400 font-bold mb-10">↗ +2.4%</p>

              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-black px-6 py-3 rounded-lg font-bold text-sm">
                  Add Funds
                </button>

                <button className="border border-white/20 px-6 py-3 rounded-lg font-bold text-sm">
                  Details
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-sm">
              <div className="flex justify-between text-left mb-8 gap-4">
                <h3 className="text-lg font-bold">Security Health</h3>

                <span className="h-fit text-xs bg-emerald-100 text-emerald-700 px-3 py-2 rounded-full font-bold">
                  ● OPTIMAL
                </span>
              </div>

              <div className="mx-auto h-28 w-28 rounded-full border-[7px] border-blue-400 flex items-center justify-center mb-6">
                <div>
                  <div className="text-3xl font-bold">98</div>
                  <div className="text-xs text-slate-500">SAFETY SCORE</div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-6">
                Your account metrics are within the safest 1% of the network.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between mb-8">
                <h3 className="text-lg font-bold">Fraud Alerts</h3>

                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Shield size={20} />
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 font-bold">
                  ✓
                </div>

                <h3 className="font-bold">Zero Detected Threats</h3>

                <p className="text-sm text-slate-500">
                  142 events audited in last 24h
                </p>
              </div>

              <button className="border border-slate-300 rounded-lg py-3 font-bold text-sm">
                View Deep Audit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_304px] gap-6">
            <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 lg:p-8 flex justify-between items-center">
                <h2 className="font-bold text-lg">Recent Activity</h2>
                <button className="text-blue-500 font-bold text-sm">
                  Full History
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.map(([name, sub, date, amount, Icon]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[44px_1fr] md:grid-cols-[52px_1fr_120px_120px_100px] gap-4 items-center px-6 lg:px-8 py-5"
                  >
                    <div className="h-10 w-10 bg-[#eef4ff] rounded-xl flex items-center justify-center">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="font-bold">{name}</p>
                      <p className="text-xs text-slate-500">{sub}</p>
                    </div>

                    <p className="hidden md:block font-mono text-sm text-slate-600">
                      {date}
                    </p>

                    <p className="hidden md:block font-mono text-sm">
                      {amount}
                    </p>

                    <span className="hidden md:inline-flex justify-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <aside>
              <h2 className="font-bold text-lg mb-4">Priority Actions</h2>

              {actions.map(([title, sub, Icon]) => (
                <div
                  key={title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 flex items-center gap-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-xs text-slate-500">{sub}</p>
                  </div>

                  <span className="text-2xl text-slate-400">›</span>
                </div>
              ))}

              <div className="bg-[#062747] text-white rounded-3xl p-6 shadow-xl">
                <p className="text-emerald-400 text-xs tracking-widest font-bold">
                  ● SENTINEL AI CORE ACTIVE
                </p>

                <div className="grid grid-cols-2 gap-6 mt-5 mb-5">
                  <div>
                    <p className="text-xs text-white/40">SCANNING RATE</p>
                    <p className="font-mono text-xl">4.2 GB/s</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">LATENCY</p>
                    <p className="font-mono text-xl">12ms</p>
                  </div>
                </div>

                <p className="italic text-sm text-white/60 leading-6">
                  “Neural networks are currently analyzing 1,402 outbound
                  requests for pattern anomalies.”
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}