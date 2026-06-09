import TransferWizard from "./TransferWizard";
import SecurityPanel from "./SecurityPanel";

export default function TransferPage() {
  return (
    <div className="flex gap-6 p-6 bg-slate-100 min-h-screen">
      <div className="flex-1">
        <TransferWizard />
      </div>

      <div className="w-[320px]">
        <SecurityPanel />
      </div>
    </div>
  );
}