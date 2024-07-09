import { FaBriefcase, FaHandsHelping, FaHistory, FaLaptopCode, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
const NavDropDown = ({onMouseEnter,onMouseLeave,className,forLi}) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
        <ul className="each-list-container">
           <li><Link to={forLi==="about"?"/":"/joboffer"} className="each-list">{forLi==="about"?<FaUniversity/>:<FaBriefcase/>}{forLi==="about"?"About BDU":"Job Offer"} </Link></li> 
            <li><Link to ={forLi==="about"?"/aboutdevs":"/"}  className="each-list">{forLi==="about"?<FaLaptopCode/>:<FaHandsHelping/>}{forLi==="about"?"About Developers":"Voluntary Work"}</Link></li>
            {forLi==="about"&&(
                <li><Link to ="/history"  className="each-list"><FaHistory/>History</Link></li>
            )}
        </ul>
    </div>
  )
}

export default NavDropDown