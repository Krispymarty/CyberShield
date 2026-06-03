import { ArrowLeft, Smartphone, Fingerprint } from "lucide-react";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export function DeviceLink({ onNext, onBack }: Props) {
  return (
    <>
      <h1 className="font-semibold mb-3">Link Trusted Device</h1>
      <p className="text-slate-600 mb-10">
        Register this device and verify biometric access.
      </p>

      <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
        <div className="grid grid-cols-2 gap-5 mb-7">
          <div className="border border-slate-300 rounded-xl p-6 bg-[#eef4ff]">
            <Smartphone size={32} className="mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Device Detected</h3>
            <p className="text-sm text-slate-600">MacBook Pro / Chrome Browser</p>
          </div>

          <div className="border border-slate-300 rounded-xl p-6 bg-[#eef4ff]">
            <Fingerprint size={32} className="mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Biometric Check</h3>
            <p className="text-sm text-slate-600">Face ID / Touch ID ready</p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-slate-700">
          Your device will be linked to your Sentinel identity profile for secure future access.
        </div>

        <div className="border-t border-slate-300 mt-7 pt-5 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3 font-semibold">
            <ArrowLeft size={22} />
            Back
          </button>

          <button
            onClick={onNext}
            className="bg-[#020817] text-white px-9 py-2 rounded font-semibold"
          >
            Continue to Security Setup
          </button>
        </div>
      </div>
    </>
  );
}