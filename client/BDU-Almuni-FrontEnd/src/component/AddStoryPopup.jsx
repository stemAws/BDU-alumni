import { useRef, useState } from 'react';
import '../styles/AddStoryPopup.css';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import FormInput from './FormInput'
const AddStoryPopup = ({handleClose, onAddStory,loading}) => {
  const ref = useRef()
  const ref1 = useRef()
  const [jobInputs, setjobInputs] = useState([{
        id:'companyName',
        className:"story-popup-input",
        label:'Company Name',
        placeholder:'Add company name',
        type:"text", 
        required:true
      },
      {
        id:'jobTitle',
        className:"story-popup-input",
        label:'Job Title',
        placeholder:'Add job title',
        type:"text",
        required:true
      },
      {
        id:'jobLink',
        className:"story-popup-input",
        label:'Job Link (optional)',
        placeholder:'Add job link',
        type:"text",
      },
      // {
      //   id:'peopleNeeded',
      //   className:"story-popup-input",
      //   label:'People Needed',
      //   placeholder:'How many people are needed ',
      //   type:"number" 
      // },
      // {
      //   id:'salary',
      //   className:"story-popup-input",
      //   label:'Salary',
      //   placeholder:'Salary per month',
      //   type:"number"
      // },
      // {
      //   id:'employmentType',
      //   className:"story-popup-input",
      //   label:'Employment Type',
      //   placeholder:'Set employment Type',
      //   type:"text" 
      // },
      // {
      //   id:'address',
      //   className:"story-popup-input",
      //   label:'Address',
      //   placeholder:'where is it located',
      //   type:"text"
      // }
      ,
      {
        id:'deadline',
        className:"story-popup-input",
        label:'Deadline',
        type:"date",
        required:true
      },
      // {
      //   id:'email',
      //   className:"story-popup-input",
      //   label:'Email',
      //   type:"email"
      // } ,
      // {
      //   id:'phoneNumber',
      //   className:"story-popup-input",
      //   label:'Phone Number',
      //   type:"tel"
      // }  
])
  const [success, setsuccess] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isToggled, setToggled] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [waiting, setwaiting] = useState(false)
  const [jobDescription, setjobDescription] = useState('');
  const handleToggle = () => {
    setToggled(!isToggled);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (/^\d+$/.test(description)) {
      setDescriptionError('Please provide meaningful description!');
      return;
    }
    onAddStory({imageFile, description,isToggled });
    handleClose();
  };
const slideToJob=(towhere)=>{
  if (ref.current||ref1.current) {
    if (towhere==='toStories') {
    console.log(towhere)
    ref.current.style.right='0px'
  ref1.current.style.right='-370px'
  }
  else{
    ref.current.style.right='375px'
    ref1.current.style.right='375px'
  }
    
}
}
const handleInputChange = (id, newValue) => {
  setjobInputs(prevJobInputs => 
    prevJobInputs.map(input => 
      input.id === id ? { ...input, value: newValue } : input
    )
  );
};

const addJob = async (e) => {
      e.preventDefault()
      setwaiting(true)
      const jobData = jobInputs.reduce((eachJob, input) => {
        eachJob[input.id] = input.value;
        return eachJob;
      }, {});
      jobData.jobDescription = jobDescription;
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-job`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:'include',
          body: JSON.stringify(jobData)
        });
        if (response.ok) {
          const result = await response.json();
          setsuccess(true)
          setwaiting(false)

        } else {
          console.error('Error:', response.statusText);
          setwaiting(true)
        }
      } catch (error) {
        console.error('Error:', error);
        setwaiting(true)
      }
    };

  return (
    <div className='story-popup'>
      <div className="story-job-conatianer">
      <div ref={ref} className='story-popup-inner'>
        <div className='story-popup-close-btn' onClick={handleClose}>
          <FaTimes />
        </div>
        <form onSubmit={onSubmit}>
          <input
            className='story-popup-input'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            required={!description}
            />
          <div>
          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={!imageFile}
          ></textarea>
          {descriptionError && <p className="errorMessage">{descriptionError}</p>}
          </div>
          <div className="suggest-toggle">
            <div onClick={handleToggle} className={`slide-toggle-container ${isToggled ? 'toggled' : ''}`}>
              <div className="slider" onClick={handleToggle}/>
          </div>
          <p className='suggest'>{!isToggled ?"suggest Admin?":"suggested "}</p> 
          </div>
          
          <div className="buttons">
              <Button disabled={loading} type='submit'text={loading?'Uploading...':'Upload'}/>
              <Button type={'button'} text={'Post Jobs'} onClick={slideToJob}/>
         </div>
    
        </form>
      </div>
      <div ref={ref1} className='add-job-offer'>
        <div className='story-popup-close-btn' onClick={handleClose}>
          <FaTimes />
        </div>
        <form onSubmit={addJob}>
            <div className="each-job-input">
              {jobInputs.map((jobInput,index)=>
              <FormInput 
                  key={index} 
                  label={jobInput.label} 
                  placeholder={jobInput.placeholder} 
                  type={jobInput.type} 
                  value={jobInput.value}
                  required={jobInput.required}
                  onChange={(e) => handleInputChange(jobInput.id, e.target.value)}
                  />
              )
              }
            </div>
          <div>
          <div className="each-job-input">

            <label className='job-detail'> Job Description </label>
          <textarea
            placeholder='Description'
            value={jobDescription}
            onChange={(e) => setjobDescription(e.target.value)}
            required={true}
          ></textarea>
          </div>
          {descriptionError && <p className="errorMessage">{descriptionError}</p>}
          </div>
          <div className="buttons">
            <Button disabled={waiting} type='submit'text={waiting?'Uploading...':'Upload'}/>
            <Button  type={'button'} text={'Post Stories'} onClick={()=>slideToJob('toStories')}/>
    </div>
    
        </form>
      </div>
      {success&&<div className="success-container">
              <p>we have successfully sent your job offer to the admin, it will be posted in a bit </p>
              <Button onClick={handleClose} className={'ok'} text={'Okay'} />
      </div>}
      </div>
    </div>
  );
};

export default AddStoryPopup;
