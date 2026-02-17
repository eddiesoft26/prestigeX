import { NavLink } from "react-router-dom";
import { 
  HiOutlineViewGrid, HiOutlineTrendingUp, HiOutlineCreditCard, 
  HiOutlineUsers, HiOutlineSwitchHorizontal, HiOutlineAnnotation,
  HiOutlineOfficeBuilding, HiOutlineChevronLeft, HiOutlineChevronRight
} from "react-icons/hi";

const DashboardSidebar = ({ collapsed, setCollapsed }) => {
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
    <aside
      className={`bg-slate-900/20 border-r border-white/5 transition-all duration-500 ease-in-out
      ${collapsed ? "w-24" : "w-72"} hidden md:flex flex-col h-full`}
    >
      <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
              }`
            }
          >
            <link.icon size={22} className={`${collapsed ? "mx-auto" : ""}`} />
            {!collapsed && (
              <span className="text-sm font-black tracking-wide">{link.name}</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Toggle */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"
        >
          {collapsed ? <HiOutlineChevronRight size={20}/> : <HiOutlineChevronLeft size={20}/>}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;