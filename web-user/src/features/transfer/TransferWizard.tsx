"use client";

import { useState } from "react";

import AccountStep from "./AccountStep";
import RecipientStep from "./RecipientStep";
import AmountStep from "./AmountStep";

export default function TransferWizard() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-white rounded-xl p-8 shadow">

      <h1 className="text-4xl font-bold mb-8">
        Transfer Funds
      </h1>

      <div className="flex justify-between mb-10">

        <div className={step === 1 ? "font-bold" : ""}>
          1 Account
        </div>

        <div className={step === 2 ? "font-bold" : ""}>
          2 Recipient
        </div>

        <div className={step === 3 ? "font-bold" : ""}>
          3 Amount
        </div>

      </div>

      {step === 1 && (
        <AccountStep onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <RecipientStep
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <AmountStep
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}