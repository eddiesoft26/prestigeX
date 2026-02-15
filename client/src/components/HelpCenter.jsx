import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Wallet, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Deposits",
      icon: <Wallet className="w-5 h-5 text-blue-500" />,
      question: "How long does it take for my investment to be approved?",
      answer: "Once you upload your proof of payment, our team manually verifies the transaction. This typically takes between 1 to 6 hours. You will receive an email notification once your investment status changes to 'Active'."
    },
    {
      category: "Returns",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      question: "How is my ROI calculated?",
      answer: "ROI is calculated daily based on the percentage of your chosen plan. You can track your earnings in real-time through your user dashboard."
    },
    {
      category: "Referrals",
      icon: <Users className="w-5 h-5 text-purple-500" />,
      question: "When do I receive my 10% referral commission?",
      answer: "Referral commissions are credited to your balance immediately after your referral's deposit has been verified and approved by the admin."
    },
    {
      category: "Security",
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
      question: "Can I change my wallet address after registration?",
      answer: "For security reasons, wallet addresses can only be changed by contacting support. This prevents unauthorized withdrawals in the event of account compromise."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 mt-3.5">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Search */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600 mb-8">Have questions? We're here to help you grow your wealth with confidence.</p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for articles (e.g., 'withdrawals', 'ROI')..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{faq.category}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    </div>
                  </div>
                  {openIndex === index ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                
                {openIndex === index && (
                  <div className="px-5 pb-5 pt-0 text-gray-600 border-t border-gray-50 mt-2 py-4">
                    <p className="pl-14 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Contact Support Footer */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white shadow-lg shadow-blue-200">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="mb-6 opacity-90">Our support team is available 24/7 to assist you with any technical or financial issues.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors border border-blue-500">
              Join Telegram
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;