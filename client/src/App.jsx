import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Bonuses from "./pages/Bonuses";
import Plans from "./pages/Plans";
import FAQ from "./pages/FAQ";
import Chatbot from "./components/Chatbot";
import AuthPage from "./components/AuthPage";

// PRIVATE ROUTES
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import Invest from "./dashboard/pages/Invest";
import Withdraw from "./dashboard/pages/Withdraw";
import Referrals from "./dashboard/pages/Referrals";
import Transactions from "./dashboard/pages/Transactions";
import PaymentProof from "./dashboard/pages/PaymentProof";
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import HelpCenter from "./components/HelpCenter";

const App = () => {
  return (
    <>
      {/* {!loaded && <Preloader setLoaded={setLoaded} />} */}
      <div>
        <ScrollToTop />

        <Routes>
          {/* Public Routes */}
          {/* PUBLIC (Landing) ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bonuses" element={<Bonuses />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/help-center" element={<HelpCenter />} />
          </Route>

          {/* Private routes */}
          {/* DASHBOARD ROUTES */}
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="invest" element={<Invest />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="payment-proof" element={<PaymentProof />} />
          </Route>
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>

        <Chatbot />
        {/* <TawkMessengerReact
          propertyId="6988e26776ad761c40db62e4"
          widgetId="1jgvb8q5c"
        /> */}
      </div>
    </>
  );
};

export default App;
