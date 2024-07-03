import '../../styles/AdminGallery.css'
import { Link } from "react-router-dom";

const AGallery = () => {
  return (
    <div className='G-container'>
        <div className="SuggestedJobheader">
        <h3> Gallery </h3>
        <Link to="/admin/Addgallery">
          <button className="addJob"> Add Gallery</button>
        </Link>
      </div>
        AGallery
        
        </div>
  )
}

export default AGallery