import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id: galleryID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if galleryID is available before making the API call
        if (galleryID) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/gallery/${galleryID}`
          );
          const data = await response.json();

          setCategory(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [galleryID]);

  return (
    <div>
      {category ? (
        <>
          <h2>{category.event}</h2>
          <div>
            {/* Render media for the selected category */}
            {category.media &&
              category.media.map((mediaItem, index) => {
                if (mediaItem.type === "image") {
                  return (
                    <img
                      key={index}
                      src={mediaItem.url}
                      alt={`Event ${category.event}, Image ${index}`}
                    />
                  );
                } else if (mediaItem.type === "video") {
                  return (
                    <video key={index} controls>
                      <source src={mediaItem.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                } else if (mediaItem.type === "audio") {
                  return (
                    <audio key={index} controls>
                      <source src={mediaItem.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  );
                }
                return null;
              })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Category;
