import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/editDonation.css";
import { Link } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const EditDonation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [donationData, setDonationData] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/donation/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const donationDataFromServer = await response.json();

        setDonationData(donationDataFromServer[0]); // Access the first element
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDonationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
  }, [donationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!donationData.title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(donationData.title)) {
      setTitleError(
        "Title field must contain only letters, numbers, and spaces!"
      );
      valid = false;
    } else {
      setTitleError("");
    }

    if (!donationData.description) {
      setDescriptionError(
        donationData.description ? "" : "Description field cannot be empty!"
      );
      valid = false;
    } else if (/^[0-9\s]+$/.test(donationData.description)) {
      setDescriptionError(
        "Please include meaningful information in the description"
      );
      valid = false;
    } else {
      setDescriptionError("");
    }
    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/donation/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(donationData),
          }
        );

        if (response.ok) {
          navigate("/admin/donation");
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error updating event data:",
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
    navigate("/admin/donation");
  };

  return (
    <div className="eventUpload">
      <Link to="/admin/donation" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Edit Donation</h2>
      <div className="formContainer">
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
              value={donationData?.title}
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
              value={donationData?.description}
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
              value={donationData?.link}
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

export default EditDonation;
