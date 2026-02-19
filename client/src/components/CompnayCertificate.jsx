import React from "react";
import { HiOutlineDownload, HiOutlineBadgeCheck, HiOutlineShieldCheck } from "react-icons/hi";

const CompanyCertificate = () => {
  // Keeping your logic intact
  const certificateUrl = "https://res.cloudinary.com/<your-cloud-name>/image/upload/v1234567890/certificate.pdf"; 

  return (
    <section className="bg-[#0F172A] py-24 relative overflow-hidden">
      
      {/* Background radial glow to make the document 'pop' */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header with Trust Badges */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
            <HiOutlineBadgeCheck className="w-5 h-5" />
            Verified & Regulated
          </div>
          <h2 className="text-4xl md:text-5xl text-white font-black mb-4 tracking-tight">
            Legal Transparency
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            PrestigeX is a fully registered entity. Our operations are governed by international financial standards to ensure your peace of mind.
          </p>
        </div>

        {/* Certificate Presentation Layer */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          
          {/* Document Preview with 3D Effect */}
          <div className="relative group perspective-1000">
            {/* The "Golden" Glow behind the paper */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-indigo-500/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 transform group-hover:rotate-1 group-hover:scale-[1.02]">
              <img
                src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1771516436/company-cert_g6qb3g.png"
                alt="PrestigeX Certificate of Incorporation"
                className="w-full h-auto object-cover"
              />
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                 <div className="bg-white text-slate-900 p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                    <HiOutlineShieldCheck className="w-8 h-8" />
                 </div>
              </div>
            </div>
          </div>

          {/* Details & Action */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm">
            <div className="mb-8 space-y-6">
                <div>
                    <h4 className="text-white font-bold text-xl mb-2">Certificate of Incorporation</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Issued by the Registrar of Companies, verifying our legal status as a licensed digital asset management firm.
                    </p>
                </div>
                <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <HiOutlineShieldCheck className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span>Securely stored on Cloudinary &copy;</span>
                </div>
            </div>

            <a
              href={certificateUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white hover:bg-indigo-600 text-slate-900 hover:text-white font-black px-10 py-5 rounded-2xl shadow-xl transition-all duration-300 transform active:scale-95"
            >
              <HiOutlineDownload className="w-6 h-6 group-hover:animate-bounce" />
              Download Official PDF
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyCertificate;