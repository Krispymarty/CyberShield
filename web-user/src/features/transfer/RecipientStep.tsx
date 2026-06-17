interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function RecipientStep({
  onBack,
  onNext,
}: Props) {
  return (
    <div>

      <input
        placeholder="Recipient Name"
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        placeholder="Account Number"
        className="border p-3 w-full mb-4 rounded"
      />

      <input
        placeholder="Bank Name"
        className="border p-3 w-full mb-6 rounded"
      />

      <div className="flex gap-4">

        <button
          onClick={onBack}
          className="border px-6 py-3 rounded"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Continue
        </button>

      </div>

    </div>
  );
}