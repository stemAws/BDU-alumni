import { useEffect, useState } from "react";
import { FaBook, FaHeart, FaRoad, FaSchool, FaTimes } from "react-icons/fa";
import Button from "./Button";
import logo from "../assets/images/logo.svg";
import '../styles/donation.css'
const Donation = ({close}) => {
    let lastSelectedIcon = -1;
const handleDonateClick = (donationLink) => {
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      window.open(donationLink, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    };
    const[donationSections,setDonationSection]=useState([])
  const iconOptions = [FaSchool, FaBook,FaHeart, FaRoad];
  useEffect(()=>{
      const fetchDonationData=async()=>{
        try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donation`,{
          credentials:'include'
        }) ;
        const data= await res.json();
        setDonationSection(data)
        } catch (error) {
          console.error("error fetching donation" ,error)
        }
        
      }
      fetchDonationData()
    },[])
  return (
    <div className='donation_overlay'>
    <div className='donate_container'>
      <FaTimes onClick={close} className='close' />
      <div className="each_donation_section stem">
            <img src={logo} alt="" />
            <p className='donate_title'> Support Bahir Dar University</p>
            <p className='description'>Join us in making a difference, preserving the legacy of Bahir Dar University.</p>
            <Button text="Donate" onClick={() => handleDonateClick('https://chapa-payment-integration-by-abrham.netlify.app/')} />
          </div>
      { donationSections.length > 0
      && donationSections?.map((donationSection, index) => {
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
  )
}

export default Donation