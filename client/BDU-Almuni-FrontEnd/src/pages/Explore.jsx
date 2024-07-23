import '../styles/Explore.css'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import Chart from '../pages/AdminPages/Charts'
import i1 from '../assets/i1.jpg'
const Explore = () => {
  const [notableAlumni, setNotableAlumni] = useState([]);
  
  useEffect(() => {
    // Fetch notable alumni data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notable`);
        if (response.ok) {
          const data = await response.json();
          setNotableAlumni(data);
        } else {
          throw new Error('Failed to fetch notable alumni');
        }
      } catch (error) {
        console.error('Error fetching data:',error);
        // Handle error
      }
    };

    fetchData();
  }, []);


  return (
    
    <div className='home'>
      <div className='NotableAlumniContainer'>
      <h3>Notable Alumni</h3>
      <div className='NotableAlumni'>
      {notableAlumni.map((alumni, index) => (
            <div key={index} className="IndividualNotableAlumni">
              <Avatar src={alumni.profilePhoto} />
              <div className='alumniDetail'>
                <p>{alumni.firstName}</p>
                <p>{alumni.lastName}</p>
                {/* <a href={alumni.companyWebsite} target="_blank" rel="noopener noreferrer">{alumni.companyName}</a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
        <Chart/>
    </div>
  )
}

export default Explore