// src/components/Navbar.jsx
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { openAuthModal } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
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
    `relative flex items-center gap-2 font-medium transition-colors duration-300 ${
      location.pathname === path
        ? "text-blue-500 underline decoration-blue-500 decoration-2"
        : "text-gray-300 hover:text-blue-500"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/70 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0">
            <div onClick={handleHomeClick} className="cursor-pointer">
              <img
                src="/src/assets/logo_1.png"
                alt="logo"
                className="w-24 sm:w-32 md:w-40"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li onClick={handleHomeClick} className={linkStyle("/")}>
              <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </li>

            <li>
              <RouterLink to="/plans" className={linkStyle("/plans")}>
                <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                Investment Plans
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/bonuses" className={linkStyle("/bonuses")}>
                <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                Bonuses
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/about" className={linkStyle("/about")}>
                <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                About Us
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/faq" className={linkStyle("/faq")}>
                <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                FAQ
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/contact" className={linkStyle("/contact")}>
                <span className="w-2 h-2 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                Contact
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </RouterLink>
            </li>

            {/* Action buttons */}
            <li>
              <RouterLink to="/auth?mode=login">
                <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
                  Login
                </button>
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/auth?mode=register">
                <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
                  Register
                </button>
              </RouterLink>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-500 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md overflow-hidden">
          <ul className="flex flex-col px-4 py-6 space-y-2">
            {/* same animation delays preserved manually */}
            <li
              onClick={handleHomeClick}
              className="px-2 py-3 animate-slide-in"
              style={{ animationDelay: "0ms" }}
            >
              Home
            </li>
            <li>
              <RouterLink
                to="/plans"
                className="px-2 py-3 animate-slide-in"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: "100ms" }}
              >
                Investment Plans
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/bonuses"
                className="px-2 py-3 animate-slide-in"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: "200ms" }}
              >
                Bonuses
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                className="px-2 py-3 animate-slide-in"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: "300ms" }}
              >
                About Us
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/faq"
                className="px-2 py-3 animate-slide-in"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: "400ms" }}
              >
                FAQ
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/contact"
                className="px-2 py-3 animate-slide-in"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: "500ms" }}
              >
                Contact
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/auth?mode=login"
                onClick={() => setIsOpen(false)}
              >
                <button className="px-8 py-3 cursor-pointer border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Login
                </button>
              </RouterLink>
            </li>

            <li>
              <RouterLink
                to="/auth?mode=register"
                onClick={() => setIsOpen(false)}
              >
                <button className="px-8 py-3 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
                  Register
                </button>
              </RouterLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
