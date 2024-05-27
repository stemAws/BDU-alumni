import Button from "./Button"
import { useContext, useState } from "react"
import { SigninContext } from "../pages/MainBody"
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
import Profilepopup from "./Profilepopup"
import SearchResult from "./SearchResult"
import SearchBar from "./SearchBar"
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
  return (
    <div className="navBar-container">
        <div className="logo"></div>
        <nav className="nav-lists">
            <ul>
                <li>News and updates</li>
                <li>stories</li>
                <li>events</li>
                <li>Gallery</li>
                <li>community</li>
                <li>history</li>
                <li>chapters</li>
                <li>Explore</li>
                <li>about</li>
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