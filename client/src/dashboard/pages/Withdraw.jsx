// dashboard/pages/Withdraw.jsx
import { useState } from "react";

const Withdraw = () => {
  const [coin, setCoin] = useState("btc");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");

  // Mocked user balance
  const balance = 12500;

  const handleSubmit = () => {
    if (!amount || !wallet) {
      alert("Please fill in all fields!");
      return;
    }

    if (amount > balance) {
      alert("Withdrawal amount exceeds available balance!");
      return;
    }

    console.log({
      coin,
      amount,
      wallet,
    });

    alert("Withdrawal request submitted!");
    setAmount("");
    setWallet("");
  };

  return (
    <div className="space-y-6 p-4">
      {/* Available Balance */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-sm text-gray-400">Available Balance</p>
        <p className="text-2xl font-bold mt-1">${balance}</p>
      </div>

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

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter amount to withdraw"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
      />

      {/* Wallet Input */}
      <input
        type="text"
        placeholder="Enter your wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none break-all"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full p-4 rounded-xl bg-linear  -to-r from-blue-500 to-indigo-600 font-semibold"
      >
        Withdraw
      </button>

      {/* Optional: Last 3 Withdrawals */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Recent Withdrawals</h4>
        <ul className="space-y-2">
          <li className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
            <span>BTC - $500</span>
            <span className="text-sm text-gray-400">Pending</span>
          </li>
          <li className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
            <span>ETH - $1200</span>
            <span className="text-sm text-green-400">Completed</span>
          </li>
          <li className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between">
            <span>BTC - $250</span>
            <span className="text-sm text-red-400">Rejected</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Withdraw;
