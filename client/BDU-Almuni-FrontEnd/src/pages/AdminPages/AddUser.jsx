import "../../styles/AddUser.css";

import { ChevronLeft } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const currentYear = new Date().getFullYear();
  // Generate years from 1954 to current year
  const years = Array.from(
    { length: currentYear - 1954 + 1 },
    (_, i) => 1954 + i
  ).reverse();
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorUsers, setUsersError] = useState("");
  const [graduationYearMultipleUsers, setGraduationYearMultipleUsers] =
    useState(currentYear);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [roleSingleUser, setRoleSingleUser] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [graduationYearError, setGraduationYearError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [staffRoleError, setStaffRoleError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    graduationYear: currentYear,
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    staffRole: "contentManager",
    email: "",
  });

  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setGraduationYearMultipleUsers(year); // Set it to the form data
    setIsOpen(false); // Close the dropdown after selecting
  };

  const handleChangeSingleUser = (e) => {
    const { name, value, checked } = e.target;

    // Reset error messages
    setUsernameError("");
    setFirstNameError("");
    setGraduationYearError("");
    setPasswordError("");
    setGenderError("");

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "isActiveS" ? checked : value, // Handle checkbox separately
    }));

    if (name === "role") {
      if (value === "Staff") {
        setFormData((prevData) => ({
          ...prevData,
          graduationYear: null, // Clear graduation year
          staffRole: prevData.staffRole || "contentManager", // Set default staff role if empty
        }));
      } else if (value === "Student") {
        setFormData((prevData) => ({
          ...prevData,
          staffRole: null, // Clear staff role for students
        }));
      }
    }
  };

  const handleChangeMultipleUsers = (e) => {
    const { name, value } = e.target;

    // Reset error messages
    setUsersError("");

    if (name === "graduationYear") {
      // Update graduationYear for the multiple users form
      setFormData({
        ...formData,
        graduationYear: value,
      });
      setGraduationYearMultipleUsers(value);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    let valid = true;

    const regexUpper = /[A-Z]/;
    const regexLower = /[a-z]/;
    const regexNumber = /[0-9]/;
    const regexSpecial = /[$&+,:;=?@#|'<>.^*()%!-]/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      setEmailError("Email can not be empty!");
      valid = false;
    } else if (!regexEmail.test(formData.email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!formData.username) {
      setUsernameError("User Name cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(formData.username)) {
      setUsernameError(
        "User Name must contain only letters and spaces, with numbers allowed anywhere after letters!"
      );
      valid = false;
    }
    if (!formData.fullName) {
      setFirstNameError("Name cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      setFirstNameError("Name must contain only letters and spaces!");
      valid = false;
    }

    if (roleSingleUser === "Staff" && !staffRole) {
      setStaffRoleError("Staff Role cannot be empty!");
      valid = false;
    } else if (roleSingleUser === "Staff" && !/^[a-zA-Z\s]+$/.test(staffRole)) {
      setStaffRoleError("staff Role must contain only letters and spaces!");
      valid = false;
    }
    if (!formData.password) {
      setPasswordError("Enter your password!");
      valid = false;
    } else if (formData.password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      valid = false;
    } else if (!regexUpper.test(formData.password)) {
      setPasswordError("Password should contain at least one uppercase letter");
      valid = false;
    } else if (!regexLower.test(formData.password)) {
      setPasswordError("Password should contain at least one lowercase letter");
      valid = false;
    } else if (!regexNumber.test(formData.password)) {
      setPasswordError("Password should contain at least one number");
      valid = false;
    } else if (!regexSpecial.test(formData.password)) {
      setPasswordError(
        "Password should contain at least one special character"
      );
      valid = false;
    }
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm your password!");
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      valid = false;
    }

    if (!formData.gender) {
      setGenderError("Select Gender!");
      valid = false;
    }

    if (valid) {
      if (
        !formData.username ||
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.gender ||
        !formData.role
      ) {
        console.log("Validation failed: All fields are required");
        return;
      }
      try {
        const role = formData.role === "Student" ? "alumni" : "admin";
        const dataToSend = {
          ...formData,
          role: role,
          adminRole: formData.role === "Staff" ? formData.staffRole : null,
        };

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/addUser`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to add user");
        }

        console.log("User added successfully:", responseData.message);

        // Ensure the new user is correctly created before navigating
        if (responseData.ok && responseData.success) {
          if (formData.role === "Student") {
            navigate("/admin/users");
          } else {
            navigate("/admin/adminlist");
          }
        }

        // Reset form data
        setFormData({
          username: "",
          fullName: "",
          graduationYear: "",
          password: "",
          confirmPassword: "",
          gender: "",
          role: "",
          staffRole: "contentManager", // Ensure contentManager is the default
          email: "",
        });
      } catch (error) {
        console.error("Error sending data to the server:", error.message);
      }
    } else {
      console.log("NOT VALID");
    }
  };

  const handleClick = () => {
    navigate("/admin/users");
  };

  const handleAddUsers = async () => {
    setUsersError("");

    try {
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];

      if (!file) {
        console.error("No file selected.");
        setUsersError("Select file first!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Use the correct graduation year state based on the form
      formData.append("graduationYear", graduationYearMultipleUsers);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/upload-alumni-data`,
        {
          credentials: "include",

          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Users added successfully!");

        setSuccess(true);
        navigate("/admin/users");
      } else {
        console.error("Failed to Add users:", response.statusText);
        setErrorPopup(true);
      }

      fileInput.value = "";
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <div className="Allcontainer">
      <div className="newuser">
        <Link to="/admin/users" className="userGoBack">
          <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
        </Link>
        <h1 className="newUserTitle"> Add User</h1>

        <form className="newUserform">
          <div className="newUseritem">
            <label> User Name</label>
            <input
              type="text"
              placeholder="abebe"
              name="username"
              value={formData.username}
              onChange={handleChangeSingleUser}
            />
            {usernameError && <p className="errorMessage">{usernameError}</p>}
          </div>
          <div className="newUseritem">
            <label> Full Name</label>
            <input
              type="text"
              placeholder="Abebe"
              name="fullName"
              value={formData.fullName}
              onChange={handleChangeSingleUser}
            />
            {firstNameError && <p className="errorMessage">{firstNameError}</p>}
          </div>

          <div className="newUseritem">
            <label>Password</label>
            <div className="add-pass">
              <input
                type={visiblePassword ? "text" : "password"}
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChangeSingleUser}
              />
              <div
                className="input_img"
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? (
                  <FaEye className="eye-icon admin-eye-icon" />
                ) : (
                  <FaEyeSlash className="eye-icon  admin-eye-icon" />
                )}
              </div>
            </div>
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>
          <div className="newUseritem">
            <label>Confirm Password</label>
            <div className="add-pass">
              <input
                type={visibleConfirmPassword ? "text" : "password"}
                placeholder="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangeSingleUser}
              />
              <div
                className="input_img"
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                {visibleConfirmPassword ? (
                  <FaEye className="eye-icon admin-eye-icon" />
                ) : (
                  <FaEyeSlash className="eye-icon  admin-eye-icon" />
                )}
              </div>
            </div>
            {confirmPasswordError && (
              <p className="errorMessage">{confirmPasswordError}</p>
            )}
          </div>
          <div className="newUseritem">
            <label>Gender</label>
            <div className="newusergender">
              <input
                type="radio"
                id="male"
                value="M"
                name="gender"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                value="F"
                name="gender"
                onChange={handleChangeSingleUser}
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
              value={formData.email}
              onChange={handleChangeSingleUser}
            />
            {emailError && <p className="errorMessage">{emailError}</p>}
          </div>
          <div className="newUseritem">
            <label>Role</label>
            <div className="newusergender">
              <input
                type="radio"
                id="student"
                value="Student"
                name="role"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="student">Alumni</label>
              <input
                type="radio"
                id="staff"
                value="Staff"
                name="role"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="staff">Admin</label>{" "}
              {/* Corrected the htmlFor attribute here */}
            </div>
          </div>
          {formData.role === "Staff" && (
            <div className="newUseritem">
              <label>Admin Role</label>
              <select
                name="staffRole"
                value={formData.staffRole || "contentManager"} // Value controlled by state
                onChange={handleChangeSingleUser} // Handler for user input
                className="custom-select" // Apply a custom class if needed
              >
                <option value="contentManager">Content Manager</option>
                <option value="systemAdmin">System Admin</option>
              </select>
              {staffRoleError && (
                <p className="errorMessage">{staffRoleError}</p>
              )}
            </div>
          )}

          <button className="newUserButton" onClick={handleCreateUser}>
            Create User
          </button>
        </form>
      </div>
      <div
        className="newMultipleUseritem multipleUsers"
        style={{ height: isOpen ? "600px" : "auto" }} // Conditionally set height
      >
        <h1 className="newUserTitle">Add Multiple Users</h1>
        <ToastContainer autoClose={1500} />
        <label htmlFor="file">Choose File</label>
        <div className="newUserflex">
          <input type="file" id="file" name="file" accept=".xlsx, .xls, .csv" />
          {errorUsers && <p className="errorMessage">{errorUsers}</p>}
        </div>
        <div className="newUseritem">
          <label>Graduation Year</label>
          <div className="dropdown-container">
            <div className="dropdown-selected" onClick={toggleDropdown}>
              {selectedYear || "Select Year"}
            </div>
            {isOpen && (
              <ul className="dropdown-list">
                {years.map((year, index) => (
                  <li key={index} onClick={() => handleSelectYear(year)}>
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {graduationYearError && (
            <p className="errorMessage">{graduationYearError}</p>
          )}
        </div>

        <button className="newUserButton" onClick={handleAddUsers}>
          Add Users
        </button>
      </div>
    </div>
  );
};

export default AddUser;
