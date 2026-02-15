import React from 'react';
import { ShieldCheck, Lock, Database, Eye } from 'lucide-react'; // Optional: if you have lucide-react icons

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12">
        {/* Header */}
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 italic">Last Updated: February 15, 2026</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            </div>
            <p>
              At <span className="font-semibold text-blue-600">PrestigeX</span>, we are committed to protecting your personal and financial data. 
              This policy explains how we collect, use, and safeguard your information within our investment ecosystem.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Data Collection</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-gray-600">
              <li>
                <span className="font-medium text-gray-800">Account Details:</span> We collect your name, email, and preferred payment identifiers after registration.
              </li>
              <li>
                <span className="font-medium text-gray-800">Verification Data:</span> To activate investments, we collect uploaded images of payment receipts. These are stored via secure, encrypted cloud providers.
              </li>
              <li>
                <span className="font-medium text-gray-800">Security Logs:</span> We monitor login activity and IP addresses to prevent unauthorized access to your funds.
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800">Data Usage</h2>
            </div>
            <p className="mb-3">Your information is used strictly for the following purposes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                Verify and approve investment deposits.
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                Calculate and credit ROI and referral bonuses.
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                Communicate important updates and security alerts.
              </div>
            </div>
          </section>

          {/* Security Standards */}
          <section className="bg-gray-900 text-white p-6 rounded-xl shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-blue-400 w-5 h-5" />
              <h2 className="text-xl font-semibold text-blue-400">Security Standards</h2>
            </div>
            <p className="text-gray-300 text-sm">
              We utilize SSL encryption and secure database architectures to ensure your data remains private. 
              PrestigeX does not share, rent, or sell user data to any third-party marketing agencies.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © 2026 PrestigeX Investment Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;