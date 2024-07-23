import logo from'../assets/images/photo_2024-02-25_15-58-46 copy.jpg';
import stem from '../assets/images/photo_2024-02-25_15-58-46 copy.jpg'
import Button from './Button';
import facebook from '../assets/images/facebook.png'
import linkedin from '../assets/images/linkedin.png';
import email from '../assets/images/mail.png';
import telegram from '../assets/images/telegram.png';
import React, { useEffect, useState } from 'react';
import "../styles/donation.css"
import { FaBook, FaHeart, FaRoad, FaSchool, FaTimes } from 'react-icons/fa';
import "../styles/footer.css";
const Footer = () => {
  const [donatePopup,setDonatePopup]=useState(false);
  const[donationSections,setDonationSection]=useState()
  const iconOptions = [FaSchool, FaBook,FaHeart, FaRoad];
  let lastSelectedIcon = -1;
  const handleDonateClick = (donationLink) => {
   
// console.log(donationLink+"link")
    // Calculate the center position
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    // Open the new window in the center
    window.open(donationLink, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
  };
  // useEffect(()=>{
  //   const fetchDonationData=async()=>{
  //     try {
  //     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getDonations`) ;
  //     const data= await res.json();
  //     setDonationSection(data)
  //     } catch (error) {
  //       console.error("error fetching donation" ,error)
  //     }
      
  //   }
  //   fetchDonationData()
  // },[])

  return (
    <footer className='container' >
      <div className='left_and_middle'>
      <div className="left_footer_container">
<ul className="logoNameContainer">
        
        <div className="nav_item">
        <li className=" stemCenterText">Bahir Dar University&nbsp;</li>
        <li className="  separator"></li>
        <li className=" alumniText">&nbsp;ALUMNI</li>
        </div>
      </ul>
      <p className='moto '>Connecting Graduates, <span className='blue_text'>Building</span>  Futures</p>
      <div className='support_container'>
      <p className='support_text' >Support Bahir Dar University</p>
      <Button onClick={()=>{setDonatePopup(true)}} text="DONATE"/>
      </div>
      </div>
    
       
        </div>
      <div className="right_footer_container">
        <div className="social_media_links">
          <a href="mailto:bahirdarUniversityalumni@gmail.com" target="_blank" rel="noopener noreferrer"><img src={email} alt="email icon"   /></a>
          <a href ='#'target="_blank" rel="noopener noreferrer"><img src={facebook} alt="facebook icon"   /></a> 
          <a href ='#'target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="linkdin icon"   /></a>
          <a href ='#'target="_blank" rel="noopener noreferrer"><img src={telegram} alt="telegram icon"   /></a> 
        </div>
        <div className='contact_us'>
          <div>
          <p className='contact_us_title'>Contact Us:</p>
          <p className='contact_us_data'>Bahir Dar University ALMUNI <span>BAHIRDAR, AMHARA,ETHIOPIA</span></p>
          </div>
          <p className='contact_us_field'>EMAIL: <span className='contact_us_data'><a href="mailto:bahirdarUniversityalumni@gmail.com">bahirdarUniversityalumni@gmail.com</a></span></p>
          <p className='contact_us_field'>Phone: <span className='contact_us_data'><a href="tel:+251920765478">+251 920 765 478</a></span></p>
          </div>
        
        <p className='copy_right'>Copyright © 2024 Bahir Dar University ALUMNI All rights reserved.</p>
      </div>
      {donatePopup && (
  <div className='donation_overlay'>
    <div className='donate_container'>
      <FaTimes onClick={() => setDonatePopup(false)} className='close' />
      <div className="each_donation_section stem">
            <img src={stem} alt="" />
            <p className='donate_title'> Support Bahir Dar University</p>
            <p className='description'>Join us in making a difference, preserving the legacy of Bahir Dar University.</p>
            <Button text="Donate" onClick={() => handleDonateClick('https://chapa-payment-integration-by-abrham.netlify.app/')} />
          </div>
      {donationSections?.map((donationSection, index) => {
        let randomNum;
        do {
          randomNum = Math.floor(Math.random() * iconOptions.length);
        } while (randomNum === lastSelectedIcon);

        const SelectedIcon = iconOptions[randomNum];
        lastSelectedIcon = randomNum;

        return (
          <div className="each_donation_section" key={index}>
            
            <p className='donate_title'>{SelectedIcon ? (
              React.cloneElement(React.createElement(SelectedIcon))
            ) : null}<span className='the_text'>{donationSection.title}</span></p>
            <div className="desc_btn"><p className='donation_descrip'>{donationSection.description}</p>
            <Button text="Donate" onClick={() => handleDonateClick(donationSection.link)} /></div>
            
          </div>
        );
      })}
      
    </div>
  </div>
)}

    </footer>
  )
}

export default Footer