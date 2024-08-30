
import './App.css'
import NavBar from './components/LandingPage/Nav-bar/navBar';
import React from 'react';
import LandingPage from "./components/LandingPage/landingPage";
import TermOfUse from "./components/TermofUse/termOfUse";
import PrivacyPolicy from "./components/Privacypolicy/privacyPolicy";
import AboutUs from "./components/AboutUs/aboutUs";
import Footer from "./components/LandingPage/FooterSection/footerSection";
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect} from 'react';

function App() {
 const location  = useLocation();
 useEffect(()=>{
  window.scrollTo(0,0);
 }, [location]
);

  return (
    <>
     <NavBar/>
     <div className='routes-container'>
      <Routes>
        <Route path='/term-of-use' element={<TermOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
