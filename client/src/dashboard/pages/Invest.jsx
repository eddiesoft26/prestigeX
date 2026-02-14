// dashboard/pages/Invest.jsx
import { useState } from "react";

const wallets = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
};

const plans = [
  { id: 1, name: "Starter Plan", min: 1000, roi: "15%" },
  { id: 2, name: "Premium Plan", min: 5000, roi: "25%" },
  { id: 3, name: "Pro Plan", min: 10000, roi: "40%" },
];

const Invest = () => {
  const [coin, setCoin] = useState("btc");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!selectedPlan) {
      alert("Please select a plan!");
      return;
    }

    if (amount < selectedPlan.min) {
      alert(`Minimum for ${selectedPlan.name} is $${selectedPlan.min}`);
      return;
    }

    console.log({
      coin,
      wallet: wallets[coin],
      plan: selectedPlan.name,
      amount,
    });

    alert("Investment submitted successfully!");
  };

  return (
    <div className="space-y-6 p-4">

      {/* Coin Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCoin("btc")}
          className={`p-4 rounded-xl border font-semibold ${
            coin === "btc"
              ? "bg-blue-500 text-white"
              : "border-white/20 text-gray-200"
          }`}
        >
          Bitcoin
        </button>

        <button
          onClick={() => setCoin("eth")}
          className={`p-4 rounded-xl border font-semibold ${
            coin === "eth"
              ? "bg-blue-500 text-white"
              : "border-white/20 text-gray-200"
          }`}
        >
          Ethereum
        </button>
      </div>

      {/* Wallet Display */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-sm text-gray-400">Send payment to this wallet:</p>
        <p className="break-all font-semibold mt-2">{wallets[coin]}</p>
      </div>

      {/* Plan Selection */}
      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`p-4 rounded-xl cursor-pointer border ${
              selectedPlan?.id === plan.id
                ? "border-blue-500 bg-white/10"
                : "border-white/20"
            }`}
          >
            <h4 className="font-semibold">{plan.name}</h4>
            <p className="text-sm text-gray-400">
              Minimum: ${plan.min} • ROI: {plan.roi}
            </p>
          </div>
        ))}
      </div>

      {/* Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full p-4 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 font-semibold"
      >
        Submit Investment
      </button>
    </div>
  );
};

export default Invest;
