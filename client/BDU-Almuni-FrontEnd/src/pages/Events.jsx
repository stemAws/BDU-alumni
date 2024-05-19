import"../styles/events.css"
import newsimg2 from '../assets/images/photo_2024-02-25_23-36-59.jpg';
import newsimg from '../assets/images/photo_2024-02-27_14-20-52.jpg';
import Button from "../component/Button";
const Events = () => {
  return (
    <div className="events-container">
       <div className="each-event type1">
        <img src={newsimg2} alt="" className="events-img" />
        <div className="separetor"></div>
        <div className="event-description">
            <p className="description-title">Berhane Mewa who is a former graduate of Poly-Technic Institute Poly-Technic Institute in the 60s and president of Addis Chamber of Commerce in the 90s will deliver his public</p>
                <div className="description-text">
                    <p className="event-text">Berhane Mewa who is a former graduate of  speech on title indicated below on 4th of December, 2022 at BIT's Washera hall Commerce in the 90s will deliver his public speech on title indicated below on 4th of December, 2022 at BIT's Washera hall Commerce in the 90s will deliver his public speech on title indicated below on 4th of December, 2022 at BIT's Washera hall</p>
                    <div className="event-date">
                        12/06/24 - 19/06/24
                    </div>
                    
                </div>
                <Button id={"event-btn"} text={"Join"}/>
        </div>
        </div>
        <div className="each-event type2">
            <div className="event-date">
                        12/06/24 - 19/06/24
                    </div>
                    <div className="event-description">
            <p className="description-title">Berhane Mewa who is a former graduate of Poly-Technic Institute Poly-Technic Institute in the 60s and president of Addis Chamber of Commerce in the 90s will deliver his public</p>
                <div className="description-text">
                    <p className="event-text">Berhane Mewa who is a former graduate of Poly-Technic Institute in the 60s and president of Addis Chamber of Commerce in the 90s will deliver his public speech on title indicated below on 4th of December, 2022 at BIT's Washera hall Commerce in the 90s will deliver his public speech on title indicated below on 4th of December, 2022 at BIT's Washera hall Commerce in the 90s will deliver his public speech on title indicated below on 4th of December, 2022 at BIT's Washera hall</p>
                    
                </div>
        </div>
        <div className="separetor"></div>
        <img src={newsimg} alt="" className="events-img" />
        
        
        </div> 
    </div>
  )
}

export default Events