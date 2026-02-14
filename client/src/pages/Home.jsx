import CompanyCertificate from "../components/CompnayCertificate";
import Newsletter from "../components/Newsletter";
import FAQSection from "../sections/home/FAQSection";
import Hero from "../sections/home/Hero";
import HowItWorks from "../sections/home/HowItWorks";
import InvestmentPlans from "../sections/home/InvestmentPlans";
import LiveActivityTicker from "../sections/home/LiveActivityTicker";
import Testimonials from "../sections/home/Testimonials";
import WhyChoose from "../sections/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <InvestmentPlans />
      <Testimonials />
      <LiveActivityTicker />
      <FAQSection />
      <CompanyCertificate />
      <Newsletter />
    </div>
  );
};

export default Home;
