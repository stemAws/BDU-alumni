import"../styles/events.css"
import newsimg2 from '../assets/images/photo_2024-02-25_23-36-59.jpg';
import newsimg from '../assets/images/photo_2024-02-27_14-20-52.jpg';
import Button from "../component/Button";
import {FaArrowCircleDown, FaArrowDown, FaChevronDown} from "react-icons/fa"
import { useEffect, useState } from "react";
import MultipleEvents from "../component/MultipleEvents";
const Events = () => {
  const [eventsToShow, seteventsToShow] = useState(3);
  const [events, setevents] = useState([{
    id:1,
    img:`..${newsimg}`,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos",
    description: " adipisicing elit. Dolore, dicta corporis, dignissimos harum deserunt consequuntur perspiciatis soluta obcaecati in nemo fugit blanditiis at explicabo quidem quos fugiat optio vel dolorum  adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos",
    startDate:"12/06/24",
    endDate: "12/06/24",
    link:"https://www.kebe.com"
  },
  {
    id:2,
    img:`..${newsimg2}`,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos",
    description: " adipisicing elit. Dolore, dicta corporis, dignissimos harum deserunt consequuntur perspiciatis soluta obcaecati in nemo fugit blanditiis at explicabo quidem quos fugiat optio vel dolorum adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos adipisicing elit. Cupiditate dolorem necessitatibus cum consequuntur dolorum voluptates vel earum cumque id accusamus porro quam exercitationem ut corrupti, soluta laborum, ipsum est eos",
    startDate:"12/06/24",
    endDate: "12/06/24",
    link:""
  }])

  useEffect(() => {
    const fetchEvents=async()=>{
      try {
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/events`,{
            credentials: 'include',
          })
          const eventsFromServer= await res.json()
          if (!res.ok) {
            console.error("couldn't fetch the events")
          }
          else{
            setevents(eventsFromServer)
      }} catch (error) {
        console.error("couldn't fetch the events",error)
        
      }
    }
    fetchEvents();
  }, [])
  const handleSeemore=()=>{
      seteventsToShow(eventsToShow + 3)
  }
  const handleSeeless=()=>{
      seteventsToShow(eventsToShow - 3)
  }
  return (
    <div className="events-container body">
         <div className="events">
      <div className="circle-bg return" />
      <div className="the-line"></div>
      <div className="line-cover"></div>
      <p className="event-title">
       <span className="blue-text">UPCOMING</span> EVENTS
      </p>
      </div>
       {
        events.length > 0 &&(
          <MultipleEvents events={events} eventsToShow={eventsToShow} />
        )
       }
       <div className="buttons">
       {eventsToShow < events.length && <Button className={`see-more`} onClick={()=>handleSeemore()} text={"More"} />}
       {(eventsToShow > 3 ) && <Button className={`see-less`} onClick={()=>handleSeeless()} text={"Less"} />}
       </div>
    </div>
  )
}

export default Events