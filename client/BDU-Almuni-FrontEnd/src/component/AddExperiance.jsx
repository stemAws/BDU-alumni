import { useEffect, useState } from "react"
const AddExperiance = ({updateExperiance,showEditExperiance,experiances,onAdd,showAddExperiance,loading}) => {
    const [jobTitle,setJobTitle]=useState('')
    const [employmentType,setEmploymentType]=useState('')
    const [companyName,setcompanyName]=useState('')
    const [startDate,setstartDate]=useState('')
    const [endDate,setendDate]=useState('')
    const [stillWorking,setStillWorking]=useState(false)
    const[dateError, setDateError] =useState(false)
    const [jobTitleError, setJobTitleError] = useState(false)
const onSubmit=(e)=>{
  e.preventDefault();
        const cookies = document.cookie;
        const match = cookies.match(/id=([^;]*)/);
        const token = match ? match[1] : null;
        if (endDate && startDate && stillWorking===false && new Date(endDate) <= new Date(startDate)) {
         setDateError(true)
          return;
        }
        if (jobTitle.length>27) {
          setJobTitleError(true)
          return;
        }
        onAdd({token,jobTitle,employmentType,companyName,startDate,endDate,stillWorking})
        showAddExperiance(false)
        
}
const onupdate=(e)=>{
  e.preventDefault()
  const id= experiances[0].experienceID;
  if (endDate && startDate && stillWorking===false && new Date(endDate) <= new Date(startDate)) {
    setDateError(true)
    return;
  }
  if (jobTitle.length>27) {
    setJobTitleError(true)
    return;
  }
  updateExperiance(jobTitle,employmentType,companyName,startDate,endDate,stillWorking,id);
}
const onDiscard= () =>{
  showAddExperiance(false)
}
useEffect(()=>{
  setJobTitle(showEditExperiance?experiances[0]?.jobTitle:'')
setEmploymentType(showEditExperiance?experiances[0]?.employmentType:'')
setcompanyName(showEditExperiance?experiances[0]?.companyName:'')
setstartDate(showEditExperiance?experiances[0]?.startDate:'')
setendDate(showEditExperiance?experiances[0]?.endDate:'')
setStillWorking(showEditExperiance?experiances[0]?.stillWorking:false)

},[experiances])

  return (
    <form className="add_form" onSubmit={showEditExperiance?onupdate:onSubmit}>
        <div className="form_control">
        <label>Job Title</label>
        <input type="text" 
        placeholder={"Add The Title Of Your Job"}  
        value={jobTitle||''} 
        onChange={(e)=>setJobTitle(e.target.value)}
        required
        />
        </div>
        {
          jobTitleError&&(
            <p style={{color:"red"}}>Job Title must be less than 27 characters</p>
          )
        }
        <div className="form_control">
        <label>Employment Type</label>
        <input type="text" 
        placeholder={"Full time, Part time, Freelance ..." }
        value={employmentType||''} 
        onChange={(e)=>setEmploymentType(e.target.value)}
        required
        />
        </div>

        <div className="form_control">
        <label>Company Name</label>
        <input type="text" 
        placeholder={"Add Company Name"}
        value={companyName||''} 
        onChange={(e)=>setcompanyName(e.target.value)}
        required
        />
        </div>

        <div className="form_control form_control_check">
        <label>I am currently working here</label>
        <input  
        type="checkbox" 
        value={stillWorking||''} 
        onChange={(e)=>setStillWorking(e.currentTarget.checked)}
        checked={stillWorking}
        />
        </div>
        <div className="form_control">
        <label>Start Date</label>
        <input type="date" 
        value={startDate||''}
        onChange={(e)=>setstartDate(e.target.value)}
        required
        />
        </div>
        {!stillWorking&&<div className="form_control">
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
        {showEditExperiance?<input  disabled={loading}className="save_button" type="submit" value={loading?'Upadting...':'Update changes'} />:<input disabled={loading} className="save_button" type="submit" value={loading?'Adding...':'ADD Experiance'} />}
       {showEditExperiance&&<input onClick={()=>onDiscard()} id="discard"  className="save_button" type="button" value="Discard Changes" />} 
        </div>
        
    </form>
  )
}

export default AddExperiance