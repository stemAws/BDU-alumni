import { useState } from 'react';
import FormInput from './FormInput'
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import Button from "./Button";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const handleChangePassword =()=>{

  }
  return (
    <>
     <h1>Authenticate</h1>
              <div className="pass">
              <FormInput
               label={'New Password'}
                value={password}
                type={visible ? "text" : "password"}
                placeholder="Password"
                className="inputs password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="pass">
              <FormInput
               label={'Confrim Password'}
                value={confirmpassword}
                type={visible ? "text" : "password"}
                placeholder="Password"
                className="inputs password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
              
            </div>
            <div className="input_img" onClick={() => setVisible(!visible)}>
                {visible ? (
                    <div className='show-hide'>
                    <p>Hide Password</p> <FaEye className="eye-icon" />
                    </div>
                ) : (
                    <div className='show-hide'>
                    <p>Hide Password</p> <FaEyeSlash className="eye-icon" />
                    </div>
                  
                )}
              </div>
            <Button
              disabled={loading}
              text={loading ? "Confirming..." : "Confirm"}
              onClick={handleChangePassword}
            />  
    </>
  )
}

export default ChangePassword