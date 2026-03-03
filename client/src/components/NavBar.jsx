import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  const linkStyle = (path) =>
    `relative flex items-center gap-2 font-bold transition-all duration-300 ${
      location.pathname === path
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/90 z-[100] border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <div onClick={handleHomeClick} className="cursor-pointer">
              <img
                src="logo.png"
                alt="Logo"
                className="w-30 font-black tracking-tighter text-slate-900"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 items-center">
            <li onClick={handleHomeClick} className={`cursor-pointer group ${linkStyle("/")}`}>
              Home
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </li>

            {/* COMPANY DROPDOWN */}
            <li 
              className="relative group"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className={`flex items-center gap-1 group font-bold text-slate-600 hover:text-indigo-600 transition-all`}>
                Company
                <HiChevronDown className={`transition-transform duration-300 ${isCompanyOpen ? "rotate-180 text-indigo-600" : ""}`} />
              </button>
              
              <div className={`absolute top-full -left-4 w-56 pt-4 transition-all duration-300 ${isCompanyOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                  <RouterLink 
                    to="/investment-options" 
                    className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                  >
                    Investment Options
                  </RouterLink>
                  <RouterLink 
                    to="/plans" 
                    className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                  >
                    Investment Plans
                  </RouterLink>
                </div>
              </div>
            </li>

            {/* MARKET ANALYSIS LINK */}
            <li>
              <RouterLink to="/market-analysis" className={`group ${linkStyle("/market-analysis")}`}>
                Market Analysis
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === "/market-analysis" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/about" className={`group ${linkStyle("/about")}`}>
                About Us
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/faq" className={`group ${linkStyle("/faq")}`}>
                Support
              </RouterLink>
            </li>

            {/* REAL ESTATE */}
            <li>
              <RouterLink to="/real-estate-page" className={`group ${linkStyle("/real-estate")}`}>
                <span className="relative">
                  Real Estate
                  <span className="absolute -top-3 -right-6 px-1.5 py-0.5 bg-indigo-600 text-[8px] text-white rounded font-black uppercase tracking-tighter animate-pulse">Hot</span>
                </span>
              </RouterLink>
            </li>

            {/* Action buttons */}
            <div className="flex items-center gap-3 ml-4">
              <RouterLink to="/auth?mode=login">
                <button className="px-5 py-2 text-slate-700 font-black hover:text-indigo-600 transition-all text-sm">
                  Member Login
                </button>
              </RouterLink>
              <RouterLink to="/auth?mode=register">
                <button className="px-7 py-3 bg-slate-900 text-white text-sm font-black rounded-2xl shadow-xl hover:bg-indigo-600 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest">
                  Join Now
                </button>
              </RouterLink>
            </div>
          </ul>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 hover:text-indigo-600 p-2">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col px-8 py-10 space-y-6 overflow-y-auto max-h-[80vh]">
            <li onClick={handleHomeClick} className="text-xl font-black text-slate-900">Home</li>
            
            <li className="flex flex-col gap-4 border-l-2 border-slate-100 pl-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Company</span>
              <RouterLink to="/investment-options" onClick={() => setIsOpen(false)} className="text-xl font-black text-slate-900">Investment Options</RouterLink>
              <RouterLink to="/plans" onClick={() => setIsOpen(false)} className="text-xl font-black text-slate-900">Investment Plans</RouterLink>
            </li>

            <li onClick={() => setIsOpen(false)}>
              <RouterLink to="/market-analysis" className="text-xl font-black text-slate-900">Market Analysis</RouterLink>
            </li>

            <li onClick={() => setIsOpen(false)}>
              <RouterLink to="/real-estate-page" className="text-xl font-black text-indigo-600 flex items-center gap-2">
                Real Estate <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded">NEW</span>
              </RouterLink>
            </li>

            <li onClick={() => setIsOpen(false)}>
              <RouterLink to="/about" className="text-xl font-black text-slate-900">About Our Firm</RouterLink>
            </li>
            
            <li onClick={() => setIsOpen(false)}>
              <RouterLink to="/faq" className="text-xl font-black text-slate-900">FAQ</RouterLink>
            </li>

            <div className="flex flex-col gap-4 pt-6">
              <RouterLink to="/auth?mode=login" onClick={() => setIsOpen(false)}>
                <button className="w-full py-4 border-2 border-slate-100 text-slate-900 font-black rounded-2xl">Member Login</button>
              </RouterLink>
              <RouterLink to="/auth?mode=register" onClick={() => setIsOpen(false)}>
                <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg">Get Started</button>
              </RouterLink>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;