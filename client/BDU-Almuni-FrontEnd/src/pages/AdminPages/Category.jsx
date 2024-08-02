import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = ({ galleryID }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('galleryID from URL:', galleryID);
      try {
        if (galleryID) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/gallery/${galleryID}`
          );
          const data = await response.json();
          console.log('Fetched category data:', data);
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
