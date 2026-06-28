import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";

type Props = {
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
  error?: string;
};

export function SecuritySetup({ onNext, onBack, loading, error }: Props) {
  return (
    <>
      <h1 className="font-semibold mb-3">Security Setup</h1>
      <p className="text-slate-600 mb-10">
        Enable passkey and multi-factor protection before entering your dashboard.
      </p>

      <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
        <div className="space-y-5">
          <div className="border border-slate-300 rounded-xl p-6 bg-[#eef4ff] flex gap-5">
            <KeyRound size={32} className="text-blue-600" />
            <div>
              <h3 className="font-semibold mb-2">Passkey Authentication</h3>
              <p className="text-sm text-slate-600">
                Passwordless authentication will be enabled for your account.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 rounded-xl p-6 bg-[#eef4ff] flex gap-5">
            <ShieldCheck size={32} className="text-blue-600" />
            <div>
              <h3 className="font-semibold mb-2">Multi-Factor Authentication</h3>
              <p className="text-sm text-slate-600">
                Additional protection will be applied to sensitive actions.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

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
            disabled={loading}
            className="bg-[#020817] text-white px-9 py-2 rounded font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Complete Enrollment"}
          </button>
        </div>
      </div>
    </>
  );
}