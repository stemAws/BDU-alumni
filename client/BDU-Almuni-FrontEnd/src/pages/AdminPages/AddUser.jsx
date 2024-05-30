import "../../styles/AddUser.css";
import { ChevronLeft } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorUsers, setUsersError] = useState("");
  const [graduationYearSingleUser, setGraduationYearSingleUser] = useState("");
  const [graduationYearMultipleUsers, setGraduationYearMultipleUsers] =
    useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [roleSingleUser, setRoleSingleUser] = useState("");
  const [hiredDateSingleUser, setHiredDateSingleUser] = useState("");
  const [leftDateSingleUser, setLeftDateSingleUser] = useState("");
  const [isActiveSingleUser, setIsActiveSingleUser] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [graduationYearError, setGraduationYearError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [hiredDateSingleUserError, setHiredDateSingleUserError] = useState("");
  const [leftDateSingleUserError, setLeftDateSingleUserError] = useState("");
  const [staffRoleError, setStaffRoleError] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    graduationYear: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
  });
  const handleChangeSingleUser = (e) => {
    const { name, value, checked } = e.target;

    // Reset error messages
    setUsernameError("");
    setFirstNameError("");
    setLastNameError("");
    setGraduationYearError("");
    setPasswordError("");
    setGenderError("");
    setHiredDateSingleUserError('');
    setLeftDateSingleUserError('');

    // Set graduationYear for the single user form
    if (name === "graduationYear") {
      setFormData((prevData) => ({
        ...prevData,
        graduationYear: value,
      }));
      setGraduationYearSingleUser(value);
    } else if (name === "hiredDate") {
      setFormData((prevData) => ({
        ...prevData,
        hiredDate: value,
      }));
      setHiredDateSingleUser(value);
    } else if (name === "leftDate") {
      setFormData((prevData) => ({
        ...prevData,
        leftDate: value,
      }));
      setLeftDateSingleUser(value);
    } else if (name === "staffRole") {
      setFormData((prevData) => ({
        ...prevData,
        staffRole: value,
      }));
      setStaffRole(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // Update role for the single user form
    if (name === "role") {
      setRoleSingleUser(value);
    }
    // If the role is "Staff," set graduationYear to null
    if (name === "role" && value === "Staff") {
      setFormData((prevData) => ({
        ...prevData,
        graduationYear: null,
      }));
    }
    if (name === "role" && value === "Student") {
      setFormData((prevData) => ({
        ...prevData,
        hiredDate: null,
        leftDate: null,
        staffRole: null,
      }));
    }
    if (name === "isActiveS") {
      setIsActiveSingleUser(checked);
      if (checked) {
        setLeftDateSingleUser(null);
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

    if (!formData.username) {
      setUsernameError("User Name cannot be empty!");
      valid = false;
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(formData.username)) {
      setUsernameError("User Name must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    }
    if (!formData.firstName) {
      setFirstNameError("First Name cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      setFirstNameError("First Name must contain only letters and spaces!");
      valid = false;
    }
    if (!formData.lastName) {
      setLastNameError("Last Name cannot be empty!");
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      setLastNameError("Last Name must contain only letters and spaces!");
      valid = false;
    }
    if (
      !formData.graduationYear &&
      formData.role !== "Staff" // Check if role is not "Staff"
    ) {
      setGraduationYearError("Year field cannot be empty!");
      valid = false;
    } else if (
      formData.graduationYear &&
      (isNaN(formData.graduationYear) ||
        formData.graduationYear.length !== 4 ||
        formData.graduationYear < 2019)
    ) {
      setGraduationYearError("Invalid Graduation Year!");
      valid = false;
    } else if (formData.graduationYear) {
      const GraduationYearValue = new Date(formData.graduationYear);
      const currentDate = new Date();
      if (GraduationYearValue > currentDate) {
        setGraduationYearError("Graduation year should not be in the future!");
        valid = false;
      }
    }

    const hiredDateSingleUserValue = new Date(hiredDateSingleUser);
    const leftDateSingleUserValue = new Date(leftDateSingleUser);
    const currentDate = new Date();

if (roleSingleUser === 'Staff' && !isActiveSingleUser) {
  // Validation for not still working
  if (hiredDateSingleUserValue > leftDateSingleUserValue) {
    setLeftDateSingleUserError("Left Date should be after the Hired Date!");
    valid = false;
  }
}

if (roleSingleUser === 'Staff' && !hiredDateSingleUser) {
  // Validation for hired date when not still working
  setHiredDateSingleUserError("Hired Date field cannot be empty!");
  valid = false;
} else if (roleSingleUser === 'Staff' && hiredDateSingleUserValue >= currentDate) {
  // Validation for hired date when not still working
  setHiredDateSingleUserError("Hired Date should be today or in the past!");
  valid = false;
}
    if (roleSingleUser==='Staff'&&isActiveSingleUser===false&&!leftDateSingleUser) {
      setLeftDateSingleUserError(leftDateSingleUser ? "" : "Left Date field cannot be empty!");
      valid = false;
    } else {
      const leftDateSingleUserValue = new Date(leftDateSingleUser);
      // if (leftDateSingleUserValue <= currentDate) {
      //   setLeftDateSingleUserError("Left Date should be after the current date!");
      //   valid = false;
      // }
      if ( roleSingleUser==='Staff'&& isActiveSingleUser===false&& leftDateSingleUserValue < new Date(hiredDateSingleUser)) {
        setLeftDateSingleUserError("Left Date should be after the Hired Date!");
        valid = false;
      }
      // if (new Date(hiredDateSingleUser) > leftDateSingleUserValue) {
      //   setLeftDateSingleUserError("Left Date should be after the Hired Date!");
      //   valid = false;
      //   console.log(valid,'hiredDate');
      // }
    }

    if (roleSingleUser==='Staff'&&!staffRole) {
      setStaffRoleError("Staff Role cannot be empty!");
      valid = false;
    } else if (roleSingleUser==='Staff'&&!/^[a-zA-Z\s]+$/.test(staffRole)) {
      setStaffRoleError("staff Role must contain only letters and spaces!");
      valid = false;
    }

    
    // Your existing password validation
if (!formData.password) {
  setPasswordError("Enter your password!");
  valid = false;
} else if (formData.password.length < 8) {
  setPasswordError("Password should be at least 8 characters long");
} else if (!regexUpper.test(formData.password)) {
  setPasswordError("Password should contain at least one uppercase letter");
} else if (!regexLower.test(formData.password)) {
  setPasswordError("Password should contain at least one lowercase letter");
} else if (!regexNumber.test(formData.password)) {
  setPasswordError("Password should contain at least one number");
} else if (!regexSpecial.test(formData.password)) {
  setPasswordError("Password should contain at least one special character");
}

// Adding confirmation password validation
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

    // Always set the role in formData
    setFormData({
      ...formData,
      role: formData.role || "Staff",
    });

    if (valid) {
      try {

        // Prepare the data object to be sent based on the role
        let dataToSend = {
          ...formData,
          graduationYear:
            formData.role === "Student" ? formData.graduationYear : null,
          hiredDate: null,
          leftDate: null,
          staffRole: null,
        };

        if (formData.role === "Staff") {
          dataToSend = {
            ...dataToSend,
            hiredDate: formData.hiredDate,
            leftDate: isActiveSingleUser ? null : formData.leftDate,
            staffRole: formData.staffRole,
          };
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/alumni`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        // Handle the response from the server (if needed)
        const responseData = await response.json();

        // Reset form fields
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          graduationYear: "",
          password: "",
          gender: "",
          role: "",
        });

        navigate("/admin/users");
      } catch (error) {
        // Handle errors from the server
        console.error("Error sending data to the server:", error.message);
      }
    }
    else{
      console.log('NOT VALID');
      
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
        `${process.env.REACT_APP_BACKEND_URL}/uploadAlumniData`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Users added successfully!");

        setSuccess(true);
      } else {
        console.error("Failed to Add users:", response.statusText);
        setErrorPopup(true);
      }

      // Optionally, reset the file input
      fileInput.value = "";
    } catch (error) {
      // Handle errors from the server
      console.error("Error uploading file:", error.message);
    }
  };

  const isGraduationYearVisibleSingleUser = roleSingleUser === "Student";
  const isHiredDateVisibleSingleUser = roleSingleUser === "Staff";
  const isLeftDateVisibleSingleUser = roleSingleUser === "Staff";

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
            <label> First Name</label>
            <input
              type="text"
              placeholder="Abebe"
              name="firstName"
              value={formData.firstName}
              onChange={handleChangeSingleUser}
            />
            {firstNameError && <p className="errorMessage">{firstNameError}</p>}
          </div>
          <div className="newUseritem">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Kebede"
              name="lastName"
              value={formData.lastName}
              onChange={handleChangeSingleUser}
            />
            {lastNameError && <p className="errorMessage">{lastNameError}</p>}
          </div>
          <div className="newUseritem">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChangeSingleUser}
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>
          <div className="newUseritem">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="password"
              name="confirmPassword"
              value={formData.confirmPassword}

              onChange={handleChangeSingleUser}
            />
            {confirmPasswordError && <p className="errorMessage">{confirmPasswordError}</p>}
          </div>
          <div className="newUseritem">
            <label>Gender</label>
            <div className="newusergender">
              <input
                type="radio"
                id="male"
                value="Male"
                name="gender"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                value="Female"
                name="gender"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="female">Female</label>
              {genderError && <p className="errorMessage">{genderError}</p>}
            </div>
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
              <label htmlFor="student">Student</label>
              <input
                type="radio"
                id="staff"
                value="Staff"
                name="role"
                onChange={handleChangeSingleUser}
              />
              <label htmlFor="staff">Staff</label>{" "}
              {/* Corrected the htmlFor attribute here */}
            </div>
          </div>

          {isGraduationYearVisibleSingleUser && (
            <div className="newUseritem">
              <label> Graduation Year </label>
              <input
                type="text"
                placeholder="Graduation Year"
                name="graduationYear"
                value={graduationYearSingleUser}
                onChange={handleChangeSingleUser}
              />
              {graduationYearError && (
                <p className="errorMessage">{graduationYearError}</p>
              )}
            </div>
          )}

          {isHiredDateVisibleSingleUser && (
            <div className="newUseritem">
              <label> Hired Date </label>
              <input
                type="text"
                placeholder="Hired Date"
                name="hiredDate"
                value={hiredDateSingleUser}
                onChange={handleChangeSingleUser}
              />
              {hiredDateSingleUserError && (
                <p className="errorMessage">{hiredDateSingleUserError}</p>
              )}
            </div>
          )}
          {isHiredDateVisibleSingleUser && (
            <div className="HiredDate newUserItem checkBx">
              <input
                type="checkbox"
                name="isActiveS"
                checked={isActiveSingleUser}
                onChange={handleChangeSingleUser}
              />
              <label> I am currently working here </label>
            </div>
          )}
          {isHiredDateVisibleSingleUser && (
            <div className="newUseritem">
              <label>Staff Role</label>
              <input
                type="text"
                placeholder="Physics teacher"
                name="staffRole"
                value={staffRole}
                onChange={handleChangeSingleUser}
              />
              {staffRoleError && <p className="errorMessage">{staffRoleError}</p>}
            </div>
          )}
          {isLeftDateVisibleSingleUser && !isActiveSingleUser && (
            <div className="newUseritem staff-left-date">
              <label> Left Date </label>
              <input
                type="text"
                placeholder="Left Date"
                name="leftDate"
                value={leftDateSingleUser}
                onChange={handleChangeSingleUser}
              />
              {leftDateSingleUserError && (
                <p className="errorMessage">{leftDateSingleUserError}</p>
              )}
            </div>
          )}
          

          <button className="newUserButton" onClick={handleCreateUser}>
            Create User
          </button>
        </form>
      </div>
      <div className="newMultipleUseritem multipleUsers">
        <h1 className="newUserTitle"> Add Multitple Users</h1>
        <ToastContainer autoClose={1500} />
        <label htmlFor="file">Choose File</label>
        <div className="newUserflex">
          <input type="file" id="file" name="file" accept=".xlsx, .xls, .csv" />
          {errorUsers && <p className="errorMessage">{errorUsers}</p>}
        </div>
        <div className="newUseritem">
          <label> Graduation Year </label>
          <input
            type="text"
            placeholder="Graduation Year"
            name="graduationYear"
            value={graduationYearMultipleUsers}
            onChange={handleChangeMultipleUsers}
          />
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
