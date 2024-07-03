import Button from "./Button"
import { useContext, useState } from "react"
import { SigninContext } from "../pages/MainPage"
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
import Profilepopup from "./Profilepopup"
import SearchResult from "./SearchResult"
import SearchBar from "./SearchBar"
import { Link, useLocation } from 'react-router-dom';
import NavDropDown from "./NavDropDown"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
const NavBar = ({loginState,logout,userDetails,error,loading,imgUrl}) => {
  const { signin, setsignin } = useContext(SigninContext);
  const[detilPop,setdetailPop]=useState(false);
  const[outPut, setOutput] = useState("");
  const [dropDown, setdropDown] = useState(false);
  const [dropDown2, setdropDown2] = useState(false);
  const showdetail=()=>{
    setdetailPop(!detilPop);
   }
   const showdropDown=()=>{
    setdropDown(!dropDown)
    setdropDown2(false);
   }
   const showdropDown2=()=>{
    setdropDown2(!dropDown2)
    setdropDown(false);
   }
  const handleMouseEnter = () => {
    setdetailPop(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setdetailPop(false);
    }, 300);
  };
  const handleDropMouseEnter = () => {
    setdropDown(true);
  };

  const handleDropMouseLeave = () => {
    setTimeout(() => {
      setdropDown(false);
    }, 300);
  };
  const handleDropMouseEnter2 = () => {
    setdropDown2(true);
  };

  const handleDropMouseLeave2 = () => {
    setTimeout(() => {
      setdropDown2(false);
    }, 300);
  };
  const closeDrops=()=>{
    setdropDown(false);
    setdropDown2(false);
  }


  return (
    <div className="navBar-container">
        <div className="logo"></div>
        <nav className="nav-lists">
            <ul className="nav-list-conatiner">
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/newsAndUpdates">News and updates</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/Stories">stories</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/Events">events</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/gallery">Gallery</Link></li>
                <li className="each-nav-list"> <Link onClick={()=>showdropDown()}>community 
                {
                  dropDown?<FaCaretUp/>:
                  <FaCaretDown/>
                }
                 </Link>
                 {
              dropDown&&(
              <NavDropDown 
              onMouseEnter={handleDropMouseEnter} 
              onMouseLeave={handleDropMouseLeave}
              className={"dropDown-container drop1"}
              forLi={"community"}
              />
            )
              }
                 </li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/chapters">chapters</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/contactus">Contact us</Link></li>
                <li className="each-nav-list"> <Link onClick={()=>showdropDown2()}>about
                {
                  dropDown2?<FaCaretUp/>:
                  <FaCaretDown/>
                }

                </Link>
                {
              dropDown2&&(
              <NavDropDown 
              onMouseEnter={handleDropMouseEnter2} 
              onMouseLeave={handleDropMouseLeave2}
              className={"dropDown-container drop2"}
              forLi={"about"}
              />
            )
              }
                </li>
                <div className="searchBar_container">
                <SearchBar setOutput={setOutput}/>
                <SearchResult outPut={outPut}/>
            </div>
            </ul>
            {loginState?
                <div >
                <div className='profileIcons'>
                <img className="profile_img" src={imgUrl} alt="profile image" onClick={showdetail} />
              </div>
              <div >
              <Profilepopup 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}  
              showdetail={detilPop}
              userDetails={userDetails}
              loading={loading}
              error={error}
              logout={logout}
              />
              </div>
              
              </div>:<Button id={"signin-btn"} onClick={()=>setsignin(true)} text='SIGN IN'/>}
            
        </nav>
    </div>
  )
}

export default NavBar