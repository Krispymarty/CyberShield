export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-sm text-slate-500 md:flex-row lg:px-8">
        <p>© 2026 Sentinel AI Security Systems. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="cursor-pointer transition hover:text-blue-600">
            Privacy Policy
          </a>
          <a href="#" className="cursor-pointer transition hover:text-blue-600">
            Terms of Service
          </a>
          <a href="#" className="cursor-pointer transition hover:text-blue-600">
            Compliance
          </a>
        </div>
      </div>
    </footer>
  );
}