import React from 'react';

import EllevationNavbar from './Components/Navbar';
import HeroBanner from './Components/Banner';
import Footer from './Components/Footer';
import Ellevationcards from './Components/Ellevationcards';
import VideoSection from "./Components/VideoSection";
import CommunityVoice from "./Components/CommunityVoice"

function App() {
  return (
    <>
      <EllevationNavbar />
      <HeroBanner />
      <Ellevationcards />
      <VideoSection />
      <CommunityVoice />
      <Footer />
    </>
  );
}

export default App;