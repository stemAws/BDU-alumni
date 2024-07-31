import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SideBar from '../component/SideBar';
import Home from './AdminPages/Home';
import '../styles/Admin.css';
import Users from './AdminPages/Users';
import Stories from '../pages/AdminPages/stories';
import EventList from './AdminPages/EventList';
import FeedBack from './AdminPages/FeedBack';
import AddEvent from './AdminPages/AddEvent';
import AddedStory from './AdminPages/AddedStory';
import DonationList from './AdminPages/DonationList';
import AddDonation from './AdminPages/AddDonation';
import AddUser from './AdminPages/AddUser';
import News from './AdminPages/News';
import NewsList from './AdminPages/NewsList';
import Chapters from './AdminPages/Chapters';
import JobOffer from './AdminPages/JobOffer';
import SuggestedJob from './AdminPages/SuggestedJob';
import GalleryList from './AdminPages/GalleryList';
import AddGallery from './AdminPages/AddGallery';
import AdminSignin from '../component/AdminSignin';
import AuthService from '../component/AuthService';
import ChaptersList from './AdminPages/chaptersList';
import Editnews from './AdminPages/Editnews'; 
import EditDonation from './AdminPages/EditDonation'; 
import EditGallery from './AdminPages/EditGallery'; 
import EditEvent from './AdminPages/EditEvent'; 
import EditClub from './AdminPages/EditClub'; 

import PageNotFound from './AdminPages/PageNotFound';

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated("admin")) {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }
  }, []);

  return (
    <>
      {isAdminAuthenticated ? (
        <div className="admincontainer">
          <SideBar />
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='News' element={<NewsList />} />
            <Route path='edit-news/:newsId' element={<Editnews />} />
            <Route path='AddNews' element={<News />} />
            <Route path='AddUser' element={<AddUser />} />
            <Route path='story' element={<Stories />} />
            <Route path='addedStories' element={<AddedStory />} />
            <Route path='Events' element={<EventList />} />
            <Route path='/adminEvents/:id' element={<EditEvent />} />
            <Route path='gallery' element={<GalleryList />} />
            <Route path="/admin/edit-gallery/:galleryID" element={<EditGallery />} />
            <Route path='Addgallery' element={<AddGallery />} />
            <Route path='AddEvent' element={<AddEvent />} />
            <Route path='jobOffer' element={<JobOffer />} />
            <Route path='SuggestedJob' element={<SuggestedJob />} />
            <Route path='chapters' element={<ChaptersList />} />
            <Route path='/chapters/:chapterId' element={<EditClub />} />
            <Route path='AddChapter' element={<Chapters />} />
            <Route path='feedback' element={<FeedBack />} />
            <Route path='Donation' element={<DonationList />} />
            <Route path="/donation/:id" element={<EditDonation />} />
            <Route path='AddDonation' element={<AddDonation />} />
            <Route path="*"  Component = {PageNotFound} />
            {/* <Route path='*' element={<Navigate to="home" />} /> */}
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
