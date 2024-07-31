import React, { useState } from "react";
import "../../styles/AJobOffer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const JobOffer = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deadline, setDeadline] = useState("");
  const [address, setAddress] = useState("");
  const [peopleNeeded, setPeopleNeeded] = useState("");
  const [salary, setSalary] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [employmentTypeError, setEmploymentTypeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [peopleNeededError, setPeopleNeededError] = useState("");
  const [salaryError, setSalaryError] = useState("");

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
        case "description":
          setDescription(value);
          setDescriptionError("");
          break;
        case "deadline":
          setDeadline(value);
          setDeadlineError("");
          break;
        case "organization":
          setOrganization(value);
          setOrganizationError("");
          break;
        case "employmentType":
          setEmploymentType(value);
          setEmploymentTypeError("");
          break;
        case "email":
          setEmail(value);
          setEmailError("");
          break;
        case "phoneNumber":
          setPhoneNumber(value);
          setPhoneNumberError("");
          break;
        case "address":
          setAddress(value);
          setAddressError("");
          break;
        case "peopleNeeded":
          setPeopleNeeded(value);
          setPeopleNeededError("");
          break;
        case "salary":
          setSalary(value);
          setSalaryError("");
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const currentDate = new Date();

    if (!title) {
      setTitleError("Title field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(title)) {
      setTitleError("Title must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }

    if (!description) {
      setDescriptionError("Description field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
      setDescriptionError("Description must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }

    if (!deadline) {
      setDeadlineError("Deadline field cannot be empty!");
      valid = false;
    } else {
      const deadlineValue = new Date(deadline);
      if (deadlineValue <= currentDate) {
        setDeadlineError("Deadline should be today or in the future!");
        valid = false;
      }
    }

    if (!organization) {
      setOrganizationError("Organization field cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(organization)) {
      setOrganizationError("Organization must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }

    if (!email) {
      setEmailError("Email field cannot be empty!");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address!");
      valid = false;
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number field cannot be empty!");
      valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number!");
      valid = false;
    }

    if (!employmentType) {
      setEmploymentTypeError("Employment Type field cannot be empty!");
      valid = false;
    } else if (employmentType.length > 20) {
      setEmploymentTypeError("Employment Type should be less than 20 characters!");
      valid = false;
    }

    if (!address) {
      setAddressError("Address field cannot be empty!");
      valid = false;
    } else if (address.length > 20) {
      setAddressError("Address should be less than 20 characters!");
      valid = false;
    }

    if (!peopleNeeded) {
      setPeopleNeededError("People Needed field cannot be empty!");
      valid = false;
    } else if (!/^\d+$/.test(peopleNeeded)) {
      setPeopleNeededError("Please enter a valid number for People Needed!");
      valid = false;
    }

    if (!salary) {
      setSalaryError("Salary field cannot be empty!");
      valid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(salary)) {
      setSalaryError("Please enter a valid salary amount!");
      valid = false;
    }

    if (valid) {
      try {

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("image", image);
        formDataToSend.append("title", title);
        formDataToSend.append("description", description);
        formDataToSend.append("deadline", deadline);
        formDataToSend.append("organization", organization);
        formDataToSend.append("employmentType", employmentType);
        formDataToSend.append("address", address);
        formDataToSend.append("email", email);
        formDataToSend.append("phoneNumber", phoneNumber);
        formDataToSend.append("peopleNeeded", peopleNeeded);
        formDataToSend.append("salary", salary);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/add-job`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (response.ok) {
          toast.success("Job post uploaded successfully");
          // navigate("/admin/Events");
          setSuccess(true);
        } else {
          console.error("Error uploading job post", response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="JobUpload">
      <div className="SuggestedJobheader">
        <h3> JOB POST </h3>
        <Link to="/admin/suggestedJob">
          <button className="addJob"> Suggested Job</button>
        </Link>
      </div>
      <div className="JobformContainer">
        <ToastContainer autoClose={1500} />
        <form
          className="Jobformform"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="Jobform">
            <label className="label">Image:</label>
            <input
              className="imageInput"
              type="file"
              name="image"
              onChange={handleInputChange}
            />
          </div>
          <div className="Jobform">
            <label className="label">Job Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
            {titleError && <p className="errorMessage">{titleError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            {descriptionError && <p className="errorMessage">{descriptionError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">company Name:</label>
            <input
              type="text"
              name="organization"
              value={organization}
              onChange={handleInputChange}
            />
            {organizationError && <p className="errorMessage">{organizationError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
            />
            {phoneNumberError && <p className="errorMessage">{phoneNumberError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Employment Type:</label>
            <input
              type="text"
              name="employmentType"
              value={employmentType}
              onChange={handleInputChange}
            />
            {employmentTypeError && <p className="errorMessage">{employmentTypeError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {emailError && <p className="errorMessage">{emailError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Company Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
            />
            {addressError && <p className="errorMessage">{addressError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={deadline}
              onChange={handleInputChange}
            />
            {deadlineError && <p className="errorMessage">{deadlineError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">People Needed:</label>
            <input
              type="text"
              name="peopleNeeded"
              value={peopleNeeded}
              onChange={handleInputChange}
            />
            {peopleNeededError && <p className="errorMessage">{peopleNeededError}</p>}
          </div>
          <div className="Jobform">
            <label className="label">Salary:</label>
            <input
              type="text"
              name="salary"
              value={salary}
              onChange={handleInputChange}
            />
            {salaryError && <p className="errorMessage">{salaryError}</p>}
          </div>
          <div className='buttonss'>
            <button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobOffer;
