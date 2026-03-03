import {
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineArrowTrendingUp,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import ScrollReveal from "../../components/ScrollAnimation";
import PartnerLogoSlider from "../../components/PartnersLogoSlider";

const features = [
  {
    icon: <HiOutlineChartBar className="w-8 h-8 text-indigo-600" />,
    title: "Proven Interstellar Performance",
    description: "Our proprietary algorithms and expert management team consistently navigate market volatility to deliver alpha-level returns that exceed traditional benchmarks.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-8 h-8 text-indigo-600" />,
    title: "Galactic-Grade Security",
    description: "Your assets are protected by a multi-layered fortress of military-grade AES-256 encryption, multi-sig cold storage, and comprehensive insurance coverage for total peace of mind.",
  },
  {
    icon: <HiOutlineLightBulb className="w-8 h-8 text-indigo-600" />,
    title: "AI-Driven Deep Space Insights",
    description: "Harness the power of neural networks. Our 24/7 fundamental research and AI-driven sentiment analysis spot opportunities before they hit the mainstream horizon.",
  },
  {
    icon: <HiOutlineRocketLaunch className="w-8 h-8 text-indigo-600" />,
    title: "Rapid Liquidity Access",
    description: "Galaxy provides deep order books and instant settlement, ensuring you can enter or exit positions in the blink of an eye without significant price slippage.",
  },
];

const stats = [
  { icon: <HiOutlineGlobeAlt className="w-6 h-6 text-indigo-500" />, value: "120+", label: "Global Nodes" },
  { icon: <HiOutlineClock className="w-6 h-6 text-indigo-500" />, value: "< 0.3ms", label: "Latency" },
  { icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-indigo-500" />, value: "$5B+", label: "Assets Managed" },
  { icon: <HiOutlineUserGroup className="w-6 h-6 text-indigo-500" />, value: "500k+", label: "Active Users" },
  { icon: <HiOutlineArrowTrendingUp className="w-6 h-6 text-indigo-500" />, value: "72%", label: "Avg. Yearly ROI" },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#f8fafc] text-slate-900 py-16 md:py-32 px-4 md:px-10 lg:px-20 overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 lg:mb-24 text-center lg:text-left">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            The Galaxy Advantage
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-slate-900 lg:max-w-4xl">
            Why Forward-Thinking Investors Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
              Galaxy
            </span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed mx-auto lg:mx-0 mb-10">
            In an ever-expanding digital economy, Galaxy serves as your North
            Star. We combine institutional-grade infrastructure with a
            user-centric experience to simplify the complexities of the
            blockchain frontier.
          </p>

          {/* MOBILE/TABLET ONLY IMAGE: Placed immediately after text */}
          <div className="lg:hidden w-full mb-12 animate-fadeIn">
             <div className="relative group overflow-hidden rounded-[2rem] border border-white shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771864388/cdc_home_exchangehero_usd_aysmtm.webp"
                  alt="Galaxy Advanced Trading Screen"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 text-left">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Live Terminal View</p>
                  <p className="text-[10px] text-slate-500">Real-time order books & deep liquidity depth.</p>
                </div>
             </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-28">
        
        {/* LEFT: Dual Image Grid - Second image is hidden on mobile here because it's moved up */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 order-2 lg:order-1">
          {/* Main Dashboard Image */}
          <div className="relative group overflow-hidden rounded-[2rem] border border-white shadow-2xl">
            <div className="absolute inset-0 bg-indigo-500/5 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
            <img
              src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771404155/jakub-zerdzicki-eGI0aGwuE-A-unsplash_mgw2fv.jpg"
              alt="Galaxy Interface"
              className="w-full h-[300px] md:h-[400px] object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          {/* DESKTOP ONLY: Second Image */}
          <div className="hidden lg:block relative group overflow-hidden rounded-[2rem] border border-white shadow-2xl lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
            <img
              src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771864388/cdc_home_exchangehero_usd_aysmtm.webp"
              alt="Galaxy Advanced Trading Screen"
              className="w-full h-[300px] md:h-[400px] object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/50">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Live Terminal View</p>
              <p className="text-[10px] text-slate-500">Real-time order books & deep liquidity depth.</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Features List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 order-1 lg:order-2">
          {features.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="left">
              <div className="flex items-start gap-6 group">
                <div className="shrink-0 p-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] py-16 px-8 border border-white/60 shadow-inner">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100/50 rounded-full mb-4">{stat.icon}</div>
                <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{stat.value}</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-10">Trusted by Global Infrastructure Providers</p>
        <PartnerLogoSlider />
      </div>
    </section>
  );
};

export default WhyChoose;