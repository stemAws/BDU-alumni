import Button from "./Button"

const EachEvent = ({singleEvent}) => {
    const type = (singleEvent.id % 2)+1 ;
  return (
    <div className={`each-event type${type}`}>
        {
            type === 1 ?(
                <>
                <img src={singleEvent?.img} alt="" className="events-img" />
    <div className="separetor"></div>
    <div className="event-description">
        <p className="description-title">{singleEvent?.title}</p>
            <div className="description-text">
                <p className="event-text">{singleEvent?.description}</p>
                <div className="event-date">
                    {singleEvent?.startDate} - {singleEvent?.endDate}
                </div>
                
            </div>
            {
                singleEvent?.link !=="" &&(<Button id={"event-btn"} text={"Join"}/>)
            }
            
    </div>
                </>
            ):(type === 2 && (
                <>
            <div className="event-date">
            {singleEvent?.startDate} - {singleEvent?.endDate}
                    </div>
                    <div className="event-description">
            <p className="description-title">{singleEvent?.title}</p>
                <div className="description-text">
                    <p className="event-text">{singleEvent?.description}</p>
                    
                </div>
                {
                singleEvent?.link !=="" &&(<Button id={"event-btn"} text={"Join"}/>)
            }
        </div>
        <div className="separetor"></div>
        <img src={singleEvent?.img} alt="" className="events-img" />
        
        
        </> 
            ))
        }
    </div>
  )
}

export default EachEvent