import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineWallet,
  HiCheckCircle,
  HiClock,
  HiXCircle,
} from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const Withdraw = () => {
  const [coin, setCoin] = useState("btc");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");

  const navigate = useNavigate();
  // Professional Money Formatter
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // FETCH BALANCE
  const { data: wallets, isSummaryLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: () => api.get("/dashboard/summary").then((res) => res.data),
    staleTime: Infinity, // These rarely change, so keep them in cache forever
  });

  const balance = isSummaryLoading ? 0 : wallets?.withdrawableBalance;

  // Helper to style currency parts
  const renderBalance = (val) => {
    const parts = moneyFormatter.formatToParts(val);
    return (
      <div className="flex items-baseline font-mono tracking-tighter">
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.type === "currency"
                ? "text-lg text-gray-500 mr-1"
                : part.type === "fraction"
                  ? "text-lg text-white/50"
                  : "text-3xl font-extrabold text-white"
            }
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!amount || !wallet) return alert("Please fill in all fields!");
    if (parseFloat(amount) > balance) return alert("Insufficient funds!");

    const walletAddress = wallet
    const withdrawalData = {
      coin,
      amount: parseFloat(amount),
      walletAddress,
    };

    try {
      // 2. ADD 'await' HERE
      const res = await api.post("/fiat/withdraw", withdrawalData);

      // 3. Axios puts successful data in 'res.data'
      if (res.status === 201 || res.status === 200) {
        alert("Withdrawal request submitted!");
        setAmount("");
        setWallet("");
        navigate("/dashboard/transactions");
      }
    } catch (err) {
      // 4. This is where your 400 Error "You must have invested..." lands!
      const errorMessage = err.response?.data?.message || "An error occurred";
      alert(errorMessage);
      console.log("Detailed Error:", err.response?.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-4">
      {/* 1. Glassmorphism Balance Card */}
      <div className="relative p-6 rounded-3xl bg-linear-to-br from-[#0B0F19] to-blue-950/20 border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
          Available for Payout
        </p>
        {renderBalance(balance)}
        <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-tighter">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
          Secure Settlement Active
        </div>
      </div>

      {/* 2. Asset Selector */}
      <div className="grid grid-cols-2 gap-4">
        {["btc", "eth"].map((type) => (
          <button
            key={type}
            onClick={() => setCoin(type)}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 font-bold ${
              coin === type
                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
            }`}
          >
            <span className="uppercase">
              {type === "btc" ? "Bitcoin" : "Ethereum"}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Inputs Section */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-5 pt-8 rounded-2xl bg-[#0B0F19] border border-white/10 text-white font-mono text-xl outline-none focus:border-blue-500 transition-colors"
          />
          <label className="absolute left-5 top-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Amount (USD)
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter destination address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-5 pt-8 rounded-2xl bg-[#0B0F19] border border-white/10 text-white font-medium text-sm outline-none focus:border-blue-500 transition-colors break-all"
          />
          <label className="absolute left-5 top-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Recipient Wallet Address
          </label>
        </div>
      </div>

      {/* 4. Action Button */}
      <button
        onClick={handleSubmit}
        className="w-full p-5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 text-white font-extrabold uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Request Settlement
      </button>

      {/* 5. Recent Activity with Pro Badges */}
      <div className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Recent Activity
          </h4>
          <button className="text-[10px] text-blue-400 font-bold uppercase hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              coin: "BTC",
              amount: "500.00",
              status: "Pending",
              icon: <HiClock />,
              color: "text-yellow-400",
              bg: "bg-yellow-400/10",
              border: "border-yellow-400/20",
            },
            {
              coin: "ETH",
              amount: "1,200.00",
              status: "Completed",
              icon: <HiCheckCircle />,
              color: "text-emerald-400",
              bg: "bg-emerald-400/10",
              border: "border-emerald-400/20",
            },
            {
              coin: "BTC",
              amount: "250.00",
              status: "Rejected",
              icon: <HiXCircle />,
              color: "text-red-400",
              bg: "bg-red-400/10",
              border: "border-red-400/20",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/2 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white/4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/5 text-gray-400`}>
                  <HiOutlineWallet size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {item.coin} Settlement
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    ${item.amount}
                  </p>
                </div>
              </div>
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold ${item.color} ${item.bg} ${item.border}`}
              >
                {item.icon} {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
