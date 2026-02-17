import {
  HiOutlineUserAdd,
  HiOutlineCreditCard,
  HiOutlineChartSquareBar,
  HiOutlineCash,
} from "react-icons/hi";

const steps = [
  {
    icon: <HiOutlineUserAdd className="w-10 h-10" />,
    title: "Create Your Account",
    description: "Sign up in minutes and complete a simple verification process to secure your account.",
  },
  {
    icon: <HiOutlineCreditCard className="w-10 h-10" />,
    title: "Fund Your Wallet",
    description: "Deposit crypto or fiat securely using our trusted payment partners and encrypted channels.",
  },
  {
    icon: <HiOutlineChartSquareBar className="w-10 h-10" />,
    title: "Choose Investment Plan",
    description: "Select professionally managed portfolios tailored to your specific financial goals.",
  },
  {
    icon: <HiOutlineCash className="w-10 h-10" />,
    title: "Earn & Withdraw",
    description: "Monitor your portfolio growth in real time and withdraw earnings whenever you choose.",
  },
];

const HowItWorks = () => {
  return (
    // Slightly deeper background than WhyChoose to create a "Section Sandwich" effect
    <section className="bg-[#f1f5f9] text-slate-900 py-24 px-6 md:px-20 relative overflow-hidden">
      
      {/* Background Decoration: Sophisticated Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
        <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm bg-indigo-50 px-4 py-2 rounded-full">
            The Process
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 tracking-tight">
          How PrestigeX Works
        </h2>
        <p className="text-slate-600 text-lg">
          Start investing in digital assets in just a few simple, secure steps.
        </p>
      </div>

      {/* Steps Container */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* The Connector Line (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-indigo-200 -translate-y-1/2 z-0"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white/70 backdrop-blur-md border border-white rounded-[2rem] p-8 group hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 z-10"
          >
            {/* Step Number Indicator */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-300">
              0{index + 1}
            </div>

            <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>

            <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-indigo-600 transition-colors">
              {step.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Call to Action */}
      <div className="text-center mt-16 relative z-10">
          <p className="text-slate-500 text-sm font-medium mb-4">
              Ready to take the first step towards financial freedom?
          </p>
          <button className="text-indigo-600 font-bold hover:underline underline-offset-8">
              Open your account today &rarr;
          </button>
      </div>
    </section>
  );
};

export default HowItWorks;