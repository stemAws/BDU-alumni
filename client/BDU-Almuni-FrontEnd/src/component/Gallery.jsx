
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/Gallery.css";

import Category from "./Category";

const Gallery = ({ batch, updateCategories }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  
  useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        const data = await response.json();

        // Filter categories based on the batch year
        const filteredCategories = data.filter(
          (category) => category.year === batch.year
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }
  }, [batch.year, updateCategories.currentIndex, selectedImage, selectedCategory ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleEscapeKey = () => {
    setSelectedImage(null);
    setSelectedCategory(null);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (selectedImage) {
        setSelectedImage(null);
      } else if (selectedCategory) {
        handleEscapeKey();
      }
    }
    if (event.key === 'ArrowLeft' && selectedCategory) {
      navigateImage("prev");
    } else if (event.key === 'ArrowRight' && selectedCategory) {
      navigateImage("next");
    }
  };  
  

  const navigateImage = (direction) => {
    const currentIndex = selectedCategory.images.findIndex(
      (img) => img === selectedImage
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? 0 : currentIndex - 1;
    } else if (direction === "next") {
      newIndex =
        currentIndex === selectedCategory.images.length - 1
        ? currentIndex
        : currentIndex + 1;
    }

    setSelectedImage(selectedCategory.images[newIndex]);
  };

  return (
    <div>
      <div>
        <h1 className="batch-header">{`Class of ${batch.year}`}</h1>
      </div>
      {!selectedCategory && (
        <div className="cat-container">
          {categories.map((category) => (
            <div
              className="gallery"
              key={category.galleryID}
              onClick={() => handleCategoryClick(category)}
            >
              {category.images.length > 0 && (
                <img
                  src={category.images[0]}
                  alt={category.event}
                />
              )}
              <h2 style={{ color: "#000000", fontSize: "18" }}>
                {category.event}
              </h2>
            </div>
          ))}
        </div>
      )}
      <div className="line"></div>

      {selectedCategory && !selectedImage && (
        <div className="selected-category">
          <div className="close-icon" onClick={handleCloseCategory}>
            <FontAwesomeIcon
              icon={faTimes}
              size="1x"
              style={{ background: "rgba(0, 0, 0, 0.9)" }}
            />
          </div>
          <div className="image-grid">
            {selectedCategory.images.map((image, index) => (
              <div key={index} className="image-wrapper">
                <img
                  src={image}
                  alt={image}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedImage && (
        <div className="individual-image">
          <FontAwesomeIcon
            icon={faTimes}
            size="1x"
            className="close-icon"
            onClick={handleCloseImage}
          />
          <div className="navigation">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="arrow-icon-left"
              onClick={() => navigateImage("prev")}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              className="arrow-icon-right"
              onClick={() => navigateImage("next")}
            />
          </div>
          <img
            src={selectedImage}
            alt={selectedImage}
            className="full-image"
          />
        </div>
      )}

      {selectedCategory && !selectedImage && (
        <Category category={selectedCategory} />
      )}
    </div>
  );
};

const Batches = ({ batchData, updateCategories }) => {
  return (
    <div>
      {batchData.map((batch) => (
        <Gallery
          key={batch.id}
          batch={batch}
          updateCategories={updateCategories}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [years, setYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBatches, setFilteredBatches] = useState([]);

  const updateCategories = async (year) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
      const data = await response.json();

      // Sort the data by year in descending order
      const sortedData = data.sort((a, b) => b.year - a.year);

      setYears(sortedData.map((item) => item.year));
      setFilteredBatches(
        sortedData.map((item) => ({ id: item.year, year: item.year }))
      );
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        const data = await response.json();

        // Sort the data by year in descending order
        const sortedData = data.sort((a, b) => b.year - a.year);

        // Extract unique years from the sorted data
        const uniqueYears = [...new Set(sortedData.map((item) => item.year))];

        setYears(uniqueYears);
        setFilteredBatches(uniqueYears.map((year) => ({ id: year, year })));
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = years.filter((year) => year.toString().includes(term));
    setFilteredBatches(filtered.map((year) => ({ id: year, year })));
  };

  return (
    <div className="body">
      <div className="gallery-header">
        <h1>Our stories through the lens of time</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search by year"
        value={searchTerm}
        onChange={handleSearch}
      />

      <Batches
        batchData={filteredBatches}
        updateCategories={updateCategories}
      />
    </div>
  );
};
export default App;