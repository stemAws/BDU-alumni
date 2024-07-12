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
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/gallery`);
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
  }, [batch.year, updateCategories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedMedia(null);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
    setSelectedCategory(null);
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const navigateMedia = (direction) => {
    if (!selectedCategory) return;

    const currentIndex = selectedCategory.media.findIndex(
      (item) => item === selectedMedia
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    } else if (direction === "next") {
      newIndex =
        currentIndex === selectedCategory.media.length - 1
          ? currentIndex
          : currentIndex + 1;
    }

    setSelectedMedia(selectedCategory.media[newIndex]);
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
              {category.media.length > 0 && (
                <div className="media-preview">
                  {category.media[0].type.startsWith("image") && (
                    <img
                      src={category.media[0].url}
                      alt={category.event}
                      className="preview-image"
                    />
                  )}
                  {category.media[0].type.startsWith("audio") && (
                    <audio controls className="preview-audio">
                      <source src={category.media[0].url} type={category.media[0].type} />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {category.media[0].type.startsWith("video") && (
                    <video controls className="preview-video">
                      <source src={category.media[0].url} type={category.media[0].type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              <h2 style={{ color: "#000000", fontSize: "18" }}>
                {category.event}
              </h2>
            </div>
          ))}
        </div>
      )}
      <div className="line"></div>

      {selectedCategory && !selectedMedia && (
        <div className="selected-category">
          <div className="close-icon" onClick={handleCloseMedia}>
            <FontAwesomeIcon
              icon={faTimes}
              size="1x"
              style={{ background: "rgba(0, 0, 0, 0.9)" }}
            />
          </div>
          <div className="media-grid">
            {selectedCategory.media.map((media, index) => (
              <div key={index} className="media-wrapper">
                {media.type.startsWith("image") && (
                  <img
                    src={media.url}
                    alt={media.url}
                    onClick={() => handleMediaClick(media)}
                  />
                )}
                {media.type.startsWith("audio") && (
                  <div className="audio-container">
                    <audio controls>
                      <source src={media.url} type={media.type} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {media.type.startsWith("video") && (
                  <div className="video-container">
                    <video controls>
                      <source src={media.url} type={media.type} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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

      <Batches batchData={filteredBatches} updateCategories={() => {}} />
    </div>
  );
};

export default App;
