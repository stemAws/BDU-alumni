import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id: galleryID } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Check if galleryID is available before making the API call
  //       if (galleryID) {
  //         const response = await fetch(
  //           `${process.env.REACT_APP_BACKEND_URL}/gallery/${galleryID}`
  //         );
  //         const data = await response.json();

  //         setCategory(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [galleryID]);

  return (
    <div>
      {category ? (
        <>
          <h2>{category.event}</h2>
          <div>
            {/* Render images for the selected category */}
            {category.images &&
              category.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event ${category.event}, Image ${index}`}
                />
              ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Category;
