import NavBar from "./Nav-bar/navBar";
import AboutTheApp from "./section-2/aboutTheApp";
import HeroSection from "./HeroSection/heroSection";
import GridSection from "./GridSection/gridSection";
import Slider from "./SliderSection/sliderSection";
import Founder from "./Founders/Founders";
import Faqs from "./FAQs/Faqs";
import PreFooter from "./FooterSection/preFooter";
import "./landingPage.css";

function LandingPage() {
    return (
        <>
            <section>
                
                <HeroSection />
                <AboutTheApp />
                <GridSection />
                {/* <Slider /> */}
                {/* <Founder /> */}
                <Faqs />
                <PreFooter />
            </section>

        </>
    )
}

export default LandingPage