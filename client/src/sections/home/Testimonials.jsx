import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Roberts Ant",
    role: "Crypto Investor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The platform helped me grow my portfolio steadily with clear transparency and fast withdrawals.",
  },
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "I love the automated investment strategy. It saves me time while still producing consistent returns.",
  },
  {
    name: "Michael Chen",
    role: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "Professional risk management and accurate projections make this platform stand out.",
  },
  {
    name: "Aisha Bello",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "Customer support is excellent and the dashboard is extremely easy to use.",
  },
  {
    name: "David Williams",
    role: "Trader",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote: "Secure, reliable and well-structured investment plans. Highly recommended.",
  },
  {
    name: "Grace Kim",
    role: "Tech Consultant",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "I appreciate the transparency and performance tracking tools provided.",
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  /* Restored Auto-Scroll Logic */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let intervalId;

    const startScrolling = () => {
      intervalId = setInterval(() => {
        // Only scroll if the user isn't on a large screen (handled by grid)
        if (window.innerWidth < 1024) {
          const cardWidth = 350; // Match card width + gap
          container.scrollBy({ left: cardWidth, behavior: "smooth" });

          // Reset to start if at the end
          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 50
          ) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }
        }
      }, 4000);
    };

    startScrolling();

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-[#0F172A] py-32 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">
            Voice of Success
          </span>
          <h2 className="text-white text-4xl md:text-5xl font-black mt-4 tracking-tight">
            Investor Testimonials
          </h2>
        </div>

        {/* MOBILE/TABLET SLIDER - Auto Scroll Active */}
        <div
          ref={scrollRef}
          className="flex lg:hidden gap-8 overflow-x-auto pb-16 scrollbar-hide snap-x snap-mandatory"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[85%] bg-white rounded-[2.5rem] p-10 pt-16 relative shadow-2xl snap-center"
            >
              <div className="absolute -top-8 left-10 flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-2xl border-4 border-[#0F172A] object-cover shadow-2xl rotate-3"
                />
              </div>

              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5" />
                ))}
              </div>

              <p className="text-slate-600 mb-8 italic text-lg leading-relaxed font-medium">
                "{t.quote}"
              </p>

              <div>
                <h4 className="font-black text-slate-900 text-xl">{t.name}</h4>
                <span className="text-indigo-600 font-bold text-sm uppercase">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP GRID - Static & Premium */}
        <div className="hidden lg:grid grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2.5rem] p-10 pt-16 relative shadow-2xl group transition-all duration-500"
            >
              <div className="absolute -top-10 left-10 transition-transform duration-500 group-hover:-rotate-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 rounded-[2rem] border-[6px] border-[#0F172A] object-cover shadow-2xl shadow-indigo-500/20"
                />
              </div>

              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  />
                ))}
              </div>

              <p className="text-slate-600 mb-8 italic text-lg leading-relaxed font-medium">
                "{t.quote}"
              </p>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-black text-slate-900 text-xl tracking-tight">
                  {t.name}
                </h4>
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;