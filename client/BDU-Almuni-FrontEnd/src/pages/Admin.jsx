import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SideBar from '../component/SideBar';
import Home from './AdminPages/Home';
import '../styles/Admin.css';
import Users from './AdminPages/Users';
import stories from '../pages/AdminPages/stories';
import EventList from './AdminPages/EventList';
import FeedBack from './AdminPages/FeedBack';
import AddEvent from './AdminPages/AddEvent';
import AddedStory from './AdminPages/AddedStory';
import DonationList from './AdminPages/DonationList';
import AddDonation from './AdminPages/AddDonation';
import AddUser from './AdminPages/AddUser';
import News from './AdminPages/News';
import Chapters from './AdminPages/Chapters';
import JobOffer from './AdminPages/JobOffer';
import suggestedJob from './AdminPages/suggestedJob';
import AGallery from './AdminPages/AGallery';
import AddGallery from './AdminPages/AddGallery';
import AdminSignin from '../component/AdminSignin';
import AuthService from '../component/AuthService';

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated('admin')) {
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
            <Route path='News' element={<News />} />
            <Route path='AddUser' element={<AddUser />} />
            <Route path='story' element={<stories />} />
            <Route path='addedStories' element={<AddedStory />} />
            <Route path='Events' element={<EventList />} />
            <Route path='gallery' element={<AGallery />} />
            <Route path='Addgallery' element={<AddGallery />} />
            <Route path='AddEvent' element={<AddEvent />} />
            <Route path='jobOffer' element={<JobOffer />} />
            <Route path='suggestedJob' element={<suggestedJob />} />
            <Route path='chapters' element={<Chapters />} />
            <Route path='feedback' element={<FeedBack />} />
            <Route path='Donation' element={<DonationList />} />
            <Route path='AddDonation' element={<AddDonation />} />
            <Route path='*' element={<Navigate to="home" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path='*' element={<AdminSignin />} />
        </Routes>
      )}
    </>
  );
};

export default Admin;
