import React, { useState, useEffect } from 'react';
import '../../styles/stories.css';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/addedPosts`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch stories. Status: ${response.status}`);
        }
        const storiesData = await response.json();
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (storyId, currentStatus) => {
    const updatedStories = stories.map(story =>
      story.id === storyId ? { ...story, suggestToAdmin: !currentStatus } : story
    );
    setStories(updatedStories);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/addedPosts/${storyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ suggestToAdmin: !currentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update story. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating story:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='suggested-story-container'>
      <div className="storyHeader">
        <h1 className="suggestedstoryHeader">Bahir Dar University Alumni Stories</h1>
        <Link to='/admin/addedStories'>
          <button className='accepted-stories'>Added Stories</button>
        </Link>
      </div>
      <section className="Suggestedstory">
        {stories.length === 0 ? (
          <div className="no-storys">
            <p>No suggested stories at the moment.</p>
          </div>
        ) : (
          <div className='each-suggested-storyContainer'>
            {stories.map(story => (
              <div key={story.alumniID} className='each-suggested-story'>
                <img src={story.mediaPath} alt={story.content} />
                <div>
                  <Switch
                    className='storySwitch'
                    {...label}
                    checked={story.suggestToAdmin}
                    onChange={() => handleToggle(story.alumniID, story.suggestToAdmin)}
                  />
                </div>
                <p>{story.content}</p>
                <p>{story.location}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Stories;
