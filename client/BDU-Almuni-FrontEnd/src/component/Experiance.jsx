import {FaPen, FaTrash} from 'react-icons/fa'
import DeleteConfirmation from './DeleteConfirmation'
import { useState } from 'react'
const Experiance = ({onclose,experiance,onDelete,onEdit,ondisplay}) => {
  const [deletePopup,setDeletePopup] =useState(false)
    return (
      <div className={`task ${experiance.stillWorking ? 'stillWorking':''}`}>
          <h3 >{experiance.jobTitle} 
          {ondisplay?<div className="edit">
          <FaTrash className='trash_delete' onClick={()=>setDeletePopup(true)} size={13} />
          <FaPen className='pen_edit' onClick={()=>{onEdit(experiance.experienceID)
          onclose(true)}} size={15} />
          </div>:''}
          
          </h3>
          <h4> {experiance.employmentType} employ at {experiance.companyName}</h4>
          <p>Started: {experiance.startDate}</p>
          {experiance.stillWorking ?"Still working here": <p>UpTo: {experiance.endDate}</p>}
          {
              deletePopup&&(
                <DeleteConfirmation onDelete={()=>onDelete(experiance.experienceID)} text='experience' close = {()=>setDeletePopup(false)}/>
              )
            }                                   
      </div>
    )
  }
export default Experiance
