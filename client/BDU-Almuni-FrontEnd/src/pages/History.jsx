import React from 'react'
import '../styles/History.css'
import i4 from '../assets/i4.png'
import i5 from '../assets/i5.png'
const History = () => {
  return (
    <div className='historyContainer'>
      <div className='historyHeader'>
        <div className='BackgroundImage'> 
          <img src={i4} alt="" />
          <h3 className='year'>1960</h3>
        </div>
        <h3 className='header'>OUR <span>STORY</span></h3>
      </div>
      <div className='historyImg'>
        <img src={i5} alt="" />
      </div>
      
    
    
    </div>
  )
}

export default History