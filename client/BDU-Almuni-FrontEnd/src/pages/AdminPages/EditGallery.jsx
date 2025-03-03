import React, { useState, useEffect } from "react";
import "../../styles/EditGallery.css";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";

const EditGallery = () => {
  const navigate = useNavigate();
  const { galleryID } = useParams();
  // const [imageError, setImageError] = useState('');
  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [originalYear, setOriginalYear] = useState(""); // To track the original year

  const handleClick = () => {
    navigate("/gallery");
  };

  const [formData, setFormData] = useState({
    event: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/gallery/${galleryID}`,
          { credentials: "include" }
        );
        const galleryData = await response.json();

        if (galleryData) {
          setFormData({
            event: galleryData.event || "",
            year: galleryData.year || "",
            description: galleryData.description || "",
          });
          setOriginalYear(galleryData.year || ""); // Set the original year
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleryData();
  }, [galleryID]);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validate event (if empty)
    if (!formData.event) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else {
      setTitleError("");
    }

    // Only validate year if it has changed
    if (formData.year !== originalYear) {
      if (!formData.year) {
        setYearError("Year field cannot be empty!");
        valid = false;
      } else if (isNaN(formData.year)) {
        setYearError("Year must be a number!");
        valid = false;
      } else if (formData.year.length !== 4) {
        setYearError("Year must be a 4-digit number!");
        valid = false;
      } else if (formData.year < 1967) {
        setYearError("Year must not be before 1967!!");
        valid = false;
      } else {
        setYearError("");
      }
    }

    // Validate description (if empty)
    if (!formData.description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/gallery/${galleryID}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Redirect to the gallery page or handle success as needed
        navigate("/admin/gallery");
      } catch (error) {
        console.error("Error updating gallery:", error);
        // Handle the error, show an error message, or redirect to an error page
      }
    }
  };

  return (
    <div className="EditgalleryUpload">
      <Link to="/admin/gallery">
        <ChevronLeftIcon className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit Gallery</h2>
      <div className="EditformContainer">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <label className="label" htmlFor="event">
              Event:
            </label>
            <input
              type="text"
              id="event"
              placeholder="Category title"
              value={formData.event}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="form">
            <label className="label" htmlFor="year">
              Year:
            </label>
            <input
              type="text"
              id="year"
              placeholder="Batch"
              value={formData.year}
              onChange={handleInputChange}
            />
            {yearError && <p className="errorMessage">{yearError}</p>}
          </div>
          <div className="form">
            <label className="label" htmlFor="description">
              Description:
            </label>
            <input
              type="text"
              id="description"
              placeholder="Category description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {descriptionError && (
              <p className="errorMessage">{descriptionError}</p>
            )}
          </div>
          <button type="submit">Save Change</button>
        </form>
      </div>
    </div>
  );
};

export default EditGallery;
