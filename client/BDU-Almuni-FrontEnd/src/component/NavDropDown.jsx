import { FaHistory, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";
const NavDropDown = ({sideMenu,onMouseEnter,onMouseLeave,className}) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
        <ul className="each-list-container">
            <li onClick={sideMenu&&sideMenu}><Link to ="/history"  className="each-list"><FaHistory/>History</Link></li>
            <li onClick={sideMenu&&sideMenu}><Link to ="/aboutdevs"  className="each-list"><FaLaptopCode/>About the Dev's</Link></li>
        </ul>
    </div>
  )
}

export default NavDropDown