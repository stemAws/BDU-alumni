import '../styles/contactUs.css'
import {FaPhone, FaEnvelope,FaMapMarker,FaFacebook,FaLinkedinIn,FaTelegram} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
const ContactUs = () => {
  const [sendData,setSendData]=useState({
    fullName:'',
    email:'',
    message:''
  });
  const [loading, setloading] = useState(false)
  const handleInputChange = (fieldName, value) => {
    setSendData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };
  const onSubmit = async(e)=>{
    e.preventDefault();
    try {
      setloading(true)
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/feedback`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          fullName:sendData.fullName,
          email:sendData.email,
          message:sendData.message
      }),
      }) ;
      if (res.ok) {
        toast.success('Message Sent successfully Thanks')
        setSendData({
          fullName: '',
          email: '',
          message: ''
        });
        setloading(false)
      }
      else {
        toast.error('something went wrong')
        setloading(false)
      }
      
    } catch (error) {
      console.error("Error sending your message",error)
        setloading(false)
        toast.error("Sorry your message couldn't be sent, please try again")
    }
    
  }
  return (
    <div className="contactus_container">
      
        <h1 className='contactus_title'>Contact Us</h1>
       
        <div className="cards"> 
            <div className="left_side">
            <h2 className="contactus_info">contact information</h2>
            <div className='information'>
            <a target="_blank" rel="noopener noreferrer" href="tel:+251920424332" className="phone_num">
              <FaPhone  /> +251 920 424 332
            </a>
            <a target="_blank" rel="noopener noreferrer" className ='email' href="mailto:BahirdarUniversityalumni@gmail.com"> <FaEnvelope />BahirdarUniversityalumni@gmail.com</a>
            <a href='/' target="_blank" rel="noopener noreferrer" className='location'>
              <FaMapMarker /> Bahir Dar, Amhara, Ethiopia 
            </a>
            
            </div>
            <div className='social_media'>
            <div className='facebook'>
              <a href="#"><FaFacebook size={30}/></a>
            </div>
            <div className='linkdin'>
              <a href="#"><FaLinkedinIn size={30}/></a>
            </div>
            <div className='telegram'>
            <a href="#"><FaTelegram size={30}/></a>
            </div>
            </div>
        </div>
        <div className="right_side">
          
            <form className="contactUs_form" onSubmit={onSubmit}>
              
        <ToastContainer  autoClose={2000}/>
            <label htmlFor="name" className="contact_label">Full Name</label>
            <input id='name' type="text" className="contact_input" value={sendData.fullName}onChange={(e) => handleInputChange('fullName', e.target.value)} required/>
            <label htmlFor="email" className="contact_label">Email</label>
            <input id='email' type="email" className="contact_input"value={sendData.email} onChange={(e) => handleInputChange('email', e.target.value)} required/>
            <label htmlFor="Sent_message" className="contact_label">Message</label>
            <input id='Sent_message' type="text" className="contact_input" value={sendData.message} onChange={(e) => handleInputChange('message', e.target.value)} required/>
            <input className='send_message' disabled={loading} type="submit" value={loading?'Sending...':'Send Message'}  />
            </form>
            </div>
            </div>
    </div>
  )
}

export default ContactUs