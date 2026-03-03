import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react"; // Added useRef
import api from "../../api/axios";
import { HiCloudUpload } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast"; // Added toast

const PaymentProof = () => {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [reference, setReference] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const topRef = useRef(null); // Reference for scrolling

  const investmentIdFromUrl = searchParams.get("id");

  const { data: latestInvestments, isLoading } = useQuery({
    queryKey: ["latestPending"],
    queryFn: () => api.get("/fiat/pending-investments").then((res) => res.data),
    enabled: !investmentIdFromUrl,
  });

  const targetId =
    investmentIdFromUrl ||
    (Array.isArray(latestInvestments)
      ? latestInvestments[0]?.id
      : latestInvestments?.id);

  // Helper to ensure user sees notifications on mobile
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(selectedFile);
      const newPreviewUrl = URL.createObjectURL(selectedFile);
      setPreview(newPreviewUrl);
      toast.success("Image selected successfully!"); // Added feedback
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      scrollToTop();
      return toast.error("Please select a file first!"); // Replaced alert
    }
    if (!targetId) {
      scrollToTop();
      return toast.error("No active investment found."); // Replaced alert
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("reference", targetId);
    formData.append("transactionHash", reference);

    try {
      const res = await api.post("/fiat/upload-proof", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        scrollToTop();
        toast.success("Proof submitted! Admin will verify your payment."); // Replaced alert
        setFile(null);
        setPreview(null);
        setReference("");
      }
    } catch (err) {
      console.error("Full Error:", err);
      scrollToTop();
      toast.error(
        err.response?.data?.message || err.message || "Upload failed.",
      ); // Replaced alert
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div ref={topRef} className="max-w-3xl mx-auto p-4 space-y-8">
      {/* 1. Global Toaster with Galaxy Theme */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 90,
        }}
        toastOptions={{
          style: {
            background: "#0F172A",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />

      <div className="text-left">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          Submit Proof
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
          Upload your transaction receipt for verification
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">
            Upload Receipt
          </label>
          <div
            className={`mt-2 border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${
              file
                ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />

            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-48 w-full max-w-62.5 rounded-2xl object-cover shadow-2xl border border-white/10"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">
                    Change Photo
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-full bg-white/5 mb-4">
                  <HiCloudUpload size={32} className="text-blue-500" />
                </div>
                <p className="text-sm text-gray-300 font-semibold text-center">
                  Drop your screenshot here
                </p>
                <p className="text-[10px] text-gray-500 uppercase mt-2 font-bold tracking-tighter">
                  PNG or JPG (Max 5MB)
                </p>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading || isLoading || !file}
          className={`
            w-full mt-4 p-5 rounded-2xl font-extrabold uppercase tracking-[0.15em] text-sm
            transition-all duration-300 transform active:scale-[0.98]
            ${
              isUploading || isLoading || !file
                ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                : "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            }
          `}
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Submit for Verification"
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentProof;
