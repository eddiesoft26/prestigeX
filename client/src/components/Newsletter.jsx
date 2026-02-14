import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh

    // later we will send to backend here
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-20 text-center bg-brand-dark">
      <h2 className="text-3xl font-bold text-white mb-4">
        Subscribe to our Newsletter
      </h2>

      <p className="text-gray-400 mb-8">
        Get investment insights and platform updates.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center gap-4 items-center"
      >
        <input
          type="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg w-80 bg-white text-black border border-gray-300"
        />

        <button
          type="submit"
          className="bg-brand-accent px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
        >
          Subscribe
        </button>
      </form>

      {success && (
        <p className="text-green-400 mt-6">Subscription successful ✓</p>
      )}
    </section>
  );
};

export default Newsletter;
