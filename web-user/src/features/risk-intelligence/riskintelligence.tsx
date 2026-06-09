// RiskIntelligence.tsx
import {
  Bell,
  CircleUserRound,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  Lock,
  Shield,
  TriangleAlert,
} from "lucide-react";

export default function RiskIntelligence() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] flex text-[#071326]">

      <main className="flex-1 px-8 py-9">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Risk Intelligence</h1>
            <p className="text-slate-500 mt-1">
              Real-time threat assessment for Account #8821-X
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="px-5 py-3 rounded-xl bg-blue-100 font-bold text-xs">
              <span className="text-emerald-500 mr-2">●</span>SENTINEL ALIVE
            </div>
            <Bell size={22} />
            <CircleUserRound size={24} />
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-lg p-8 flex gap-12 mb-8">
          <div className="relative h-44 w-44 rounded-full border-[14px] border-blue-100 flex items-center justify-center">
            <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-[#020817] border-r-[#020817] rotate-45" />
            <div className="text-center">
              <div className="text-5xl font-bold">98</div>
              <div className="text-xs tracking-[0.25em] text-slate-500 font-bold">SAFE SCORE</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Shield size={20} fill="#020817" /> Autonomous Sentinel Protection
              </h2>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full px-4 py-1 text-xs font-bold">
                OPTIMAL SECURITY
              </span>
            </div>

            <p className="text-slate-600 mt-6 max-w-2xl leading-7">
              Sentinel AI has analyzed 14,203 behavioral signals in the last 24 hours.
              Your current session demonstrates a 99.8% match with your historical identity
              profile. No anomalous activity detected.
            </p>

            <div className="flex gap-4 mt-6">
              <Metric title="LAST SCAN" value="2 mins ago" />
              <Metric title="THREAT LEVEL" value="Negligible" green />
              <Metric title="ACTIVE FILTERS" value="58 Adaptive" />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-[1fr_425px] gap-6 mb-8">
          <section className="bg-white border border-slate-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Gauge size={22} /> Behavioral Telemetry
              <span className="ml-auto text-xs tracking-widest text-slate-500">LIVE STREAM</span>
            </h2>

            <Telemetry label="Keystroke Dynamics" status="Matched (94%)" bars />
            <Telemetry label="Location Consistency" status="Verified (London, UK)" line />
            <Telemetry label="Network Integrity" status="Encrypted (WPA3)" blocks />
          </section>

          <section className="bg-white border border-slate-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">◉ Identity Health</h2>

            {["Passkey Active", "Device Binding Verified", "Biometric Confidence        99%"].map(
              (item) => (
                <div key={item} className="bg-[#eef4ff] rounded p-5 mb-4 flex justify-between">
                  <span>✅ {item}</span>
                  <span>›</span>
                </div>
              )
            )}

            <div className="border-t mt-8 pt-6 flex gap-4 items-center">
              <div className="h-12 w-12 rounded-xl bg-slate-800" />
              <div>
                <p className="text-xs font-bold text-slate-500">HARDWARE TOKEN</p>
                <p className="font-bold">Yubikey 5C Nano #9912</p>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white border border-slate-300 rounded-lg overflow-hidden">
          <div className="p-5 flex justify-between">
            <h2 className="text-xl font-bold">Risk Event Log</h2>
            <button className="text-sm font-bold">Download Report</button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-[#eef4ff] text-xs tracking-widest text-slate-500">
              <tr>
                <th className="py-2 px-24">TIMESTAMP</th>
                <th>EVENT ACTION</th>
                <th>SOURCE</th>
                <th>INTEGRITY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Oct 24, 14:02:11", "Login from Trusted Device", "MacBook Pro (M2)", "1.0 HIGH", "Verified"],
                ["Oct 24, 13:58:45", "Encrypted Payload Verified", "API Endpoint /v3/auth", "1.0 HIGH", "Secured"],
                ["Oct 24, 11:20:02", "Session Token Refresh", "Sentinel Cloud Edge", "0.9 SAFE", "Rotated"],
              ].map((row) => (
                <tr key={row[1]} className="border-t">
                  {row.map((cell, i) => (
                    <td key={cell} className={`py-5 ${i === 0 ? "px-24" : ""}`}>
                      <span className={i === 3 ? "bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold" : i === 4 ? "text-emerald-600 font-bold" : i === 1 ? "font-bold" : ""}>
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}


function Metric({ title, value, green }: any) {
  return (
    <div className="bg-[#eef4ff] px-5 py-3 rounded">
      <p className="text-xs font-bold text-slate-500">{title}</p>
      <p className={green ? "text-emerald-600" : "text-slate-700"}>{value}</p>
    </div>
  );
}

function Telemetry({ label, status, bars, line, blocks }: any) {
  return (
    <div className="mb-8">
      <div className="flex justify-between font-bold text-sm mb-3">
        <span>{label}</span>
        <span className="text-emerald-600 font-mono">{status}</span>
      </div>

      {bars && <div className="grid grid-cols-10 gap-1">{Array.from({ length: 10 }).map((_, i) => <div key={i} className={`h-6 bg-slate-${i === 6 ? "950" : "700"}`} />)}</div>}
      {line && <div className="h-10 bg-[#eef4ff] relative"><div className="absolute top-5 left-8 right-8 h-px bg-slate-400" /><div className="absolute top-[17px] left-1/2 h-2 w-2 rounded-full bg-black" /></div>}
      {blocks && <div className="grid grid-cols-3 gap-1">{[1, 2, 3].map((x) => <div key={x} className="h-8 bg-slate-400 border-b-[14px] border-slate-600" />)}</div>}
    </div>
  );
}