// import { FaCheck, FaCheckCircle, FaTimes, FaTimesCircle } from "react-icons/fa"
import Button from "./Button"
import '../styles/confirmation.css'
const Confirmation = ({text, close,closeTranscript}) => {
  return (
    <div className="confirmation-overlay">
      <div>
        {/* {isSuccess?<FaCheckCircle color="green" />:<FaTimesCircle color="red"/>} */}
        <p>{text}</p>
        <Button disabled={text==="Requesting..."} onClick={closeTranscript?(close,closeTranscript):(close)} text={'OK'}/>
      </div>
    </div>
  )
}

export default Confirmation