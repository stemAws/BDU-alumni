import '../../styles/suggestedJob.css'
import logo from "../../assets/images/photo_2024-02-27_14-20-52.jpg";
import { useState } from 'react';
import JobOfferPopup from '../../component/JobOfferPopup';
import JobOffers from '../../component/JobOffers';
import { useNavigate } from "react-router-dom";
// import Switch from '@mui/material/Switch';
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const JobOffer = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/admin/jobOffer");
      };
    const [openJODetail, setopenJODetail] = useState(false);
    const [jobOffers, setjobOffers] = useState([{
        id:1,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title new",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        workingHours : "2:00 am-11:00 pm",
        workingDays:"weekdays",
        salary :20000,
        address: "bahirdar, kebele 00",
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
        workingHours : "2:00 am-11:00 pm",
        workingDays:"weekdays",
        salary :20000,
        address: "bahirdar, kebele 00",
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
        workingHours : "2:00 am-11:00 pm",
        workingDays:"weekdays",
        salary :20000,
        address: "bahirdar, kebele 00",
        deadline: "FEb 25 2024"
    },
    {
        id:4,
        logo:`..${logo}`,
        companyName:"company name",
        uploadDate:"Feb 10 2024",
        jobTitle:"job title",
        jobDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi adipisci libero aliquid corporis ullam! Sunt cumque, at soluta architecto, rem quos reprehenderit et assumenda adipisci, odio mollitia distinctio dolorem! Dolorem!",
        peopleNeeded:10,
        workingHours : "2:00 am-11:00 pm",
        workingDays:"weekdays",
        salary :20000,
        address: "bahirdar, kebele 00",
        deadline: "FEb 25 2024"
    }]);
    const [jobOffer, setjobOffer] = useState([{}]);
    const jobToReadMore=(jobID)=>{
setjobOffer(jobOffers.find((jOff=>jOff.id===jobID)))
    }
  return (
    <div className="Admin-JO-flex-container Admin-body">
          <div className='job-usergoback'>
        <Link to="/admin/jobOffer" className="jobuserGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      </div>
        <div className='adminJobOfferHeader'>
          
    <p className="Admin-job-offer"><span className='Admin-blue-text'>JOB</span> OFFER</p>
     </div>
    <div className="Admin-job-offer-container ">
    {/* <Switch {...label} defaultUnChecked /> */}
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