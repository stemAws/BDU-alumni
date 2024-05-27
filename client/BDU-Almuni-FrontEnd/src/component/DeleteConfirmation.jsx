import { FaExclamationTriangle, FaTimes} from "react-icons/fa"
import Button from "./Button"
import '../styles/deleteConfirmation.css'
const DeleteConfirmation = ({close,text,onDelete}) => {
  return (
    <div className="delete_overlay"><div className="delete_container">
        <div className="delete_Header">
            <div className="delete_top">
                <FaExclamationTriangle color="#e47070" /> 
                <p>Delete Confirmation</p>
            </div>
            <FaTimes className="delete_close" onClick={close} />   
        </div>
        <div className="delete_bottom">
            <p> {`Are you sure you want to delete this ${text}`}  </p>
            <div><Button className={'yes'} onClick={onDelete} text='Delete'/>
            <Button className={'no'}  onClick={close} text='No'/></div>
            
        </div>
    </div>
    </div>
    
  )
}

export default DeleteConfirmation