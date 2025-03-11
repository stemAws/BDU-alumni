import logo from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import {
  FaUsers,
  FaCalendarAlt,
  FaTimes,
  FaMoneyCheck,
  FaMapMarker,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Button from "../component/Button";
import "../styles/jobOfferPopup.css";
import { Link } from "react-router-dom";
const JobOfferPopup = ({ jobOffer, setopenJODetail }) => {
  return (
    <div className="JO-overlay">
      <div className="JO-popup-container">
        <div className="JO-close">
          <FaTimes onClick={() => setopenJODetail(false)} />
        </div>

        <div className="JO-top">
          <div className="company-detail">
            {/* <img src={jobOffer?.profilePicture} alt="" className="company-logo" /> */}
            <p className="company-name">{jobOffer?.companyName}</p>
          </div>
          <p className="JO-upload-date">
            {new Date(jobOffer?.createdAt).toLocaleDateString("default", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="JO-bottom">
          <p className="job-title">{jobOffer?.jobTitle}</p>
          <Link
            to={
              jobOffer?.role === "contentManager" ||
              jobOffer?.role === "systemAdmin"
                ? "/contactus"
                : `/profilePage/${jobOffer?.username}`
            }
          >
            <div className="name-profile">
              {jobOffer?.role === "contentManager" ||
              jobOffer?.role === "systemAdmin" ? (
                <p>Posted by Alumni Office</p>
              ) : (
                <>
                  <img
                    src={jobOffer?.profilePicture}
                    alt=""
                    className="company-logo"
                  />
                  <p>{jobOffer?.fullName}</p>
                </>
              )}
            </div>
          </Link>

          <p className="job-description detail">{jobOffer?.description}</p>
          <div className="job-need-conatiner">
            {/* <div> */}
            {/* <div className="job-need JO">
                <FaPhone />
                <p className="people-needed">{jobOffer?.phoneNumber}</p>
              </div> */}
            {/* <div className="job-need JO">
                <FaUsers />
                <p className="people-needed">
                  {jobOffer?.peopleNeeded} people needed
                </p>
              </div> */}
            {/* <div className="job-need JO">
                <FaMoneyCheck />
                <p className="JO-up-to"> {jobOffer?.salary} Birr/month</p>
              </div> */}
            {/* </div> */}
            <div>
              {/* <div className="job-need JO">
                <FaEnvelope />
                <p className="JO-up-to">{jobOffer?.email}</p>
              </div> */}
              {/* <div className="job-need JO">
                <FaMapMarker />
                <p className="JO-up-to">{jobOffer?.companyAddress}</p>
              </div> */}
              <div className="job-need JO JO-deadline">
                <FaCalendarAlt />
                <p className="JO-up-to">
                  up to{" "}
                  {new Date(jobOffer?.deadline).toLocaleDateString("default", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          {jobOffer.jobLink && (
            <div className="JO-btns">
              <Button text={"Apply"} id={"JO-apply"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOfferPopup;
