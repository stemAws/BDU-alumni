import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
// import Button from '../components/Button'
// import icon  from "../assets/icon.jpg";

const SideBar = () => {
  return (
    <div className='sidebar-container'>
       
        <div className="sidebarMenu">
         
        <ul className="sidebarList">
        <li className='logo-name'>BDU Alumni</li>
                <li className="sidebarListItem">
                <Link to='/admin/home'>
                   User Analytics
                </Link>
                </li>

               <li className="sidebarListItem">
               <Link to='/admin/users'>
                  Users
               </Link>
               </li>

               <li className="sidebarListItem">
               <Link to='/admin/News'>
                News and updates
                </Link>
                </li>

                <li className="sidebarListItem">
                <Link to='/admin/story'>
                  Stories
                </Link> 
               </li>

               <li className="sidebarListItem">
                  <Link to='/admin/Events'>
                  Events
                  </Link>
               </li>

               <li className="sidebarListItem">
                  <Link to='/admin/gallery'>
                  Gallery
                  </Link>
               </li>

               <li className="sidebarListItem">
                <Link to='/admin/jobOffer'>
                  Job Offer
                </Link>
                </li>

                <li className="sidebarListItem">
                <Link to='/admin/VoluntaryWork'>
                  Voluntary Work
                </Link>
                </li>
                
               <li className="sidebarListItem">
                <Link to='/admin/chapters'>
                chapters
                </Link>
                </li>

               <li className="sidebarListItem notifications">
                  <Link to='/admin/feedback'>
                     Feedback
                  </Link>
                </li>

                <li className="sidebarListItem notifications">
                  <Link to='/admin/donation'>
                     Donation
                  </Link>
                </li>
           </ul>
               
          
            
        </div>
    </div>
  )
}

export default SideBar