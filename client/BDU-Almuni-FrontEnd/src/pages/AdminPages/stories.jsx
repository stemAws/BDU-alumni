import React, { useState, useEffect } from "react";
import "../../styles/stories.css";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FeaturedStories = () => {

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/addedStories");
  };

  const handleAccept = async (postId, event) => {
    try {
      event.preventDefault();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-post`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ suggestedByAdmin: 1 }),
        }
      );

      const data = await response.json();
      setStories((prevStories) =>
        prevStories.filter((story) => story.postID !== postId)
      );
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error("Error updating post:", data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDecline = async (postId, event) => {
    try {
      event.preventDefault(); // Prevent the default form submission behavior

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ suggestedByAdmin: 0}),
        }
      );

      const data = await response.json();
      setStories((prevStories) =>
        prevStories.filter((story) => story.postID !== postId)
      );
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error("Error updating post:", data.message);
        // Handle the error, such as displaying an error message to the user
      }
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle network errors or other unexpected issues
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/suggested-to-admin`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="Story">
      <div className="admin-story-header">
      <h1 className="headerstory"> Bahir Dar STEM Center Alumni Stories</h1>
      <Link to='/admin/addedStories'>
        <button className="accepted-stories" onClick={handleClick}>Added Stories</button>
      </Link>
      
      </div>
      
      <div className="FeaturedStories">
        {loading ? (
          <p>Loading...</p>
        ) : stories.length === 0 ? (
          <p className="noStories">No stories suggested</p>
        ) : (
          stories.map((story, index) => (
            <div className="FeaturedStories-container" key={index}>
              <div>
                <img
                  src={story.image}
                  alt=""
                />
                <p className="story_p_admin">{story.content}</p>
              </div>
              <div className="accept-decline-btn">
              <button
                className="accept"
                onClick={(event) => handleAccept(story.postID, event)}
              >
                Accept
              </button>
              <button
                className="decline-decline "
                onClick={(event) => handleDecline(story.postID, event)}
              >
                Decline
              </button>
              </div>
              
            </div>
          ))
        )}
      </div>
      
      </div>
  );
};

export default FeaturedStories;
