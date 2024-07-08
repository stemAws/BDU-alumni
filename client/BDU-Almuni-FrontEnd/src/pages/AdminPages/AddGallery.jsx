import { useState } from 'react';
import '../../styles/AddGallery.css';
import { Link } from 'react-router-dom';
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddGallery = ({ updateCategories }) => {
  const [event, setEvent] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState('');
  const [eventError, setEventError] = useState('');
  const [yearError, setYearError] = useState('');
  const [imagesError, setImagesError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const [success, setSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const navigate = useNavigate();

  const handleEventChange = (e) => {
    setEvent(e.target.value);
    setEventError('');
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
    } else if (!/^(?![0-9])[a-zA-Z0-9\s]+$/.test(event)) {
      setEventError("Event must contain only letters and spaces, with numbers allowed anywhere after letters!");
      valid = false;
    } else {
      setEventError('');
    }
    if (!year) {
      setYearError('Year field cannot be empty!');
      valid = false;
    } else if (isNaN(year)) {
      setYearError('Year must be a number!');
      valid = false;
    } else if (year.length !== 4) {
      setYearError('Year must be a 4-digit number!');
      valid = false;
    } else if (year < 2019) {
      setYearError('Year must not be before 2019!!');
      valid = false;
    } else {
      setEventError('');
    }
    if (!images) {
      setImagesError('Please select images');
      valid = false;
    }
    if (valid) {
      try {
        setLoading(true); // Set loading to true when starting upload

        const formData = new FormData();
        formData.append('event', event);
        formData.append('year', year);
        Array.from(images).forEach((image) => formData.append('images', image));

        const response = await fetch(`http://localhost:3005/upload`, {
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
        setLoading(false); // Set loading to false after upload completes (whether success or error)
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
      <h2> Add Gallery </h2>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <ToastContainer autoClose={1500} />
          <div className='form'>
            <label className='label' htmlFor="event" >Event:</label>
            <input type="text" id="event" placeholder='Catagory title' value={event} onChange={handleEventChange} />
            {eventError && <p className="errorMessage">{eventError}</p>}
          </div>
          <div className='form'>
            <label className='label' htmlFor="year" >Year:</label>
            <input type="text" id="year" placeholder='Batch' value={year} onChange={handleYearChange} />
            {yearError && <p className="errorMessage">{yearError}</p>}
          </div>
          <div className='form'>
            <label className='label' htmlFor="images">
              Images:
            </label>
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

