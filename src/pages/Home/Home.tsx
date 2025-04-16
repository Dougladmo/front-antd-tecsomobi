import Header from "../../components/layout/Header";
import Contact from "../../components/sections/Contact";
import CtaSection from "../../components/sections/CtaSection";
import Faq from "../../components/sections/Faq";
import Hero from "../../components/sections/Hero";
import StepByStep from "../../components/sections/StepByStep";
import Vantagens from "../../components/sections/Vantagens";

const Home = () => {
  return (
    <>
      <Header />
      <div className="text-5xl font-[poppins] w-full flex flex-col gap-16 bg-[#F0F0F0]">
        <Hero />
        <Vantagens />
        <StepByStep />
        <Faq />
        <CtaSection />
        <Contact />
      </div>
    </>
  );
};

export default Home;
