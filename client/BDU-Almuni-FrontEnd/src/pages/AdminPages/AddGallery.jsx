import { useState, useEffect } from "react";
import "../../styles/AddGallery.css";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddGallery = ({ updateCategories }) => {
  const currentYear = new Date().getFullYear();
  // Generate years from 1954 to current year
  const years = Array.from(
    { length: currentYear - 1954 + 1 },
    (_, i) => 1954 + i
  ).reverse();

  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(currentYear);
  const [images, setImages] = useState("");
  const [eventError, setEventError] = useState("");
  const [yearError, setYearError] = useState("");
  const [imagesError, setImagesError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch categories or other initial data if needed
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/categories`,
          { credentials: "include" }
        );
        const data = await response.json();
        updateCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [updateCategories]);

  const handleEventChange = (e) => {
    setEvent(e.target.value);
    setEventError("");
  };

  const handleDiscriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    setYearError("");
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    setImagesError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!event) {
      setEventError("Event field cannot be empty!");
      valid = false;
    } else {
      setEventError("");
    }
    if (!year) {
      setYearError("Please select year!");
      valid = false;
    } else {
      setYearError("");
    }

    if (!images) {
      setImagesError("Please select images");
      valid = false;
    }

    if (!description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    }

    if (valid) {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("event", event);
        formData.append("description", description);
        formData.append("year", year);
        Array.from(images).forEach((image) => formData.append("images", image));

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/upload`,
          {
            credentials: "include",

            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("Gallery uploaded successfully");
          setSuccess(true);
          navigate("/admin/gallery");
        } else {
          console.error("Failed to upload:", response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error("Error uploading images", error);
        toast.error(`Error uploading images: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = () => {
    navigate("/admin/gallery");
  };

  return (
    <div className="galleryUpload">
      <Link to="/admin/gallery" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Add Gallery</h2>
      <div className="formContainer">
        <form className="eventformform" onSubmit={handleSubmit}>
          <ToastContainer autoClose={1500} />
          <div className="form">
            <label className="label" htmlFor="event">
              Event:
            </label>
            <input
              type="text"
              id="event"
              placeholder="Category title"
              value={event}
              onChange={handleEventChange}
            />
            {eventError && <p className="errorMessage">{eventError}</p>}
          </div>
          <div className="form">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleDiscriptionChange}
            />
            {descriptionError && (
              <p className="errorMessage">{descriptionError}</p>
            )}
          </div>

          <div className="form">
            <label className="label" htmlFor="year">
              Year:
            </label>
            <div className="dropdown-container">
              <div className="dropdown-selected" onClick={toggleDropdown}>
                {selectedYear || "Select Year"}
              </div>
              {isOpen && (
                <ul className="dropdown-list">
                  {years.map((year, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleYearChange(year);
                        setSelectedYear(year);
                        setIsOpen(false);
                      }}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {yearError && <p className="errorMessage">{yearError}</p>}
          </div>

          <div className="form">
            <label className="label" htmlFor="images">
              Media:
            </label>
            <input
              className="imageInput"
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
            />
            {imagesError && <p className="errorMessage">{imagesError}</p>}
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

export default AddGallery;
