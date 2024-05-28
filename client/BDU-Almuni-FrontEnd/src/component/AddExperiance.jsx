import { useEffect, useState } from "react"
const AddExperiance = ({updateExperiance,showEditExperiance,experiances,onAdd,showAddExperiance,loading}) => {
  // console.log(experiances[0])
    const [jobTitle,setJobTitle]=useState('')
    const [industry,setindustry]=useState('')
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
        onAdd({token,jobTitle,industry,employmentType,companyName,startDate,endDate,stillWorking})
        showAddExperiance(false)
        
}
const onupdate=(e)=>{
  e.preventDefault()
  const id= experiances[0].experienceId;
  if (endDate && startDate && stillWorking===false && new Date(endDate) <= new Date(startDate)) {
    setDateError(true)
    return;
  }
  if (jobTitle.length>27) {
    setJobTitleError(true)
    return;
  }
  updateExperiance(jobTitle,industry,employmentType,companyName,startDate,endDate,stillWorking,id);
}
const onDiscard= () =>{
  showAddExperiance(false)
}
useEffect(()=>{
  setJobTitle(showEditExperiance?experiances[0]?.position:'')
  setindustry(showEditExperiance?experiances[0]?.industry:'')
setEmploymentType(showEditExperiance?experiances[0]?.employmentType:'')
setcompanyName(showEditExperiance?experiances[0]?.company:'')
setstartDate(showEditExperiance?experiances[0]?.startDate:null)
setendDate(showEditExperiance?experiances[0]?.endDate:null)
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
        <div className='form_control'>
          <label htmlFor="industry">Type of Industry</label>
          <select 
          id="industry" 
          value={industry||''} 
          onChange={(e)=>setindustry(e.target.value)}>
            <option value="" disabled hidden>Select Type of industry</option>
            <option value="Healthcare and Social Assistance">Healthcare and Social Assistance</option>
        <option value="Retail Trade">Retail Trade</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Educational Services">Educational Services</option>
        <option value="Professional, Scientific, and Technical Services">Professional, Scientific, and Technical Services</option>
        <option value="Construction">Construction</option>
        <option value="Finance and Insurance">Finance and Insurance</option>
        <option value="Accommodation and Food Services">Accommodation and Food Services</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Transportation and Warehousing">Transportation and Warehousing</option>
        <option value="Agriculture, Forestry, Fishing, and Hunting">Agriculture, Forestry, Fishing, and Hunting</option>
        <option value="Public Administration">Public Administration</option>
        <option value="Wholesale Trade">Wholesale Trade</option>
        <option value="Real Estate and Rental and Leasing">Real Estate and Rental and Leasing</option>
        <option value="Arts, Entertainment, and Recreation">Arts, Entertainment, and Recreation</option>
        <option value="Mining, Quarrying, and Oil and Gas Extraction">Mining, Quarrying, and Oil and Gas Extraction</option>
        <option value="Utilities">Utilities</option>
        <option value="Administrative and Support and Waste Management Services">Administrative and Support and Waste Management Services</option>
        <option value="Management of Companies and Enterprises">Management of Companies and Enterprises</option>
        <option value="Telecommunications">Telecommunications</option>
        <option value="Pharmaceuticals and Biotechnology">Pharmaceuticals and Biotechnology</option>
        <option value="Aerospace and Defense">Aerospace and Defense</option>
        <option value="Automotive">Automotive</option>
        <option value="Chemical Manufacturing">Chemical Manufacturing</option>
        <option value="Electronics and Electrical Equipment">Electronics and Electrical Equipment</option>
        <option value="Textiles and Apparel">Textiles and Apparel</option>
        <option value="Food and Beverage Manufacturing">Food and Beverage Manufacturing</option>
        <option value="Media and Publishing">Media and Publishing</option>
        <option value="Logistics and Supply Chain">Logistics and Supply Chain</option>
        <option value="Hospitality and Tourism">Hospitality and Tourism</option>
        <option value="Other">Other</option>
          </select>
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