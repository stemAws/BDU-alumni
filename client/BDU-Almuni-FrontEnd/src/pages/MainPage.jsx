import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody';
import Stories from './Stories';
import Events from './Events';
import Gallery from './Gallery'
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
import Cookies from 'js-cookie';
import ProfilePage from './Profile/ProfilePage';
import ChangePassword from './ChangePassword';
import PageNotFound from './PageNotFound';
import ForgetPassword from './ForgetPassword';
import Posts from './Posts';
import SearchAndFilter from './SearchAndFilter';
import AboutDevs from './AboutDevs';
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
      
        
        
          <SigninContext.Provider value={{ signin, setsignin}}>
        <Header logout={handleLogout} loginState={loginState}/>
        </SigninContext.Provider>
        {
          signin&&<Signin setloginState={setloginState} setsignin={setsignin}/>
        }
          <Routes>
          <Route path="/" exact Component = {MainBody} />
          <Route path="/stories"  Component = {Stories} />
          <Route path="/events"  Component = {Events} />
          <Route path="/gallery"  Component = {Gallery} />
          <Route path="/newsAndUpdates"  Component = {NewsAndUpdates} />
          <Route path="/Chapters"  Component = {Chapters} />
          <Route path="/jobOffer"  Component = {JobOffer} />
          <Route path="/history"  Component = {History} />
          <Route path="/editProfile/:username"  Component = {Editprofile} />
          <Route path="/ProfilePage/:username"  Component = {ProfilePage} />
          <Route path="/contactus"  Component = {ContactUS} />
          <Route path="/changePassword/:username"  Component = {ChangePassword} />
          <Route path="/post/:username"  Component = {Posts} />
          <Route path="/aboutDevs"  Component = {AboutDevs} />
          <Route path="/forgetPassword"  Component = {ForgetPassword} />
          <Route path="/search/:name"  Component = {SearchAndFilter} />
          <Route path="*"  Component = {PageNotFound} />
          </Routes>
          <Footer/>
    </div>
  )
}

export default MainPage


