import i1 from '../assets/i1.jpg';
import '../styles/Events.css';

const Events = () => {
  return (
    <div>
        <div className="eventnUTitle">
          <div className="circle-bg"></div>
          <p><span className='blue-text'>Events    </span></p>
        </div>
    <div className="event-container body">
      <div>
        <h1 className="events-heading">
          upcoming <span className="span">events</span>
        </h1>
      </div>

        <div className="e-container" >
          <div className="event-container-img">
            <img src={i1} alt="" />
          </div>
          <div className="event-description">
            <p className="event-description-title">lorem ipsum</p>
            <p className="event-description-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nihil ipsam voluptatum placeat similique deserunt corrupti doloribus, maxime perferendis perspiciatis.</p>
          </div>
          <div className="vert" />
          <div className="event-date">
            <p>
             Mar - Apr
            </p>
            <div className="eventdate-p">
            <p className="date">
              12-13-15
            </p>
            <p className="date">
              12-14-15
            </p>
            </div>
          </div>
        </div>


        <div className="e-container2" >
          <div className="event-container-img">
            <img src={i1} alt="" />
          </div>
          <div className="event-description">
            <p className="event-description-title">lorem ipsum</p>
            <p className="event-description-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nihil ipsam voluptatum placeat similique deserunt corrupti doloribus, maxime perferendis perspiciatis.</p>
          </div>
          <div className="vert" />
          <div className="event-date">
            <p>
             Mar - Apr
            </p>
            <div className="eventdate-p">
            <p className="date">
              12-13-15
            </p>
            <p className="date">
              12-14-15
            </p>
            </div>
          </div>
        </div>


        <div className="e-container" >
          <div className="event-container-img">
            <img src={i1} alt="" />
          </div>
          <div className="event-description">
            <p className="event-description-title">lorem ipsum</p>
            <p className="event-description-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nihil ipsam voluptatum placeat similique deserunt corrupti doloribus, maxime perferendis perspiciatis.</p>
          </div>
          <div className="vert" />
          <div className="event-date">
            <p>
             Mar - Apr
            </p>
            <div className="eventdate-p">
            <p className="date">
              12-13-15
            </p>
            <p className="date">
              12-14-15
            </p>
            </div>
          </div>
        </div>

        <div className="e-container2" >
          <div className="event-container-img">
            <img src={i1} alt="" />
          </div>
          <div className="event-description">
            <p className="event-description-title">lorem ipsum</p>
            <p className="event-description-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nihil ipsam voluptatum placeat similique deserunt corrupti doloribus, maxime perferendis perspiciatis.</p>
          </div>
          <div className="vert" />
          <div className="event-date">
            <p>
             Mar - Apr
            </p>
            <div className="eventdate-p">
            <p className="date">
              12-13-15
            </p>
            <p className="date">
              12-14-15
            </p>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Events