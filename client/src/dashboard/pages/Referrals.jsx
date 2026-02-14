// dashboard/pages/Referrals.jsx
import { useState } from "react";

const Referrals = () => {
  const [referralLink, setReferralLink] = useState(
    "https://prestigeinv.com/signup?ref=USER123"
  );

  // Mock data
  const referrals = [
    { name: "John Doe", date: "2026-01-15", reward: "$50" },
    { name: "Jane Smith", date: "2026-01-20", reward: "$75" },
    { name: "Alex Johnson", date: "2026-02-01", reward: "$30" },
  ];

  const totalReferrals = referrals.length;
  const totalEarnings = referrals.reduce(
    (acc, r) => acc + Number(r.reward.replace("$", "")),
    0
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="space-y-6 p-4">
      {/* Referral Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-sm text-gray-400">Total Referrals</p>
          <p className="text-2xl font-bold mt-1">{totalReferrals}</p>
        </div>
        <div className="p-4 rounded-xl bg-linear-to-r from-purple-500 to-indigo-600 shadow-lg">
          <p className="text-sm text-gray-200">Total Earnings</p>
          <p className="text-2xl font-bold mt-1">${totalEarnings}</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
        />
        <button
          onClick={handleCopy}
          className="p-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold"
        >
          Copy Link
        </button>
      </div>

      {/* Referral Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-3 text-gray-400">Name</th>
              <th className="p-3 text-gray-400">Date Referred</th>
              <th className="p-3 text-gray-400">Reward</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-white/5" : "bg-white/10"
                }`}
              >
                <td className="p-3">{ref.name}</td>
                <td className="p-3">{ref.date}</td>
                <td className="p-3">{ref.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referrals;
