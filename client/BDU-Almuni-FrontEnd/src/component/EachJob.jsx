import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import Button from "./Button";
import { Switch } from "@mui/material";
import { useState } from "react";

const EachJob = ({ jobOffer, setopenJODetail, onReadMore }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const dateFormatter = (date) => {
        return new Date(date).toLocaleDateString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleSwitchToggle = async () => {
        const newSwitchState = !isSwitchOn;
        setIsSwitchOn(newSwitchState);
        
        if (newSwitchState) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/approveJob/${jobOffer.jobPostingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ isApproved: 1 })
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                console.log("Request successful");
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        }
    };

    return (
        <div className="each-job-offer job-offer-item">
            <div className="JO-top">
                <Switch
                    className="userSwitch adminswich"
                    checked={isSwitchOn}
                    onChange={handleSwitchToggle}
                />
                <div className="company-detail">
                    <p className="company-name">{jobOffer?.companyName}</p>
                </div>
                <p className="JO-upload-date">{dateFormatter(jobOffer?.createdAt)}</p>
            </div>
            <div className="JO-bottom">
                <p className="job-title">
                    {jobOffer?.jobTitle}
                </p>
                <p className="job-description">{jobOffer?.description}</p>
                <div className="job-need">
                    <FaUsers />
                    <p className="people-needed">{jobOffer?.peopleNeeded} people needed</p>
                </div>
                <div className="job-need">
                    <FaCalendarAlt />
                    <p className="JO-up-to">up to {dateFormatter(jobOffer?.deadline)}</p>
                </div>
                <div className="JO-btns">
                    <Button text={"Apply"} id={"JO-apply"} />
                    <Button onClick={() => {
                        onReadMore(jobOffer?.jobPostingId);
                        setopenJODetail(true);
                    }} text={"Read More"} id={"JO-read-more"} />
                </div>
            </div>
        </div>
    );
};

export default EachJob;
