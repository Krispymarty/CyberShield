export default function SecurityPanel() {
  return (
    <div className="space-y-4">

      <div className="bg-slate-800 text-white p-6 rounded-xl">

        <h2 className="font-semibold mb-6">
          Sentinel AI Analysis
        </h2>

        <div className="text-center">

          <div className="text-6xl font-bold">
            14
          </div>

          <p>Risk Score</p>

        </div>

        <div className="bg-green-700 p-2 rounded mt-5 text-center">
          LOW RISK TRANSACTION
        </div>

        <div className="mt-6 space-y-2 text-sm">

          <div>
            Device Fingerprint: Verified
          </div>

          <div>
            Behavioral Patterns: Typical
          </div>

          <div>
            Location Consistency: Good
          </div>

        </div>

      </div>

      <div className="bg-white p-4 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Security Checklist
        </h3>

        <ul className="space-y-2">

          <li>✓ Encrypted end-to-end</li>

          <li>✓ Identity verified</li>

          <li>✓ Fraud protection active</li>

        </ul>

      </div>

    </div>
  );
}