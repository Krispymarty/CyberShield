import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="relative bg-[#031B4E] text-white p-16 overflow-hidden">

        <div className="text-3xl mb-16">✓</div>

        <h1 className="text-6xl font-bold leading-tight">
          Invisible protection for
          <br />
          every <span className="text-blue-400">transaction.</span>
        </h1>

        <p className="mt-8 text-gray-300 max-w-md text-lg">
          The enterprise-grade security layer that leverages advanced
          neural networks to identify and neutralize fraud before it
          happens.
        </p>

        <div className="flex gap-4 mt-20">

          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-300">UPTIME</div>
            <div className="font-bold text-xl">99.99%</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-300">DETECTIONS</div>
            <div className="font-bold text-xl">2.4M / hr</div>
          </div>

        </div>

        {/* Cyber Security Boxes */}

        <div className="absolute top-32 right-20 w-32 h-32 border border-blue-500/20"></div>

        <div className="absolute bottom-32 left-20 w-40 h-40 border border-blue-500/20"></div>

        <div className="absolute bottom-40 right-32 w-24 h-24 border border-blue-500/20"></div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center bg-[#F5F7FB]">

        <div className="w-full max-w-md">

          <h2 className="text-5xl font-bold text-[#111827]">
            Welcome back
          </h2>

          <p className="text-gray-500 mt-3">
            Select your preferred secure authentication method.
          </p>

          <Link
            href="/risk-check"
            className="block text-center mt-10 bg-[#031B4E] text-white py-4 rounded-md"
          >
            🔑 Sign in with Passkey
          </Link>

          <div className="grid grid-cols-2 gap-4 mt-5">

            <button className="border rounded-md py-2">
              Biometric
            </button>

            <button className="border rounded-md py-2">
              Face ID
            </button>

          </div>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-sm text-gray-400">
              OR FALLBACK TO OTP
            </span>
            <div className="flex-1 border-t"></div>
          </div>

          <label className="block text-sm mb-2">
            Work Email
          </label>

          <input
            type="email"
            placeholder="name@company.com"
            className="w-full border rounded-md px-4 py-3"
          />

          <Link
            href="/verify-otp"
            className="block text-center mt-4 border border-[#031B4E] py-3 rounded-md"
          >
            Send One-Time Passcode
          </Link>

          <div className="text-center mt-12 text-green-600">
            ● System Status: All Clear
          </div>

          <div className="flex justify-center gap-8 mt-5 text-sm text-gray-500">
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Support</a>
          </div>

        </div>

      </div>

    </div>
  );
}