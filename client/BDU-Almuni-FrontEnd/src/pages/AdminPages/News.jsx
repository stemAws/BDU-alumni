import { useState } from "react";
import "../../styles/News.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const EventPost = () => {
  const newsCategories = [
    "Alumni Highlights",
    "Campus Updates",
    "Events & Reunions",
    "Career & Mentorship",
    "Giving & Support", // Default selected
    "Community & Social Impact",
    "Memorials & Obituaries",
  ];

  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Giving & Support"); // Default
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [categoryError, setCategoryError] = useState("");

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
        case "content":
          setContent(value);
          setContentError("");
          break;
        case "category":
          setCategory(value);
          setCategoryError("");
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    }

    if (!content) {
      setContentError("Content field cannot be empty!");
      valid = false;
    }

    if (!category) {
      setCategoryError("Please select a category!");
      valid = false;
    }

    if (valid) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("image", image);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add-news`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("News uploaded successfully");
          navigate("/admin/News");
          setSuccess(true);
        } else {
          console.error("Error uploading News", response.statusText);
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
    navigate("/admin/news");
  };

  return (
    <div className="NewsUpload">
      <Link to="/admin/Events" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Add News</h2>
      <div className="formContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Image:</label>
            <input
              className="imageInput"
              type="file"
              name="image"
              multiple
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label className="label">News Title:</label>
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
            <label className="label">Content:</label>
            <textarea
              placeholder="Content"
              name="content"
              value={content}
              onChange={handleInputChange}
            />
            {contentError && <p className="errorMessage">{contentError}</p>}
          </div>
          <div className="form">
            <label className="label">Category:</label>
            <select
              name="category"
              value={category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {newsCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {categoryError && <p className="errorMessage">{categoryError}</p>}
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

export default EventPost;
