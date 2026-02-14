import { NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";

const MobileSidebar = ({ open, setOpen }) => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", end: true },
    { name: "Invest", path: "/dashboard/invest" },
    { name: "Withdraw", path: "/dashboard/withdraw" },
    { name: "Referrals", path: "/dashboard/referrals" },
    { name: "Transactions", path: "/dashboard/transactions" },
    { name: "Payment Proof", path: "/dashboard/payment-proof" },
  ];
  
  if (!open) return null;

  const linkClass = "block py-3 px-4 border-b border-white/10";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-black z-50 p-6 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-white">
            <HiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end} // Ensures Dashboard isn't always active
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `transition-all duration-300 px-4 py-3 rounded-xl flex items-center ${
                  isActive
                    ? "bg-brand-accent/10 text-brand-accent border-l-4 border-brand-accent"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
