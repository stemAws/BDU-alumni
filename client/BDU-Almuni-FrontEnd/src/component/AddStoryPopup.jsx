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
        placeholder:'jobTitle',
        type:"text",
        value:'Company Name' 
      },
      {
        id:'jobTitle',
        className:"story-popup-input",
        label:'Job Title',
        placeholder:'jobTitle',
        type:"text",
        value:'Job Title' 
      },
      {
        id:'peopleNeeded',
        className:"story-popup-input",
        label:'People Needed',
        placeholder:'jobTitle',
        type:"text",
        value:'People Needed' 
      },
      {
        id:'salary',
        className:"story-popup-input",
        label:'Salary',
        placeholder:'jobTitle',
        type:"text",
        value:'Salary' 
      },
      {
        id:'employment Type',
        className:"story-popup-input",
        label:'Employment Type',
        placeholder:'jobTitle',
        type:"text",
        value:'Employment Type' 
      },
      {
        id:'address',
        className:"story-popup-input",
        label:'Address',
        placeholder:'jobTitle',
        type:"text",
        value:'Address' 
      },
      {
        id:'deadline',
        className:"story-popup-input",
        label:'Deadline',
        placeholder:'jobTitle',
        type:"text",
        value:'Deadline' 
      } 
])
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isToggled, setToggled] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
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
        <form onSubmit={onSubmit}>
            <div className="each-job-input">
              {jobInputs.map((jobInput)=>
              <FormInput label={jobInput.label} placeholder={jobInput.placeholder} type={jobInput.type} value={jobInput.value}/>
              )
              }
            </div>
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
          <div className="buttons">
            <Button disabled={loading} type='submit'text={loading?'Uploading...':'Upload'}/>
      <Button type={'button'} text={'Post Stories'} onClick={()=>slideToJob('toStories')}/>
    </div>
    
        </form>
      </div>
      </div>
    </div>
  );
};

export default AddStoryPopup;
