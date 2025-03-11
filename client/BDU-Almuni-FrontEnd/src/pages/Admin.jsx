import { Route, Routes, Navigate } from "react-router-dom";
import SideBar from "../component/SideBar";
import Home from "./AdminPages/Home";
import "../styles/Admin.css";
import Users from "./AdminPages/Users";
import Stories from "../pages/AdminPages/stories";
import EventList from "./AdminPages/EventList";
import FeedBack from "./AdminPages/FeedBack";
import AddEvent from "./AdminPages/AddEvent";
import AddedStory from "./AdminPages/AddedStory";
import DonationList from "./AdminPages/DonationList";
import AddDonation from "./AdminPages/AddDonation";
import AddUser from "./AdminPages/AddUser";
import News from "./AdminPages/News";
import NewsList from "./AdminPages/NewsList";
import Chapters from "./AdminPages/Chapters";
import JobOffer from "./AdminPages/JobOffer";
import SuggestedJob from "./AdminPages/SuggestedJob";
import GalleryList from "./AdminPages/GalleryList";
import AddGallery from "./AdminPages/AddGallery";
import ChaptersList from "./AdminPages/chaptersList";
import Editnews from "./AdminPages/Editnews";
import EditDonation from "./AdminPages/EditDonation";
import EditGallery from "./AdminPages/EditGallery";
import EditEvent from "./AdminPages/EditEvent";
import EditClub from "./AdminPages/EditClub";
import AGallery from "./AdminPages/AGallery";
import RequestedTranscript from "./AdminPages/TranscriptList";
import AdminList from "./AdminPages/AdminList";
import EditAdmin from "./AdminPages/EditAdmin";
import { useAuth } from "../component/useAuth";
import ChangePassword from "../pages/AdminPages/ChangePassword";
import PageNotFound from "./PageNotFound";
import JobList from "./AdminPages/JobList";
import EditAdminJobOffer from "./AdminPages/EditAdminJob";

const Admin = () => {
  const { isAuthenticated, role, loading } = useAuth(); // Add `loading` state

  if (loading) {
    return <div>Loading...</div>; // Prevent premature redirection
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/signin" />;
  }

  return (
    <>
      {role === "contentManager" || role === "systemAdmin" ? (
        <div className="admincontainer">
          <SideBar />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="users" element={role === "systemAdmin" && <Users />} />
            <Route
              path="adminlist"
              element={role === "systemAdmin" && <AdminList />}
            />
            <Route
              path="edit-admin/:personId"
              element={role === "systemAdmin" && <EditAdmin />}
            />
            <Route
              path="change-password/:personId"
              element={role === "systemAdmin" && <ChangePassword />}
            />
            <Route path="News" element={<NewsList />} />
            <Route path="News/edit-news/:newsId" element={<Editnews />} />
            <Route path="AddNews" element={<News />} />
            <Route path="AddUser" element={<AddUser />} />
            <Route path="story" element={<Stories />} />
            <Route path="addedStories" element={<AddedStory />} />
            <Route path="Events" element={<EventList />} />
            <Route path="adminEvents/:id" element={<EditEvent />} />
            <Route path="admin/gallery/:galleryID" element={<AGallery />} />
            <Route path="gallery" element={<GalleryList />} />
            <Route path="edit-gallery/:galleryID" element={<EditGallery />} />
            <Route path="Addgallery" element={<AddGallery />} />
            <Route path="AddEvent" element={<AddEvent />} />
            <Route path="jobOffer" element={<JobOffer />} />
            <Route path="SuggestedJob" element={<SuggestedJob />} />
            <Route path="job-list" element={<JobList />} />
            <Route
              path="edit-job/:jobPostingId"
              element={<EditAdminJobOffer />}
            />

            <Route path="chapters" element={<ChaptersList />} />
            <Route path="chapters/chapters/:chapterId" element={<EditClub />} />
            <Route path="AddChapter" element={<Chapters />} />
            <Route path="feedback" element={<FeedBack />} />
            <Route path="Donation" element={<DonationList />} />
            <Route path="transcript" element={<RequestedTranscript />} />
            <Route path="donation/:id" element={<EditDonation />} />
            <Route path="AddDonation" element={<AddDonation />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      ) : (
        // If user is authenticated but not an admin, redirect to login page
        <Navigate to="/admin/signin" />
      )}
    </>
  );
};

export default Admin;
