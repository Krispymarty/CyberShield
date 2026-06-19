import { Monitor, Smartphone, Tablet, ShieldCheck, AlertTriangle } from "lucide-react";

const devices = [
  [Monitor, 'MacBook Pro 16"', "Last active: 2 mins ago", "✓"],
  [Smartphone, "iPhone 15 Pro", "Last active: 4h ago", "✓"],
  [Tablet, "iPad Air", "Last active: 2 days ago", "⋯"],
] as const;

export default function SecurityDashboard() {
  return (
    <section className="px-5 py-8 lg:px-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <h2 className="text-xl font-bold">Risk Intelligence Score</h2>
                <p className="text-sm text-slate-500">
                  Real-time aggregate security posture based on 142 parameters.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-4xl font-bold text-red-700">04</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  LOW RISK
                </span>
              </div>
            </div>

            <div className="relative mt-6 h-48 rounded-lg bg-gradient-to-b from-slate-100 to-white">
              <svg viewBox="0 0 600 180" className="h-full w-full">
                <polyline
                  points="10,130 85,122 160,137 235,115 310,100 385,108 460,78 535,88 590,63"
                  fill="none"
                  stroke="#3f5f8c"
                  strokeWidth="2"
                />
              </svg>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs font-bold text-slate-500">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex justify-between">
              <h2 className="text-xl font-bold">Trusted Devices</h2>
              <button className="text-xs font-bold">Manage All</button>
            </div>

            {devices.map(([Icon, name, time, status]) => (
              <div key={name} className="mb-4 flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100">
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <p className="font-bold">{name}</p>
                  <p className="text-xs font-semibold text-slate-500">{time}</p>
                </div>

                <span className="font-bold text-blue-500">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-bold">Active Sessions</h2>
              <span className="rounded-xl bg-[#082b4a] px-3 py-2 text-xs text-slate-300">
                3 SESSIONS ACTIVE
              </span>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-xs text-slate-500">
                <tr>
                  <th className="px-6 py-2 text-left">LOCATION</th>
                  <th className="px-6 py-2 text-left">DEVICE / BROWSER</th>
                  <th className="px-6 py-2 text-left">STATUS</th>
                  <th className="px-6 py-2 text-left">ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4 font-bold">
                    New York, USA
                    <p className="text-xs font-normal text-slate-500">192.168.1.45</p>
                  </td>
                  <td className="px-6 py-4">
                    Chrome on macOS
                    <p className="text-xs text-slate-500">Current Session</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">● ACTIVE</td>
                  <td className="px-6 py-4 text-xl text-slate-500">⊗</td>
                </tr>

                <tr className="border-t">
                  <td className="px-6 py-4 font-bold">
                    London, UK
                    <p className="text-xs font-normal text-slate-500">82.14.201.32</p>
                  </td>
                  <td className="px-6 py-4">
                    Safari on iPhone
                    <p className="text-xs text-slate-500">Mobile App</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">● IDLE</td>
                  <td className="px-6 py-4">
                    <button className="rounded bg-red-700 px-2 py-1 text-xs text-white">
                      Terminate
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <h2 className="border-b p-6 text-xl font-bold">Login History</h2>

            <div className="space-y-6 p-6">
              <div className="flex gap-4">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-100">
                  <ShieldCheck size={16} className="text-emerald-600" />
                </div>

                <div>
                  <p>Successful login via 2FA SMS</p>
                  <p className="text-xs font-semibold text-slate-600">
                    San Francisco, CA • 45.2.122.9
                  </p>
                </div>

                <span className="ml-auto text-xs font-bold text-slate-500">
                  09:12 AM
                </span>
              </div>

              <div className="flex gap-4">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>

                <div>
                  <p className="font-bold text-red-700">Failed Login Attempt</p>
                  <p className="text-xs font-semibold text-slate-600">
                    Moscow, RU • 185.12.5.21
                  </p>

                  <button className="mt-1 rounded-full bg-black px-2 py-1 text-xs font-bold text-white">
                    I recognize this
                  </button>

                  <button className="ml-1 mt-1 rounded-full border border-red-600 px-2 py-1 text-xs font-bold text-red-700">
                    Report Threat
                  </button>
                </div>

                <span className="ml-auto text-xs font-bold text-slate-500">
                  11:45 PM
                </span>
              </div>
            </div>

            <p className="border-t py-3 text-center text-sm font-semibold text-blue-500">
              View All Activity
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-[#020817] p-8 text-white shadow-xl lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-6 text-2xl font-bold">
              Sentinel AI Active Analysis
            </h2>
            <p className="max-w-xl leading-7 text-slate-300">
              Our neural network is currently scanning 4.2k active transactions and
              global fraud databases. No emerging threats matching your profile have
              been detected in the last 24 hours.
            </p>
          </div>

          <div className="flex gap-6">
            <Metric value="99.9%" label="ACCURACY" />
            <Metric value="12ms" label="LATENCY" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid h-28 w-40 place-items-center rounded-lg border border-white/10 bg-white/10">
      <div className="text-center">
        <p className="text-4xl font-extrabold">{value}</p>
        <p className="mt-2 text-xs font-bold tracking-widest text-slate-300">
          {label}
        </p>
      </div>
    </div>
  );
}