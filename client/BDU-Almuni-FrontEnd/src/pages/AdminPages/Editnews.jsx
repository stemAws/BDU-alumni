import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/editNews.css';
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const EditNews = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/news/${newsId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newsDataFromServer = await response.json();

        setNewsData(newsDataFromServer);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, [newsId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!newsData.title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(newsData.title)) {
      setTitleError("Title field must contain only letters, numbers, and spaces!");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!newsData.description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    } else if (/^[0-9\s]+$/.test(newsData.description)) {
      setDescriptionError("Please include meaningful information in the description");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/news/${newsId}`,
          {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsData),
          }
        );

        if (response.ok) {
          navigate.push("/admin/news");
        } else {
          const errorResponse = await response.json();
          console.error("Error updating news data:", response.status, errorResponse);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleClick = () => {
    navigate.push("/admin/news");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/news" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit News</h2>
      <div className="formContainer">
        <form className="formform" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form">
            <label className="label">News Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newsData.title}
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
              value={newsData.description}
              onChange={handleInputChange}
            />
            {descriptionError && <p className="errorMessage">{descriptionError}</p>}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
