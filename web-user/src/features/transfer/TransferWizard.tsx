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

  <button
    onClick={() => setStep(1)}
    className={`cursor-pointer ${
      step === 1
        ? "font-bold text-blue-600"
        : "text-gray-500"
    }`}
  >
    Account
  </button>

  <button
    onClick={() => setStep(2)}
    className={`cursor-pointer ${
      step === 2
        ? "font-bold text-blue-600"
        : "text-gray-500"
    }`}
  >
    Recipient
  </button>

  <button
    onClick={() => setStep(3)}
    className={`cursor-pointer ${
      step === 3
        ? "font-bold text-blue-600"
        : "text-gray-500"
    }`}
  >
    Amount
  </button>

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