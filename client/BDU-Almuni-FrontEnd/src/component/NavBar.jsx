import Button from "./Button"
import { useContext, useEffect, useState } from "react"
import { SigninContext } from "../pages/MainPage"
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
import Profilepopup from "./Profilepopup"
import SearchResult from "./SearchResult"
import SearchBar from "./SearchBar"
import { Link, useLocation } from 'react-router-dom';
import NavDropDown from "./NavDropDown"
import { FaBars, FaCaretDown, FaCaretUp, FaHamburger, FaTimes } from "react-icons/fa"
import logo from "../assets/images/logo.svg"
import { ToastContainer } from "react-toastify"
const NavBar = ({logout,userDetails,error,loading,imgUrl}) => {
  const [scroll, setscroll] = useState(false)
  const location =useLocation()
  useEffect(() => {
    if(location.pathname==='/'){
   const handleScroll= () => {(scrollY > 150) ? setscroll(true):((scrollY === 0) && setscroll(false));}
   addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
    }
    else{
      setscroll(false)
    }
     }, [location.pathname])
  const {loginState,setsignin } = useContext(SigninContext);
  const[detilPop,setdetailPop]=useState(false);
  const[outPut, setOutput] = useState("");
  const [dropDown, setdropDown] = useState(false);
  const showdetail=()=>{
    setdetailPop(!detilPop);
   }

   const showdropDown=()=>{
    setdropDown(!dropDown)
   }
  const handleMouseEnter = () => {
    setdetailPop(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setdetailPop(false);
    }, 300);
  };
  const handleDropMouseEnter2 = () => {
    setdropDown(true);
  };

  const handleDropMouseLeave2 = () => {
    setTimeout(() => {
      setdropDown(false);
    }, 300);
  };
  const closeDrops=()=>{
    
    setdropDown(false);
  }
const [showSideMenu, setshowSideMenu] = useState(false)
const [expand, setexpand] = useState(false)
  return (
    <>
      <ToastContainer autoClose={1000}/>
    <div className={`navBar-container ${(location.pathname==='/')? scroll&& 'scroll':'black-bg'}`}>
        <div className="logo">
          <Link to={'/'}><img src={logo} alt="" /></Link> <p>BDU ALUMNI</p>
        </div>
        <nav className="nav-lists">
            <ul className="nav-list-conatiner">
                {/* <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/newsAndUpdates">News and updates</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/Stories">stories</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/Events">events</Link></li> */}
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/">Home</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/gallery">Gallery</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/joboffer">Job Offer </Link> </li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/chapters">Clubs</Link></li>
                <li className="each-nav-list"onClick={()=>{closeDrops()}}> <Link to="/contactus">Contact us</Link></li>
                <li className="each-nav-list"> <Link onClick={()=>showdropDown()}>about
                {
                  dropDown?<FaCaretUp/>:
                  <FaCaretDown/>
                }

                </Link>
                {
              dropDown&&(
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
        <div className="searchBar_container active for-mobile">
                <SearchBar setOutput={setOutput}/>
                <SearchResult outPut={outPut}/>
            </div>
        <FaBars className="hamburger" onClick={()=>setshowSideMenu(true)}/>
    </div>
       {showSideMenu && 
       <div className="side-menu-conatiner">
          <ul>
                <li onClick={()=>{setshowSideMenu(false)}}> <Link to="/">Home</Link></li>
                <li onClick={()=>{setshowSideMenu(false)}}> <Link to="/gallery">Gallery</Link></li>
                <li onClick={()=>{setshowSideMenu(false)}}> <Link to="/joboffer">Job Offer </Link> </li>
                <li onClick={()=>{setshowSideMenu(false)}}> <Link to="/chapters">Clubs</Link></li>
                <li onClick={()=>{setshowSideMenu(false)}}> <Link to="/contactus">Contact us</Link></li>
                <li > <Link onClick={()=>setexpand(!expand)}>About
                {
                  expand?<FaCaretUp/>:
                  <FaCaretDown/>
                }

                </Link>
                {
              expand&&(
              <NavDropDown 
              onMouseEnter={handleDropMouseEnter2} 
              onMouseLeave={handleDropMouseLeave2}
              className={"dropDown-container side-menu"}
              sideMenu={()=>setshowSideMenu(false)}
              />
            )
              }
                </li>
            {
            loginState?
                <div className="user">
                <Link to={`/EditProfile/${userDetails[0].username}`}><div className='profileIcons'>
                <img className="profile_img" src={imgUrl} alt="profile image" onClick={()=>setshowSideMenu(false)} />
              </div>
              </Link>
              <div >
                <a href="/"><Button className={"log-out"} text={'LOGOUT'} onClick={logout}/></a>
              </div>
              
              </div>:<Button id={"signin-btn"} onClick={()=>setsignin(true)} text='SIGN IN'/>
                }
            </ul>
            <FaTimes color="#fff" onClick={()=>setshowSideMenu(false)}/>
            </div>
            }
        </>
  )
}

export default NavBar