import Button from "./Button"
import { useContext } from "react"
import { SigninContext } from "../pages/MainPage"
const NavBar = () => {
  const { signin, setsignin } = useContext(SigninContext);
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
                <li>chapters</li>
                <li>about</li>
            </ul>
            <Button onClick={()=>setsignin(true)} id={"signin-btn"} text={"Sign In"} />
        </nav>
    </div>
  )
}

export default NavBar