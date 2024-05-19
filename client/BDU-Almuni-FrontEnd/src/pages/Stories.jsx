import { FaArrowRight } from "react-icons/fa";
import newsimg from '../assets/images/photo_2024-02-25_23-41-53.jpg';
import "../styles/stories.css"
const Stories = () => {
  return (
    <>
    <div className="stories-container">
        <div className="each-story">
                <img className="story-img"src={newsimg} alt="" />
            <div className="story-description-container">
                <p className="story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
        <div className="each-story">
                <img className="story-img"src={newsimg} alt="" />
            <div className="story-description-container">
                <p className="story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="story-readmore">
                    Read more <FaArrowRight />
                </p>
            </div>
        </div>
        <div className="each-story">
                <img className="story-img"src={newsimg} alt="" />
            <div className="story-description-container">
                <p className="story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
    </div>
    <div className="events">
      <div className="circle-bg"></div>
      <div className="the-line"></div>
      <div className="line-cover"></div>
      <p className="event-title">
        EVENTS
      </p>
      </div>
    </>
  )
}

export default Stories