import ProfilePage from "../pages/Profile/ProfilePage"
import { Link } from "react-router-dom"
const EachProfile = ({profile}) => {
  return (
   <Link to={`/ProfilePage/${profile.username}`}>
    <div className="each-profile">
    <img className="searched-profile"src={profile.profilePic} alt="" />
    <div>
    <p className="full-name">
        {profile.fullName}
    </p>
    {/* <p className="position">
        {profile.position} of {profile.company}
    </p>
    <p className="current-location">{profile.currentLocation}</p> */}
    </div>
   </div>
    </Link>
  )
}

export default EachProfile