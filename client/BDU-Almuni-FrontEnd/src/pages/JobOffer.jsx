import '../styles/jobOffer.css'
import logo from "../assets/images/photo_2024-02-27_14-20-52.jpg";
import { useState } from 'react';
import JobOfferPopup from '../component/JobOfferPopup';
import JobOffers from '../component/JobOffers';
const JobOffer = () => {
    const [openJODetail, setopenJODetail] = useState(false);
    const [jobOffers, setjobOffers] = useState([{
        id:1,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title new",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        deadline: "FEb 25 2024"
    },
    {
        id:2,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        deadline: "FEb 25 2024"
    },
    {
        id:3,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        deadline: "FEb 25 2024"
    },
    {
        id:4,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        deadline: "FEb 25 2024"
    }]);
    const [jobOffer, setjobOffer] = useState([{}]);
    const jobToReadMore=(jobID)=>{
setjobOffer(jobOffers.find((jOff=>jOff.id===jobID)))
    }
  return (
    <div className="JO-flex-container">
    <div className="job-offer-container body">
        <p className="job-offer"><span className='blue-text'>JOB</span> OFFER</p>
        {
            jobOffers.length > 0 &&(
                <JobOffers onReadMore={jobToReadMore} jobOffers={jobOffers} setopenJODetail={setopenJODetail} />
            )
        }
    </div>
    {
        openJODetail&&(
            <JobOfferPopup jobOffer={jobOffer} setopenJODetail={setopenJODetail} />
        )
    }
    </div>
  )
}

export default JobOffer