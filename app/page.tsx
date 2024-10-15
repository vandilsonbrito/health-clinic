import Banner from "./components/Banner";
import Testemonial from "./components/Testemonial";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import WhoWeAre from "./components/WhoWeAre";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
