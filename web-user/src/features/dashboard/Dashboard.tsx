"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  Menu,
  Search,
  Shield,
  TriangleAlert,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  ["Dashboard", LayoutDashboard, true],
  ["Accounts", Wallet, false],
  ["Security", Shield, false],
  ["Risk Engine", TriangleAlert, false],
  ["Support", HelpCircle, false],
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#062747] px-4 py-7 text-white lg:flex">
        <h2 className="text-xl font-bold">Sentinel AI</h2>
        <p className="mb-10 text-sm text-white/45">Secure Banking</p>

        <nav className="space-y-2">
          {navItems.map(([label, Icon, active]) => (
            <button
              key={label}
              className={`flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
          Sentinel Core is actively monitoring account activity.
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="absolute inset-0 h-full w-full cursor-pointer bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-72 bg-[#062747] px-4 py-7 text-white shadow-2xl">
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Sentinel AI</h2>
                <p className="text-sm text-white/45">Secure Banking</p>
              </div>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/10 transition-all duration-200 hover:scale-105 hover:bg-white/20"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map(([label, Icon, active]) => (
                <button
                  key={label}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/45 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
              Sentinel Core is actively monitoring account activity.
            </div>
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-slate-100 transition-all duration-200 hover:scale-105 hover:bg-slate-200 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <h3 className="flex items-center gap-3 font-bold">
              <Shield size={20} className="text-blue-500" />
              Sentinel AI
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden w-64 cursor-text items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-500 md:flex">
              <Search size={16} />
              Search insights...
            </div>

            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition-all duration-200 hover:scale-105 hover:bg-slate-200">
              <Bell size={18} />
            </button>

            <div className="hidden h-9 w-9 rounded-full bg-[#062747] sm:block" />
          </div>
        </header>

        <section className="px-5 py-8 lg:px-8">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-blue-500">
            WELCOME BACK, USER
          </p>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="text-4xl font-bold tracking-[-0.04em] lg:text-5xl">
              Account Overview
            </h1>

            <button className="w-fit cursor-pointer rounded-xl bg-[#062747] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#08345f] hover:shadow-md">
              Generate Report
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr_1fr]">
            <div className="rounded-3xl bg-[#020817] p-7 text-white shadow-xl lg:p-8">
              <p className="mb-4 text-xs tracking-[0.25em] text-white/50">
                TOTAL BALANCE
              </p>

              <h2 className="mb-5 text-4xl font-bold lg:text-5xl">
                $42,950.00
              </h2>

              <p className="text-xs text-white/40">24H CHANGE</p>
              <p className="mb-10 font-bold text-emerald-400">↗ +2.4%</p>

              <div className="flex flex-wrap gap-3">
                <button className="cursor-pointer rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100">
                  Add Funds
                </button>

                <button className="cursor-pointer rounded-xl border border-white/20 px-6 py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.02] hover:bg-white/10">
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

                <p className="text-sm text-slate-500">
                  142 events audited in last 24h
                </p>
              </div>

              <button className="cursor-pointer rounded-xl border border-slate-300 py-3 text-sm font-bold transition-all duration-200 hover:bg-slate-50 hover:shadow-sm">
                View Deep Audit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_304px]">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between p-6 lg:p-8">
                <h2 className="text-lg font-bold">Recent Activity</h2>

                <button className="cursor-pointer text-sm font-bold text-blue-500 transition-colors hover:text-blue-700">
                  Full History
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.map(([name, sub, date, amount, Icon]) => (
                  <div
                    key={name}
                    className="grid cursor-pointer grid-cols-[44px_1fr] items-center gap-4 px-6 py-5 transition-colors hover:bg-slate-50 md:grid-cols-[52px_1fr_120px_120px_100px] lg:px-8"
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

                    <p className="hidden font-mono text-sm md:block">
                      {amount}
                    </p>

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
                  className="mb-4 flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md"
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
      </main>
    </div>
  );
}