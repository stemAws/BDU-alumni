import React from 'react';
// import AdminHeader from '../component/AdminHeader';
import SideBar from '../component/SideBar';
import Home from './AdminPages/Home';
import '../styles/Admin.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import suggestedJob from './AdminPages/suggestedJob'
import AGallery from './AdminPages/AGallery';
import AddGallery from './AdminPages/AddGallery';
import Signin from '../component/Signin'
const Admin = () => {
  return (
    <div>
  
      
        {/* <AdminHeader/> */}
        <div className="admincontainer">
            <SideBar/>
            <Routes>
            <Route path='/' Component={Signin}/>
            <Route path='/home' Component={Home}/>
              <Route path='/users' Component={Users}/>
              <Route path='/News' Component={News}/>
              <Route path='/AddUser' Component={AddUser}/>
              <Route path='/story' Component={stories}/>
              <Route path='/addedStories' Component={AddedStory}/>
              <Route path='/Events' Component={EventList}/>
              <Route path='/gallery' Component={AGallery}/>
              <Route path='/Addgallery' Component={AddGallery}/>
              <Route path='/AddEvent' Component={AddEvent}/>
              <Route path='/jobOffer' Component={JobOffer}/>
              <Route path='/suggestedJob' Component={suggestedJob}/>
              <Route path='/chapters' Component={Chapters}/>
              <Route path='/feedback' Component={FeedBack}/>
              <Route path='/Donation' Component={DonationList}/>
              <Route path='/AddDonation' Component={AddDonation}/>
            
              
            </Routes>
        </div>

    </div>
  )
}

export default Admin