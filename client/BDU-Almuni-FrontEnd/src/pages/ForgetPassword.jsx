import React, { useState } from 'react'
import Button from '../component/Button'
import { FaCheck } from 'react-icons/fa';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgetPassword = () => {
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('');
    const [success, setsuccess] = useState(false)
    const sendEmail=async(e)=>{
        e.preventDefault()
        try {
            setloading(true)
           const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reset-password`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  email: email,
                }),
              })
            if ((await response).status===200) {
                setemail('')
                setloading(false)
                setsuccess(true)
            }
            else{
                toast.error('Incorrect email')
                setloading(false)
            }
        }catch (error) {
            console.error('Error sending email:', error);
            setloading(false)
            toast.error('Some thing went wrong, please try again')
          }
      };
  return (
    <div className='forget_password'>
        {
            !success?<div>
                <ToastContainer  autoClose={2000}/>
            <h3> Reset Password</h3>
        <p>Please enter an email address linked with your account </p>
        <form onSubmit={sendEmail}>
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} className="inputs change_pass_inputs" required />
        <Button className={'change_passwordbtn'} type={'submit'} disabled={loading} text={loading?'Sending...':'Send'} />
        </form>
        </div>:
        <div>
            <h3 className='success'>Success <FaCheck/></h3>
        <p> Password reset email sent successfully. Please check your email inbox.  </p>
        </div>
        }
        
        </div>

    

  )
}

export default ForgetPassword