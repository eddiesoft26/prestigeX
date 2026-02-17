const RealEstateTech = () => {
    const steps = [
        { title: "Acquisition", desc: "Data-driven scouting of prime urban locations." },
        { title: "Enhancement", desc: "Strategic renovation to force appreciation." },
        { title: "Management", desc: "Full-service boutique tenant management." },
        { title: "Distribution", desc: "Passive rental dividends paid monthly." }
    ];

    return (
        <section className="bg-[#0F172A] py-24 px-6 relative">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div>
                    <h2 className="text-white text-4xl md:text-5xl font-black mb-8 leading-tight">
                        A Legacy of <br />
                        <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Physical Excellence.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 font-medium">
                        While others trade pixels, we build skylines. PrestigeX Real Estate Division has managed over 140+ premium properties, providing a physical anchor to your digital wealth.
                    </p>
                    
                    <div className="space-y-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="text-indigo-500 font-black text-2xl opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                                    <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* The "Blueprint" Image */}
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" 
                            alt="Luxury Estate" 
                            className="w-full h-[600px] object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay"></div>
                    </div>
                    
                    {/* Floating Info Tag */}
                    <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs hidden md:block">
                        <p className="text-slate-900 font-black text-sm mb-2 uppercase tracking-tighter italic">"Most Marvelous Portfolio 2025"</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase leading-relaxed">
                            Recognized by the Global Real Estate Board for excellence in diversified asset management.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RealEstateTech
