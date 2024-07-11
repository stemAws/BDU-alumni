import { FaBriefcase, FaHandsHelping, FaHistory, FaLaptopCode, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
const NavDropDown = ({onMouseEnter,onMouseLeave,className}) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
        <ul className="each-list-container">
            <li><Link to ="/history"  className="each-list"><FaHistory/>History</Link></li>
            <li><Link to ="/aboutdevs"  className="each-list"><FaLaptopCode/>About the Dev's</Link></li>
        </ul>
    </div>
  )
}

export default NavDropDown