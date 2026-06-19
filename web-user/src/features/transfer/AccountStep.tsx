interface Props {
  onNext: () => void;
}

export default function AccountStep({ onNext }: Props) {
  return (
    <div>

      <h2 className="mb-6 text-lg font-semibold">
        Select Source Account
      </h2>

      <div className="flex gap-4">

        <div className="border rounded-xl p-6 w-64 cursor-pointer bg-slate-100">

          <p>BUSINESS CHECKING</p>

          <p className="text-4xl font-bold mt-4">
            $142,500
          </p>

        </div>

        <div className="border rounded-xl p-6 w-64">

          <p>GLOBAL SAVINGS</p>

          <p className="text-4xl font-bold mt-4">
            $62,840
          </p>

        </div>

      </div>

      <div className="mt-10">

        <button
          onClick={onNext}
          className="bg-black text-white px-8 py-3 rounded-xl"
        >
          Continue →
        </button>

      </div>

    </div>
  );
}