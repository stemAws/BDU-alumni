import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody';
import Stories from './Stories';
import Events from './Events';
import Gallery from './Gallery'
import GalleryList from './GalleryList'
import Signin from '../component/Signin';
import Chapters from './Chapters';
import History from './History';
import { useState,createContext, useEffect } from 'react';
import Header from '../component/Header'
import NewsAndUpdates from './NewsAndUpdates';
import Editprofile from './Profile/Editprofile'
import Footer from '../component/Footer';
import ContactUS from "./ContactUs"
import JobOffer from './JobOffer';
import AuthService from '../component/AuthService';
import ProfilePage from './Profile/ProfilePage';
import ChangePassword from './ChangePassword';
import PageNotFound from './PageNotFound';
import ForgetPassword from './ForgetPassword';
import Posts from './Posts';
import SearchAndFilter from './SearchAndFilter';
import AboutDevs from './AboutDevs';
import StoriesDetail from './StoriesDetail';
import Explore from './Explore';
import Donations from './Donations';

export const SigninContext = createContext();
const MainPage = () => {
  const [signin, setsignin] = useState(false);
  const [loginState, setloginState] = useState(false);
  useEffect(() => { 
    if(AuthService.isAuthenticated("user")){
     
      setloginState(true)
    }
    else
    setloginState(false)
  }, [])
  const handleLogout = () => {
    AuthService.logout('user');
  };
  return (
    <div>
      
        
        
          <SigninContext.Provider value={{ loginState,setloginState, setsignin}}>
        <Header logout={handleLogout}/>
        
        {
          signin&&<Signin/>
        }
          <Routes>
          <Route path="/" exact Component = {MainBody} />
          {/* <Route path="/stories"  Component = {Stories} />
          <Route path="/events"  Component = {Events} /> */}
        <Route path="/gallery/:galleryID" element={<Gallery />} />
        <Route path="gallery" element={<GalleryList />} />
          <Route path="/newsAndUpdates"  Component = {NewsAndUpdates} />
          <Route path="/Chapters"  Component = {loginState?Chapters:Signin} />
          <Route path="/jobOffer"  Component = {loginState?JobOffer:Signin} />
          <Route path="/history"  Component = {History} />
          <Route path="/explore"  Component = {Explore} />
          <Route path="/editProfile/:username"  Component = {loginState?Editprofile:Signin} />
          <Route path="/ProfilePage/:username"  Component = {ProfilePage} />
          <Route path="/contactus"  Component = {ContactUS} />
          <Route path="/changePassword/:username"  Component = {loginState?ChangePassword:Signin} />
          <Route path="/post/:username"  Component = {loginState?Posts:Signin} />
          <Route path="/aboutDevs"  Component = {AboutDevs} />
          <Route path="/forgetPassword"  Component = {ForgetPassword} />
          <Route path="/donations"  Component = {Donations} />
          <Route path="/search/:name"  Component = {SearchAndFilter} />
          <Route path="/stories/:id"  Component = {StoriesDetail} />
          <Route path="*"  Component = {PageNotFound} />
          </Routes>
          </SigninContext.Provider>
          <Footer/>
    </div>
  )
}

export default MainPage


