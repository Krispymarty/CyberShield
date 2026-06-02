// SentinelDashboard.tsx
import {
  Bell,
  CreditCard,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  Shield,
  TriangleAlert,
  Wallet,
} from "lucide-react";

export default function SentinelDashboard() {
  return (
    <div className="min-h-screen bg-[#eaf6ff] flex text-[#020817]">
      <aside className="w-64 bg-[#062747] text-white px-4 py-7">
        <h2 className="text-xl font-bold text-white/60">Sentinel AI</h2>
        <p className="text-sm text-white/35 mb-10">Secure Banking</p>

        {[
          ["Dashboard", LayoutDashboard, true],
          ["Accounts", Wallet],
          ["Security", Shield],
          ["Risk Engine", TriangleAlert],
          ["Support", HelpCircle],
        ].map(([label, Icon, active]: any) => (
          <div
            key={label}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg mb-2 text-sm font-bold ${
              active ? "bg-white/8 text-white" : "text-white/35"
            }`}
          >
            <Icon size={20} /> {label}
          </div>
        ))}
      </aside>

      <main className="flex-1">
        <header className="h-12 bg-white flex items-center justify-between px-8">
          <h3 className="font-bold flex items-center gap-3">🛡️ Sentinel AI</h3>
          <div className="flex items-center gap-5">
            <div className="bg-[#f2f6ff] rounded-xl px-4 py-2 text-sm text-slate-500 w-64">
              Search insights...
            </div>
            <Bell size={20} />
            <div className="h-8 w-8 rounded-full bg-[#062747]" />
          </div>
        </header>

        <section className="px-8 py-8">
          <p className="tracking-[0.25em] text-xs text-blue-400 font-bold mb-2">
            WELCOME BACK, ADMIN
          </p>
          <h1 className="text-5xl font-bold mb-10">Account Overview</h1>

          <div className="grid grid-cols-[386px_222px_304px] gap-6 mb-6">
            <div className="bg-[#020817] text-white rounded-2xl p-8 shadow-xl">
              <p className="tracking-[0.25em] text-xs text-white/50 mb-4">TOTAL LIQUIDITY</p>
              <h2 className="text-5xl font-bold mb-5">$42,950.00</h2>
              <p className="text-xs text-white/40">24H CHANGE</p>
              <p className="text-emerald-400 font-bold mb-12">↗ +2.4%</p>

              <div className="flex gap-1">
                <button className="bg-white text-black px-8 py-3 rounded font-bold text-sm">
                  Add Funds
                </button>
                <button className="border border-white/20 px-8 py-3 rounded font-bold text-sm">
                  Details
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-6 text-center">
              <div className="flex justify-between text-left mb-8">
                <h3 className="text-xl font-bold">Security Health</h3>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-2 rounded font-bold">
                  ● OPTIMAL
                </span>
              </div>
              <div className="mx-auto h-28 w-28 rounded-full border-[7px] border-blue-400 flex items-center justify-center mb-6">
                <div>
                  <div className="text-3xl font-bold">98</div>
                  <div className="text-xs">SAFETY SCORE</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">Your account metrics are within the safest 1% of the network.</p>
            </div>

            <div className="bg-white rounded-2xl border p-6 flex flex-col justify-between">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">Fraud Alerts</h3>
                <Shield className="bg-slate-100 rounded-full p-2" size={38} />
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  ✓
                </div>
                <h3 className="font-bold">Zero Detected Threats</h3>
                <p className="text-sm text-slate-500">142 events audited in last 24h</p>
              </div>
              <button className="border rounded py-3 font-bold text-sm">View Deep Audit</button>
            </div>
          </div>

          <div className="grid grid-cols-[632px_304px] gap-6">
            <section className="bg-white border rounded-2xl overflow-hidden">
              <div className="p-8 flex justify-between">
                <h2 className="font-bold text-lg">Recent Activity</h2>
                <button className="text-blue-500 font-bold text-sm">Full History</button>
              </div>

              {[
                ["Apple Store", "Electronics", "Oct 24, 2023", "-$1,299.00", CreditCard],
                ["The Nomad Bistro", "Dining", "Oct 23, 2023", "-$84.50", Wallet],
                ["Tesla Supercharger", "Travel", "Oct 21, 2023", "-$22.40", TriangleAlert],
              ].map(([name, sub, date, amount, Icon]: any) => (
                <div key={name} className="grid grid-cols-[52px_1fr_120px_140px_110px] items-center px-8 py-5 border-t">
                  <div className="h-10 w-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-xs text-slate-500">{sub}</p>
                  </div>
                  <p className="font-mono text-slate-600">{date}</p>
                  <p className="font-mono">{amount}</p>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    VERIFIED
                  </span>
                </div>
              ))}
            </section>

            <aside>
              <h2 className="font-bold text-lg mb-4">Priority Actions</h2>

              {[
                ["Transfer Funds", "Instant global rails", TriangleAlert],
                ["Pay Bills", "Automated scheduling", CreditCard],
                ["Security Keys", "Update biometrics", KeyRound],
              ].map(([title, sub, Icon]: any) => (
                <div key={title} className="bg-white border rounded-2xl p-5 mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-200 rounded-lg flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-xs text-slate-500">{sub}</p>
                  </div>
                  <span className="text-2xl text-slate-500">›</span>
                </div>
              ))}

              <div className="bg-[#062747] text-white rounded-2xl p-6 shadow-xl">
                <p className="text-emerald-400 text-xs tracking-widest font-bold">
                  ●SENTINEL AI CORE ACTIVE
                </p>
                <div className="flex gap-10 mt-4 mb-5">
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
                  “Neural networks are currently analyzing 1,402 outbound requests for pattern anomalies.”
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}