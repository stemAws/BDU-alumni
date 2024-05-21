import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainBody from './MainBody';
import Stories from './Stories';
import Events from './Events';
import Signin from '../component/Signin';
import { useState,createContext } from 'react';
import Header from '../component/Header'
import NewsAndUpdates from './NewsAndUpdates';
import Editprofile from './Profile/Editprofile'
export const SigninContext = createContext();
const MainPage = () => {
  const [signin, setsignin] = useState(false);
  const [loginState, setloginState] = useState(false);
  return (
    <div>
      
        
        
          <SigninContext.Provider value={{ signin, setsignin}}>
        <Header loginState={loginState}/>
        </SigninContext.Provider>
        {
          signin&&<Signin setloginState={setloginState} setsignin={setsignin}/>
        }
          <Routes>
          <Route path="/" exact Component = {MainBody} />
          <Route path="/stories"  Component = {Stories} />
          <Route path="/events"  Component = {Events} />
          <Route path="/newsAndUpdates"  Component = {NewsAndUpdates} />
          <Route path="/editProfile/:username"  Component = {Editprofile} />
          </Routes>
    </div>
  )
}

export default MainPage