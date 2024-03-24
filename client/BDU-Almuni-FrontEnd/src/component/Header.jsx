import NavBar from "./NavBar"
import '../styles/header.css'
import background from '../assets/images/photo_2024-02-25_15-58-46.jpg'
const Header = () => {
  return (
    <div className="overlay">
      <div className='header-container'>
        <NavBar />
        <div className="overlay"> <img className='background-img'src={background} alt="" />
        {/* <div className="overlay"></div> */}
        </div>
       
        <div className="wellcome-text">
            <p className="top-title">Wellcome to Bahir Dar University</p>
            <p className="bottom-title">This is the official site of Bahir Dar university alumni</p>
        </div>
    </div>
    </div>
  )
}

export default Header