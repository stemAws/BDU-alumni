const EachProfile = ({profile}) => {
  return (
   <div className="each-profile">
    <img className="searched-profile"src={profile.img} alt="" />
    <div>
    <p className="full-name">
        {profile.fullName}
    </p>
    <p className="position">
        {profile.position} of {profile.company}
    </p>
    <p className="current-location">{profile.currentLocation}</p>
    </div>
   </div>
  )
}

export default EachProfile