import React from 'react';
import AdminHeader from '../component/AdminHeader';
import SideBar from '../component/SideBar';
import Home from './AdminPages/Adminhome';
import '../styles/Admin.css'

import Explore from './Explore';
const Admin = () => {
  return (
    <div>
  
        <AdminHeader/>
        <div className="admincontainer">
            <SideBar/>
            <Home/>
        </div>
        <Explore/>
    </div>
  )
}

export default Admin