import React from 'react';
import AdminHeader from '../component/AdminHeader';
import SideBar from '../component/SideBar';
import Home from './AdminPages/Home';
import '../styles/Admin.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Users from './AdminPages/Users';
import stories from '../pages/AdminPages/stories';

const Admin = () => {
  return (
    <div>
  
      
        <AdminHeader/>
        <div className="admincontainer">
            <SideBar/>
            <Routes>
              <Route path='/home' Component={Home}/>
              <Route path='/users' Component={Users}/>
              <Route path='/story' Component={stories}/>
            
              
            </Routes>
        </div>

    </div>
  )
}

export default Admin