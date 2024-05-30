import { useState } from "react";
import "../../styles/AddDonation.css";
import {useNavigate} from 'react-router-dom'
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonationPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let valid = true;
  
    if (!title) {
      setTitleError(title ? "" : "Title field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
      setTitleError("title must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }else if (title.length > 27) {
      setTitleError("Title must be at most 27 characters long!");
      valid = false;
    }
    if (!description) {
      setDescriptionError(
        description ? "" : "Description field cannot be empty!"
      );
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
      setDescriptionError("description must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }
  
    if (valid) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("link", link);
        formDataToSend.append("description", description);
  
        // Convert FormData to plain JavaScript object
        const formDataObject = {};
        formDataToSend.forEach((value, key) => {
          formDataObject[key] = value;
        });
  
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/donation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject), // Send the plain JavaScript object
          }
        );
  
        if (response.ok) {
          toast.success("Donation data uploaded successfully");
          navigate("/admin/donation");
          setSuccess(true);
        } else {
          console.error("Error uploading donation data", response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  const handleClick = () => {
   navigate("/admin/donation");
  };

  return (
    <div className="eventUpload">
      <Link to="/donation" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick}/>
      </Link>
      <h2> Add Donation </h2>
      <div className="formContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="formform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form">
            <label className="label">Donation Title:</label>
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

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default DonationPost;
