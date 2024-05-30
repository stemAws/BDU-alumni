import { FaArrowRight } from "react-icons/fa";
import newsimg from '../../assets/images/photo_2024-02-25_16-12-11.jpg';
import newsimg1 from '../../assets/images/photo_2024-02-25_15-48-12.jpg';
import newsimg2 from '../../assets/images/photo_2024-02-25_15-47-18.jpg';
import { useInView } from 'react-intersection-observer';
import "../../styles/AStories.css"
import { useState } from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Stories = () => {
        
    const navigate = useNavigate();
  const [exitingView, setExitingView] = useState(false);
  const handleClick = () => {
    navigate("/admin/addedStories");
  };
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
    {/* <div className="top-Admin-">
      <div  ref={ref} className={`circle-bg ${inView ? 'wide' : exitingView ? 'return' : ''}`} ></div>
      <div className="the-line"></div>
      <div className="line-cover"></div>
      <p className="top-Admin--title">
        <span className="blue-text">TOP</span>STORIES
      </p>
      </div> */}
     
      
    <div className="Admin-stories-container">
    <div className="admin-story-header">
      <h1 className="headerstory"> Bahir Dar STEM Center Alumni Stories</h1>
      <Link to='/admin/addedStories'>
        <button className="accepted-stories" onClick={handleClick}>Added Stories</button>
      </Link>
      </div>
      <div className="Each-storyCont">
        <div className="Admin-each-story">
                <img className="Admin-story-img"src={newsimg2} alt="" />
            <div className="Admin-story-description-container">
                <p className="Admin-story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="Admin-story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
        <div className="Admin-each-story">
                <img className="Admin-story-img"src={newsimg} alt="" />
            <div className="Admin-story-description-container">
                <p className="Admin-story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="Admin-story-readmore">
                    Read more <FaArrowRight />
                </p>
            </div>
        </div>
        <div className="Admin-each-story">
                <img className="Admin-story-img"src={newsimg1} alt="" />
            <div className="Admin-story-description-container">
                <p className="Admin-story-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quibusdam est repudiandae eius iste laboriosam...</p>
                <p className="Admin-story-readmore">
                    Read more <FaArrowRight/>
                </p>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Stories