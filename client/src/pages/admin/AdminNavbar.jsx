import React from "react";
import {
  HiOutlineBell,
  HiOutlineMenuAlt3,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

const AdminNavbar = ({ setIsSidebarOpen, user }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#1A1D21] border-b border-white/5 px-4 py-3 lg:px-8">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div>
          <p className="text-lg text-orange-400 font-bold leading-none">{`Welcome, ${user?.fullName.charAt(0).toUpperCase() + user?.fullName.slice(1)}`}</p>
        </div>
        <div className="flex items-center">
          {/* 1. Language Switcher (Matches the dropdown in your image) */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
            <HiOutlineGlobeAlt
              className="text-slate-400 group-hover:text-white"
              size={16}
            />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hidden sm:block">
              Select Language
            </span>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-500 ml-1"></div>
          </button>

          {/* 2. Notifications (With the red badge from the image) */}
          <div className="relative group cursor-pointer p-2 hover:bg-white/5 rounded-full transition-all">
            <HiOutlineBell
              size={22}
              className="text-slate-400 group-hover:text-white"
            />
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-[#1A1D21] animate-pulse">
              91
            </span>
          </div>

          {/* 3. Mobile Menu Toggle (Visible on mobile only) */}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 bg-white/5 text-slate-400 hover:text-white rounded-lg transition-all"
          >
            <HiOutlineMenuAlt3 size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
