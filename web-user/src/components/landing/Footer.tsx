export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

        <p>
          © 2026 Sentinel AI Security Systems. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Compliance</a>
        </div>

      </div>
    </footer>
  );
}