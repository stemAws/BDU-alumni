import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import {Link} from 'react-router-dom';
import FormInput from "./FormInput";
import Button from "./Button";
import AuthService from "./AuthService";
import { SigninContext } from "../pages/MainPage";
const Signin = () => {
  const {setsignin}=useContext(SigninContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible,setVisible] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setloading] = useState(false)
  const handleSignIn = (e) => {
    e.preventDefault();
    setloading(true)
    fetch(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // AuthService.login(data.token,data.realToken); 
          setsignin(false)
          window.location.reload()
        } else {
          setErrorPopup(true);
          setloading(false)
        }
      })
      .catch(error => {
        console.error("Error during authentication:", error);
        setloading(false)
      });
  };
  // const handleSignInfake =()=>{
  //   setsignin(false);
  //   setloginState(true);
  // }
 
  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
      
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };
  return (
    <div className="signin_overlay">
      <div id='pop_container' className="pop_container">
      <div className="overlay_container">
          <div className="overlaySign">
            <div className="overlay_panel overlay_right">
              <h1 className="hello_wellcome">Hello and Welcome</h1>
              <p className='question'>We're thrilled to have you back and reconnecting with fellow BDU STEM graduates</p>
            </div>
          </div>
        </div>
        <div className='sign_Container signin_container'>
        <div onClick={()=>setsignin(false)} className='icon'><FaTimes/></div>
        <form className="sign_in">
        <h1>LOGIN</h1>
         {errorPopup?<p className="authentication_Failed">Wrong username or password, please try again</p>:''}
         <div className="sign_with_google" 
         onClick={handleGoogleSignin}
         ><div className="google_icon" ><FaGoogle color="#fff"/></div><p>Sign in with Google</p></div>
         <FormInput
              type="text"
              placeholder="Username"
              class="inputs user_name"
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            <div className='pass'>
              <FormInput
                value={password}
                type={visible ? 'text' : 'password'}
                placeholder="Password"
                class="inputs password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <div className='input_img' onClick={() => setVisible(!visible)}>
                {
                  visible ? <FaEye className="eye-icon"/> :
                    <FaEyeSlash className="eye-icon" />
                }
              </div>
            </div>
            <Link to ='/forgetPassword' onClick={()=>setsignin(false)}>Forget password?</Link>
            <Button disabled={loading} text={loading?"Loging...":"LOGIN"} onClick={handleSignIn} />
        </form>
        </div>
      </div>
    </div>
  )
}

export default Signin