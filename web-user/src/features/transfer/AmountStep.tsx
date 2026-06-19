interface Props {
  onBack: () => void;
}

export default function AmountStep({ onBack }: Props) {
  return (
    <div>

      <input
        placeholder="Amount"
        className="border p-3 w-full mb-4 rounded"
      />

      <textarea
        placeholder="Description"
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
          className="bg-green-600 text-white px-8 py-3 rounded"
        >
          Transfer Funds
        </button>

      </div>

    </div>
  );
}