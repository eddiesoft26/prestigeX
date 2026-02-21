import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2, Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const referralCodeFromUrl = searchParams.get("ref");
  const modeFromUrl = searchParams.get("mode");
  const [mode, setMode] = useState(modeFromUrl || "login");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    referralCode: "",
  });

  useEffect(() => {
    if (referralCodeFromUrl) {
      setFormData((prev) => ({ ...prev, referralCode: referralCodeFromUrl }));
    }
    if (modeFromUrl) setMode(modeFromUrl);
  }, [referralCodeFromUrl, modeFromUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let locationData = { ip: "", country: "" };
      try {
        // We use a free service to get the IP and Country Name
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        locationData = {
          ip: geoData.ip,
          country: geoData.country_name, // e.g., "Nigeria" or "United States"
        };
      } catch (err) {
        console.error("Geo lookup failed, proceeding without it.");
      }
      if (mode === "login") {
        const res = await login({
          email: formData.email,
          password: formData.password,
          ...locationData
        });
        if (res.success) {
          const userRole = res.user?.role || "USER";
          userRole === "ADMIN"
            ? navigate("/admin/dashboard")
            : navigate("/dashboard");
        }
      } else {
        const res = await register({...formData, ...locationData});
        if (res.success) {
          const userRole = res.user?.role || "USER";
          userRole === "ADMIN"
            ? navigate("/dashboard/admin/dashboard")
            : navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 py-10 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-2 relative z-10">
        {/* LEFT: FORM SECTION */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-indigo-600 mb-8 block"
            >
              PRESTIGEX<span className="text-slate-900">.</span>
            </Link>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {mode === "login" ? "Welcome Back" : "Start Your Journey"}
            </h2>
            <p className="text-slate-500 font-medium">
              {mode === "login"
                ? "Access your secure investment dashboard."
                : "Join thousands of global investors today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-slate-100 border-2 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border-slate-100 border-2 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Secure Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-slate-100 border-2 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg tracking-wide transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-4 ${
                isLoading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:bg-indigo-600 hover:shadow-indigo-500/20"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : mode === "login" ? (
                "Authorize Login"
              ) : (
                "Create Secure Account"
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-bold text-sm">
              {mode === "login" ? "New to PrestigeX?" : "Already a member?"}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="ml-2 text-indigo-600 font-black hover:underline underline-offset-4"
              >
                {mode === "login" ? "Create an account" : "Sign in to portal"}
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT: VIDEO SECTION */}
        <div className="relative hidden lg:block bg-slate-900">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source
              src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771155170/signup-login_lee8nh.mp4"
              type="video/mp4"
            />
          </video>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <div className="flex justify-end">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                <ShieldCheck className="text-indigo-400 w-8 h-8" />
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  Institutional Grade Security
                </span>
              </div>
              <h3 className="text-white text-2xl font-black mb-4 leading-tight">
                Securely trade and manage assets with military-grade encryption.
              </h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Join our expert trading community and leverage live market
                strategies discussed by global professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL AUTH OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center text-white p-6">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
            <Lock className="absolute inset-0 m-auto text-indigo-500 w-8 h-8 animate-pulse" />
          </div>
          <p className="mt-8 text-xl font-black tracking-widest uppercase text-white">
            Securely Authenticating
          </p>
          <p className="text-slate-400 mt-2 font-medium">
            Connecting to PrestigeX encrypted servers...
          </p>
        </div>
      )}
    </div>
  );
}
