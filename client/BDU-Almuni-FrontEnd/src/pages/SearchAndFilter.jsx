import { useState } from "react"
import { FaAtom, FaCalendarAlt, FaCaretDown, FaCaretLeft, FaIndustry, FaMapPin, FaSlidersH } from "react-icons/fa"
import MultipleProfiles from "../component/MultipleProfiles"
import profile from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import "../styles/searchAndFilter.css"
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
    <div className=" seachAndFilter-container">
        <div className="left-side">
            <div className="filter-top">
                <div>
                <FaSlidersH />
                <p>Filter</p>
                </div>
                <FaCaretLeft/>
            </div>
            <div className="filter-bottom">
                <div className="filter-option">
                    <div>
                    <FaCalendarAlt/>
                    <p>Graduation Year</p>
                    </div>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <div>
                    <FaMapPin/>
                    <p>Location</p>
                    </div>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <div>
                    <FaIndustry/>
                    <p>Industry</p>
                    </div>
                    <FaCaretDown/>
                </div>
                <div className="filter-option">
                    <div>
                    <FaAtom/>
                    <p>Department</p>
                    </div>
                    <FaCaretDown/>
                </div>
            </div>
        </div>
        <div className="right-side">
            <>
            <MultipleProfiles
            profiles={profiles}
            />
            </>
        </div>
    </div>
  )
}

export default SearchAndFilter