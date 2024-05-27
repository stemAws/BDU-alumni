import { useEffect, useState } from "react"

const AddEducation = ({updateEducation,showEditEducation,educations,onAddEdu,showAddEducation,loading}) => {
    const [institution,setInstitution]=useState('')
    const [degree,setDegree]=useState('')
    const [admission,setadmission]=useState('')
    const [fieldOfStudy,setfieldOfStudy]=useState('')
    const [startDate,setstartDate]=useState('')
    const [endDate,setendDate]=useState('')
    const [stillLearning,setStillLearning]=useState(false)
    const[dateError, setDateError] =useState(false)
    const [fieldOfStudyError, setfieldOfStudyError] = useState(false)
const onSubmit=(e)=>{
  e.preventDefault()
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        if (endDate && startDate && stillLearning === false && new Date(endDate) <= new Date(startDate)) {
         setDateError(true)
          return;
        }
        if (fieldOfStudy.length>27) {
          setfieldOfStudyError(true)
          return;
        }
        onAddEdu({token,institution,admission,degree,fieldOfStudy,startDate,endDate,stillLearning})
        showAddEducation(false)
}
const onupdate=(e)=>{
  e.preventDefault()
  const id = educations[0].educationID;
  if (endDate && startDate && stillLearning === false && new Date(endDate) <= new Date(startDate)) {
    setDateError(true)
    return;
  }
  if (fieldOfStudy.length>27) {
    setfieldOfStudyError(true)
    return;
  }
  updateEducation(institution,degree,admission,fieldOfStudy,startDate,endDate,stillLearning,id);
}
const onDiscard= () =>{
  showAddEducation(false)
}
useEffect(()=>{
  setInstitution(showEditEducation?educations[0]?.institution:'')
  setDegree(showEditEducation?educations[0]?.degree:'')
  setadmission(showEditEducation?educations[0]?.admission:'')
  setfieldOfStudy(showEditEducation?educations[0]?.fieldOfStudy:'')
  setstartDate(showEditEducation?educations[0]?.startYear:'')
  setendDate(showEditEducation?educations[0]?.endYear:'')
  setStillLearning(showEditEducation?educations[0]?.stillLearning:false)
},[educations])

  return (
    <form className="add_form" onSubmit={showEditEducation?onupdate:onSubmit}>
        <div className="form_control">
        <label>Institution</label>
        <input type="text" 
        placeholder={"Where did you go"}  
        value={institution||''} 
        onChange={(e)=>setInstitution(e.target.value)}
        required
        />
        </div>
        <div className='form_control'>
          <label htmlFor="admission">Type of Admission</label>
          <select 
          id="admission" 
          value={admission||''} 
          onChange={(e)=>setadmission(e.target.value)}>
            <option value="" disabled hidden>Select Type of Admission</option>
            <option value="Bachelor">Regular</option>
            <option value="Master">Summer</option>
            <option value="Associate">Extension</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className='form_control'>
          <label htmlFor="Type_of_Degree">Type of Degree</label>
          <select 
          id="Type_of_Degree" 
          value={degree||''} 
          onChange={(e)=>setDegree(e.target.value)}>
            <option value="" disabled hidden>Select Type of Degree</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Associate">Associate</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form_control">
        <label>Field Of Study</label>
        <input type="text" 
        placeholder={"Add your field"}  
        value={fieldOfStudy||''} 
        onChange={(e)=>setfieldOfStudy(e.target.value)} 
        />
        </div>
        {
          fieldOfStudyError&&(
            <p style={{color:"red"}}>Field Of Study must be less than 27 characters</p>
          )
        }

        <div className="form_control form_control_check">
        <label>I am currently learning here</label>
        <input  
        type="checkbox" 
        value={stillLearning||false} 
        onChange={(e)=>setStillLearning(e.currentTarget.checked)}
        checked={stillLearning}
        />
        </div>
        <div className="form_control">
        <label>Start Date</label>
        <input type="date" 
        value={startDate||''} 
        onChange={(e)=>setstartDate(e.target.value)} 
        />
        </div>
        {!stillLearning&&<div className="form_control">
        <label>End Date</label>
        <input type="date"  
        value={endDate||''} 
        onChange={(e)=>setendDate(e.target.value)} 
        required
        />
        {
          dateError&&(
            <p style={{color:"red"}}>End Date must be greater than Start Date</p>
          )
        }
        </div>}
        <div className="save_discard">
          {showEditEducation?<input disabled={loading} className="save_button" type="submit" value={loading?'Updating...':'Update Changes'} />:<input disabled={loading}  className="save_button" type="submit" value={loading?'Adding...':'ADD Eduaction'} />}
       {showEditEducation && <input onClick={()=>onDiscard()} id="discard"  className="save_button" type="button" value="Discard Changes" />}
        </div>
         
      
    </form>
  )
}

export default AddEducation