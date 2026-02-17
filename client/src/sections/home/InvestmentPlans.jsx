import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiCheckCircle, HiArrowSmRight } from "react-icons/hi"; 

const plans = [
  {
    name: "Starter Plan",
    range: "$100 - $999",
    roi: "15% ROI",
    duration: "24 Hours Term",
    features: [
      "Automated portfolio management",
      "24/7 market monitoring",
      "Secure asset storage",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    name: "Premium Plan",
    range: "$1,000 - $4,999",
    roi: "35% ROI",
    duration: "24 Hours Term",
    features: [
      "Advanced AI-driven trading",
      "Priority transaction processing",
      "Dedicated account manager",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Pro/Ultimate Plan",
    range: "$5,000 & Above",
    roi: "50% ROI",
    duration: "24 Hours Term",
    features: [
      "Institutional-grade strategies",
      "Private portfolio advisory",
      "Exclusive trading opportunities",
      "VIP 24/7 support",
    ],
    highlighted: false,
  },
];

const InvestmentPlans = () => {
  const highlightedRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const { openAuthModal } = useAuth();

  useEffect(() => {
    if (window.innerWidth < 768 && highlightedRef.current) {
      const container = containerRef.current;
      const element = highlightedRef.current;
      const scrollLeft =
        element.offsetLeft -
        container.clientWidth / 2 +
        element.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "auto" });
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.8));
      setActiveIndex(index);
    }
  };

  return (
    // THICKER BACKGROUND: Using a deeper Slate-200/Indigo-100 mix
    <section className="bg-[#E2E8F0] text-slate-900 py-24 overflow-hidden relative">
      
      {/* Abstract Background Shapes for Sophistication */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
          Investment Plans
        </h2>
        <p className="text-slate-600 text-lg font-medium">
          Tailored wealth management solutions for every stage of your crypto journey.
        </p>
      </div>

      {/* Plans Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative z-10 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pb-12 px-10 md:overflow-x-visible md:snap-none md:flex-row md:justify-center md:items-stretch md:px-20 max-w-7xl mx-auto"
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            ref={plan.highlighted ? highlightedRef : null}
            className={`relative rounded-[3rem] p-12 transition-all duration-500 min-w-[85%] md:min-w-0 md:w-1/3 snap-center flex flex-col ${
              plan.highlighted
                ? "bg-slate-900 text-white scale-105 shadow-[0_40px_80px_-15px_rgba(30,41,59,0.5)] z-20"
                : "bg-white border border-white shadow-xl shadow-slate-300/50 hover:-translate-y-2"
            }`}
          >
            {/* "Most Popular" Label */}
            {plan.highlighted && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase tracking-[0.3em] font-black px-8 py-2.5 rounded-full shadow-xl">
                Recommended
              </div>
            )}

            <div className="mb-10 text-center">
              <h3 className={`text-sm uppercase tracking-[0.2em] font-black mb-4 ${plan.highlighted ? "text-indigo-400" : "text-indigo-600"}`}>
                {plan.name}
              </h3>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black tracking-tight">{plan.range}</span>
                <span className={`text-lg font-bold ${plan.highlighted ? "text-indigo-300" : "text-emerald-600"}`}>
                    {plan.roi} Fixed
                </span>
              </div>
            </div>

            <div className={`h-px w-full mb-10 ${plan.highlighted ? "bg-slate-800" : "bg-slate-100"}`}></div>

            <ul className="space-y-5 mb-12 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-sm font-semibold">
                  <HiCheckCircle className={`w-6 h-6 shrink-0 ${plan.highlighted ? "text-indigo-400" : "text-indigo-600"}`} />
                  <span className={plan.highlighted ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
                <Link to="/auth?mode=register" className="block w-full">
                  <button
                    className={`group w-full py-5 rounded-2xl font-black transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                        : "bg-slate-900 text-white hover:bg-indigo-600"
                    }`}
                  >
                    Get Started <HiArrowSmRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <p className={`text-center text-[10px] font-bold uppercase tracking-widest mt-6 ${plan.highlighted ? "text-slate-500" : "text-slate-400"}`}>
                    Settlement: {plan.duration}
                </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (Mobile) */}
      <div className="flex justify-center gap-3 mt-4 md:hidden">
        {plans.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-10 bg-indigo-600" : "w-2 bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default InvestmentPlans;