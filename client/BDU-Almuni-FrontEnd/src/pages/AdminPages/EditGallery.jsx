import React, { useState, useEffect } from "react";
import "../../styles/EditGallery.css";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  useNavigate,
  useParams,
} from "react-router-dom";


const EditGallery = () => {
  const navigate = useNavigate();
  const { galleryID } = useParams();

  // const [imageError, setImageError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [yearError, setYearError] = useState('');

  const handleClick = () => {
    navigate("/gallery");
  };

  const [formData, setFormData] = useState({
    event: "",
    year: ""
    });

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/gallery/${galleryID}`
        );
        const [galleryData] = await response.json();

        if (galleryData) {
          setFormData({
            event: galleryData.event || "",
            year: galleryData.year || ""
          });
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

    if (!formData.event){
      setTitleError(formData.event ? '' : 'Title field cannot be empty!');
      valid = false;
    }else if(!/^[a-zA-Z\s]+$/.test(formData.event)){
      setTitleError('Title field must contain only letters and spaces!');
      valid = false;
    }else{
      setTitleError('')
    }

    if (!formData.year) {
      setYearError('Year field cannot be empty!');
     valid = false;
    } else if (isNaN(formData.year)){
      setYearError('Year must be a number!');
      valid = false;
    }else if (formData.year.length !== 4){
      setYearError('Year must be a 4-digit number!');
      valid = false;
    }else if (formData.year < 2019){
      setYearError('Year must not be before 2019!!');
      valid = false;
    }else {
      setYearError('');
    }
    

    if (valid) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/gallery/${galleryID}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
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
          <button type="submit">Save Change</button>
        </form>
      </div>
    </div>
  );
};

export default EditGallery;
