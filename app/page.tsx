import Banner from "./components/Banner";
import Testemonial from "./components/Testemonial";
import Header from "./components/Header";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full h-full" id="top">
        <Header/>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Banner/>
          <Services/>
          <WhyUs/>
          <Testemonial/>
        </div>
        <Footer/>
    </main>
  );
}
