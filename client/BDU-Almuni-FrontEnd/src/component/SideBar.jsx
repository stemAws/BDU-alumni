import React from 'react'
import '../styles/sidebar.css'


const SideBar = () => {
  return (
    <div className='sidebar-container'>
       <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    User Analytics
                </li>
               <li className="sidebarListItem">
                 Users
               </li>
               <li className="sidebarListItem">
                News and updates
                </li>
                <li className="sidebarListItem">
                Stories
               </li>
               <li className="sidebarListItem">
                Events
               </li>
               <li className="sidebarListItem">
                Gallery
               </li>
               <li className="sidebarListItem">
                community
                </li>
               <li className="sidebarListItem">
                chapters
                </li>

               <li className="sidebarListItem notifications">
                Feedback
                </li>

                <li className="sidebarListItem notifications">
                    Donation
                </li>
           </ul>
               
            
        </div>
      </div>
    </div>
  )
}

export default SideBar