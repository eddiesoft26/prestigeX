import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// 1. Import the icon from lucide-react
import { Loader2 } from "lucide-react"; 

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
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

  const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    referralCode: "",
  };

  useEffect(() => {
    if (referralCodeFromUrl) {
      setFormData((prev) => ({
        ...prev,
        referralCode: referralCodeFromUrl,
      }));
    }
    if (modeFromUrl) {
      setMode(modeFromUrl);
    }
  }, [referralCodeFromUrl, modeFromUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        const res = await login({
          email: formData.email,
          password: formData.password,
        });
        if (res.success) {
          setFormData(initialFormData);
          const userRole = res.user?.role || "USER";
          userRole === "ADMIN" ? navigate("/admin/dashboard") : navigate("/dashboard");
        }
      } else {
        const res = await register(formData);
        if (res.success) {
          setFormData(initialFormData);
          const userRole = res.user?.role || "USER";
          userRole === "ADMIN" ? navigate("/dashboard/admin/dashboard") : navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-black px-4 py-10">
      <div className="w-200 max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <input
                name="fullName"
                placeholder="FullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            {/* ONLY ONE BUTTON HERE NOW */}
            <button 
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center ${
                isLoading ? "opacity-80 cursor-not-allowed" : "hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="ml-2 text-indigo-600 font-semibold"
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>

        {/* VIDEO SECTION */}
        <div className="relative h-64 md:h-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dyjvi61hm/video/upload/v1771155170/signup-login_lee8nh.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <p className="text-white text-lg font-semibold">
              Our trading experts discussing live market strategies.
            </p>
          </div>
        </div>
      </div>

      {/* OVERLAY SPINNER */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium animate-pulse text-indigo-400">
            Authenticating with PrestigeX...
          </p>
        </div>
      )}
    </div>
  );
}