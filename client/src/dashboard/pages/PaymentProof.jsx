// dashboard/pages/PaymentProof.jsx
import { useState } from "react";

const PaymentProof = () => {
  const [file, setFile] = useState(null);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !reference) {
      setMessage("Please provide a reference and upload a file.");
      return;
    }

    // Here you would send the file + reference to your backend API
    console.log("File:", file);
    console.log("Reference:", reference);

    setMessage("Payment proof submitted successfully!");
    setFile(null);
    setReference("");
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Payment Proof</h2>
      <p className="text-gray-400">
        Upload a screenshot or document to confirm your deposit/payment.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 border border-white/20 rounded-2xl bg-white/5"
      >
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Transaction Reference</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Enter transaction ID or reference"
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Upload Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="text-gray-200"
          />
          {file && <span className="mt-1 text-sm text-green-400">{file.name}</span>}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Submit Proof
        </button>

        {message && <p className="text-green-400 mt-2">{message}</p>}
      </form>

      {/* Optional: Show previous uploads */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Previous Uploads</h3>
        <p className="text-gray-400 text-sm">You can track your submitted payment proofs here.</p>
        {/* Here you could map over user's previous submissions */}
      </div>
    </div>
  );
};

export default PaymentProof;
