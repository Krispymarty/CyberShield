import { ArrowLeft } from "lucide-react";
import { Field } from "../components/Field";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export function IdentityProfile({ onNext, onBack }: Props) {
  return (
    <>
      <h1 className="font-semibold mb-3">Verify Identity</h1>
      <p className="text-slate-600 mb-10">
        Confirm your details to begin the secure onboarding process.
      </p>

      <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
        <div className="grid grid-cols-2 gap-5 mb-7">
          <Field label="First Name" value="John" />
          <Field label="Last Name" value="Doe" />
        </div>

        <Field label="Work Email Address" value="j.doe@company.com" className="mb-7" />
        <Field label="Employee Serial ID" value="SN-XXXX-XXXX" />

        <div className="border-t border-slate-300 mt-7 pt-5 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3 font-semibold">
            <ArrowLeft size={22} />
            Back
          </button>

          <button
            onClick={onNext}
            className="bg-[#020817] text-white px-9 py-2 rounded font-semibold"
          >
            Continue to Device Link
          </button>
        </div>
      </div>
    </>
  );
}