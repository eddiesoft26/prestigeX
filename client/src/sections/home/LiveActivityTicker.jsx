import React from "react";

const activities = [
  { name: "Michael A.", action: "earned", amount: "$1,240" },
  { name: "Sarah K.", action: "withdrawn", amount: "$3,500" },
  { name: "Daniel O.", action: "earned", amount: "$890" },
  { name: "Grace M.", action: "earned", amount: "$2,140" },
  { name: "John D.", action: "withdrawn", amount: "$4,600" },
  { name: "Aisha B.", action: "earned", amount: "$760" },
];

const LiveActivityTicker = () => {
  return (
    <section className="bg-[#0c0f14] py-6 overflow-hidden border-y border-gray-800">
      <div className="relative w-full">
        <div className="flex animate-scroll whitespace-nowrap gap-12">
          {[...activities, ...activities].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm md:text-base"
            >
              <span className="text-gray-400">{item.name}</span>

              <span className="text-white">
                {item.action === "earned" ? "earned" : "withdrawn"}
              </span>

              <span
                className={`font-semibold ${
                  item.action === "earned"
                    ? "text-green-400"
                    : "text-brand-blue"
                }`}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveActivityTicker;
