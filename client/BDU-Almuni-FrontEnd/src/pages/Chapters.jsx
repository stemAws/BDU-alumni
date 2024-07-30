import React, { useEffect, useState } from 'react';
import '../styles/Chapters.css';

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/list-chapters`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='chapters-container'>
      <div className="chapters-title">
        <div className="circle-bg"></div>
        <p><span className='blue-text'>Chapters</span></p>
      </div>
      <div className='circle-bg3'/>
      <div className='circle-bg4'/>
      <div className='circle-bg5'/>
      <div className='ind-chapters-cont'>
        {chapters.length === 0 ? (
          <div className='no-chapters'>
            <p>No chapters posted</p>
          </div>
        ) : (
          chapters.map((chapter, index) => (
            <div key={index} className='ind-chapters'>
              <h4>{chapter.title}</h4>
              <p>{chapter.description}</p>
              <div><button>JOIN</button></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chapters;
