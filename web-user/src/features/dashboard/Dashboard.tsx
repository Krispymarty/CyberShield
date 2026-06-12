"use client";

import { useState } from "react";
import TransferPage from "../transfer/TransferPage";
import {
  Bell,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Search,
  Shield,
  TriangleAlert,
  Wallet,
  X,
} from "lucide-react";

import { DashboardHome } from "./DashboardHome";
import SecurityDashboard from "./SecurityDashboard";
import RiskIntelligence from "../risk-intelligence/riskintelligence";

const navItems = [
  ["Dashboard", LayoutDashboard],
  ["Accounts", Wallet],
  ["Security", Shield],
  ["Risk Engine", TriangleAlert],
  ["Support", HelpCircle],
] as const;

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#062747] px-4 py-7 text-white lg:flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-72 bg-[#062747] px-4 py-7 text-white shadow-2xl">
            <div className="mb-10 flex items-start justify-between">
              <Brand />

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <SidebarNav
              activePage={activePage}
              setActivePage={(page) => {
                setActivePage(page);
                setSidebarOpen(false);
              }}
            />
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <h3 className="flex items-center gap-3 font-bold">
              <Shield size={20} className="text-blue-500" />
              Sentinel AI
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden w-64 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-500 md:flex">
              <Search size={16} />
              Search insights...
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <Bell size={18} />
            </button>

            <div className="hidden h-9 w-9 rounded-full bg-[#062747] sm:block" />
          </div>
        </header>
        {activePage === "Dashboard" && <DashboardHome />}
{activePage === "Security" && <SecurityDashboard />}
        {activePage === "Risk Engine" && <RiskIntelligence />}
        {activePage === "Accounts" && <TransferPage />}

{activePage !== "Dashboard" &&
  activePage !== "Accounts" &&
  activePage !== "Security" &&
  activePage !== "Risk Engine" && (
    <section className="px-5 py-8 lg:px-8">
      <h1 className="text-4xl font-bold">{activePage}</h1>
    </section>
  )}
      </main>
    </div>
  );
}

function Brand() {
  return (
    <div>
      <h2 className="text-xl font-bold">Sentinel AI</h2>
      <p className="text-sm text-white/45">Secure Banking</p>
    </div>
  );
}

function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
}) {
  return (
    <>
      <div className="mb-10">
        <Brand />
      </div>

      <SidebarNav activePage={activePage} setActivePage={setActivePage} />

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
        Sentinel Core is actively monitoring account activity.
      </div>
    </>
  );
}

function SidebarNav({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
}) {
  return (
    <nav className="space-y-2">
      {navItems.map(([label, Icon]) => (
        <button
          key={label}
          onClick={() => setActivePage(label)}
          className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold ${
            activePage === label
              ? "bg-white/10 text-white"
              : "text-white/45 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon size={20} />
          {label}
        </button>
      ))}
    </nav>
  );
}