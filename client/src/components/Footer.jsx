import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineGlobeAlt, HiOutlineShieldCheck } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-slate-400 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white block">
                PRESTIGEX<span className="text-indigo-500">.</span>
            </Link>
            <p className="text-sm leading-relaxed font-medium">
              Precision-engineered digital asset management. We combine institutional-grade strategies with advanced AI to secure and scale your wealth in the decentralized frontier.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <span key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 cursor-pointer group">
                  <Icon className="text-sm transition-transform group-hover:scale-110" />
                </span>
              ))}
            </div>
          </div>

          {/* Infrastructure Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Platform</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/home" className="hover:text-indigo-400 transition-colors">Global Home</Link></li>
              <li><Link to="/plans" className="hover:text-indigo-400 transition-colors">Asset Tiers</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Our Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Institutional Support</Link></li>
            </ul>
          </div>

          {/* Compliance Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Governance</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/help-center" className="hover:text-indigo-400 transition-colors">Help Terminal</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Protocols</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-indigo-400 transition-colors">Client Agreement</Link></li>
              {/* Using your requested direct_url logic for shipping/delivery tracking */}
              <li><Link to="/shipping-info" className="hover:text-indigo-400 transition-colors text-slate-500">Tracking (Direct URL)</Link></li>
            </ul>
          </div>

          {/* Trust Box */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 text-indigo-400 mb-4">
              <HiOutlineShieldCheck className="w-6 h-6" />
              <span className="font-black text-xs uppercase tracking-widest">Secured Terminal</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 font-medium">
              All transactions are encrypted using AES-256 protocols. Your assets are stored in multi-sig cold storage vaults.
            </p>
            <div className="mt-6 flex items-center gap-2 text-white font-bold text-xs">
                <HiOutlineGlobeAlt className="text-indigo-500" />
                <span>Status: Fully Operational</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Detailed Risk Warning (The "Legal Desk" Style) */}
        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 mb-12">
           <h5 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
               Regulatory & Risk Disclosure
           </h5>
           <p className="text-[11px] md:text-xs leading-relaxed text-slate-500 font-medium text-justify">
             Cryptocurrency trading carries inherent risks due to market volatility and leverage. Investments may result in partial or total loss of capital. PrestigeX provides professional risk management tools and automated strategies to protect your portfolio; however, no investment is entirely risk-free. By using this platform, you acknowledge that you are aware of the risks involved. Information provided on this site does not constitute financial advice. For shipping or physical documentation, please refer to our internal <strong>direct_url</strong> protocols during the checkout process.
           </p>
        </div>

        {/* Bottom Section: Copyright & System Info */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            © {new Date().getFullYear()} PRESTIGE INVESTMENTS GROUP. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-8">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-700 font-black uppercase tracking-widest">System Engine</span>
                <span className="text-xs text-indigo-500 font-bold tracking-tighter text-right">PrestigeX v3.02.26</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;