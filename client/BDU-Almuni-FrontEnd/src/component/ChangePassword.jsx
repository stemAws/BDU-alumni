import { useState } from 'react';
import FormInput from './FormInput'
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import { toast} from 'react-toastify';

import Button from "./Button";
const ChangePassword = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({
  });
  const input_values=[
      {
        id:2,
        label:'New Password',
        name:'password',
        type: `${visible?'text':'password'}`,
        placeholder: "New Password",
        errorText:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
        
      },
      {
        id:3,
        label:'Confirm Password',
        name:'confirmPassword',
        type: `${visible?'text':'password'}`,
        placeholder: "Confirm Password",
        errorText: "Passwords don't match!",
        pattern: values.password,
        required:true
      },
]
const onChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};


  const handleChangePassword = async (e) => {
          e.preventDefault();
        
          const postData = {
            newPassword: values.password,
          };
        
          try {
              const cookies = document.cookie;
              const match = cookies.match(/authToken=([^;]*)/);
              const token = match ? match[1] : null;
              setloading(true)
              
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/change-password/${token}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify(postData),
                });
            
                if (res.ok) {
                  toast.success('password changed successfully')
                  setloading(false)
                } 
                else if (res.status===403) {
                  setnotauth(true)
                }
                else {
                  console.error('Failed to change password:', response.statusText);
                  toast.error('Failed to change password please try again')
                  setloading(false)
                }
              } catch (error) {
                console.error('Error during password changing:', error);
                toast.error('Failed to change password please try again')
                setloading(false)
              }
            
          
        
        }
  return (
    <>
     <h1>Change Password</h1>
     {
          input_values.map((input)=>(
            <FormInput  className='inputs change_pass_inputs' key= {input.id} {...input}
            value={values[input.name]}
            onChange={onChange} 
            required={true}/>
          ))
        }
            <div className="input_img" onClick={() => setVisible(!visible)}>
                {visible ? (
                    <div className='show-hide'>
                    <p>Hide Password</p> <FaEye className="eye-icon" />
                    </div>
                ) : (
                    <div className='show-hide'>
                    <p>Show Password</p> <FaEyeSlash className="eye-icon" />
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