import CEOSpeach from "../components/CEOSpeach";
import CompanyCertificate from "../components/CompnayCertificate";
import LiveBitcoinChart from "../components/LiveBitcoinChart";
import Newsletter from "../components/Newsletter";
import FAQSection from "../sections/home/FAQSection";
import Hero from "../sections/home/Hero";
import HowItWorks from "../sections/home/HowItWorks";
import InvestmentPlans from "../sections/home/InvestmentPlans";
import RealEstatePreview from "../sections/home/RealEstatePreview";
import RealEstateTech from "../sections/home/RealEStateTech";
import Testimonials from "../sections/home/Testimonials";
import WelcomeGalaxy from "../sections/home/WelcomeGalaxy";
import WhyChoose from "../sections/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <WelcomeGalaxy />
      <WhyChoose />
      <LiveBitcoinChart />
      <HowItWorks />
      <InvestmentPlans />
      <CEOSpeach />
      <RealEstatePreview />
      <RealEstateTech />
      <Testimonials />
      <FAQSection />
      <CompanyCertificate />
      <Newsletter />
    </div>
  );
};

export default Home;
