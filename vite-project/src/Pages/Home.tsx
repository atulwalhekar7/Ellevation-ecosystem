import HeroBanner from '../Components/Banner';
import EllevationNavbar from '../Components/Navbar';
import Ellevationcards from '../Components/Ellevationcards';
import VideoSection from "../Components/VideoSection";
import EllevationAbout from '../Components/Ellevationabout';
import Ellevationpaths from '../Components/Ellevationpaths';
import CommunityVoice from "../Components/CommunityVoice";
import FinalInvitationSection from '../Components/Finalinvitationsection';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <EllevationNavbar />
      <Ellevationcards />
      <VideoSection />
      <EllevationAbout />
      <Ellevationpaths />
      <CommunityVoice />
      <FinalInvitationSection />
    </>
  );
}