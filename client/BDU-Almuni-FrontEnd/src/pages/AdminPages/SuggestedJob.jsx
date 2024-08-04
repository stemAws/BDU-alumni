import "../../styles/jobOffer.css";
import '../../styles/suggestedJob.css'
import { useEffect, useState } from "react";
import JobOfferPopup from "../../component/JobOfferPopup";
import JobOffers from "../../component/JobOffers";
const SuggestedJob = () => {
  const [openJODetail, setopenJODetail] = useState(false);
  const [jobOffers, setjobOffers] = useState([]);
  const [jobOffer, setjobOffer] = useState([{}]);
  const jobToReadMore = (jobID) => {
    setjobOffer(jobOffers?.find((jOff) => jOff.jobPostingId === jobID));
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/job-list`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const jobs = await res.json();
          setjobOffers(
            jobs.filter((filteredJobs) => filteredJobs.isApproved != 1)
          );
        }
      } catch (error) {
        console.error("Error while fetching jobs", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="Admin-JO-flex-container">
      <p className="job-offer">
        <span className="blue-text">JOB</span> OFFER
      </p>
      <div className="job-offer-container Admin-job-offer-container">
        {jobOffers.length > 0 && (
          <JobOffers
            onReadMore={jobToReadMore}
            jobOffers={jobOffers}
            setopenJODetail={setopenJODetail}
          />
        )}
      </div>
      {openJODetail && (
        <JobOfferPopup jobOffer={jobOffer} setopenJODetail={setopenJODetail} />
      )}
    </div>
  );
};

export default SuggestedJob;
