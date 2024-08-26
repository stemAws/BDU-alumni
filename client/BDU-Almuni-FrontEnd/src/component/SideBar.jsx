import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
// import Button from '../components/Button'
// import icon  from "../assets/icon.jpg";
import { useState } from 'react';
import AuthService from './AuthService';

const SideBar = () => {

   const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  //  const handleClick = () => {
  //    window.open('/', '_blank');
  //  };
 
   const handleLogoutClick = () => {
     setShowLogoutPopup(true);
   };
 
   const handleLogoutConfirm = () => {
       AuthService.logout('admin');
       window.location.reload();
     setShowLogoutPopup(false);
   };
 
   const handleLogoutCancel = () => {
     setShowLogoutPopup(false);
   };
 
   const stopPropagation = (e) => {
     e.stopPropagation();
   };


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

                {/* <li className="sidebarListItem">
                <Link to='/admin/VoluntaryWork'>
                  Voluntary Work
                </Link>
                </li> */}
                
               <li className="sidebarListItem">
                <Link to='/admin/chapters'>
                Clubs
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
                <li className="sidebarListItem notifications">
                  <Link to='/admin/transcript'>
                     Transcript requests
                  </Link>
                </li>
                <div className="topavatar"  onClick={handleLogoutClick}>
            <button className='admin-logout-btn'>log out</button>
            {showLogoutPopup && (
              <div className="logout-popup-container-overlay">
              <div className="logout-popup-container">
                <div className="logout-popup-content" onClick={stopPropagation}>
                  <p>Are you sure you want to logout?</p>
                  <div className="logout-popup-buttons">
                    <button className="logout-popup-buttons-logout" onClick={handleLogoutConfirm}>
                      Log out
                    </button>
                    <button className="logout-popup-buttons-cancel" onClick={handleLogoutCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              </div>
            )}

          </div>
          
           </ul>
               
         
          
            
        </div>
    </div>
  )
}

export default SideBar