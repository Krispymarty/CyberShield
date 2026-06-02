import { Check } from "lucide-react";

type StepProps = {
  number: string;
  title: string;
  subtitle: string;
  active?: boolean;
  completed?: boolean;
};

export function Step({ number, title, subtitle, active, completed }: StepProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center border text-lg ${
          active || completed
            ? "bg-[#020817] text-white border-[#020817]"
            : "text-slate-400 border-slate-400"
        }`}
      >
        {completed ? <Check size={16} /> : number}
      </div>

      <div>
        <h3 className={`font-semibold ${active ? "text-slate-950" : "text-slate-500"}`}>
          {title}
        </h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}