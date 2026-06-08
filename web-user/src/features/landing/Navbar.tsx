

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Shield, X } from "lucide-react";

const navLinks = [
  ["Features", "#features"],
  ["Security", "#security"],
  ["How It Works", "#how-it-works"],
  ["Pricing", "#pricing"],
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex cursor-pointer items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#031B4E] text-white shadow-md">
  <Shield size={20} />
</div>

          <div>
            <p className="text-lg font-bold leading-tight text-[#07132f]">
              Sentinel AI
            </p>
            <p className="text-[11px] text-slate-500">Cyber Banking Security</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className= "cursor-pointer text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="hidden cursor-pointer rounded-xl bg-[#031B4E] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#05256B] md:block"
        >
          Login
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-pointer bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu overlay"
          />

          <div className="absolute right-0 top-0 h-screen w-72 bg-white p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-bold text-slate-900">Sentinel AI</p>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-slate-100 transition hover:bg-slate-200"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block cursor-pointer rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-8 block cursor-pointer rounded-xl bg-[#031B4E] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#05256B]"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
