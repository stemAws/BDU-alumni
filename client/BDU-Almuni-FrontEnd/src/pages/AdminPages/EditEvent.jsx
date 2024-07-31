import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/editNews.css";
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [organizerError, setOrganizerError] = useState("");

  const [eventData, setEventData] = useState({
    image: null,
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    organizer: "",
    eventLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/adminEvents/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventDataFromServer = await response.json();

        setEventData(eventDataFromServer);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value} = e.target;

    setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
  };
  useEffect(() => {
  }, [eventData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!eventData.title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(eventData.title)) {
      setTitleError("Title field must contain only letters, numbers, and spaces!");
      valid = false;
    } else {
      setTitleError("");
    }    

    if (!eventData.content) {
      setDescriptionError(
        eventData.description ? "" : "Description field cannot be empty!"
      );
      valid = false;
    } else if (/^[0-9\s]+$/.test(eventData.content)) {
      setDescriptionError(
        "Please include meaningful information in the description"
      );
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!eventData.startDate) {
      setStartDateError("StartDate field cannot be empty!");
      valid = false;
    } else {
      const startDateValue = new Date(eventData.startDate);
      const currentDate = new Date();
      if (startDateValue <= currentDate) {
        setStartDateError("Start Date should be today or in the future!");
        valid = false;
      } else {
        setStartDateError("");
      }
    }
    if (!eventData.endDate) {
      setEndDateError(
        eventData.endDate ? "" : "EndDate field cannot be empty!"
      );
      valid = false;
    } else {
      const endDateValue = new Date(eventData.endDate);
      const currentDate = new Date();
      if (endDateValue <= currentDate) {
        setEndDateError("End Date should be after the current date!");
        valid = false;
      } else {
        setEndDateError("");
      }
      if (endDateValue < new Date(eventData.startDate)) {
        setEndDateError("End Date should be after the Start Date!");
        valid = false;
      } else {
        setEndDateError("");
      }
      if (new Date(eventData.startDate) > endDateValue) {
        setEndDateError("End Date should be after the Start Date!");
        valid = false;
      } else {
        setEndDateError("");
      }
    }

    if (!eventData.organizer) {
      setOrganizerError(
        eventData.organizer ? "" : "Organizer field cannot be empty!"
      );
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(eventData.organizer)) {
      setOrganizerError("This field must contain only letters and spaces!");
      valid = false;
    } else {
      setOrganizerError("");
    }

     if (valid) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/adminEvents/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        navigate("/admin/Events");
      } else {
        const errorResponse = await response.json();
        console.error("Error updating event data:", response.status, errorResponse);
      }
    } catch (error) {
      console.error("Error:", error);
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
      <h2>Edit Event</h2>
      <div className="formContainer">
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Event Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="form">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="content"
              value={eventData.content}
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
              value={eventData.organizer}
              onChange={handleInputChange}
            />
            {organizerError && <p className="errorMessage">{organizerError}</p>}
          </div>
          <div className="form">
            <label className="label">Link:</label>
            <input
              type="text"
              name="eventLink"
              value={eventData.eventLink}
              onChange={handleInputChange}
            />
            {/* {LinkError && <p className="errorMessage">{LinkError}</p>} */}
          </div>
          <div className="form">
            <label className="label">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
            />
            {startDateError && <p className="errorMessage">{startDateError}</p>}
          </div>
          <div className="form">
            <label className="label">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleInputChange}
            />
            {endDateError && <p className="errorMessage">{endDateError}</p>}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
