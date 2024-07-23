import { useState } from "react";
import "../../styles/News.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPost = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postDate, setPostDate] = useState("");
  // const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [postDateError, setPostDateError] = useState("");
  // const [locationError, setLocationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const filesArray = Array.from(files);
      setImages(filesArray);
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
        case "postDate":
          setPostDate(value);
          setPostDateError("");
          break;
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

    let valid = true;

    if (!title) {
      setTitleError(title ? "" : "Title field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
      setTitleError(
        "Title must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }
    if (!description) {
      setDescriptionError(
        description ? "" : "Description field cannot be empty!"
      );
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
      setDescriptionError(
        "Description must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }
    if (!postDate) {
        setPostDateError("Date field cannot be empty!");
        valid = false;
      } else {
        const postDateValue = new Date(postDate);
        const currentDate = new Date();
  
        // Clear the time part of both dates for comparison
        postDateValue.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
  
        if (postDateValue.getTime() !== currentDate.getTime()) {
          setPostDateError("Date should be today!");
          valid = false;
        }
      }
    // if (!location) {
    //   setLocationError(location ? "" : "Location field cannot be empty!");
    //   valid = false;
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(location)) {
    //   setLocationError("Location must contain only letters and spaces!");
    //   valid = false;
    // }

    if (valid) {
      try {
        const formDataToSend = new FormData();
        images.forEach((image, index) => {
          formDataToSend.append(`image${index}`, image);
        });
        formDataToSend.append("title", title);
        formDataToSend.append("description", description);
        formDataToSend.append("postDate", postDate);
        formDataToSend.append("location", location);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/News`,
          {
            method: "POST",
            body: formDataToSend,
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
            <label className="label">Images:</label>
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
          <div className="form">
            <label className="label">Date:</label>
            <input
              type="date"
              name="postDate"
              value={postDate}
              onChange={handleInputChange}
            />
            {postDateError && <p className="errorMessage">{postDateError}</p>}
          </div>

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default EventPost;
