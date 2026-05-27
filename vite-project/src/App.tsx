import React from 'react';

import EllevationNavbar from './Components/Navbar';
import HeroBanner from './Components/Banner';
import Footer from './Components/Footer';
import Ellevationcards from './Components/Ellevationcards';
import EllevationAbout from './Components/Ellevationabout';
import Ellevationpaths from './Components/Ellevationpaths';
import FinalInvitationSection from './Components/Finalinvitationsection';
import VideoSection from "./Components/VideoSection";
import CommunityVoice from "./Components/CommunityVoice"

function App() {
  return (
    <>
      <EllevationNavbar />
      <HeroBanner />
      <Ellevationcards />
      <EllevationAbout />
      <Ellevationpaths />
      <FinalInvitationSection />
      <VideoSection />
      <CommunityVoice />
      <Footer />
    </>
  );
}

export default App;