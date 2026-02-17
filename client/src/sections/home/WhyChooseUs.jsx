import {
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineGlobe,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import ScrollReveal from "../../components/ScrollAnimation";
import PartnerLogoSlider from "../../components/PartnersLogoSlider";

const features = [
  {
    icon: <HiOutlineChartBar className="w-8 h-8 text-indigo-600" />,
    title: "Proven Track Record",
    description: "Expert team delivering above-market returns consistently.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-8 h-8 text-indigo-600" />,
    title: "Unmatched Security",
    description: "Military-grade encryption and audited cold storage solutions.",
  },
  {
    icon: <HiOutlineLightBulb className="w-8 h-8 text-indigo-600" />,
    title: "Expert Analysis",
    description: "AI-driven market insights and 24/7 fundamental research.",
  },
];

const stats = [
  { icon: <HiOutlineGlobe className="w-6 h-6 text-indigo-500" />, value: "120+", label: "Countries" },
  { icon: <HiOutlineClock className="w-6 h-6 text-indigo-500" />, value: "< 0.5s", label: "Execution" },
  { icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-indigo-500" />, value: "2M+", label: "Trades" },
  { icon: <HiOutlineChartBar className="w-6 h-6 text-indigo-500" />, value: "250+", label: "Assets" },
  { icon: <HiOutlineTrendingUp className="w-6 h-6 text-indigo-500" />, value: "60%", label: "Max ROI" },
];

const WhyChoose = () => {
  return (
    // Sophisticated soft background
    <section className="bg-[#f8fafc] text-slate-900 py-24 px-6 md:px-20 overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
          Why Choose PrestigeX?
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
          Join the future of digital asset management with a team that's
          redefining investment excellence through technology.
        </p>
      </div>

      {/* Main Content: Image & Features Toggle */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center mb-28">
        
        {/* LEFT: Image Container (Responsive: Top on Mobile, Left on Desktop) */}
        <div className="w-full lg:w-1/2 relative group animate-fadeIn">
            {/* Decorative Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl">
                <img 
                    src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771404155/jakub-zerdzicki-eGI0aGwuE-A-unsplash_mgw2fv.jpg" 
                    alt="PrestigeX Dashboard Preview" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                />
            </div>
        </div>

        {/* RIGHT: Features List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md border border-white rounded-3xl p-8 flex items-start gap-6 shadow-xl shadow-slate-200/40 hover:bg-white hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <div className="shrink-0 p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats - Floating Pill Layout */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] py-12 px-6 md:px-12 shadow-sm border border-slate-100 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              <div className="text-indigo-500 mb-1">{stat.icon}</div>
              <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h4>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <PartnerLogoSlider />
      </div>
    </section>
  );
};

export default WhyChoose;