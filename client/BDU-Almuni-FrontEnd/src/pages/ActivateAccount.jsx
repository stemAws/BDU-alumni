import { useContext, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import FormInput from '../component/FormInput'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../component/Button"
import { FaFingerprint} from 'react-icons/fa';

const ActivateAccount = () => {
const [notauth, setnotauth] = useState(false)
  const [values, setValues] = useState({
  });
  const navigate = useNavigate()
  const id = useParams()
  const [loading, setloading] = useState(false)
  const input_values=[
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
  const handleSubmit = async (e) => {
      e.preventDefault();
    
      const postData = {
        newPassword: values.password,
      };
    
      
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activate/${id.id}`, {
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
                navigate('/')
            } 
            else if (res.status===403) {
              setnotauth(true)
              toast.error('Failed to change password please try again')
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
      
    
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
  return (
    
        <div className="chang_pass fixed">
            <ToastContainer />
            <div className='change_pasword'>
            <FaFingerprint size={45} color='#3a3a3a' />
            <form className ='change_pasword_form'onSubmit={handleSubmit}>
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
        </div>
  )
}

export default ActivateAccount