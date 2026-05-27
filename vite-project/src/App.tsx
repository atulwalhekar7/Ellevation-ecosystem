import { Routes, Route } from 'react-router-dom';

import EllevationNavbar from './Components/Navbar';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import About from './Pages/About';
import YouTube from './Pages/YouTube';
import SocialMedia from './Pages/SocialMedia';
import JoinUs from './Pages/JoinUs';
import Alliances from './Pages/Alliances';
import Directories from './Pages/Directories';
import Events from './Pages/Events';
import Contact from './Pages/Contact';
import MsEllevation from './Pages/MsEllevation';
import EllevationHub from './Pages/EllevationHub';

import ScrollToUp from "./Components/ScrollToTop";

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