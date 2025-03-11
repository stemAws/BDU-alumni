import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/editNews.css";
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const EditEvent = () => {
  const navigate = useNavigate();
  const { jobPostingId } = useParams();

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [jobLinkError, setJobLinkError] = useState("");
  const [eventData, setEventData] = useState({
    jobTitle: "",
    description: "",
    deadline: "",
    companyName: "",
    jobLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/job/${jobPostingId}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventDataFromServer = await response.json();

        setEventData(eventDataFromServer);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [jobPostingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {}, [eventData]);

  const isValidUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    return urlRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const currentDate = new Date();

    if (!eventData.jobTitle) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(eventData.jobTitle)) {
      setTitleError(
        "Title must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }
    if (!isValidUrl(eventData.jobLink) && eventData.jobLink.trim() !== "") {
      setJobLinkError("Please enter a valid URL");
      valid = false;
    } else {
      setJobLinkError("");
    }

    if (!eventData.description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    }

    if (!eventData.deadline) {
      setDeadlineError("Deadline field cannot be empty!");
      valid = false;
    } else {
      const deadlineValue = new Date(eventData.deadline);
      if (deadlineValue <= currentDate) {
        setDeadlineError("Deadline should be today or in the future!");
        valid = false;
      }
    }

    if (!eventData.companyName) {
      setOrganizationError("Company name field cannot be empty!");
      valid = false;
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/update-job/${jobPostingId}`,
          {
            method: "PUT",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          }
        );

        if (response.ok) {
          navigate("/admin/job-list");
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error updating job data:",
            response.status,
            errorResponse
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleClick = () => {
    navigate("/admin/job-list");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/job-list" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit Job Posted by BDU Alumni Office</h2>
      <div className="formContainer">
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Job Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="jobTitle"
              value={eventData.jobTitle}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="form">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
            />
            {descriptionError && (
              <p className="errorMessage">{descriptionError}</p>
            )}
          </div>
          <div className="form">
            <label className="label">Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={eventData.companyName}
              onChange={handleInputChange}
            />
            {organizationError && (
              <p className="errorMessage">{organizationError}</p>
            )}
          </div>
          <div className="form">
            <label className="label">Job Link:</label>
            <input
              type="text"
              name="jobLink"
              value={eventData.jobLink}
              onChange={handleInputChange}
            />
            {jobLinkError && <p className="errorMessage">{jobLinkError}</p>}
          </div>
          <div className="form">
            <label className="label">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={eventData.deadline}
              onChange={handleInputChange}
            />
            {deadlineError && <p className="errorMessage">{deadlineError}</p>}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
