import React, { useState, useEffect } from 'react';
import '../../styles/stories.css';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

// Import images
import bdu1 from '../../assets/bdu1.png';
import i1 from '../../assets/i1.jpg';
import peda from '../../assets/peda.jpg';
import poly from '../../assets/poly.png';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample data to simulate the response from the backend
    const sampleData = [
      { id: 1, image: bdu1, title: 'Music bdu1', description: 'Join us for a night of great music! Lorem ipsum dolor sit amet, consectetur adipisicing elit.Join us for a night of great music!Join us for a night of great music!Join us for a night of great music! Rerum unde sit aut accusantium asperiores mollitia culpa quos Join us for a night of great music! Lorem ipsum dolor sit amet, consectetur adipisicing elit.Join us for a night of great music!Join us for a night of great music!Join us for a night of great music! Rerum unde sit aut accusantium asperiores mollitia culpa quos corporis ipsam similique!', approved: true },
      { id: 2, image: i1, title: 'Hiking Trip', description: 'Explore the beautiful trails with us. Lorem ipsum dolor sit amet, consectetur Learn about the latest in peda. Lorem ipsum dolor Learn about the latest in peda. Lorem ipsum dolor Learn about the latest in peda. Lorem ipsum dolor adipisicing elit. Rerum unde sit aut accusantium asperiores mollitia culpa quos corporis ipsam similique!', approved: false },
      { id: 3, image: peda, title: 'peda Conference', description: 'Learn about the latest in peda. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum unde sit aut accusantium asperiores mollitia culpa quos corporis ipsam similique!', approved: true },
      { id: 4, image: poly, title: 'poly Exhibition', description: 'Experience Join us for a night of great music! Lorem ipsum dolor sit amet, consectetur adipisicing elit.Join us for a night of great music!Join us for a night of great music!Join us for a night of great music! Rerum unde sit aut accusantium asperiores mollitia culpa quosstunning polyworks.Join us for a night of great music!Lorem ipsum dolor sit amet, ', approved: false },
    ];

    setStories(sampleData);
    setLoading(false);
  }, []);

  const handleToggle = (storyId, currentStatus) => {
    const updatedStories = stories.map(story =>
      story.id === storyId ? { ...story, approved: !currentStatus } : story
    );
    setStories(updatedStories);
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
            <p>No suggested Stories at the moment.</p>
          </div>
        ) : (
          <div className='each-suggested-storyContainer'>
            {stories.map(story => (
              <div key={story.id} className='each-suggested-story'>
                <img src={story.image} alt={story.title} />
                <div>
                  <Switch
                    className='storySwitch'
                    {...label}
                    checked={story.approved}
                    onChange={() => handleToggle(story.id,story.approved)}
                  />
                </div>
                <p className='storytitle'>{story.title}</p>
                <p>{story.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Stories;
