import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "./useAuth"; // Use useAuth to access auth state
import FormInput from "./FormInput";
import Button from "./Button";
import AuthService from "./AuthService"; // Import AuthService

const AdminSignin = () => {
  const { setAuth } = useAuth(); // Get setAuth to update authentication state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("User signed in successfully");

        // Fetch authentication data using AuthService
        const authData = await AuthService.checkAuth();

        // Set the authentication data in context
        setAuth(authData);

        // Redirect to the admin home page if authenticated
        if (authData.isAuthenticated) {
          navigate("/admin/home");
        }
      } else {
        console.error("Login Failed:", data.message);
        setErrorPopup(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin_overlay">
      <div id="Admin-pop_container" className="Admin-pop_container">
        <div className="Admin-sign_Container signin_container">
          <form className="Admin-sign_in">
            <h1>LOGIN</h1>
            {errorPopup && (
              <p className="authentication_Failed">
                Wrong username or password, please try again
              </p>
            )}

            <FormInput
              type="text"
              placeholder="Username"
              className="inputs user_name"
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            <div className="pass">
              <FormInput
                value={password}
                type={visible ? "text" : "password"}
                placeholder="Password"
                className="inputs password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <div className="input_img" onClick={() => setVisible(!visible)}>
                {visible ? (
                  <FaEye className="eye-icon" />
                ) : (
                  <FaEyeSlash className="eye-icon" />
                )}
              </div>
            </div>
            <Button
              disabled={loading}
              text={loading ? "Logging in..." : "LOGIN"}
              onClick={handleSignIn}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;
