

const rows = [
  ["14:22:01", "TXN-9831", "$24,000", "HIGH", "REVIEW"],
  ["14:21:50", "TXN-9824", "$425", "LOW", "APPROVED"],
  ["14:21:48", "TXN-9821", "$10,000", "MEDIUM", "VERIFY"],
] as const;

const badgeStyles = {
  HIGH: "bg-red-50 text-red-600",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  LOW: "bg-emerald-50 text-emerald-600",
};

export default function RiskTable() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live Monitoring
        </div>

        <h2 className="text-center text-4xl font-bold tracking-tight text-[#07132f]">
          Real-Time Risk Scoring
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Every transaction is analyzed against 150+ risk signals in under
          50ms.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50 text-sm text-slate-700">
                <tr>
                  <th className="p-5 text-left font-bold">Timestamp</th>
                  <th className="p-5 text-left font-bold">Transaction ID</th>
                  <th className="p-5 text-left font-bold">Amount</th>
                  <th className="p-5 text-left font-bold">Risk Score</th>
                  <th className="p-5 text-left font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {rows.map(([time, id, amount, risk, action]) => (
                  <tr
                    key={id}
                    className="transition hover:bg-blue-50/30"
                  >
                    <td className="p-5 font-mono text-sm">{time}</td>
                    <td className="p-5 font-semibold">{id}</td>
                    <td className="p-5 font-mono">{amount}</td>
                    <td className="p-5">
                      <span
                        className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                          badgeStyles[risk]
                        }`}
                      >
                        {risk}
                      </span>
                    </td>
                    <td className="p-5">
                      <button className="cursor-pointer text-sm font-bold text-blue-600 transition hover:text-blue-800">
                        {action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
