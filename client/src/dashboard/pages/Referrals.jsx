import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  HiUserGroup,
  HiTrendingUp,
  HiClipboardCopy,
  HiCheck,
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const Referrals = () => {
  const { user } = useAuth(); // 1. Get the logged-in user's data
  const [copied, setCopied] = useState(false);

  // 2. Generate the dynamic link based on the user's referral code
  const referralLink = `${window.location.origin}/auth?mode=register&ref=${user?.referralCode || "INVITE"}`;

 const { data, isLoading } = useQuery({
  queryKey: ["myReferrals"],
  queryFn: () => api.get("/referrals").then(res => res.data),
});


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Prestige Investment",
          text: "Hey! I'm earning 20% ROI on my investments. Join my network using my link:",
          url: referralLink,
        });
      } catch (err) {
        console.log("User cancelled or sharing failed", err);
      }
    } else {
      // Fallback: If browser doesn't support Web Share, just copy the link
      handleCopy();
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse">Loading Network...</div>
    );
  // Replace your manual 'totalEarnings' with the live data
const referrals = data?.referrals || [];
const totalEarnings = data?.totalReferralEarnings || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      {/* 1. Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative p-6 rounded-3xl bg-[#0B0F19] border border-white/10 shadow-xl overflow-hidden group">
          <HiUserGroup
            size={40}
            className="absolute -right-2 -top-2 text-blue-500/10 group-hover:text-blue-500/20 transition-colors"
          />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            Network Size
          </p>
          <p className="text-3xl font-extrabold text-white font-mono">
            {referrals.length}{" "}
            <span className="text-sm font-medium text-gray-500">Users</span>
          </p>
        </div>

        <div className="relative p-6 rounded-3xl bg-linear-to-br from-indigo-600 to-purple-700 shadow-2xl shadow-indigo-900/20 overflow-hidden">
          <HiTrendingUp
            size={40}
            className="absolute -right-2 -top-2 text-white/10"
          />
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">
            Referral Commissions
          </p>
          <p className="text-3xl font-extrabold text-white font-mono">
            $
            {totalEarnings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* 2. Professional Referral Link Box */}
      <div className="p-6 rounded-3xl bg-white/2 border border-white/5 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white">
            Your Personal Invite Link
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Share this link to earn 10% commission on your friends' signup
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Link Input */}
          <div className="flex-1 relative group">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-4 pr-12 rounded-2xl bg-[#0B0F19] border border-white/10 text-blue-400 font-mono text-sm outline-none cursor-default"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0-10.628a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 10.628a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0 4.5Z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* 3. Modern Referral Table */}
      <div className="bg-[#0B0F19] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-widest">
            Downline Activity
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="p-4">Investor Name</th>
                <th className="p-4 text-center">Registration Date</th>
                <th className="p-4 text-right">Earning Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {referrals.map((ref, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/2 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-400 border border-blue-500/20">
                        {ref.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {ref.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-xs text-gray-500 font-mono">
                    {ref.date}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      +${ref.reward.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
