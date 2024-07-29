import '../../styles/jobOffer.css'
import logo from "../../assets/images/photo_2024-02-27_14-20-52.jpg";
import { useEffect, useState } from 'react';
import JobOfferPopup from '../../component/JobOfferPopup';
import JobOffers from '../../component/JobOffers';
const JobOffer = () => {
    const [openJODetail, setopenJODetail] = useState(false);
    const [jobOffers, setjobOffers] = useState([]);
    const [jobOffer, setjobOffer] = useState([{}]);
    const jobToReadMore=(jobID)=>{
setjobOffer(jobOffers?.find((jOff=>jOff.jobPostingId===jobID)))
    }
    useEffect(() => {
     const fetchJobs=async()=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job-list`,{
            credentials:'include'
            })
            if (res.ok){
                const jobs = await res.json()
                setjobOffers(jobs.filter((filteredJobs)=>filteredJobs.isApproved===1))
            }
        } catch (error) {
            console.error('Error while fetching jobs',error)            
        }
        
     }
     fetchJobs()
    }, [])
    
  return (
    <div className="Admin-JO-flex-container">
    <p className="job-offer"><span className='blue-text'>JOB</span> OFFER</p>
    <div className="Admin-job-offer-container ">
        
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