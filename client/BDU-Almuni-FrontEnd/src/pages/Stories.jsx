import { FaArrowRight } from "react-icons/fa";
import newsimg from '../assets/images/photo_2024-02-25_16-12-11.jpg';
import newsimg1 from '../assets/images/photo_2024-02-25_15-48-12.jpg';
import newsimg2 from '../assets/images/photo_2024-02-25_15-47-18.jpg';
import { useInView } from 'react-intersection-observer';
import "../styles/stories.css"
import { useEffect, useState } from "react";
import MultiStories from "../component/MultiStories";
const Stories = () => {
        
    
  // const [exitingView, setExitingView] = useState(false);
  const [stories, setstories] = useState([{
    img:`..${newsimg}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsam perspiciatis enim ullam, repudiandae sint deserunt molestias assumenda tenetur, in amet nihil laboriosam molestiae placeat distinctio nam nemo eaque soluta"
  },
  {
    img:`..${newsimg1}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsam perspiciatis enim ullam, repudiandae sint deserunt molestias assumenda tenetur, in amet nihil laboriosam molestiae placeat distinctio nam nemo eaque soluta"
  },
  {
    img:`..${newsimg2}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsam perspiciatis enim ullam, repudiandae sint deserunt molestias assumenda tenetur, in amet nihil laboriosam molestiae placeat distinctio nam nemo eaque soluta"
  },
  {
    img:`..${newsimg}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsam perspiciatis enim ullam, repudiandae sint deserunt molestias assumenda tenetur, in amet nihil laboriosam molestiae placeat distinctio nam nemo eaque soluta"
  }])
  useEffect(() => {
    const fetchEvents=async()=>{
      try {
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/addedPosts`,{
            credentials: 'include',
          })
          const featuredStoriesFromServer= await res.json()
          if (!res.ok) {
            console.error("couldn't fetch the stories")
          }
          else{
            setstories(featuredStoriesFromServer)
      }} catch (error) {
        console.error("couldn't fetch the stories",error)
        
      }
    }
    fetchEvents();
  }, [])
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
    <div className="stories">
    <div className="top-stories ">
      {/* <div  ref={ref} className={`circle-bg ${inView ? 'wide' : exitingView ? 'return' : ''}`} /> */}
      <div className="the-line"></div>
      <div className="line-cover"></div>
      <p className="top-stories-title">
        <span className="blue-text">TOP</span>STORIES
      </p>
      </div>
    <div className="stories-container">
        {
          <MultiStories stories={stories} />
        }
    </div>
    </div>
  )
}

export default Stories