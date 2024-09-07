import { useEffect, useState } from "react"
import Confirmation from "./Confirmation"
import Button from "./Button"
import "../styles/transcript.css"
import { FaTimes } from "react-icons/fa"
const Transcript = ({close,email}) => {
    const [transcriptSuccess, settranscriptSuccess] = useState(false)
  const [successMessage, setsuccessMessage] = useState('Requesting...')
  const [transcriptChoice, settranscriptChoice] = useState({
    email:''
  })
  const handleRequestTranscript=async(e)=>{
    e.preventDefault()
      // const width = 600;
      // const height = 600;
      // const left = window.innerWidth / 2 - width / 2;
      // const top = window.innerHeight / 2 - height / 2;
      // window.open('https://chapa-payment-integration-by-abrham.netlify.app/', '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    settranscriptSuccess(true)
    try {
      const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/reserve-transcript`,{
        credentials:'include'
      })
      const data= await res.json();
        if (data.success)
          setsuccessMessage('Request Sent Successfully, Your Transcript Will Be Emailed To You Once Approved By Admin')
        else
        setsuccessMessage('Something Went Wrong Please Try Again Later')
    } catch (error) {
      setsuccessMessage('Something Went Wrong Please Try Again Later')
      
    }

    }
    useEffect(() => {
     if(email){
      settranscriptChoice((prev)=>({
        ...prev,
        email:email
      }))
     }
    }, [])
    
  return (
    <div className="transcript-flex-container">
    {
          transcriptSuccess ?
          <Confirmation closeTranscript={close} text={successMessage} close={()=>settranscriptSuccess(false)} /> :
          <form className="transcript-container" onSubmit={handleRequestTranscript}>
            <FaTimes onClick={close} size={20} className="close-icon"/>
            <label htmlFor="transcript-email">Email</label>
            <input value={transcriptChoice.email} onChange={(e)=>{settranscriptChoice(
              (prev)=>({
                ...prev,
                email:e.target.value
              })
            )} } id={"transcript-email"} type="email" required />
            <label htmlFor="transcript-email">Transcript Type</label>
            <select id="transcript-type" required>
                <option value="" disabled hidden>Select Type of Degree</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Doctorate">Doctorate</option>
            </select>
            <label htmlFor="transcript-email">Service Fee</label>
            <input type="text" id="" value={"1500 Birr"} disabled />
            <input className="pay-btn" type="submit" value={'Pay'} />
        </form>
        }
    </div>
  )
}

export default Transcript