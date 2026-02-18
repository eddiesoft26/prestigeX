import {
  HiOutlinePencilAlt,
  HiOutlineMenu, // Use this instead of HiOutlineListBullet
  HiOutlineCreditCard,
  HiOutlineBriefcase,
  HiOutlineLogout,
  HiOutlineMail,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
} from "react-icons/hi";
const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, logout }) => {
  const menuItems = [
      { id: "users", label: "List Users", icon: HiOutlineUsers },
    { id: "create-wallets", label: "Create Wallets", icon: HiOutlinePencilAlt },
    { id: "trading-plans", label: "List Trading Plans", icon: HiOutlineMenu }, // Fixed
    { id: "investments", label: "List Investments", icon: HiOutlineMenu }, // Fixed
    { id: "referrals", label: "List Referrals", icon: HiOutlineMenu },
    { id: "cards", label: "List Cards", icon: HiOutlineMenu },
    { id: "investment-plans", label: "Investment Plans", icon: HiOutlineMenu },
    {
      id: "payment-wallets",
      label: "List Payment Wallets",
      icon: HiOutlineMenu,
    },
    { id: "withdrawals", label: "Withdrawals", icon: HiOutlineCurrencyDollar },
    { id: "send-email", label: "Send Email", icon: HiOutlineMail },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-full w-72 bg-[#1A1D21] z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col border-r border-white/5
      `}
      >
        {/* 1. ADMIN PROFILE SECTION */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 to-amber-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1A1D21] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white/10" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">
                Admin
              </h3>
              <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">
                  Online
                </span>
                <span className="ml-2 text-[10px] text-slate-500">admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-8 py-4 transition-all group
                ${activeTab === item.id ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5"}
              `}
            >
              <div
                className={`
                p-2 rounded-lg transition-colors
                ${activeTab === item.id ? "bg-white/10 text-white" : "bg-white/5 text-slate-500 group-hover:text-white"}
              `}
              >
                <item.icon size={18} />
              </div>
              <span className="text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* 3. SIGN OUT SECTION */}
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white transition-colors group" onClick={logout}>
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
              <HiOutlineLogout size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
