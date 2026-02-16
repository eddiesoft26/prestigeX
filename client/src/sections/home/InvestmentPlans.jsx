import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const plans = [
  {
    name: "Starter Plan",
    price: "$500 Min",
    roi: "Up to 15% ROI",
    duration: "24hrs",
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
    price: "$1,000 Min",
    roi: "Up to 35% ROI",
    duration: "24hrs",
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
    price: "$5,000 Min",
    roi: "Up to 50% ROI",
    duration: "24hrs",
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
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const handleInitialScroll = () => {
      if (window.innerWidth < 768 && highlightedRef.current) {
        const container = highlightedRef.current.parentElement;
        const element = highlightedRef.current;

        // Calculate the center position within the div only
        const scrollLeft =
          element.offsetLeft -
          container.clientWidth / 2 +
          element.clientWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth", // Use smooth for a nice feel
        });
      }
    };

    handleInitialScroll();
  }, []);
  return (
    <section className="bg-[#0a0a0b] text-white py-24 px-6 md:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Investment Plans
        </h2>
        <p className="text-gray-400 text-lg">
          Choose a plan that aligns with your investment goals and start growing
          your portfolio today.
        </p>
      </div>

      {/* Plans */}
      <div
        className="/* Mobile: Scrollable Row */
          flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8
          /* Desktop: Static Grid-like Row */
          md:overflow-x-visible md:snap-none md:flex-row md:justify-center md:items-center
        "
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            ref={plan.highlighted ? highlightedRef : null}
            className={`rounded-2xl p-10 border transition min-w-[65%] md:min-w-0 md:w-1/3 snap-center ${
              plan.highlighted
                ? "bg-[#0f172a] border-teal-500 scale-105 shadow-2xl"
                : "bg-[#0b1220] border-gray-800 hover:border-teal-500"
            }`}
          >
            {plan.highlighted && (
              <div className="mb-4 text-center text-teal-400 text-sm uppercase tracking-wider">
                <Link to="/auth?mode=register">Most Popular</Link>
              </div>
            )}

            <h3 className="text-2xl font-semibold text-center mb-6">
              {plan.name}
            </h3>

            <div className="text-center mb-6">
              <p className="text-3xl font-bold">{plan.price}</p>
              <p className="text-teal-400 mt-2">{plan.roi}</p>
              <p className="text-gray-400 text-sm">{plan.duration}</p>
            </div>

            <ul className="space-y-3 mb-8 text-gray-300 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
            <Link to="/auth?mode=register">
              <button
                onClick={() => openAuthModal("login")}
                className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
                  plan.highlighted
                    ? "bg-teal-500 hover:bg-teal-600 text-black"
                    : "border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black"
                }`}
              >
                Invest Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentPlans;
