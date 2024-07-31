import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import "../../styles/editNews.css";

const EditClub = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [chaptersData, setchaptersData] = useState({
    title: "",
    description: "",
    website: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/get-chapter/${chapterId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const chaptersDataFromServer = await response.json();
        console.log(chaptersDataFromServer);
        setchaptersData(chaptersDataFromServer);
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    };

    fetchData();
  }, [chapterId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setchaptersData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!chaptersData.title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(chaptersData.title)) {
      setTitleError(
        "Title field must contain only letters, numbers, and spaces!"
      );
      valid = false;
    } else {
      setTitleError("");
    }

    if (!chaptersData.description) {
      setContentError("Content field cannot be empty!");
      valid = false;
    } else if (/^[0-9\s]+$/.test(chaptersData.description)) {
      setContentError("Please include meaningful information in the content");
      valid = false;
    } else {
      setContentError("");
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/edit-chapter/${chapterId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chaptersData),
          }
        );

        if (response.ok) {
          navigate("/admin/chapters");
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error updating chapters data:",
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
    navigate("/admin/chapters");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/chapters" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit Club</h2>
      <div className="formContainer">
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">chapters Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={chaptersData.title}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="form">
            <label className="label">Content:</label>
            <textarea
              placeholder="Content"
              name="description"
              value={chaptersData.description}
              onChange={handleInputChange}
            />
            {contentError && <p className="errorMessage">{contentError}</p>}
          </div>
          <div className="form">
            <label className="label">Link:</label>
            <input
              type="text"
              name="website"
              value={chaptersData.website}
              onChange={handleInputChange}
            />
            {/* {LinkError && <p className="errorMessage">{LinkError}</p>} */}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditClub;
