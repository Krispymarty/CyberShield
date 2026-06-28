import { ArrowLeft } from "lucide-react";
import { Field } from "../components/Field";

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  national_id: string;
};

type Props = {
  form: FormData;
  updateForm: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function IdentityProfile({ form, updateForm, onNext, onBack }: Props) {
  return (
    <>
      <h1 className="font-semibold mb-3">Verify Identity</h1>
      <p className="text-slate-600 mb-10">
        Confirm your details to begin the secure onboarding process.
      </p>

      <div className="bg-white border border-slate-300 rounded-2xl p-9 shadow-sm">
        <Field
          label="Full Name"
          value={form.full_name}
          onChange={(value) => updateForm("full_name", value)}
          placeholder="Enter your name:"
          className="mb-7"
        />

        <Field
          label="Work Email Address"
          value={form.email}
          onChange={(value) => updateForm("email", value)}
          placeholder="Enter email: "
          className="mb-7"
          type="email"
        />

        <div className="grid grid-cols-2 gap-5 mb-7">
          <Field
            label="Phone"
            value={form.phone}
            onChange={(value) => updateForm("phone", value)}
            placeholder="Enter phone number:"
          />

          <Field
            label="Location"
            value={form.location}
            onChange={(value) => updateForm("location", value)}
            placeholder="Enter location:"
          />
        </div>

        <Field
          label="Password"
          value={form.password}
          onChange={(value) => updateForm("password", value)}
          placeholder="Enter password"
          className="mb-7"
          type="password"
        />

        <Field
          label="National ID"
          value={form.national_id}
          onChange={(value) => updateForm("national_id", value)}
          placeholder=""
        />

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