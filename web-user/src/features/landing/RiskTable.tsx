export default function RiskTable() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-3xl font-bold text-center text-[#111827]">
          Real-time Risk Scoring
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Every transaction is analyzed against 150+ data points in under 50ms.
        </p>

        <div className="mt-10 overflow-x-auto border border-gray-200 rounded-lg">

          <table className="w-full">

            <thead className="bg-gray-100 text-[#111827]">
              <tr>
                <th className="p-4 text-left">Timestamp</th>
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Risk Score</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">

              <tr className="border-t">
                <td className="p-4">14:22:01</td>
                <td className="p-4">TXN-9831</td>
                <td className="p-4">$24,000</td>

                <td className="p-4">
                  <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm">
                    HIGH
                  </span>
                </td>

                <td className="p-4">
                  <button className="text-red-600 text-sm font-medium">
                    REVIEW
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">14:21:50</td>
                <td className="p-4">TXN-9824</td>
                <td className="p-4">$425</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
                    LOW
                  </span>
                </td>

                <td className="p-4">
                  <button className="text-green-600 text-sm font-medium">
                    APPROVED
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">14:21:48</td>
                <td className="p-4">TXN-9821</td>
                <td className="p-4">$10,000</td>

                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                    MEDIUM
                  </span>
                </td>

                <td className="p-4">
                  <button className="text-blue-600 text-sm font-medium">
                    VERIFY
                  </button>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}