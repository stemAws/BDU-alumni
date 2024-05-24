import logo from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import {FaBaby, FaCalendarAlt, FaTimes} from 'react-icons/fa';
import Button  from "../component/Button";
import "../styles/jobOfferPopup.css";
const JobOfferPopup = ({setopenJODetail}) => {
  return (
    <div className="JO-overlay">
    <div className="JO-popup-container">
        <div className="JO-close"><FaTimes  onClick={()=>setopenJODetail(false)} /></div>
        
        <div className="JO-top">
        <div className="company-detail"><img src={logo} alt="" className="company-logo" />
                <p className="company-name">company name</p>
                </div>
                <p className="JO-upload-date">Feb 10 2024</p>
        </div>
        <div className="JO-bottom">
                <p className="job-title">
                    job title
                </p>
                <p className="job-description detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, animi labore. Temporibus cumque quia quos reiciendis! Atque dicta, laboriosam unde omnis quidem aliquam perspiciatis id officia ipsum eius accusantium praesentium</p>
                <div className="job-need">
                    <FaBaby />
                    <p className="people-needed">10 people needed</p>
                </div>
                <div className="job-need">
                    <FaCalendarAlt />
                    <p className="JO-up-to">up to FEb 25 2024</p>
                </div>
                <div className="JO-btns">
                    <Button text={"Apply"} id={"JO-apply"} />
                </div>
                </div>
    </div>
    </div>
  )
}

export default JobOfferPopup