import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

        <div className="font-bold text-[#111827]">
          Sentinel AI
        </div>

        <div className="hidden md:flex gap-8 text-xs text-gray-600">
          <a href="#">Dashboard</a>
          <a href="#">Accounts</a>
          <a href="#">Security</a>
          <a href="#">Support</a>
        </div>

        <Link
          href="/login"
          className="bg-[#031B4E] text-white px-5 py-2 rounded-md text-sm font-medium">
          LOGIN
        </Link>

      </div>
    </nav>
  );
}