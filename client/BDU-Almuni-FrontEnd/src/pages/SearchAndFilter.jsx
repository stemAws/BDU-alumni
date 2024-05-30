import { useState } from "react"
import { FaAtom, FaCalendarAlt, FaCaretDown, FaCaretLeft, FaIndustry, FaMapPin, FaSlidersH } from "react-icons/fa"
import MultipleProfiles from "../component/MultipleProfiles"
import profile from "../assets/images/photo_2024-02-27_14-20-52.jpg";
const SearchAndFilter = () => {
const [profiles, setprofiles] = useState([{
    fullName:"Full Name",
    position:"president",
    company:"Bahir Dar University",
    currentLocation:"Bahir dar",
    img:`..${profile}`
},
{
    fullName:"Full Name",
    position:"president",
    company:"Bahir Dar University",
    currentLocation:"Bahir dar",
    img:`..${profile}`
},
{
    fullName:"Full Name",
    position:"president",
    company:"Bahir Dar University",
    currentLocation:"Bahir dar",
    img:`..${profile}`
}
])
  return (
    <div className="seachAndFilter-container">
        <div className="left-side">
            <div className="filter-top">
                <>
                <FaSlidersH />
                <p>Filter</p>
                </>
                <FaCaretLeft/>
            </div>
            <div className="filter-bottom">
                <div className="filter-option">
                    <>
                    <FaCalendarAlt/>
                    <p>Graduation Year</p>
                    </>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <>
                    <FaMapPin/>
                    <p>Location</p>
                    </>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <>
                    <FaIndustry/>
                    <p>Industry</p>
                    </>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <>
                    <FaAtom/>
                    <p>Department</p>
                    </>
                    <FaCaretDown/>
                </div>
            </div>
        </div>
        <div className="right-side">
            <div className="each-profile">
            <MultipleProfiles
            profiles={profiles}
            />
            </div>
        </div>
    </div>
  )
}

export default SearchAndFilter