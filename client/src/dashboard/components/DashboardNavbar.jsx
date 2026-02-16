import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiMenu } from "react-icons/hi";

const DashboardNavbar = ({ setMobileOpen }) => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", end: true },
    { name: "Invest", path: "/dashboard/invest" },
    { name: "Withdraw", path: "/dashboard/withdraw" },
    { name: "Referrals", path: "/dashboard/referrals" },
    { name: "Transactions", path: "/dashboard/transactions" },
    { name: "Payment Proof", path: "/dashboard/payment-proof" }, // Fixed unique path
  ];

  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "??"; // Fallback if name is missing

    // 1. Split by spaces, 2. Filter out extra spaces, 3. Map to first letter
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase(); // Just "E" for "Edwin"
    }

    // Gets first letter of first name and first letter of last name
    const firstInitial = parts[0].charAt(0);
    const lastInitial = parts[parts.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-black/60 backdrop-blur-md border-b border-white/10">
      {/* Mobile menu button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileOpen(true)}
      >
        <HiMenu />
      </button>

      <div className="font-bold text-xl">
        {" "}
        <img
          src="logo.png"
          alt="prestige-logo"
          width={200}
          className="max-sm: w-35"
        />
      </div>

      <nav className="hidden md:flex gap-6 max-lg:gap-3 max-lg: text-xs">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.end} // This prevents the Dashboard from staying active
            className={({ isActive }) =>
              `transition-all duration-300 px-3 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "text-brand-accent border-b-2 border-brand-accent"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
          {getInitials(user?.fullName)}
        </div>

        <button onClick={logout} className="px-4 py-2 bg-red-500 rounded-lg">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
