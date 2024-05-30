import React, { useState } from 'react';
import '../styles/AddStoryPopup.css';
import { FaTimes } from 'react-icons/fa';

const AddStoryPopup = ({handleClose, onAddStory,loading}) => {
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

  return (
    <div className='story-popup'>
      <div className='story-popup-inner'>
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
          <div className="buttons"><button disabled={loading} type='submit'>{loading?'Uploading...':'Upload'}</button>
          <p className='suggest'>{!isToggled ?"suggest Admin?":"suggested "}</p> 
          <div onClick={handleToggle} className={`slide-toggle-container ${isToggled ? 'toggled' : ''}`}>
      <div className="slider" onClick={handleToggle}></div>
    </div>
    
    </div>
    
        </form>
      </div>
    </div>
  );
};

export default AddStoryPopup;
