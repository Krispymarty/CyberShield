export default function CTA() {
  return (
    <section className="bg-[#031B4E] py-20">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-white text-4xl font-bold">
          Ready to secure your assets?
        </h2>

        <p className="text-blue-100 mt-4 max-w-2xl mx-auto">
          Join over 50,000+ enterprise clients who trust Sentinel AI
          for their daily security operations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <button className="bg-white text-[#031B4E] px-6 py-3 rounded-md font-medium hover:scale-105 transition-all duration-300">
            Get Started
          </button>

          <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#031B4E] hover:scale-105 transition-all duration-300">
            Contact Sales
          </button>

        </div>

      </div>
    </section>
  );
}