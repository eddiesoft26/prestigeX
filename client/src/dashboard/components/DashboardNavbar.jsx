import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiMenu, HiOutlineLogout, HiOutlineBell } from "react-icons/hi";

const DashboardNavbar = ({ setMobileOpen }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    return parts.length === 1 
      ? parts[0].charAt(0).toUpperCase() 
      : (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-6 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100]">
      {/* Mobile Trigger & Logo */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 text-white bg-white/5 rounded-xl"
          onClick={() => setMobileOpen(true)}
        >
          <HiMenu size={24} />
        </button>
        <div className="cursor-pointer">
           <span className="text-xl font-black tracking-tighter text-white">
            PRESTIGEX<span className="text-indigo-500">.</span>
           </span>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Global Market Indicator (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 px-4 py-2 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Market Live</span>
        </div>

        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
           <HiOutlineBell size={22} />
           <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]"></span>
        </button>

        {/* User Profile Hook */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="hidden sm:block text-right">
             <p className="text-xs font-black text-white leading-none">{user?.fullName || "Investor"}</p>
             <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-tighter mt-1">Institutional Tier</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20 border border-white/10">
            {getInitials(user?.fullName)}
          </div>
          <button 
            onClick={logout} 
            className="p-2 text-slate-500 hover:text-red-400 transition-all rounded-lg hover:bg-red-400/5"
            title="Secure Logout"
          >
            <HiOutlineLogout size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;