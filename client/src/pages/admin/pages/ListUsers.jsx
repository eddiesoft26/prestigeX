import React, { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlineGlobeAlt, HiOutlineSearch, HiRefresh } from "react-icons/hi";
import { toast } from "react-hot-toast";
import api from "../../../api/axios";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Error fetching user directory");
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for the search bar
  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">Accessing Member Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            User <span className="text-amber-500">Registry</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium font-mono">Monitor and manage your global investor base.</p>
        </div>
        
        <div className="relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search name or email..."
            className="bg-[#1A1D21] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:border-amber-500 outline-none w-full md:w-80 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* USER LIST */}
      <div className="grid gap-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-[#1A1D21] border border-white/5 p-4 md:p-6 rounded-[2rem] hover:border-white/10 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Profile & Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-black shadow-inner">
                  {user.fullName?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold truncate tracking-tight">{user.fullName}</h4>
                  <div className="flex items-center gap-2 text-slate-500">
                    <HiOutlineMail size={12} />
                    <p className="text-xs truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Location & Stats */}
              <div className="grid grid-cols-2 lg:flex items-center gap-4 lg:gap-12">
                <div>
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Origin</p>
                   <div className="flex items-center gap-1.5 mt-0.5">
                      <HiOutlineGlobeAlt className="text-emerald-500" size={14} />
                      <span className="text-xs text-slate-300 font-medium">{user.country || "Unknown IP"}</span>
                   </div>
                </div>

                <div>
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Total Assets</p>
                   <p className="text-sm font-black text-white mt-0.5">
                     ${user.totalAssets?.toLocaleString() || "0.00"}
                   </p>
                </div>

                <div className="hidden lg:block">
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Joined</p>
                   <p className="text-xs text-slate-500 mt-0.5 font-mono">
                     {new Date(user.createdAt).toLocaleDateString()}
                   </p>
                </div>
              </div>

              {/* Simple Action */}
              <button className="text-[10px] font-black text-amber-500 uppercase tracking-tighter hover:underline">
                View Profile
              </button>
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-slate-600 font-black uppercase tracking-widest text-xs">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUsers;