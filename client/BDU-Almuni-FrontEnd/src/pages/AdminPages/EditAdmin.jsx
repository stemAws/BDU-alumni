import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import "../../styles/editNews.css";
import "../../styles/AddUser.css";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [adminData, setAdminData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "",
    gender: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/get-admin/${adminId}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const adminDataFromServer = await response.json();
        setAdminData(adminDataFromServer[0]);
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    };

    fetchData();
  }, [adminId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!adminData.fullName) {
      setFullNameError("Name field cannot be empty!");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!adminData.email) {
      setEmailError("Email can not be empty!");
      valid = false;
    } else if (!regexEmail.test(adminData.email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!adminData.username) {
      setUsernameError("Username cannot be empty!");
      valid = false;
    }
    if (!adminData.role) {
      setRoleError("Select admin role!");
      valid = false;
    }
    if (!adminData.gender) {
      setGenderError("Select Gender!");
      valid = false;
    }

    if (valid) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/${adminId}`,
          {
            method: "PUT",
            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData),
          }
        );

        if (response.ok) {
          navigate("/admin/adminlist");
        } else {
          const errorResponse = await response.json();
          console.error(
            "Error updating admins data:",
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
    navigate("/admin/adminlist");
  };

  return (
    <div className="Allcontainer">
      <div className="newuser">
        <Link to="/admin/adminlist" className="userGoBack">
          <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
        </Link>
        <h1 className="newUserTitle"> Edit Admin Info</h1>

        <form className="newUserform">
          <div className="newUseritem">
            <label> User Name</label>
            <input
              type="text"
              placeholder="abebe"
              name="username"
              value={adminData.username}
              onChange={handleInputChange}
            />
            {usernameError && <p className="errorMessage">{usernameError}</p>}
          </div>
          <div className="newUseritem">
            <label> Full Name</label>
            <input
              type="text"
              placeholder="Abebe"
              name="fullName"
              value={adminData.fullName}
              onChange={handleInputChange}
            />
            {fullNameError && <p className="errorMessage">{fullNameError}</p>}
          </div>
          <div className="newUseritem">
            <label>Gender</label>
            <div className="newusergender">
              <input
                type="radio"
                id="male"
                value="M"
                name="gender"
                checked={adminData.gender === "M" || "m"}
                onChange={handleInputChange}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                value="F"
                name="gender"
                checked={adminData.gender === "F" || "f"}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
              {genderError && <p className="errorMessage">{genderError}</p>}
            </div>
          </div>
          <div className="newUseritem">
            <label> Email</label>
            <input
              type="text"
              placeholder="abebe@gmail.com"
              name="email"
              value={adminData.email}
              onChange={handleInputChange}
            />
            {emailError && <p className="errorMessage">{emailError}</p>}
          </div>
          <div className="newUseritem">
            <label>Role</label>
            <div className="newusergender">
              <input
                type="radio"
                id="systemAdmin"
                value="systemAdmin"
                checked={adminData.role === "systemAdmin"}
                name="role"
                onChange={handleInputChange}
              />
              <label htmlFor="systemAdmin">System Admin</label>
              <input
                type="radio"
                id="contentManager"
                value="contentManager"
                checked={adminData.role === "contentManager"}
                name="role"
                onChange={handleInputChange}
              />
              <label htmlFor="contentManager">Content Manager</label>{" "}
            </div>
            {roleError && <p className="errorMessage">{roleError}</p>}
          </div>

          <button className="newUserButton" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
      <div className="newMultipleUseritem multipleUsers">
        <div>
          <h1 className="newUserTitle">Change password</h1>
          <p className="changep-title">
            To change password, click on the button below.
          </p>
          <a
            className="change-link"
            href={`/changePassword/${adminData.username}`}
          >
            Change Password
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
