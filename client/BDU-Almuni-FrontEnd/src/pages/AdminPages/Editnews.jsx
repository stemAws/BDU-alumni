import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import "../../styles/editNews.css";

const EditNews = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/get-news/${newsId}`,
          { credentials: "include" }
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
    }
    // else if (!/^[a-zA-Z0-9\s]+$/.test(newsData.title)) {
    //   setTitleError(
    //     "Title field must contain only letters, numbers, and spaces!"
    //   );
    //   valid = false;
    // }
    else {
      setTitleError("");
    }

    if (!newsData.content) {
      setContentError("Content field cannot be empty!");
      valid = false;
    }
    // else if (/^[0-9\s]+$/.test(newsData.content)) {
    //   setContentError("Please include meaningful information in the content");
    //   valid = false;
    // }
    else {
      setContentError("");
    }
    if (!newsData.category) {
      setCategoryError("Category field cannot be empty!");
      valid = false;
    }

    if (valid) {
      try {
        console.log(newsData);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/edit-news/${newsId}`,
          {
            method: "PUT",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newsData),
          }
        );

        if (response.ok) {
          navigate("/admin/news");
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error updating news data:",
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
    navigate("/admin/news");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/news" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit News</h2>
      <div className="formContainer">
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
            <label className="label">Content:</label>
            <textarea
              placeholder="Content"
              name="content"
              value={newsData.content}
              onChange={handleInputChange}
            />
            {contentError && <p className="errorMessage">{contentError}</p>}
          </div>
          <div className="form">
            <label className="label">Category:</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={newsData.category}
              onChange={handleInputChange}
            />
            {categoryError && <p className="errorMessage">{categoryError}</p>}
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
