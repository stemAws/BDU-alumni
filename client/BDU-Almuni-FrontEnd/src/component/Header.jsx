import NavBar from "./NavBar"
import '../styles/header.css'
import { useLocation } from "react-router-dom";
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
import { useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = ({setsignin,loginState,logout}) => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setimageUrl] = useState()
  useEffect(()=>{
    const fetchProfilePictureUrl = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getProfilePicture/${token}`,{
          credentials: 'include',
        });
    
        if (!res.ok) {
          throw new Error(`Failed to fetch profile picture URL: ${res.status} - ${res.statusText}`);
        }
  
        const url = await res.text();
        setimageUrl(url);
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni/${token}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data); 
        } else {
          setError('Failed to fetch user details');
        }
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserDetails();
  
    fetchProfilePictureUrl();
  },[])
  return (
    <div>
      {/* <div className="overlay"> */}
        <NavBar 
        logout={logout}
        loginState={loginState} 
        userDetails={userDetails}
        loading={loading}
        error={error}
        imgUrl={imageUrl}
        />

        {location.pathname === '/' && (
      <div className='header-container'>
        <div className="overlay"/><img className='background-img'src={background} alt="" />
        <div className="wellcome-text">
            <p className="top-title">Welcome to Bahir Dar University</p>
            <p className="bottom-title">Connecting the past, shaping the future. Join our alumni network to stay informed, get involved, and give back. Together, we can create opportunities and build a stronger community.</p>
            <div className="main-page-buttons">
             { !loginState&&<Button id={"signin-btn"} onClick={()=>setsignin(true)} text='SIGN IN'/>} 
            <Button className={"transparent-btn"}  text='EXPLORE'/></div>
            
        </div>
    </div>
        )
        }
    {/* </div> */}
    </div>
    
  )
}

export default Header