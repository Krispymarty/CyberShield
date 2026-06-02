import Image from "next/image";

export default function PhoneSection() {
  return (
    <section className="bg-[#F4F7FC] py-16">
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE - FIGMA IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/images/phone-mockup.png"
            alt="Secure Passkey Authentication"
            width={700}
            height={700}
            className="w-full max-w-[520px] h-auto"
          />
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div>
          <h2 className="text-4xl font-bold text-[#111827] leading-tight">
            Login Effortlessly,
            <br />
            Securely.
          </h2>

          <p className="text-gray-500 mt-5 leading-relaxed max-w-md">
            Ditch passwords for good. Sentinel AI utilizes FIDO2 and
            Passkey technology to ensure your authentication is tied
            to your physical device and biometrics.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span className="text-gray-700">
                No more phishing attacks
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span className="text-gray-700">
                Zero-knowledge proof encryption
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span className="text-gray-700">
                Instant multi-device synchronization
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}