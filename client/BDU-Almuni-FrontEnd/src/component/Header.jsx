import NavBar from "./NavBar"

const Header = () => {
  return (
    <div className='header-container'>
        <NavBar />
        <div className="wellcome-text">
            <h1 className="top-title">Wellcome to Bahir Dar University</h1>
            <h2 className="bottom-title">This is the official site of Bahir Dar university alumni</h2>
        </div>
    </div>
  )
}

export default Header