import { FaEnvelope,  FaFacebookF, FaLink, FaLinkedinIn, FaPen, FaPhone, FaTelegramPlane, FaTimes } from 'react-icons/fa'
import '../styles/contactInfo.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const ContactInfo = ({display,personalInfo,close,forsocials,edit,handlePlaceholders}) => {
  // const[edit,setEdit]=useState(false)
  const[socialValues,setSocialValues]=useState(['','',''])
  const [Discardpopup,setDiscardpopup]=useState(false);
  const [inputDirty,setInputDirty]=useState(false);
  useEffect(()=>{
    const settingSocialfromDatabase=()=>{
      const SocialfromDatabase = personalInfo[0].socialMedia;
      setSocialValues(SocialfromDatabase)
  }
    settingSocialfromDatabase()
  },[personalInfo])
  const handleSocialChange = (index, value) => {
    const newSocialValues = Array.isArray(socialValues) ? [...socialValues] : ['', '', ''];
    const cleanedValue = value.replace(/^(https?:\/\/)/, '');
    newSocialValues[index] = cleanedValue;
    setSocialValues(newSocialValues);
    setInputDirty(true);
  };
  
  
  
  const sub =(e)=>{
    e.preventDefault();
    forsocials(socialValues)
    close()
  }
  const handleClose=()=>{
    if (inputDirty) {
      setDiscardpopup(true)
    }
    else{
      close()
    }
  }
  

  return (
    <div>
    <div className='contactInfo_container' >
        <div className="contact_top"> 
        <p className="full_name">{personalInfo[0].fullName}</p>
        <FaTimes className='close_icon' onClick={()=>handleClose()}/>
        </div>
        <div className="contact_bottom">
            <div className="title_and_edit">
                    <h4>Contact Info</h4>
                    {/* {display&&<FaPen onClick={()=>setEdit(!edit)}/>} */}
            </div>
            <div className='all_address'>
              {display?<div> <FaEnvelope/>
          <input id="personal_info_input" placeholder={personalInfo[0].email} onChange={(e) => handlePlaceholders(e.target.value, 'email')}type="email" value={personalInfo[0].email}/>
          
        </div>:personalInfo[0].email&&<div className='contact_icon'><FaEnvelope/><p>{personalInfo[0].email}</p></div>}
        {display&&<div> <FaPhone/>
          <input id="personal_info_input" 
          placeholder={personalInfo[0].phoneNumber} 
          onChange={(e) => handlePlaceholders(e.target.value, 'phoneNumber')} 
          type="number" 
          pattern="[0-9]{10}" 
          title="Enter a valid 10-digit phone number"
          value={personalInfo[0].phoneNumber} />
          
        </div>}
       { display&&<div className="title_and_edit">
                    <h4>Social media links</h4>
            </div>}
                <section className="socal_links">
          <form onSubmit={sub} className={edit?"social_inputs_form":"only_social_icons"}>
            <div className="social">
            
                {socialValues?.[0]&&(
                  <a href={`http://${socialValues[0]}`} target="_blank" rel="noopener noreferrer">
                <div className="social_icon">
                  {(socialValues[0].includes('facebook'))?<><FaFacebookF className='actual_icons'/></> : (socialValues[0].includes('t.me')) ? <><FaTelegramPlane className='actual_icons'/> </> :  (socialValues[0].includes('linkedin')) ? <> <FaLinkedinIn className='actual_icons link'/> </> : <FaLink className='actual_icons link'/>}
                </div>
                </a>
                )
                }

            {edit&&<input  type="text" name="" className="social_inputs" value={socialValues?.[0]} placeholder={personalInfo[0]?.socialMedia?.[0]} onChange={(e) =>handleSocialChange(0,e.target.value)}/>}</div>
            <div className="social">
           
            {socialValues?.[1]&&(
                  <a href={`http://${socialValues[1]}`} target="_blank" rel="noopener noreferrer">
                <div className="social_icon">
                  {(socialValues[1].includes('facebook'))?<><FaFacebookF className='actual_icons'/></> : (socialValues[1].includes('t.me')) ? <><FaTelegramPlane className='actual_icons'/> </> :  (socialValues[1].includes('linkedin')) ? <> <FaLinkedinIn className='actual_icons link'/> </> : <FaLink className='actual_icons link'/>}
                </div>
                </a>
                )
                }
            {edit&&<input type="text" name="" className="social_inputs" value={socialValues?.[1]} placeholder={personalInfo[0]?.socialMedia?.[1]} onChange={(e) =>handleSocialChange(1,e.target.value)}/>}</div>
            <div className="social">
           
                {socialValues?.[2]&&(
                  <a href={`http://${socialValues[2]}`} target="_blank" rel="noopener noreferrer">
                <div className="social_icon">
                  {(socialValues[2].includes('facebook'))?<><FaFacebookF className='actual_icons'/></> : (socialValues[2].includes('t.me')) ? <><FaTelegramPlane className='actual_icons'/> </> :  (socialValues[2].includes('linkedin')) ? <> <FaLinkedinIn className='actual_icons link'/> </> : <FaLink className='actual_icons link'/>}
                </div>
                </a>
                )
                }
            {edit&&<input type="text" name="" className="social_inputs" value={socialValues?.[2]} placeholder={personalInfo[0]?.socialMedia?.[2]} onChange={(e) =>handleSocialChange(2,e.target.value)} />}</div>
            {display&&<input type="submit" id='submit'  value="Save Changes" />}
          </form>
    </section>
            </div>
        </div>
        </div>
        {
      (Discardpopup)&&(
        <div className='contactInfo_container warning'>
          <p>Are You Sure? All changes you have made will be lost</p>
          <div className='personal_info_buttons'>
       <button onClick={close} className='discard_personal_info pI_btn'> I'm Sure</button>
       <button onClick={()=>{setDiscardpopup(false)}} className='submit_personal_info pI_btn'>wait</button>
       </div>
        </div>
      )
    }
    </div>
  )
}

export default ContactInfo