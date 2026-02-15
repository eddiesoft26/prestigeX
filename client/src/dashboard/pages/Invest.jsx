import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

//to be fetched from backend
// const wallets = {
//   btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
//   eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
// };

const plans = [
  { id: 1, name: "Starter Plan", min: 100, roi: "20%" },
  { id: 2, name: "Premium Plan", min: 1000, roi: "35%" },
  { id: 3, name: "Pro/Ultimate Plan", min: 5000, roi: "50%" },
];

const Invest = () => {
  const [coin, setCoin] = useState("btc");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    // Reset the "Copied!" text back to the icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const { data: wallets, isLoading } = useQuery({
    queryKey: ["adminWallets"],
    queryFn: () => api.get("/admin-wallets").then((res) => res.data),
    staleTime: Infinity, // These rarely change, so keep them in cache forever
  });

  // Step 1: Validate and show the summary
  const handleReview = () => {
    if (!selectedPlan) return alert("Please select a plan!");
    if (Number(amount) < selectedPlan.min) {
      return alert(`Minimum for ${selectedPlan.name} is $${selectedPlan.min}`);
    }
    setIsModalOpen(true);
  };

  // Step 2: The actual API call
  const confirmInvestment = async () => {
    setIsSubmitting(true);

    const numAmount = Number(amount);
    const roiDecimal = parseFloat(selectedPlan.roi) / 100;
    const calculatedProfit = numAmount * roiDecimal;

    const investmentData = {
      plan: selectedPlan.name.split(" ")[0].toUpperCase(), // "STARTER", "PREMIUM", "PRO"
      amount: numAmount,
      roiPercent: parseFloat(selectedPlan.roi),
      profit: calculatedProfit,
      totalPayout: numAmount + calculatedProfit,
      coin: coin.toUpperCase(),
    };

    try {
      const res = await api.post("/fiat/invest", investmentData);
      if (res.status === 201) {
        setIsModalOpen(false);
        setAmount("");
        setSelectedPlan(null);
        alert("Investment successfully initiated! Proceed to payment.");
        navigate("/dashboard/payment-proof");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Connection error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        onClick={handleReview}
        className="w-full p-4 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 font-semibold"
      >
        Submit Investment
      </button>

      {/* UI MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0B0F19] border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-white mb-6">
              Review Investment
            </h3>

            <div className="space-y-4 border-b border-white/5 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Selected Plan</span>
                <span className="text-white font-semibold">
                  {selectedPlan?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Principal Amount</span>
                <span className="text-white font-mono">
                  ${Number(amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">ROI ({selectedPlan?.roi})</span>
                <span className="text-green-400 font-mono">
                  + $
                  {(
                    Number(amount) *
                    (parseFloat(selectedPlan?.roi) / 100)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="py-6 flex justify-between items-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                Total Payout
              </span>
              <span className="text-2xl font-extrabold text-white font-mono">
                $
                {(
                  Number(amount) +
                  Number(amount) * (parseFloat(selectedPlan?.roi) / 100)
                ).toLocaleString()}
              </span>
            </div>

            {/* Wallet Display */}
            <div className="p-4 mb-4 rounded-xl bg-white/5 border border-white/10 relative group">
              <p className="text-sm text-gray-400">
                Send payment to this wallet and confirm.
              </p>

              <div className="flex items-center justify-between mt-2 gap-2">
                <p className="break-all font-mono text-sm font-semibold text-blue-400">
                  {isLoading
                    ? "Fetching Wallet address..."
                    : wallets?.[coin] || "Wallet address not found!"}
                </p>

                {!isLoading && wallets?.[coin] && (
                  <button
                    onClick={() => handleCopy(wallets[coin])}
                    className="shrink-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Copy Address"
                  >
                    {copied ? (
                      <span className="text-[10px] font-bold text-green-400 uppercase">
                        Copied!
                      </span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5 0h8.25c.621 0 1.125.504 1.125 1.125v3.375m0 3.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM9.25 10.5h.008v.008H9.25V10.5Z"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-4 rounded-xl border border-white/10 text-gray-400 font-semibold hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                onClick={confirmInvestment}
                className="p-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invest;
