import React, { useState, useEffect } from 'react';
import '../../styles/AddGallery.css';
import { Link } from 'react-router-dom';
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGallery = ({ updateCategories }) => {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState("");
  // const [department, setDepartment] = useState("");
  const [year, setYear] = useState('');
  const [images, setImages] = useState('');
  const [eventError, setEventError] = useState('');
  const [yearError, setYearError] = useState('');
  const [imagesError, setImagesError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  // const [departmentError, setDepartmentError] = useState("");
  const navigate = useNavigate();

  // Fetch categories or other initial data if needed
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`);
        const data = await response.json();
        updateCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [updateCategories]);

  const handleEventChange = (e) => {
    setEvent(e.target.value);
    setEventError('');
  };

  // const handleDepartmentChange = (e) => {
  //   setDepartment(e.target.value);
  //   setDepartmentError('');
  // };

  const handleDiscriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError('');
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setYearError('');
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    setImagesError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!event) {
      setEventError('Event field cannot be empty!');
      valid = false;
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(event)) {
    //   setEventError("Event must contain only letters and spaces, with numbers allowed anywhere after letters!");
    //   valid = false;
    } else {
      setEventError('');
    }

    // if (!department) {
    //   setDepartmentError('Department field cannot be empty!');
    //   valid = false;
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(department)) {
    //   setDepartmentError("Department must contain only letters and spaces, with numbers allowed anywhere after letters!");
    //   valid = false;
    // } else {
    //   setDepartmentError('');
    // }

    if (!year) {
      setYearError('Year field cannot be empty!');
      valid = false;
    } else if (isNaN(year)) {
      setYearError('Year must be a number!');
      valid = false;
    } else if (year.length !== 4) {
      setYearError('Year must be a 4-digit number!');
      valid = false;
    // } else if (year < 2019) {
    //   setYearError('Year must not be before 2019!');
    //   valid = false;
    } else {
      setYearError('');
    }

    if (!images) {
      setImagesError('Please select images');
      valid = false;
    }

    if (!description) {
      setDescriptionError('Description field cannot be empty!');
      valid = false;}
    // } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(description)) {
    //   setDescriptionError("Description must contain only letters and spaces, with numbers allowed anywhere after letters!");
      // valid = false;
    

    if (valid) {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append('event', event);
        formData.append('description', description);
        // formData.append('department', department);
        formData.append('year', year);
        Array.from(images).forEach((image) => formData.append('images', image));

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Gallery uploaded successfully');
          setSuccess(true);
          navigate('/admin/gallery');
        } else {
          console.error('Failed to upload:', response.statusText);
          setErrorPopup(true);
        }
      } catch (error) {
        console.error('Error uploading images', error);
        toast.error(`Error uploading images: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = () => {
    navigate('/admin/gallery');
  };

  return (
    <div className='galleryUpload'>
      <Link to="/admin/gallery" className="userGoBack">
        <ChevronLeft className="userGoBackIcon" onClick={handleClick} />
      </Link>
      <h2>Add Gallery</h2>
      <div className='formContainer'>
        <form className="eventformform" onSubmit={handleSubmit}>
          <ToastContainer autoClose={1500} />
          <div className='form'>
            <label className='label' htmlFor="event">Event:</label>
            <input type="text" id="event" placeholder='Category title' value={event} onChange={handleEventChange} />
            {eventError && <p className="errorMessage">{eventError}</p>}
          </div>

          {/* <div className='form'>
            <label className='label' htmlFor="department">Department:</label>
            <input type="text" id="department" placeholder='Department' value={department} onChange={handleDepartmentChange} />
            {departmentError && <p className="errorMessage">{departmentError}</p>}
          </div> */}
         
          <div className="form">
            <label className="label">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleDiscriptionChange}
            />
            {descriptionError && <p className="errorMessage">{descriptionError}</p>}
          </div>

          <div className='form'>
            <label className='label' htmlFor="year">Year:</label>
            <input type="text" id="year" placeholder='Batch' value={year} onChange={handleYearChange} />
            {yearError && <p className="errorMessage">{yearError}</p>}
          </div>

          <div className='form'>
            <label className='label' htmlFor="images">Media:</label>
            <input className='imageInput' type="file" id="images" multiple onChange={handleImageChange} />
            {imagesError && <p className="errorMessage">{imagesError}</p>}
          </div>

          <div className='buttonss'>
            <button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGallery;
