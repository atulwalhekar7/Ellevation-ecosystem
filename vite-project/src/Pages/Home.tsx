import { useEffect } from 'react';
import HeroBanner from '../Components/Banner';
import EllevationNavbar from '../Components/Navbar';
import Ellevationpaths from '../Components/Ellevationpaths';
import CommunityVoice from "../Components/CommunityVoice";
import FinalInvitationSection from '../Components/Finalinvitationsection';

export default function Home() {
  useEffect(() => {
    // Update Meta Title
    document.title = "Ms Ellevation | Empowering Women to Thrive in Australia";

    // Update Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Ms Ellevation empowers women and CALD communities across Australia through growth workshops, confidence building, finance guidance, and community support."
      );
    }
  }, []);

  return (
    <>
      <HeroBanner />
      <EllevationNavbar />
      {/* <Ellevationcards /> */}
      {/* <VideoSection />
      <EllevationAbout /> */}
      <Ellevationpaths />
      <CommunityVoice />
      <FinalInvitationSection />
    </>
  );
}