import React from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Users,
  CreditCard,
  RefreshCw,
} from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Top Banner Accent */}
        <div className="h-2 bg-blue-600 w-full"></div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-gray-500 font-medium">
              Last Updated: February 15, 2026
            </p>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Section 1: User Agreement */}
            <section className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" /> User Agreement
                </h2>
                <p className="text-gray-600">
                  By creating an account on{" "}
                  <span className="text-blue-600 font-semibold">PrestigeX</span>
                  , you agree to abide by these terms. You must be of legal age
                  in your country to participate in our investment plans.
                </p>
              </div>
            </section>

            {/* Section 2: Investment & Returns */}
            <section className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Investment & Returns
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    ROI (Return on Investment) is generated based on the
                    specific plan selected.
                  </li>
                  <li className="text-amber-700 font-medium italic">
                    All investments carry an inherent risk; users should perform
                    their own due diligence before committing capital.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Proof of Payment */}
            <section className="flex gap-4 p-6 bg-red-50 rounded-xl border border-red-100">
              <div className="shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Proof of Payment
                </h2>
                <p className="text-red-700 mb-2">
                  Users must upload a valid, clear screenshot of their
                  transaction to the portal.
                </p>
                <p className="text-sm text-red-600 font-semibold">
                  Note: Attempting to defraud the system with fake receipts will
                  result in a permanent ban.
                </p>
              </div>
            </section>

            {/* Section 4: Referral & Commissions */}
            <section className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Referral & Commissions
                </h2>
                <p className="text-gray-600">
                  Our 10% referral commission is a reward for genuine growth.
                  Commissions are only released once the referral's investment
                  has been{" "}
                  <span className="font-bold">verified and approved</span> by an
                  administrator.
                </p>
              </div>
            </section>

            {/* Section 5: Withdrawals */}
            <section className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Withdrawals
                </h2>
                <p className="text-gray-600">
                  Withdrawal requests are processed according to the timeline
                  specified in your dashboard. Ensure your wallet address is
                  correct; PrestigeX is not responsible for funds sent to
                  incorrectly provided addresses.
                </p>
              </div>
            </section>

            {/* Section 6: Amendments */}
            <section className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />{" "}
                  Amendments
                </h2>
                <p className="text-gray-600">
                  PrestigeX reserves the right to modify these terms at any
                  time. Continued use of the platform after changes constitutes
                  acceptance of the new terms.
                </p>
              </div>
            </section>
          </div>

          {/* Accept Button Style (Optional UI element) */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 mb-6 italic text-center px-10">
              By using our services, you acknowledge that you have read and
              understood these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
