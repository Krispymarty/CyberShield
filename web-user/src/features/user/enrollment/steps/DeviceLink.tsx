import { ArrowLeft, Info, Laptop } from "lucide-react";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export function DeviceLink({ onNext, onBack }: Props) {
  return (
    <>
      <h1 className="font-semibold mb-3">Link Trusted Device</h1>
      <p className="text-slate-600 mb-10">
        Register this device to your account for secure future access.
      </p>

      <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#eef4ff]">
            <Laptop size={42} className="text-blue-600" />
          </div>

          <h3 className="text-xl font-bold mb-2">Device Detected</h3>
          <p className="text-slate-500">
            MacBook Pro • Chrome Browser
          </p>
        </div>

        <div className="my-8 border-t border-slate-300" />

        <div className="flex gap-4 rounded-xl border border-blue-200 bg-[#eef4ff] p-5 text-slate-700">
          <Info size={22} className="mt-1 text-blue-600" />
          <p className="text-sm leading-6">
            This device will be linked to your Sentinel identity profile for
            secure access in the future.
          </p>
        </div>

        <div className="border-t border-slate-300 mt-7 pt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 font-semibold"
          >
            <ArrowLeft size={22} />
            Back
          </button>

          <button
            type="button"
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