import { Routes, Route, useLocation } from 'react-router-dom';

import EllevationNavbar from './Components/Navbar';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import About from './Pages/About';
import Conversations from './Pages/Conversations';
import SocialMedia from './Pages/SocialMedia';
import JoinUs from './Pages/JoinUs';
import Alliances from './Pages/Alliances';
import Directories from './Pages/Directories';
import Connect from './Pages/Connect';
import Contact from './Pages/Contact';
import MsEllevation from './Pages/MsEllevation';
import EllevationHub from './Pages/EllevationHub';
import Journey from './Pages/your-journey';
import Event from './Pages/Event';
import PrivacyPolicy from './Components/Privacy-Policy';
import TermsCondition from './Components/TermsCondition';


import ScrollToUp from "./Components/ScrollToTop";

function App() {
  const { pathname } = useLocation();

  return (
    <>
    <ScrollToUp />
      {pathname !== "/" && <EllevationNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        
        <Route path="/Conversations" element={<Conversations />} />
        <Route path="/content/social-media" element={<SocialMedia />} />
        
        <Route path="/get-involved/join" element={<JoinUs />} />
        <Route path="/get-involved/alliances" element={<Alliances />} />
        <Route path="/get-involved/directories" element={<Directories />} />
        
        <Route path="/Connect" element={<Connect />} />
      
        <Route path="/contact" element={<Contact />} />
        <Route path="/ms-ellevation" element={<MsEllevation />} />
        <Route path="/hub" element={<EllevationHub />} />
        <Route path="/your-journey" element={<Journey />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;