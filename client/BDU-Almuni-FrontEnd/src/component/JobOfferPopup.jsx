import logo from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import {FaUsers, FaCalendarAlt, FaTimes, FaMoneyBill, FaLocationArrow, FaMoneyBillAlt, FaMoneyCheck, FaMapMarker} from 'react-icons/fa';
import Button  from "../component/Button";
import "../styles/jobOfferPopup.css";
const JobOfferPopup = ({jobOffer,setopenJODetail}) => {
    console.log(jobOffer,'sdfghj')
  return (
    <div className="JO-overlay">
    <div className="JO-popup-container">
        <div className="JO-close"><FaTimes  onClick={()=>setopenJODetail(false)} /></div>
        
        <div className="JO-top">
        <div className="company-detail"><img src={jobOffer.logo} alt="" className="company-logo" />
                <p className="company-name">{jobOffer.companyName}</p>
                </div>
                <p className="JO-upload-date">{jobOffer.uploadDate}</p>
        </div>
        <div className="JO-bottom">
                <p className="job-title">
                    {jobOffer.jobTitle}
                </p>
                <p className="job-description detail">{jobOffer.jobDescription}</p>
                <div className="job-need-conatiner">
                    <div><div className="job-need JO">
                    <FaUsers />
                    <p className="people-needed">{jobOffer.peopleNeeded} people needed</p>
                </div>
                <div className="job-need JO">
                    <FaMoneyCheck />
                    <p className="JO-up-to"> {jobOffer.salary}/month</p>
                </div></div>
                <div><div className="job-need JO">
                    <FaMapMarker />
                    <p className="JO-up-to">{jobOffer.address}</p>
                </div>
                <div className="job-need JO JO-deadline">
                    <FaCalendarAlt />
                    <p className="JO-up-to">up to {jobOffer.deadline}</p>
                </div></div>
                
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