import React, { useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlinePencilAlt,
  HiOutlineChartPie,
  HiOutlineGlobeAlt,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [page, setPage] = useState(1);

  // --- TREASURY STATE (Admin Wallets) ---
  const [adminWallets, setAdminWallets] = useState({
    btc: "bc1qxy2kg...a6",
    eth: "0x71C765...3e",
  });

  // --- LEGAL STATE ---
  const [legalContent, setLegalContent] = useState(
    `# PrestigeX Legal Mandate\n\nLast Updated: ${new Date().toLocaleDateString()}\n\n1. OPERATIONAL SCOPE\nAll assets under management within the PrestigeX Vault are subject to strict cryptographic verification...`,
  );

  // --- USERS STATE ---
  const [users, setUsers] = useState([
    {
      id: "U-001",
      name: "Alex Rivera",
      email: "alex@example.com",
      invested: 15000,
      withdrawing: 0,
      wallet: "bc1qxy2kg...a6",
      role: "USER",
    },
    {
      id: "U-002",
      name: "Sarah Chen",
      email: "sarah@tech.io",
      invested: 50000,
      withdrawing: 2500,
      wallet: "0x71C765...3e",
      role: "ADMIN",
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleRole = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, role: u.role === "USER" ? "ADMIN" : "USER" }
          : u,
      ),
    );
  };

  const stats = [
    {
      label: "Total AUM",
      val: "$2.4M",
      icon: HiOutlineDatabase,
      color: "text-indigo-400",
    },
    {
      label: "Active",
      val: "1.2K",
      icon: HiOutlineUsers,
      color: "text-blue-400",
    },
    {
      label: "Pending",
      val: "12",
      icon: HiOutlineShieldCheck,
      color: "text-amber-400",
    },
    {
      label: "Node Latency",
      val: "24ms - Secure",
      icon: HiOutlineGlobeAlt,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 lg:p-10">
      {/* --- COMMAND HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Oversight <span className="text-indigo-500">Command</span>
          </h1>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.3em] mt-1">
            Welcome back,{" "}
            <span className="text-indigo-400 font-black italic">
              Boss {user?.fullName?.split(" ")[0] || "Operator"}
            </span>{" "}
            • Terminal Active
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-600 transition-all duration-500"
        >
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-red-500 group-hover:text-white uppercase tracking-widest leading-none">
              Secure Exit
            </span>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-red-200">
              Logout Terminal
            </span>
          </div>
          <HiOutlineX
            size={20}
            className="text-red-500 group-hover:text-white group-hover:rotate-90 transition-all"
          />
        </button>
      </div>

      {/* 1. ANALYTICS GRID */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-slate-900/40 border border-white/5 backdrop-blur-md ${i === 3 ? "col-span-3 md:col-span-1 p-4 flex items-center justify-between" : "p-3 flex flex-col items-center text-center md:items-start md:text-left md:p-6"} rounded-[1.5rem] md:rounded-[2rem]`}
          >
            <stat.icon
              size={i === 3 ? 18 : 16}
              className={`${stat.color} mb-1 md:mb-4`}
            />
            <div
              className={
                i === 3 ? "flex flex-col items-end md:items-start" : ""
              }
            >
              <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <p
                className={`${i === 3 ? "text-sm" : "text-xs"} md:text-2xl font-black text-white italic leading-none mt-1`}
              >
                {stat.val}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 2. SIDE NAVIGATION */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 no-scrollbar">
          {[
            { id: "users", label: "Users", icon: HiOutlineUsers },
            { id: "approvals", label: "Approvals", icon: HiOutlineShieldCheck },
            { id: "wallets", label: "Treasury", icon: HiOutlineChartPie },
            { id: "cms", label: "Legal", icon: HiOutlinePencilAlt },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[9px] tracking-widest transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "hover:bg-white/5 text-slate-500"}`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>

        {/* 3. DYNAMIC CONTENT AREA */}
        <div className="lg:col-span-9 bg-slate-900/20 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-sm">
          {/* USERS TAB */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                  Operative Registry
                </h3>
                <input
                  type="text"
                  placeholder="Search Wallet/ID..."
                  className="w-full md:w-64 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="pb-4">Identification</th>
                      <th className="pb-4">Permission</th>
                      <th className="pb-4">Invested</th>
                      <th className="pb-4">Payout</th>
                      <th className="pb-4 text-right">Access Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                    {users.map((u) => (
                      <tr key={u.id} className="group">
                        <td className="py-5">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-white">
                              {u.name}
                            </span>
                            <span className="text-[9px] text-indigo-400/50 font-mono tracking-tighter uppercase">
                              {u.wallet}
                            </span>
                          </div>
                        </td>
                        <td className="py-5">
                          <span
                            className={`px-2 py-1 rounded-md text-[8px] font-black tracking-[0.1em] border ${u.role === "ADMIN" ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" : "bg-slate-500/10 border-slate-500/30 text-slate-500"}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-5 text-xs font-bold text-slate-300 font-mono">
                          ${u.invested.toLocaleString()}
                        </td>
                        <td className="py-5 text-xs font-bold text-amber-500 font-mono">
                          ${u.withdrawing.toLocaleString()}
                        </td>
                        <td className="py-5 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleRole(u.id)}
                            className={`p-2 rounded-xl transition-all flex items-center gap-2 border ${u.role === "USER" ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white" : "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white"}`}
                          >
                            {u.role === "USER" ? (
                              <HiOutlineShieldCheck size={18} />
                            ) : (
                              <HiOutlineUserGroup size={18} />
                            )}
                            <span className="text-[8px] font-black uppercase tracking-tighter">
                              {u.role === "USER" ? "Promote" : "Demote"}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPROVALS TAB */}
          {activeTab === "approvals" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                  Authorization <span className="text-amber-500">Queue</span>
                </h3>
                <span className="text-[10px] font-black text-slate-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">
                  {/* Count pending items */}
                  {
                    [
                      {
                        id: "TX-992",
                        user: "Alex Rivera",
                        type: "WITHDRAWAL",
                        amount: 2500,
                        date: "2026-02-17",
                      },
                      {
                        id: "TX-995",
                        user: "Sarah Chen",
                        type: "INVESTMENT",
                        amount: 10000,
                        date: "2026-02-18",
                      },
                      {
                        id: "TX-1002",
                        user: "Marcus V.",
                        type: "INVESTMENT",
                        amount: 5500,
                        date: "2026-02-18",
                      },
                    ].length
                  }{" "}
                  Pending Requests
                </span>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    id: "TX-992",
                    user: "Alex Rivera",
                    type: "WITHDRAWAL",
                    amount: 2500,
                    wallet: "bc1q...a6",
                  },
                  {
                    id: "TX-995",
                    user: "Sarah Chen",
                    type: "INVESTMENT",
                    amount: 10000,
                    wallet: "0x71...3e",
                  },
                  {
                    id: "TX-1002",
                    user: "Marcus V.",
                    type: "INVESTMENT",
                    amount: 5500,
                    wallet: "bc1p...z9",
                  },
                ].map((tx) => (
                  <div
                    key={tx.id}
                    className="flex flex-col lg:flex-row items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[2rem] group hover:border-indigo-500/30 transition-all border-l-4"
                    style={{
                      borderLeftColor:
                        tx.type === "WITHDRAWAL" ? "#f59e0b" : "#10b981",
                    }}
                  >
                    <div className="flex items-center gap-6 w-full lg:w-auto">
                      <div
                        className={`p-4 rounded-2xl ${tx.type === "WITHDRAWAL" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}
                      >
                        {tx.type === "WITHDRAWAL" ? (
                          <HiOutlineChevronRight
                            className="rotate-180"
                            size={24}
                          />
                        ) : (
                          <HiOutlineChevronRight size={24} />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${tx.type === "WITHDRAWAL" ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500"}`}
                          >
                            {tx.type}
                          </span>
                          <p className="text-[10px] font-mono text-slate-500 uppercase">
                            {tx.id}
                          </p>
                        </div>
                        <h4 className="text-white font-bold text-lg mt-1">
                          {tx.user}
                        </h4>
                        <p className="text-[9px] text-slate-600 font-mono tracking-tighter truncate w-32 md:w-auto">
                          {tx.wallet}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-10 w-full lg:w-auto mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          Amount Requested
                        </p>
                        <p
                          className={`text-2xl font-black italic ${tx.type === "WITHDRAWAL" ? "text-white" : "text-emerald-400"}`}
                        >
                          {tx.type === "WITHDRAWAL" ? "-" : "+"}$
                          {tx.amount.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          title="Approve Transaction"
                          className="p-4 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20"
                        >
                          <HiOutlineCheck size={20} />
                        </button>
                        <button
                          title="Decline Transaction"
                          className="p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all shadow-lg hover:shadow-red-500/20"
                        >
                          <HiOutlineX size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TREASURY TAB */}
          {activeTab === "wallets" && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                    Treasury <span className="text-indigo-400">Config</span>
                  </h3>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                    Configure Administrative Recipient Addresses
                  </p>
                </div>
              </div>

              {/* Wallet Input Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-6 bg-black/40 border border-white/10 rounded-3xl">
                  <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                    BTC Master Address
                  </label>
                  <input
                    type="text"
                    value={adminWallets.btc}
                    onChange={(e) =>
                      setAdminWallets({ ...adminWallets, btc: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-orange-500 transition-all"
                  />
                </div>
                <div className="space-y-4 p-6 bg-black/40 border border-white/10 rounded-3xl">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                    ETH Master Address
                  </label>
                  <input
                    type="text"
                    value={adminWallets.eth}
                    onChange={(e) =>
                      setAdminWallets({ ...adminWallets, eth: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Preview Display */}
              <div className="pt-6">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">
                  Live Frontend Reflection
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-[2.5rem]">
                    <p className="text-[10px] font-black text-orange-500 uppercase mb-2">
                      Bitcoin (BTC)
                    </p>
                    <p className="text-sm font-mono text-white break-all leading-relaxed">
                      {adminWallets.btc}
                    </p>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[2.5rem]">
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2">
                      Ethereum (ETH)
                    </p>
                    <p className="text-sm font-mono text-white break-all leading-relaxed">
                      {adminWallets.eth}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEGAL TAB */}
          {activeTab === "cms" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                  Legal <span className="text-indigo-500">Protocol</span> Update
                </h3>
                <button
                  onClick={() => alert("Changes Published")}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Publish Changes
                </button>
              </div>
              <textarea
                spellCheck="false"
                value={legalContent}
                onChange={(e) => setLegalContent(e.target.value)}
                className="w-full h-[400px] bg-black/40 border border-white/10 rounded-[2rem] p-8 text-sm text-slate-300 font-mono leading-relaxed outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
