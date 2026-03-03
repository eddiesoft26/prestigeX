import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineShieldExclamation,
  HiBan,
  HiOutlineCheckCircle,
  HiTrash,
} from "react-icons/hi";

const Blacklist = () => {
  const queryClient = useQueryClient();

  // Fetch Users
  const { data: users } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => api.get("/admin/users").then((res) => res.data),
  });

  // Fetch Current Blacklist
  const { data: blockedIps } = useQuery({
    queryKey: ["blacklist"],
    queryFn: () => api.get("/admin/blacklist").then((res) => res.data),
  });

  // Block Mutation
  const blockMutation = useMutation({
    mutationFn: (data) => api.post("/admin/blacklist", data),
    onSuccess: () => {
      toast.success("IP Blocked");
      queryClient.invalidateQueries(["blacklist"]);
    },
  });

  // Unblock Mutation
  const unblockMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/blacklist/${id}`),
    onSuccess: () => {
      toast.success("IP Restored");
      queryClient.invalidateQueries(["blacklist"]);
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <Toaster />

      {/* SECTION 1: ACTIVE USERS */}
      <section className="space-y-6">
        <div className="text-left">
          <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
            Active Sessions
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Monitor real-time user connections
          </p>
        </div>
        <div className="bg-[#111418] border border-white/5 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase">
                  User
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase">
                  IP Address
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="p-5 text-sm font-bold text-white">
                    {user.fullName}
                  </td>
                  <td className="p-5 font-mono text-xs text-indigo-400">
                    {user.ip || "N/A"}
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() =>
                        blockMutation.mutate({
                          ip: user.ip,
                          reason: "Manual Block",
                        })
                      }
                      // 👈 Add this line to prevent sending null/empty IPs
                      disabled={
                        !user.ip || user.ip === "N/A" || blockMutation.isPending
                      }
                      className="px-4 py-2 bg-red-500/10 text-red-500 text-[10px] font-black rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      {blockMutation.isPending ? "..." : "BLOCK"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: THE BLACKLIST (RESTRICTED ZONE) */}
      <section className="space-y-6">
        <div className="text-left">
          <h2 className="text-xl font-black text-red-500 italic uppercase tracking-tight flex items-center gap-2">
            <HiBan /> Restricted Zone
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Currently blocked IP addresses
          </p>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] overflow-hidden">
          {blockedIps?.length > 0 ? (
            <table className="w-full text-left">
              <tbody className="divide-y divide-red-500/10">
                {blockedIps.map((entry) => (
                  <tr key={entry.id} className="group">
                    <td className="p-5">
                      <p className="text-sm font-bold text-red-400 font-mono">
                        {entry.ip}
                      </p>
                      <p className="text-[10px] text-slate-500 italic">
                        {entry.reason}
                      </p>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => unblockMutation.mutate(entry.id)}
                        className="p-3 bg-white/5 text-slate-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                        title="Unblock IP"
                      >
                        <HiOutlineCheckCircle size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
              The blacklist is currently empty.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blacklist;
