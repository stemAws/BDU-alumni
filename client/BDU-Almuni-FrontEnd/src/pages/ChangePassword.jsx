import { useContext, useState } from 'react'
import { useParams } from "react-router-dom";
import FormInput from '../component/FormInput'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../component/Button"
import { FaFingerprint} from 'react-icons/fa';
// import SigninWrapper from "../components/SigninWrapper";
// import { SigninContext } from '../Pages/UsersPage'
import '../styles/changePassword.css'
const ChangePassword = () => {
  const [notauth, setnotauth] = useState(false)
  // const { isSigninOpen, setSigninOpen } = useContext(SigninContext);
    const [values, setValues] = useState({
    });
    const { username } = useParams();
    const [loading, setloading] = useState(false)
    const input_values=[
        {
            id:1,
            name:'oldPassword',
            type: "password",
            placeholder: "Old Password",
            required: true,
            
          },
          {
            id:2,
            name:'password',
            type: "password",
            placeholder: "New Password",
            errorText:
              "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
            
          },
          {
            id:3,
            name:'confirmPassword',
            type: "password",
            placeholder: "Confirm Password",
            errorText: "Passwords don't match!",
            pattern: values.password,
            required:true
          },
    ]
  //   const closeSignin =() =>{ 
  //     setSigninOpen(false);
  //     window.location.reload()
  // };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const postData = {
          newPassword: values.password,
        };
      
        try {
            const cookies = document.cookie;
            const match = cookies.match(/authToken=([^;]*)/);
            const token = match ? match[1] : null;
            setloading(true)
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check-password/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              oldPassword: values.oldPassword,
            }),
          });
          if (response.status===403) {
            setnotauth(true)
          }
          const responsePassword = await response.json(); 
          if(!responsePassword.passwordExists){
            toast.error('wrong old password')
            setloading(false)
          }
          else {
            try {
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
        } catch (error) {
          console.error('Error during checking password:', error);
          toast.error('Failed to change password please try again')
          setloading(false)
        }
      
      }
      
        const onChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value });
        };
      
  return (
    
        <div className="chang_pass">
            <ToastContainer />
            <div className='change_pasword'>
            <FaFingerprint size={45} color='#3a3a3a' />
            <form className ='change_pasword_form'onSubmit={handleSubmit}>
            <input type="text"  name ='username'className="inputs change_pass_inputs" value={username||'username'} onChange={onChange}/>
        {
          input_values.map((input)=>(
            <FormInput  className='inputs change_pass_inputs' key= {input.id} {...input}
            value={values[input.name]}
            onChange={onChange} 
            required={true}/>
          ))
        }
            <div><Button className={'change_passwordbtn'} type={'submit'} disabled={loading} 
            text={loading?'Changing...':'Change'}/></div>
            </form>
            </div>   
            {/* {notauth&&<SigninWrapper setSigninOpen={setSigninOpen} isSigninOpen={isSigninOpen} closeSignin={closeSignin} />} */}
        </div>
  )
}

export default ChangePassword