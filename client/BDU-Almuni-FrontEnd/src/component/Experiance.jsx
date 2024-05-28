import {FaPen, FaTrash} from 'react-icons/fa'
import DeleteConfirmation from './DeleteConfirmation'
import { useState } from 'react'
const Experiance = ({onclose,experiance,onDelete,onEdit,ondisplay}) => {
  const [deletePopup,setDeletePopup] =useState(false)
    return (
      <div className={`task ${experiance.stillWorking ? 'stillWorking':''}`}>
          <h3 >{experiance.position} 
          {ondisplay?<div className="edit">
          <FaTrash className='trash_delete' onClick={()=>setDeletePopup(true)} size={13} />
          <FaPen className='pen_edit' onClick={()=>{onEdit(experiance.experienceId)
          onclose(true)}} size={15} />
          </div>:''}
          
          </h3>
          <h4> {experiance.employmentType} employ at {experiance.company}</h4>
<<<<<<< HEAD
          <p>Started: {experiance.startDate ? new Date(experiance.startDate).toISOString().split('T')[0] : 'Unknown'}</p>
          {experiance.stillWorking ?"Still working here": <p>UpTo: {new Date(experiance.endDate).toISOString().split('T')[0]}</p>}
=======
          <p>Started: {experiance.startDate}</p>
          {experiance.stillWorking ?"Still working here": <p>UpTo: {experiance.endDate}</p>}
>>>>>>> 42e0aa5622263728046ce383bec36ae27696ae0a
          {
              deletePopup&&(
                <DeleteConfirmation onDelete={()=>onDelete(experiance.experienceId)} text='experience' close = {()=>setDeletePopup(false)}/>
              )
            }                                   
      </div>
    )
  }
export default Experiance
