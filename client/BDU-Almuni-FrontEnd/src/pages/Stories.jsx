import { FaArrowRight } from "react-icons/fa";
import newsimg from '../assets/images/photo_2024-02-25_16-12-11.jpg';
import newsimg1 from '../assets/images/photo_2024-02-25_15-48-12.jpg';
import newsimg2 from '../assets/images/photo_2024-02-25_15-47-18.jpg';
import { useInView } from 'react-intersection-observer';
import "../styles/stories.css"
import { useState } from "react";
const Stories = () => {
        
    
  const [exitingView, setExitingView] = useState(false);

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        setExitingView(true);
      } else {
        setExitingView(false);
      }
    });
  };
  const { ref, inView } = useInView({
          triggerOnce: true,
          threshold: 0.01,
          onChange:handleIntersection 
        });
  return (
    <>
    <div className="stories-container">
        <div className="each-story">
                <img className="story-img"src={newsimg2} alt="" />
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
                <img className="story-img"src={newsimg1} alt="" />
            <div className="story-description-container">
                <p className="story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
    </div>
    <div className="events">
      <div ref={ref} className={`circle-bg ${inView ? 'wide' : ''} ${exitingView ? 'return' : ''}`}  ></div>
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