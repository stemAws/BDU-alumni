import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainBody from "./MainBody";
import Stories from "./Stories";
import Events from "./Events";
import Gallery from "./Gallery";
import GalleryList from "./GalleryList";
import Signin from "../component/Signin";
import Chapters from "./Chapters";
import History from "./History";
import { useState, createContext, useEffect } from "react";
import Header from "../component/Header";
import NewsAndUpdates from "./NewsAndUpdates";
import Editprofile from "./Profile/Editprofile";
import Footer from "../component/Footer";
import ContactUS from "./ContactUs";
import JobOffer from "./JobOffer";
import AuthService from "../component/AuthService";
import ProfilePage from "./Profile/ProfilePage";
import ChangePassword from "./ChangePassword";
import PageNotFound from "./PageNotFound";
import ForgetPassword from "./ForgetPassword";
import Posts from "./Posts";
import SearchAndFilter from "./SearchAndFilter";
import AboutDevs from "./AboutDevs";
import StoriesDetail from "./StoriesDetail";
import Explore from "./Explore";
import Donations from "./Donations";

export const SigninContext = createContext();

const MainPage = () => {
  const [signin, setsignin] = useState(false);
  const [loginState, setloginState] = useState(false);
  const { isAuthenticated, role } = AuthService.useAuth(); // Use the method from AuthService
  console.log("isAuth: ", isAuthenticated, "role: ", role);
  // Check authentication and role
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isAuthenticated && role === "alumni") {
        setloginState(true);
      } else {
        setloginState(false);
      }

      // Refresh token if expired
      if (!isAuthenticated) {
        await AuthService.refreshAccessToken(); // Try refreshing the token
      }
    };

    checkLoginStatus(); // Run on mount
  }, [isAuthenticated, role]);

  // Handle logout
  const handleLogout = () => {
    AuthService.logout();
    setloginState(false); // Update the login state after logout
  };

  return (
    <div>
      <SigninContext.Provider value={{ loginState, setloginState, setsignin }}>
        <Header logout={handleLogout} />

        {signin && <Signin />}

        <Routes>
          <Route path="/" exact element={<MainBody />} />
          <Route path="/gallery/:galleryID" element={<Gallery />} />
          <Route path="gallery" element={<GalleryList />} />
          <Route path="/newsAndUpdates" element={<NewsAndUpdates />} />
          <Route
            path="/Chapters"
            element={loginState ? <Chapters /> : <Signin />}
          />
          <Route
            path="/jobOffer"
            element={loginState ? <JobOffer /> : <Signin />}
          />
          <Route path="/history" element={<History />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/editProfile/:username"
            element={loginState ? <Editprofile /> : <Signin />}
          />
          <Route path="/ProfilePage/:username" element={<ProfilePage />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route
            path="/changePassword/:username"
            element={loginState ? <ChangePassword /> : <Signin />}
          />
          <Route
            path="/post/:username"
            element={loginState ? <Posts /> : <Signin />}
          />
          <Route path="/aboutDevs" element={<AboutDevs />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/search/:name" element={<SearchAndFilter />} />
          <Route path="/stories/:id" element={<StoriesDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </SigninContext.Provider>
      <Footer />
    </div>
  );
};

export default MainPage;
