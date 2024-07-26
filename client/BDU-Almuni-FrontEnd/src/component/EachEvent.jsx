import { FaMapMarker, FaMarker } from "react-icons/fa";
import Button from "./Button"

const EachEvent = ({singleEvent}) => {
    const type = (singleEvent.eventId % 2)+1 ;
  return (
    <div className={`each-event type${type}`}>
        {
            type === 1 ?(
                <>
                <div className="img-category">
            <img src={singleEvent?.imagePath} alt="" className="events-img" />
            <p className="event-category">{singleEvent?.category}</p>               
                </div>
                
    <div className="separetor"></div>
    <div className="event-description">
        <p className="description-title">{singleEvent?.title}</p>
            <div className="description-text">
                <p className="event-text">{singleEvent?.content}</p>
                
            </div>
            <p className="location"> {singleEvent?.eventLocation} </p>
            <p>{singleEvent?.startDate} - {singleEvent?.endDate}</p>
            {
                singleEvent?.registerURL &&(<Button id={"event-btn"} text={"Join"}/>)
            }
            
    </div>
                </>
            ):(type === 2 && (
                <>
                    <div className="event-description">
                    
            <p className="description-title">{singleEvent?.title}</p>
                <div className="description-text">
                    <p className="event-text">{singleEvent?.content}</p>
                    
                </div>
                        <p className="location"> {singleEvent?.eventLocation} </p>
                        <p>{singleEvent?.startDate} - {singleEvent?.endDate}</p>
                {
                singleEvent?.registerURL &&(<Button id={"event-btn"} text={"Join"}/>)
            }
        </div>
        <div className="separetor"></div>
        <div className="img-category">
            <img src={singleEvent?.imagePath} alt="" className="events-img" />
            <p className="event-category">{singleEvent?.category}</p>               
                </div>
        
        
        </> 
            ))
        }
    </div>
  )
}

export default EachEvent