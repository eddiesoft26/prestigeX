import React, { useState, useEffect } from "react";
import { HiOutlineCheck, HiOutlineTrash, HiOutlineClock, HiOutlineExternalLink, HiRefresh } from "react-icons/hi";
import { toast } from "react-hot-toast";
import api from "../../../api/axios";

const ListWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/withdrawals/pending");
      setWithdrawals(res.data);
    } catch (err) {
      toast.error("Error loading withdrawals");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await api.patch(`/admin/approve-withdrawal/${id}`, { status: "APPROVED" });
      toast.success("Withdrawal Marked as Paid");
      await fetchWithdrawals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Approval failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Reject and delete this withdrawal request?")) return;
    setProcessingId(id);
    try {
      await api.delete(`/admin/withdrawals/${id}`);
      toast.success("Request Deleted");
      await fetchWithdrawals();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading && withdrawals.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse font-mono">
          Scanning Payout Requests...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            Payout <span className="text-rose-500">Queue</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium font-mono">Review and process user exit capital.</p>
        </div>
        <button onClick={fetchWithdrawals} className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
          <HiRefresh size={20} className={loading ? "animate-spin text-rose-500" : ""} />
        </button>
      </div>

      <div className="grid gap-3">
        {withdrawals.map((wd) => (
          <div key={wd.id} className="bg-[#1A1D21] border border-white/5 p-4 md:p-6 rounded-[1.5rem] relative overflow-hidden group">
            {processingId === wd.id && (
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* 1. User & Date */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold truncate text-base md:text-lg tracking-tight">
                  {wd.user?.fullName}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-slate-500">
                   <HiOutlineClock size={12} />
                   <p className="text-[10px] md:text-xs font-mono">{new Date(wd.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* 2. Destination Wallet (CRITICAL FOR WITHDRAWALS) */}
              <div className="flex-1 bg-black/30 p-3 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-slate-600 uppercase mb-1 tracking-widest">Target Address ({wd.network || 'Crypto'})</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-mono text-rose-200/70 truncate">{wd.walletAddress || "No address provided"}</p>
                  <button 
                    onClick={() => {navigator.clipboard.writeText(wd.walletAddress); toast.success("Address Copied")}}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <HiOutlineExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* 3. Amount & Status */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center px-2">
                <p className="text-rose-500 font-black text-xl md:text-2xl italic">
                  -${wd.amount?.toLocaleString()}
                </p>
                <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase bg-rose-500/10 text-rose-400 mt-1">
                  {wd.status}
                </span>
              </div>

              {/* 4. Actions */}
              <div className="flex gap-2 border-t border-white/5 pt-4 lg:pt-0 lg:border-none">
                <button 
                  disabled={processingId === wd.id}
                  onClick={() => handleApprove(wd.id)}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-900/20"
                >
                  <HiOutlineCheck size={18} />
                  <span className="lg:hidden">APPROVE PAYOUT</span>
                </button>
                <button 
                  disabled={processingId === wd.id}
                  onClick={() => handleDelete(wd.id)}
                  className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>

            </div>
          </div>
        ))}

        {withdrawals.length === 0 && !loading && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
             <p className="text-slate-600 font-black uppercase tracking-widest text-xs">No Payout Requests Pending</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListWithdrawals;