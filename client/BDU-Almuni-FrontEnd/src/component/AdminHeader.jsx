import React from 'react'
import '../styles/AdminHeader.css';

const AdminHeader = () => {
  return (
    <div>
        <div className="admin-flex_container">
            <nav>
                <ul className="admin-logoNameContainer">
                    <li>BAHIRDAR ALUMNI</li>
                </ul>
            </nav>
            <div className='top-right'>
            <nav className="navs">
                <ul>
                <li>language</li>
                <li>notification</li>
                <li>setting</li>
                <li>logout</li>
                </ul>
            </nav>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader