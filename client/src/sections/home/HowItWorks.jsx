
import {
  HiOutlineUserAdd,
  HiOutlineCreditCard,
  HiOutlineChartSquareBar,
  HiOutlineCash,
} from "react-icons/hi";

const steps = [
  {
    icon: <HiOutlineUserAdd className="w-10 h-10 text-teal-400" />,
    title: "Create Your Account",
    description:
      "Sign up in minutes and complete a simple verification process to secure your investment account.",
  },
  {
    icon: <HiOutlineCreditCard className="w-10 h-10 text-teal-400" />,
    title: "Fund Your Wallet",
    description:
      "Deposit crypto or fiat securely using our trusted payment partners and encrypted channels.",
  },
  {
    icon: <HiOutlineChartSquareBar className="w-10 h-10 text-teal-400" />,
    title: "Choose Investment Plan",
    description:
      "Select from professionally managed portfolios tailored to different risk levels and investment goals.",
  },
  {
    icon: <HiOutlineCash className="w-10 h-10 text-teal-400" />,
    title: "Earn & Withdraw",
    description:
      "Monitor your portfolio growth in real time and withdraw your earnings whenever you choose.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#020617] text-white py-24 px-6 md:px-20">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How Prestige Inv Works
        </h2>
        <p className="text-gray-400 text-lg">
          Start investing in digital assets in just a few simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-4 gap-10 relative">

        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8 text-center hover:border-teal-500 transition"
          >
            <div className="flex justify-center mb-5">{step.icon}</div>

            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default HowItWorks;
