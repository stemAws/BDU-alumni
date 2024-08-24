import { useState } from "react";
import "../../styles/AddEvent.css";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [category, setCategory] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [organizerError, setOrganizerError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [eventLocationError, setEventLocationError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files && files.length > 0 ? files[0] : null;
      setImage(file);
    } else {
      switch (name) {
        case "title":
          setTitle(value);
          setTitleError("");
          break;
        case "description":
          setDescription(value);
          setDescriptionError("");
          break;
        case "startDate":
          setStartDate(value);
          setStartDateError("");
          break;
        case "endDate":
          setEndDate(value);
          setEndDateError("");
          break;
        case "organizer":
          setOrganizer(value);
          setOrganizerError("");
          break;
        case "eventLink":
          setEventLink(value);
          setLinkError("");
          break;
        case "category":
          setCategory(value);
          setCategoryError("");
          break;
        case "eventLocation":
          setEventLocation(value);
          setEventLocationError("");
          break;
        default:
          break;
      }
    }
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
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
    //   setTitleError("Title must contain only letters and spaces, with numbers allowed anywhere after letters!");
    //   valid = false;
    }
    if (!description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
    //   setDescriptionError("Description must contain only letters and spaces, with numbers allowed anywhere after letters!");
    //   valid = false;
    }
    if (!startDate) {
      setStartDateError("StartDate field cannot be empty!");
      valid = false;
    } else {
      const startDateValue = new Date(startDate);
      if (startDateValue <= currentDate) {
        setStartDateError("Start Date should be today or in the future!");
        valid = false;
      }
    }
    if (!endDate) {
      setEndDateError("EndDate field cannot be empty!");
      valid = false;
    } else {
      const endDateValue = new Date(endDate);
      if (endDateValue <= currentDate) {
        setEndDateError("End Date should be after the current date!");
        valid = false;
      }
      if (endDateValue < new Date(startDate)) {
        setEndDateError("End Date should be after the Start Date!");
        valid = false;
      }
    }
    if (!organizer) {
      setOrganizerError("Organizer field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(organizer)) {
      setOrganizerError("Organizer must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }
    if (!isValidUrl(eventLink) && eventLink.trim() !== "") {
      setLinkError("Please enter a valid URL");
      valid = false;
    } else {
      setLinkError("");
    }
    if (!category) {
      setCategoryError("Category field cannot be empty!");
      valid = false;
    }
    if (!eventLocation) {
      setEventLocationError("Event Location field cannot be empty!");
      valid = false;
    }

    if (valid) {
      try {

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("image", image);
        formDataToSend.append("title", title);
        formDataToSend.append("content", description);
        formDataToSend.append("startDate", startDate);
        formDataToSend.append("endDate", endDate);
        formDataToSend.append("organizer", organizer);
        formDataToSend.append("eventLink", eventLink);
        formDataToSend.append("category", category);
        formDataToSend.append("eventLocation", eventLocation);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/adminEvents`,
          {
            method: "POST",
            body: formDataToSend,
            credentials: "include"
          }
        );

        if (response.ok) {
          toast.success("Event data uploaded successfully");
          navigate("/admin/Events");
          setSuccess(true);
        } else {
          console.error("Error uploading event data", response.statusText);
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
    navigate("/admin/Events");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/Events" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2> Add Event </h2>
      <div className="formContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="eventformform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Image:</label>
            <input
              className="imageInput"
              type="file"
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label className="label">Event Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
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
              value={description}
              onChange={handleInputChange}
            />
            {descriptionError && (
              <p className="errorMessage">{descriptionError}</p>
            )}
          </div>
          <div className="form">
            <label className="label">Organizer:</label>
            <input
              type="text"
              name="organizer"
              value={organizer}
              onChange={handleInputChange}
            />
            {organizerError && <p className="errorMessage">{organizerError}</p>}
          </div>
          <div className="form">
            <label className="label">Link:</label>
            <input
              type="text"
              name="eventLink"
              value={eventLink}
              onChange={handleInputChange}
            />
            {linkError && <p className="errorMessage">{linkError}</p>}
          </div>
          <div className="form">
            <label className="label">Category:</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChange}
            />
            {categoryError && <p className="errorMessage">{categoryError}</p>}
          </div>
          <div className="form">
            <label className="label">Event Location:</label>
            <input
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={handleInputChange}
            />
            {eventLocationError && <p className="errorMessage">{eventLocationError}</p>}
          </div>
          <div className="form">
            <label className="label">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
            />
            {startDateError && <p className="errorMessage">{startDateError}</p>}
          </div>
          <div className="form">
            <label className="label">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleInputChange}
            />
            {endDateError && <p className="errorMessage">{endDateError}</p>}
          </div>
          <div className='buttonss'>
            <button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPost;
