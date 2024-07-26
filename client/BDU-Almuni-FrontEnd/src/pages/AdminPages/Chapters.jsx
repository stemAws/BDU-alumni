import { useState } from "react";
import "../../styles/AChapters.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [LinkError, setLinkError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        setTitleError("");
        break;
      case "description":
        setDescription(value);
        setDescriptionError("");
        break;
      case "link":
        setLink(value);
        setLinkError("");
        break;
      default:
        break;
    }
  };

  const isValidUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    return urlRegex.test(url);
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
    if (!isValidUrl(link) && link.trim() !== "") {
      setLinkError("Please enter a valid URL");
      valid = false;
    } else {
      setLinkError("");
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add-chapter`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              description: description,
              link: link,
            }),
          }
        );

        if (response.ok) {
          toast.success("Chapters uploaded successfully");
          setSuccess(true);
        } else {
          console.error("Error uploading chapters", response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="ChaptersUpload">
      <h2>Add Club</h2>
      <div className="formContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Club Name:</label>
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
            <label className="label">About the club:</label>
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
          <div className="form">
            <label className="label">Link:</label>
            <input
              type="text"
              name="link"
              value={link}
              onChange={handleInputChange}
            />
            {LinkError && <p className="errorMessage">{LinkError}</p>}
          </div>
          <button type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventPost;
