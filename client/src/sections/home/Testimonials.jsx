import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Roberts Ant",
    role: "Crypto Investor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The platform helped me grow my portfolio steadily with clear transparency and fast withdrawals.",
  },
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I love the automated investment strategy. It saves me time while still producing consistent returns.",
  },
  {
    name: "Michael Chen",
    role: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote:
      "Professional risk management and accurate projections make this platform stand out.",
  },
  {
    name: "Aisha Bello",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Customer support is excellent and the dashboard is extremely easy to use.",
  },
  {
    name: "David Williams",
    role: "Trader",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "Secure, reliable and well-structured investment plans. Highly recommended.",
  },
  {
    name: "Grace Kim",
    role: "Tech Consultant",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "I appreciate the transparency and performance tracking tools provided.",
  },
];

const Testimonials = () => {
   const scrollRef = useRef(null);

  /* auto slide for mobile/tablet */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 320, behavior: "smooth" });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-brand-dark py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-14">
          Investor Testimonials
        </h2>

        {/* Mobile + Tablet slider */}
        <div
          ref={scrollRef}
          className="flex lg:hidden gap-8 overflow-x-auto pb-10"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="min-w-75 bg-gray-800 rounded-2xl p-8 pt-14 relative shadow-xl"
            >
              {/* floating avatar */}
              <img
                src={t.image}
                alt={t.name}
                className="absolute -top-10 left-6 w-20 h-20 rounded-full border-4 border-brand-blue object-cover shadow-lg"
              />

              <p className="text-gray-300 mb-4 leading-relaxed">
                "{t.quote}"
              </p>

              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-brand-blue text-sm">{t.role}</span>
            </motion.div>
          ))}
        </div>

        {/* Desktop grid premium */}
        <div className="hidden lg:grid grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-gray-800 rounded-2xl p-8 pt-14 relative shadow-xl hover:shadow-blue-500/20 transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="absolute -top-10 left-8 w-20 h-20 rounded-full border-4 border-brand-blue object-cover"
              />

              <p className="text-gray-300 mb-4 leading-relaxed">
                "{t.quote}"
              </p>

              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-brand-blue text-sm">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
