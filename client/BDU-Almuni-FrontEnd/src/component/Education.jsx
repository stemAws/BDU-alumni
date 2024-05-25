
import { useState } from 'react'
import {FaPen, FaTrash} from 'react-icons/fa'
import DeleteConfirmation from './DeleteConfirmation'
const Education = ({onclose,onEdit,education,onDelete,ondisplay}) => {
  const [deletePopup,setDeletePopup] =useState(false)
    return (
      <div className={`task ${education.stillLearning ? 'stillWorking':''}`}>
          <h3 >{education.degree} in {education.fieldOfStudy}
          {ondisplay? <div className="edit">
          <FaTrash className='trash_delete' onClick={()=>setDeletePopup(true)} size={13}/>
         <FaPen className='pen_edit' onClick={()=>{onEdit(education.educationID)
          onclose(true)
          }} size={15}/>
          </div>:''}
          
          </h3>
          <h4>{education.institution}</h4>
          <p>Started: {education.startYear}</p>
          {education.stillLearning ?"Still Studing": <p>UpTo: {education.endYear}</p>}
            {
              deletePopup&&(
                <DeleteConfirmation onDelete={()=>onDelete(education.educationID)} text='education' close = {()=>setDeletePopup(false)}/>
              )
            }                   
      </div>
    )
  }
export default Education
