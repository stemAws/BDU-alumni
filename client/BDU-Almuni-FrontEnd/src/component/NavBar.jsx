import Button from "./Button"
import { useContext, useState } from "react"
import { SigninContext } from "../pages/MainPage"
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
import Profilepopup from "./Profilepopup"
import SearchResult from "./SearchResult"
import SearchBar from "./SearchBar"
import { Link, useLocation } from 'react-router-dom';
const NavBar = ({loginState}) => {
  const { signin, setsignin } = useContext(SigninContext);
  const[detilPop,setdetailPop]=useState(false);
  const[outPut, setOutput] = useState("");
  const showdetail=()=>{
    setdetailPop(!detilPop);
   }
   
  const handleMouseEnter = () => {
    setdetailPop(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setdetailPop(false);
    }, 300);
  };
  // const location = useLocation();

  // const getNavStyle = () => {
  //   switch (location.pathname) {
  //     case '/':
  //       return { backgroundColor: 'transparent' };
  //     case '/Stories':
  //       return { backgroundColor: 'green' };
  //     case '/Events':
  //       return { backgroundColor: 'red' };
  //     default:
  //       return { backgroundColor: 'transparent' };
  //   }
  // };
  return (
    <div className="navBar-container">
        <div className="logo"></div>
        <nav className="nav-lists">
            <ul >
                <li> <Link to="/newsAndUpdates">News and updates</Link></li>
                <li> <Link to="/Stories">stories</Link></li>
                <li> <Link to="/Events">events</Link></li>
                <li> <Link to="/">Gallery</Link></li>
                <li> <Link to="/">community</Link></li>
                <li> <Link to="/">history</Link></li>
                <li> <Link to="/">chapters</Link></li>
                <li> <Link to="/">about</Link></li>
                <div className="searchBar_container">
                <SearchBar setOutput={setOutput}/>
                <SearchResult outPut={outPut}/>
            </div>
            </ul>
            {loginState?
                <div >
                <div className='profileIcons'>
                <img className="profile_img" src={background} alt="profile image" onClick={showdetail} />
              </div>
              <div >
              <Profilepopup 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}  
              showdetail={detilPop}
              // userDetails={userDetails}
              // loading={loading}
              // error={error}
              // logout={logout}
              />
              </div>
              
              </div>:<Button id={"signin-btn"} onClick={()=>setsignin(true)} text='SIGN IN'/>}
            {/* <Button onClick={()=>setsignin(true)} id={"signin-btn"} text={"Sign In"} /> */}
        </nav>
    </div>
  )
}

export default NavBar