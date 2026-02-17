import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiX, 
  HiOutlineViewGrid, 
  HiOutlineTrendingUp, 
  HiOutlineOfficeBuilding, 
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineSwitchHorizontal,
  HiOutlineAnnotation 
} from "react-icons/hi";

const MobileSidebar = ({ open, setOpen }) => {
  // FULL SYNCED NAVIGATION
  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: HiOutlineViewGrid, end: true },
    { name: "Invest Now", path: "/dashboard/invest", icon: HiOutlineTrendingUp },
    { name: "Real Estate", path: "/dashboard/real-estate-portal", icon: HiOutlineOfficeBuilding },
    { name: "Withdraw", path: "/dashboard/withdraw", icon: HiOutlineCreditCard },
    { name: "Referrals", path: "/dashboard/referrals", icon: HiOutlineUsers },
    { name: "History", path: "/dashboard/transactions", icon: HiOutlineSwitchHorizontal },
    { name: "Proof", path: "/dashboard/payment-proof", icon: HiOutlineAnnotation },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 1. High-End Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150]"
            onClick={() => setOpen(false)}
          />

          {/* 2. Slide-In Vault Drawer */}
          <motion.div
            initial={{ x: "-100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-[#020617] z-[160] border-r border-white/5 flex flex-col shadow-2xl"
          >
            {/* Header / Branding */}
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <span className="font-black text-xl text-white tracking-tighter">
                PRESTIGE<span className="text-indigo-500">X</span>
              </span>
              <button 
                onClick={() => setOpen(false)} 
                className="text-slate-400 p-2 bg-white/5 rounded-xl border border-white/5 hover:text-white transition-all"
              >
                <HiX size={20} />
              </button>
            </div>

            {/* Scrollable Navigation - Added 'custom-scrollbar' for a clean look */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
              <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                Main Terminal
              </p>
              
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-[1.02]" 
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`
                  }
                >
                  <link.icon size={22} className={({ isActive }) => isActive ? "text-white" : "text-indigo-500/60"} />
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* User Security Footer */}
            <div className="p-6 border-t border-white/5 bg-slate-950/50">
                <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-5 rounded-[2rem] border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">Verified Account</p>
                    </div>
                    <p className="text-white text-xs font-bold px-5">Standard Tier Investor</p>
                </div>
                <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-6">
                  Secured by PrestigeX
                </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;