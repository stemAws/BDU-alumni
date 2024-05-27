import { FaUsers, FaCalendarAlt } from "react-icons/fa"
import Button from "./Button"

const EachJob = ({jobOffer,setopenJODetail,onReadMore}) => {
  return (
    <div className="each-job-offer">
            <div className="JO-top">
                <div className="company-detail"><img src={jobOffer?.logo} alt="" className="company-logo" />
                <p className="company-name">{jobOffer?.companyName}</p>
                </div>
                <p className="JO-upload-date">{jobOffer.uploadDate}</p>
            </div>
            <div className="JO-bottom">
                <p className="job-title">
                {jobOffer.jobTitle}
                </p>
                <p className="job-description">{jobOffer.jobDescription}</p>
                <div className="job-need">
                    <FaUsers />
                    <p className="people-needed">{jobOffer.peopleNeeded} people needed</p>
                </div>
                <div className="job-need">
                    <FaCalendarAlt />
                    <p className="JO-up-to">up to {jobOffer.deadline}</p>
                </div>
                <div className="JO-btns">
                    <Button text={"Apply"} id={"JO-apply"} />
                    <Button onClick={()=>{onReadMore(jobOffer.id)
                    setopenJODetail(true)}}  text={"Read More"} id={"JO-read-more"} />

                </div>
            </div>
        </div>
  )
}

export default EachJob