import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Button from "./Button";
import { useAuth } from "../component/useAuth"; 
import { SigninContext } from "../pages/MainPage";
import ChangePassword from "./ChangePassword";
import AuthService from "./AuthService";
import "../styles/sign.css";

const Signin = () => {
  const { setsignin } = useContext(SigninContext);
  const { setAuth } = useAuth(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0)
  const [newGuysUsername, setNewGuysUsername] = useState('')
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
      setLoading(false);
      if (data.message==='Account is not activated.') {
         navigate(`/activateAccount/${data.userId}`)
        setsignin(false);

      }
      if (response.ok && data.success) {
        setsignin(false);

        const authData = await AuthService.checkAuth();
        setAuth(authData);

        if (data.message === "Account is not activated.") {
          return navigate(`/activateAccount/${data.userId}`);
        }

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
  const handleNewUsers=async()=>{
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/request-activation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username:newGuysUsername }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setPage(2)
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('could not send activation to the user',error)
    }
  }

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
        <div className={`overlay_container ${page!==0&&'full'}`}>
          <div className={`overlaySign ${page!==0&&'full'}`}>
            {
            page===0 ?
            <div className="overlay_panel overlay_right">
              <h1 className="hello_wellcome">Hello and Welcome</h1>
              {/* <p className="question">
                We're thrilled to have you back and reconnecting with fellow BDU
                graduates
              </p> */}
              <p >if you are new here please click below</p>
              <Button onClick={()=>setPage(1)} text={'Activate Account'}/>
            </div>:
            page===1?
            <div className="username_form">
            <h1>please enter your username</h1>
            <p className="sub_title">Your username is your last name plus grauduating year e.g abebe2000 </p>
              <input
                className="inputs change_pass_inputs"
                value={newGuysUsername}
                onChange={(e)=>setNewGuysUsername(e.target.value)}
                required={true}
              />
              <Button onClick={handleNewUsers} text={'Submit'}/>
            </div>
            :
            <div className={`overlay_panel overlay_right full_width ${page!==0&&'full'}`}>
              <h1 className="hello_wellcome">Congratulations </h1>
              <p className="question">
                We have sent you a link to reset your password to this email abc****sfr@gmail..com 
              </p>
              <Button onClick={()=>setsignin(false)} text={'Okay'}/>
            </div>}
          </div>
        </div>
        <div className={`sign_Container signin_container `}>
          <div
            onClick={() => {
              navigate("/") || setsignin(false);
            }}
            className="icon"
          >
            <FaTimes />
          </div>
          <div className={`authentication ${page!==0&&'invisible'}`}>
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
