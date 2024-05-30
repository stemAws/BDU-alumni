import { useState, useEffect } from 'react';
import Button from '../../component/Button';
import '../../styles/AddedStory.css';
import { ChevronLeft } from "@mui/icons-material";
// import { useHistory } from "react-router-dom";
import { Link } from "@mui/material";

const Stories = () => {
  const [showMore, setShowMore] = useState(false);
  const [stories, setStories] = useState([]);
  const [toggledStates, setToggledStates] = useState([]);

  // const history = useHistory();

  // const updatePostContent = async (postID) => {
  //   try {
  //     // Send PUT request to update the post content to null
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updatepost/${postID}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         content: null,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     // Remove the story from the frontend
  //     setStories((prevStories) => prevStories.filter((story) => story.postID !== postID));
  //   } catch (error) {
  //     console.error('Error updating post content:', error);
  //   }
  // };
  

  const handleToggle = async (index) => {
    const newToggledStates = [...toggledStates];
    newToggledStates[index] = !newToggledStates[index];
    setToggledStates(newToggledStates);
  
    if (!newToggledStates[index]) {
      // If toggle is turned off, update post content to null
      await updatePostContent(stories[index].postID);
    }
  };
  

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  // const handleClick = () => {
  //   history.push("/admin/story");
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addedPosts`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       const data = await response.json();  
  //       const initialToggledStates = Array(data.length).fill(true);

  //       setToggledStates(initialToggledStates);
  //       setStories(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);  

  const storiesToDisplay = showMore ? stories : stories.slice(0, 3);

  return (
      <div className='Admin-stories'>
        
        <Link to='/admin/story' className="userGoBack">
          < ChevronLeft className='userGoBackIcon' />
        </Link>
          <h1 className='Admin-stories_heading'>Stories</h1>
        <div className='Admin-ind-story'>
          {showMore
            ? storiesToDisplay.map((story, index) => (
                <div key={index} className='Admin-story-container'>
                  <div>
                    <img src={story.image} alt='' />
                    <p className='Admin-story_p'>{story.content}</p>
                  </div>
                  <div className={`slide-toggle-container ${toggledStates[index] ? 'toggled' : ''}`}>
                    <div className="slider" onClick={() => handleToggle(index)}></div>
                  </div>
                </div>
              ))
            : storiesToDisplay.map((story, index) => (
                <div key={index} className='Admin-story-container'>
                  <div>
                    <img src={story.image} alt='' />
                    <p className='Admin-story_p'>{story.content}</p>
                  </div>
                  {(index + 1) % 3 === 0 && <br />}
                  <div className='slider-container'>
                    <div className={`Admin-slide-toggle-container ${toggledStates[index] ? 'toggled' : ''}`}>
                      <div className="Admin-slider" onClick={() => handleToggle(index)}></div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className='Admin-btn_cont-btn'>
          {stories.length > 3 && (
            <div className='Admin-btn_cont-show_more'>
              <Button text={showMore ? 'Show Less' : 'Show More'} onClick={toggleShowMore} />
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Stories;

