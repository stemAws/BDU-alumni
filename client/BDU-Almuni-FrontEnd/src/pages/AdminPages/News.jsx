import { useState } from "react";
import "../../styles/News.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EventPost = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  // const [postDate, setPostDate] = useState("");
  // const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  // const [postDateError, setPostDateError] = useState("");
  // const [locationError, setLocationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const filesArray = Array.from(files);
      setImage(filesArray);
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
        // case "postDate":
        //   setPostDate(value);
        //   setPostDateError("");
        //   break;
        // case "location":
        //   setLocation(value);
        //   setLocationError("");
        //   break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    let valid = true;

    if (!title) {
      setTitleError(title ? "" : "Title field cannot be empty!");
      valid = false;
    }
    //else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
    //   setTitleError(
    //     "Title must contain only letters and spaces, with numbers allowed anywhere after letters!"
    //   );
    //   valid = false;
    // }
    if (!content) {
      setContentError(content ? "" : "Content field cannot be empty!");
      valid = false;
    }
    // else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(content)) {
    //   setContentError(
    //     "Content must contain only letters and spaces, with numbers allowed anywhere after letters!"
    //   );
    //   valid = false;
    // }
    // if (!postDate) {
    //     setPostDateError("Date field cannot be empty!");
    //     valid = false;
    //   } else {
    //     const postDateValue = new Date(postDate);
    //     const currentDate = new Date();

    //     // Clear the time part of both dates for comparison
    //     postDateValue.setHours(0, 0, 0, 0);
    //     currentDate.setHours(0, 0, 0, 0);

    //     if (postDateValue.getTime() !== currentDate.getTime()) {
    //       setPostDateError("Date should be today!");
    //       valid = false;
    //     }
    //   }
    // if (!location) {
    //   setLocationError(location ? "" : "Location field cannot be empty!");
    //   valid = false;
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(location)) {
    //   setLocationError("Location must contain only letters and spaces!");
    //   valid = false;
    // }

    if (valid) {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add-news`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              content: content,
              image: image,
            }),
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

  return (
    <div className="NewsUpload">
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
              type="text"
              placeholder="Content"
              name="content"
              value={content}
              onChange={handleInputChange}
            />
            {contentError && <p className="errorMessage">{contentError}</p>}
          </div>
          {/* <div className="form">
            <label className="label">Location:</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleInputChange}
            />
            {locationError && <p className="errorMessage">{locationError}</p>}
          </div> */}
          {/* <div className="form">
            <label className="label">Date:</label>
            <input
              type="date"
              name="postDate"
              value={postDate}
              onChange={handleInputChange}
            />
            {postDateError && <p className="errorMessage">{postDateError}</p>}
          </div> */}

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
