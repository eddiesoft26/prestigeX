import React, { useState, useEffect } from "react";
import { HiOutlineCheck, HiOutlineTrash, HiOutlineClock, HiRefresh } from "react-icons/hi";
import { toast } from "react-hot-toast";
import api from "../../../api/axios";

const ListInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true); // Initial fetch loading
  const [processingId, setProcessingId] = useState(null); // Tracks which ID is being approved/deleted

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/investments/pending");
      setInvestments(res.data);
    } catch (err) {
      toast.error("Error loading investments");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await api.patch(`/admin/approve-investment/${id}`, { status: "APPROVED" });
      toast.success("Investment Approved");
      await fetchInvestments(); 
    } catch (err) {
      toast.error("Approval failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete record permanently?")) return;
    setProcessingId(id);
    try {
      await api.delete(`/admin/approve-investment/${id}`);
      toast.success("Record deleted");
      await fetchInvestments();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setProcessingId(null);
    }
  };

  // 1. LOADING STATE (Full Page)
  if (loading && investments.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">
          Synchronizing Ledger...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            Investment <span className="text-amber-500">Ledger</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">Verify and manage incoming capital streams.</p>
        </div>
        <button 
          onClick={fetchInvestments}
          className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
        >
          <HiRefresh size={20} className={loading ? "animate-spin text-amber-500" : ""} />
        </button>
      </div>

      <div className="grid gap-3">
        {investments.map((inv) => (
          <div key={inv.id} className="bg-[#1A1D21] border border-white/5 p-4 md:p-6 rounded-[1.5rem] relative overflow-hidden">
            {/* Row Overlay Loader */}
            {processingId === inv.id && (
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold truncate text-sm md:text-lg">{inv.user?.fullName}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-slate-500">
                   <HiOutlineClock size={12} />
                   <p className="text-[10px] md:text-xs font-mono">{new Date(inv.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-center md:text-right px-2">
                <p className="text-amber-500 font-black text-sm md:text-xl italic">${inv.amount?.toLocaleString()}</p>
                <span className="text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded uppercase bg-blue-500/10 text-blue-400">
                  {inv.status}
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <button 
                  disabled={processingId === inv.id}
                  onClick={() => handleApprove(inv.id)}
                  className="p-2 md:p-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl transition-all"
                >
                  <HiOutlineCheck size={18} />
                </button>
                <button 
                  disabled={processingId === inv.id}
                  onClick={() => handleDelete(inv.id)}
                  className="p-2 md:p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInvestments;