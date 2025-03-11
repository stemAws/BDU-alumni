import { useState } from "react";
import "../../styles/AJobOffer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const JobOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobLink, setJobLink] = useState("");
  const navigate = useNavigate();

  const [deadline, setDeadline] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [jobLinkError, setJobLinkError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        setTitleError("");
        break;
      case "description":
        setDescription(value);
        setDescriptionError("");
        break;
      case "deadline":
        setDeadline(value);
        setDeadlineError("");
        break;
      case "organization":
        setOrganization(value);
        setOrganizationError("");
        break;
      case "eventLink":
        setJobLink(value);
        setJobLinkError("");
        break;

      default:
        break;
    }
    // }
  };

  const isValidUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    return urlRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const currentDate = new Date();

    if (!title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
      setTitleError(
        "Title must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }
    if (!isValidUrl(jobLink) && jobLink.trim() !== "") {
      setJobLinkError("Please enter a valid URL");
      valid = false;
    } else {
      setJobLinkError("");
    }

    if (!description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
      setDescriptionError(
        "Description must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }

    if (!deadline) {
      setDeadlineError("Deadline field cannot be empty!");
      valid = false;
    } else {
      const deadlineValue = new Date(deadline);
      if (deadlineValue <= currentDate) {
        setDeadlineError("Deadline should be today or in the future!");
        valid = false;
      }
    }

    if (!organization) {
      setOrganizationError("Organization field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(organization)) {
      setOrganizationError(
        "Organization must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }

    if (valid) {
      try {
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("jobTitle", title);
        formDataToSend.append("jobDescription", description);
        formDataToSend.append("deadline", deadline);
        formDataToSend.append("companyName", organization);
        formDataToSend.append("jobLink", jobLink);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add-job`,
          {
            method: "POST",
            credentials: "include",

            body: formDataToSend,
          }
        );
        console.log("uploading");
        if (response.ok) {
          toast.success("Job post uploaded successfully");
          navigate("/admin/job-list");
          setSuccess(true);
        } else {
          console.error("Error uploading job post", response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleClick = () => {
    navigate("/admin/job-list");
  };

  return (
    <div className="JobUpload">
      <div className="SuggestedJobheader">
        <Link to="/admin/job-list" className="userGoBack">
          <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
        </Link>
        <h3> Add Job </h3>
      </div>
      <div className="JobformContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="Jobformform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="Jobform">
            <label className="label">Job Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            {descriptionError && (
              <p className="errorMessage">{descriptionError}</p>
            )}
          </div>
          <div className="Jobform">
            <label className="label">company Name:</label>
            <input
              type="text"
              name="organization"
              value={organization}
              onChange={handleInputChange}
            />
            {organizationError && (
              <p className="errorMessage">{organizationError}</p>
            )}
          </div>

          <div className="Jobform">
            <label className="label">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={deadline}
              onChange={handleInputChange}
            />
            {deadlineError && <p className="errorMessage">{deadlineError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Job Link (Optional):</label>
            <input
              type="text"
              name="email"
              value={jobLink}
              onChange={handleInputChange}
            />
            {jobLinkError && <p className="errorMessage">{jobLinkError}</p>}
          </div>
          <div className="buttonss">
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobOffer;
