import React from 'react';

import EllevationNavbar from './Components/Navbar';
import HeroBanner from './Components/Banner';
import Footer from './Components/Footer';
import Ellevationcards from './Components/Ellevationcards';
import EllevationAbout from './Components/Ellevationabout';
import Ellevationpaths from './Components/Ellevationpaths';
import FinalInvitationSection from './Components/Finalinvitationsection';
function App() {
  return (
    <>
      <EllevationNavbar />
      <HeroBanner />
      <Ellevationcards />
      <EllevationAbout />
      <Ellevationpaths />
      <FinalInvitationSection />
      <Footer />
    </>
  );
}

export default App;