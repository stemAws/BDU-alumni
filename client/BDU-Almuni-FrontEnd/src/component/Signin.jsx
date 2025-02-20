import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import { useAuth } from "../component/useAuth"; // Updated import
import { SigninContext } from "../pages/MainPage";
import ChangePassword from "./ChangePassword";
import AuthService from "./AuthService"; // Import AuthService
import "../styles/sign.css";

const Signin = () => {
  const { setsignin } = useContext(SigninContext);
  const { setAuth } = useAuth(); // Use setAuth to update authentication state
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setloading(false);
      if (data.message==='Account is not activated.') {
         navigate(`/activateAccount/${data.userId}`)
        setsignin(false);

      }
      if (response.ok && data.success) {
        console.log("Login Successful");
        setsignin(false);

        // Fetch authentication data and update the auth context
        const authData = await AuthService.checkAuth();
        setAuth(authData);

        // Redirect based on activation status
        if (data.message === "Account is not activated.") {
          return navigate(`/activateAccount/${data.userId}`);
        }

        // Reload to reflect auth changes
        window.location.reload();
        
      } else {
        console.error("Login Failed:", data.message);
        setErrorPopup(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setLoading(false);
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="signin_overlay">
      <div id="pop_container" className="pop_container">
        <div className="overlay_container">
          <div className="overlaySign">
            <div className="overlay_panel overlay_right">
              <h1 className="hello_wellcome">Hello and Welcome</h1>
              <p className="question">
                We're thrilled to have you back and reconnecting with fellow BDU
                graduates
              </p>
            </div>
          </div>
        </div>
        <div className="sign_Container signin_container">
          <div
            onClick={() => {
              navigate("/") || setsignin(false);
            }}
            className="icon"
          >
            <FaTimes />
          </div>
          <div className="authentication">
            <form className="sign_in">
              <h1>LOGIN</h1>
              {errorPopup && (
                <p className="authentication_Failed">
                  Wrong username or password, please try again
                </p>
              )}
              <div className="sign_with_google" onClick={handleGoogleSignin}>
                <div className="google_icon">
                  <FaGoogle color="#fff" />
                </div>
                <p>Sign in with Google</p>
              </div>
              <FormInput
                type="text"
                placeholder="Username"
                className="inputs user_name"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="pass">
                <FormInput
                  value={password}
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  className="inputs password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input_img" onClick={() => setVisible(!visible)}>
                  {visible ? (
                    <FaEye className="eye-icon" />
                  ) : (
                    <FaEyeSlash className="eye-icon" />
                  )}
                </div>
              </div>
              <Link to="/forgetPassword" onClick={() => setsignin(false)}>
                Forget password?
              </Link>
              <Button
                disabled={loading}
                text={loading ? "Logging in..." : "LOGIN"}
                onClick={handleSignIn}
              />
            </form>
            :
            <form className="sign_in first-time">
              <ChangePassword />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
