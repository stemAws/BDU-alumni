import NavBar from "./NavBar"
import '../styles/header.css'
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
const Header = () => {
  return (
    <div>
      <div className="overlay">
      <div className='header-container'>
        <NavBar />
        <img className='background-img'src={background} alt="" />
        <div className="wellcome-text">
            <p className="top-title">Welcome to Bahir Dar University</p>
            <p className="bottom-title">This is the official site of Bahir Dar university alumni</p>
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default Header