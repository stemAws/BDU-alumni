import '../styles/Explore.css'
import { Avatar } from '@mui/material'
// import { useEffect, useState } from 'react'
import Chart from '../pages/AdminPages/Charts'
import i1 from '../assets/i1.jpg'
const Explore = () => {
  return (
    
    <div className='home'>
      <div className='NotableAlumniContainer'>
      <h3>Notable Alumni</h3>
      <div className='NotableAlumni'>
        <div className='link-cont'>
            <div className="IndividualNotableAlumni">
              <Avatar src={i1} />
              <div className='alumniDetail'>
                <p>firstName</p>
                <p>lastName</p>
              </div>
            </div>
            <a href='link to userpage'> link to user's profile</a>
        </div>

        <div className='link-cont'>
            <div className="IndividualNotableAlumni">
              <Avatar src={i1} />
              <div className='alumniDetail'>
                <p>firstName</p>
                <p>lastName</p>
              </div>
            </div>
            <a href='link to userpage'> link to user's profile</a>
            </div>

            <div className='link-cont'>
            <div className="IndividualNotableAlumni">
              <Avatar src={i1} />
              <div className='alumniDetail'>
                <p>firstName</p>
                <p>lastName</p>
              </div>
            </div>
            <a href='link to userpage'> link to user's profile</a>
            </div>

            <div className='link-cont'>
            <div className="IndividualNotableAlumni">
              <Avatar src={i1} />
              <div className='alumniDetail'>
                <p>firstName</p>
                <p>lastName</p>
              </div>
            </div>
            <a href='link to userpage'> link to user's profile</a>
            </div>
        

        </div>
      </div>
        <Chart/>
    </div>
  )
}

export default Explore