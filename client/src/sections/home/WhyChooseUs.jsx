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
    icon: <HiOutlineChartBar className="w-10 h-10 text-teal-400" />,
    title: "Proven Track Record",
    description:
      "Our expert team has consistently delivered above-market returns, with a portfolio performance that outpaces traditional investment vehicles. We've helped thousands of investors achieve their financial goals through strategic crypto investments.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-10 h-10 text-teal-400" />,
    title: "Unmatched Security",
    description:
      "Your assets are our top priority. We employ military-grade encryption, multi-signature wallets, and cold storage solutions. Our security protocols are regularly audited by leading cybersecurity firms to ensure your investments are always protected.",
  },
  {
    icon: <HiOutlineLightBulb className="w-10 h-10 text-teal-400" />,
    title: "Expert Analysis",
    description:
      "Our team of crypto analysts and traders work around the clock, leveraging advanced AI and machine learning to identify market opportunities. We combine technical analysis with fundamental research to make informed investment decisions.",
  },
];

const stats = [
  {
    icon: <HiOutlineGlobe className="w-7 h-7 text-teal-400" />,
    value: "120+",
    label: "Countries Served",
  },
  {
    icon: <HiOutlineClock className="w-7 h-7 text-teal-400" />,
    value: "< 0.5s",
    label: "Average Execution Time",
  },
  {
    icon: <HiOutlineCurrencyDollar className="w-7 h-7 text-teal-400" />,
    value: "2M+",
    label: "Trades Executed",
  },
  {
    icon: <HiOutlineChartBar className="w-7 h-7 text-teal-400" />,
    value: "250+",
    label: "Trading Instruments",
  },
  {
    icon: <HiOutlineTrendingUp className="w-7 h-7 text-teal-400" />,
    value: "Up to 60%",
    label: "Annual ROI",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#0f172a] text-white py-24 px-6 md:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Why Choose Prestige Inv for Your Crypto Investments?
        </h2>
        <p className="text-gray-400 text-lg">
          Join the future of digital asset management with a team that's
          redefining crypto investment excellence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-8 hover:border-teal-500 transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            {stat.icon}
            <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      <PartnerLogoSlider />

    </section>
  );
};

export default WhyChoose;
