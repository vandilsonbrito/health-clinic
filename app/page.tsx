import Banner from "./components/landingPage/Banner";
import Testemonial from "./components/landingPage/Testemonial";
import Services from "./components/landingPage/Services";
import WhyUs from "./components/landingPage/WhyUs";
import WhoWeAre from "./components/landingPage/WhoWeAre";
import ScrollToTop from "./components/landingPage/ScrollToTop";
import Header from "./components/landingPage/Header";
import Footer from "./components/landingPage/Footer";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="w-full h-full flex flex-col justify-center items-center" id="top">
          <ScrollToTop/>
          <Banner/>
          <WhoWeAre/>
          <Services/>
          <WhyUs/>
          <Testemonial/>
      </main>
      <Footer/>
    </>
  );
}
