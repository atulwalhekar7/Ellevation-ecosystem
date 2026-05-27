import { Routes, Route } from 'react-router-dom';

import EllevationNavbar from './Components/Navbar';
import Footer from './Components/Footer';
<<<<<<< HEAD
import Ellevationcards from './Components/Ellevationcards';
import EllevationAbout from './Components/Ellevationabout';
import Ellevationpaths from './Components/Ellevationpaths';
import FinalInvitationSection from './Components/Finalinvitationsection';
import VideoSection from "./Components/VideoSection";
import CommunityVoice from "./Components/CommunityVoice"
import ScrollToUp from "./Components/ScrollToTop";
=======

import Home from './pages/Home';
import About from './pages/About';
import YouTube from './pages/YouTube';
import SocialMedia from './pages/SocialMedia';
import JoinUs from './pages/JoinUs';
import Alliances from './pages/Alliances';
import Directories from './pages/Directories';
import Events from './pages/Events';
import Contact from './pages/Contact';
import MsEllevation from './pages/MsEllevation';
import EllevationHub from './pages/EllevationHub';
>>>>>>> 7d27803e87a138731003976b57d4181c9451a158

function App() {
  return (
    <>
    <ScrollToUp />
      <EllevationNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/content/youtube" element={<YouTube />} />
        <Route path="/content/social-media" element={<SocialMedia />} />
        
        <Route path="/get-involved/join" element={<JoinUs />} />
        <Route path="/get-involved/alliances" element={<Alliances />} />
        <Route path="/get-involved/directories" element={<Directories />} />
        
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ms-ellevation" element={<MsEllevation />} />
        <Route path="/hub" element={<EllevationHub />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;