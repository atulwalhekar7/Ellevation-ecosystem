import { useEffect } from 'react';
import HeroBanner from '../Components/Banner';
import EllevationNavbar from '../Components/Navbar';
import Ellevationpaths from '../Components/Ellevationpaths';
import CommunityVoice from "../Components/CommunityVoice";
import FinalInvitationSection from '../Components/Finalinvitationsection';

export default function Home() {
  useEffect(() => {
    // Update Meta Title
    document.title = "Ellevation Ecosystem | One Community. Endless Pathways";

    // Update Meta Description (tag na ho to bana deta hai)
    const descriptionContent =
      "Ellevation empowers women and CALD communities across Australia through growth workshops, confidence building, finance guidance, and community support.";

    let metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", descriptionContent);
      document.head.appendChild(metaDescription);
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