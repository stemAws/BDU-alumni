// import '../../styles/AdminGallery.css'
// import { Link } from "react-router-dom";

// const AGallery = () => {
//   return (
//     <div className='G-container'>
//         <div className="SuggestedJobheader">
//         <h3> Gallery </h3>
//         <Link to="/admin/Addgallery">
//           <button className="addJob"> Add Gallery</button>
//         </Link>
//       </div>
//         AGallery

//         </div>
//   )
// }

// export default AGallery

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../component/DeleteConfirmation";
import Category from "./Category";
import "../../styles/AdminGallery.css";

const Gallery = ({
  batch,
  updateCategories,
  years,
  setYears,
  setFilteredBatches,
}) => {
  const navigate = useNavigate();
  const [editCategory, setEditCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleEditCategory = (category, e) => {
    e.stopPropagation();
    setEditCategory(category);
    navigate(`/admin/edit-gallery/${category.galleryID}`);
  };

  const handleDeleteCategory = (categoryID, e) => {
    e.stopPropagation();
    setCategoryToDelete(categoryID);
    setShowDeleteConfirmation(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      const fetchData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/gallery`
          );
          const data = await response.json();

          const filteredCategories = data.filter(
            (category) => category.year === batch.year
          );

          setCategories(filteredCategories);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    };
  }, [
    batch.year,
    updateCategories.currentIndex,
    selectedImage,
    selectedCategory,
  ]);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/gallery/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedCategories = categories.filter(
        (category) => category.galleryID !== categoryToDelete
      );
      setCategories(updatedCategories);
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryToDelete)
      );

      if (selectedCategory !== null) {
        const categoriesInBatch = updatedCategories.filter(
          (category) => category.year === selectedCategory.year
        );

        if (categoriesInBatch.length === 1) {
          const deletedYear = selectedCategory.year;

          await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/gallery/galleryID?year=${deletedYear}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const updatedYears = years.filter((year) => year !== deletedYear);
          setYears(updatedYears);
          setFilteredBatches(updatedYears.map((year) => ({ id: year, year })));
        }
      }

      setSelectedCategory(null);
      setShowDeleteConfirmation(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);

    navigate(`/admin/gallery/${category.galleryID}`);
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
    if (event.key === "Escape") {
      if (selectedImage) {
        setSelectedImage(null);
      } else if (selectedCategory) {
        handleEscapeKey();
      }
    }
    if (event.key === "ArrowLeft" && selectedCategory) {
      navigateImage("prev");
    } else if (event.key === "ArrowRight" && selectedCategory) {
      navigateImage("next");
    }
  };

  const navigateImage = (direction) => {
    const currentIndex = selectedCategory.images.findIndex(
      (img) => img === selectedImage
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    } else if (direction === "next") {
      newIndex =
        currentIndex === selectedCategory.images.length - 1
          ? currentIndex
          : currentIndex + 1;
    }

    setSelectedImage(selectedCategory.images[newIndex]);
  };

  return (
    <div className="Admingallerycont">
      <div>
        {/* <p>class of 2023</p> */}
        <h1 className="batch-header">Class of {batch.year}</h1>
      </div>
      {!selectedCategory && (
        <div className="admin-cat-container">
          {categories &&
            categories.map((category) => (
              <div
                className="Admin-gallery"
                key={category.galleryID}
                onClick={() => handleCategoryClick(category)}
              >
                {category.images && category.images.length > 0 ? (
                  <img src={category.images[0]} alt={category.event} />
                ) : null}
                <h2 style={{ color: "#000000", fontSize: "18" }}>
                  {category.event}
                </h2>
                <DeleteOutline
                  className="deletegal"
                  onClick={(e) => handleDeleteCategory(category.galleryID, e)}
                />
                <Link to={`/admin/edit-gallery/${category.galleryID}`}>
                  <Edit
                    className="editEdit"
                    onClick={(e) => handleEditCategory(category, e)}
                  />
                </Link>
              </div>
            ))}
        </div>
      )}
      <div className="line"></div>
      {selectedCategory && !selectedImage && (
        <div className="admin-selected-category">
          <div className="close-icon" onClick={handleCloseCategory}>
            <FontAwesomeIcon
              icon={faTimes}
              size="1x"
              style={{ background: "rgba(0, 0, 0, 0.9)" }}
            />
          </div>
          <div className="image-grid">
            {selectedCategory.images && selectedCategory.images.length > 0
              ? selectedCategory.images.map((image, index) => (
                  <div key={index} className="image-wrapper">
                    <img
                      src={image}
                      alt={image}
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
                ))
              : null}
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
          <img src={selectedImage} alt={selectedImage} className="full-image" />
        </div>
      )}

      {selectedCategory && !selectedImage && (
        <Category category={selectedCategory} />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          close={() => setShowDeleteConfirmation(false)}
          text="category"
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Gallery;
