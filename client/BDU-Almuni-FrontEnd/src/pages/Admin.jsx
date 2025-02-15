import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import AdminSignin from "../component/AdminSignin";
import AuthService from "../component/AuthService";
import ChaptersList from "./AdminPages/chaptersList";
import Editnews from "./AdminPages/Editnews";
import EditDonation from "./AdminPages/EditDonation";
import EditGallery from "./AdminPages/EditGallery";
import EditEvent from "./AdminPages/EditEvent";
import EditClub from "./AdminPages/EditClub";
import AGallery from "./AdminPages/AGallery";
import RequestedTranscript from "./AdminPages/TranscriptList";

import ProtectedRoute from "../component/ProtectedRoute";
import { Navigate } from "react-router-dom";
const Admin = () => {
  const { isAuthenticated } = AuthService.useAuth(); // Use the method from AuthService
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(null); // Start with null
  console.log("Authentication status:", isAuthenticated);

  useEffect(() => {
    console.log("useEffect triggered. isAuthenticated:", isAuthenticated);

    setIsAdminAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  if (isAdminAuthenticated === null) {
    return <div>Loading...</div>; // Prevents flicker
  }

  console.log("Admin component rendered");
  console.log("isAdminAuthenticated:", isAdminAuthenticated);

  return (
    <>
      {isAdminAuthenticated ? (
        <div className="admincontainer">
          <SideBar />
          <Routes>
            <Route path="/admin/home" element={<Home />} />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["systemAdmin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route path="/admin/News" element={<NewsList />} />
            <Route
              path="/admin/News/edit-news/:newsId"
              element={<Editnews />}
            />
            <Route path="/admin/AddNews" element={<News />} />
            <Route path="/admin/AddUser" element={<AddUser />} />
            <Route path="/admin/story" element={<Stories />} />
            <Route path="/admin/addedStories" element={<AddedStory />} />
            <Route path="/admin/Events" element={<EventList />} />
            <Route path="/admin/adminEvents/:id" element={<EditEvent />} />
            <Route
              path="/admin/admin/gallery/:galleryID"
              element={<AGallery />}
            />
            <Route path="/admin/gallery" element={<GalleryList />} />
            <Route
              path="/admin/edit-gallery/:galleryID"
              element={<EditGallery />}
            />
            <Route path="/admin/Addgallery" element={<AddGallery />} />
            <Route path="/admin/AddEvent" element={<AddEvent />} />
            <Route path="/admin/jobOffer" element={<JobOffer />} />
            <Route path="/admin/SuggestedJob" element={<SuggestedJob />} />
            <Route path="/admin/chapters" element={<ChaptersList />} />
            <Route
              path="/admin/chapters/chapters/:chapterId"
              element={<EditClub />}
            />
            <Route path="/admin/AddChapter" element={<Chapters />} />
            <Route path="/admin/feedback" element={<FeedBack />} />
            <Route path="/admin/Donation" element={<DonationList />} />
            <Route path="/admin/transcript" element={<RequestedTranscript />} />
            <Route path="/admin/donation/:id" element={<EditDonation />} />
            <Route path="/admin/AddDonation" element={<AddDonation />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<AdminSignin />} />
        </Routes>
      )}
    </>
  );
};

export default Admin;
