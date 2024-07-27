import React, { useEffect, useState } from 'react';
import "../styles/footer.css";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import logo from "../assets/images/logo.png"


const Footer = () => {
  return (
    <footer className='footer___container'>
      <div className="footer___top">
        <h2>Join our newsletter to <br></br> keep up to date with us!</h2>
        <form action="">
          <div className="subscribe">
            <Person2OutlinedIcon />
            <input type="email" placeholder='Enter your email' />
          </div>
         <input className='submit-btn' type="submit" value="Subscribe" />
        </form>
      </div>
      <hr />
      <div className="footer___middle">
        <div className="middle___left">
          <img src={logo} alt="" />
          <h3 className='webname'>BDU Alumni Website</h3>
          <p>We are connecting Bahir Dar University Graduates</p>
        </div>
        <div className="middle___right">
          <div className="each">
            <li href="#">Education</li>
            <li href="#">Donation</li>
            <li href="#">Job Offers</li>
            <li href="#">Gallery</li>
          </div>
          <div className="each">
            <li href="#">Education</li>
            <li href="#">Donation</li>
            <li href="#">Job Offers</li>
            <li href="#">Gallery</li>
          </div>
          <div className="each">
            <li href="#">Education</li>
            <li href="#">Donation</li>
            <li href="#">Job Offers</li>
            <li href="#">Gallery</li>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer___bottom">
        <div className="bottom___left">
          <p>&copy; 2024 Bahir Dar University</p>
        </div>
        <div className="bottom___right">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer