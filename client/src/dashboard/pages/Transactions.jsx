// dashboard/pages/Transactions.jsx
import { useState } from "react";

const Transactions = () => {
  // Mock data
  const [transactions] = useState([
    {
      type: "Deposit",
      plan: "Starter Plan",
      amount: "$1,200",
      status: "Completed",
      date: "2026-02-01",
    },
    {
      type: "Withdrawal",
      plan: "-",
      amount: "$500",
      status: "Pending",
      date: "2026-02-03",
    },
    {
      type: "Deposit",
      plan: "Premium Plan",
      amount: "$5,000",
      status: "Completed",
      date: "2026-02-05",
    },
  ]);

  return (
    <div className="p-4 space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold">Transactions</h2>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-3 text-gray-400">Type</th>
              <th className="p-3 text-gray-400">Plan</th>
              <th className="p-3 text-gray-400">Amount</th>
              <th className="p-3 text-gray-400">Status</th>
              <th className="p-3 text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white/5" : "bg-white/10"}`}
              >
                <td className="p-3">{tx.type}</td>
                <td className="p-3">{tx.plan}</td>
                <td className="p-3">{tx.amount}</td>
                <td
                  className={`p-3 font-semibold ${
                    tx.status === "Completed"
                      ? "text-green-400"
                      : tx.status === "Pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.status}
                </td>
                <td className="p-3">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
