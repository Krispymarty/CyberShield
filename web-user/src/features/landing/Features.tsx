export default function Features() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-center text-3xl font-bold text-[#111827]">
          Next-Gen Threat Protection
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Proactive defense against the most sophisticated banking attacks.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {/* Card 1 */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-2xl mb-5">📱</div>

            <h3 className="font-semibold text-[#111827]">
              SIM Swap Protection
            </h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Detect SIM changes before they compromise your account.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-2xl mb-5">🛡️</div>

            <h3 className="font-semibold text-[#111827]">
              Impersonation Shield
            </h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Behavioral biometrics distinguish between genuine users and fraudsters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-2xl mb-5">🌐</div>

            <h3 className="font-semibold text-[#111827]">
              VPN Detection
            </h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Identify risky network activity and suspicious access patterns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}