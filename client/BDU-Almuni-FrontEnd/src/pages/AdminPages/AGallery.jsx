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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");


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
    };
  }, []);

  useEffect(() => {
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
  }, [batch.year, updateCategories.currentIndex]);

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
    setCategoryDescription(category.description); 
    setCategoryTitle(category.event)
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setShowImageOverlay(true);
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseImageOverlay();
    } else if (event.key === "ArrowRight") {
      handleNextImage();
    } else if (event.key === "ArrowLeft") {
      handlePrevImage();
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < selectedCategory.images.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(selectedCategory.images[newIndex]);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(selectedCategory.images[newIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, selectedCategory]);

  return (
    <div className="Admingallerycont">
      <div>
        <h1 className="batch-header">Class of {batch.year}</h1>
      </div>
      {!selectedCategory && (
        <div className="admin-cat-container">
          {categories &&
            categories.map((category) => (
              <div className="edit-cont" key={category.galleryID}>
                <div
                  className="Admin-gallery"
                  key={category.galleryID}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.images && category.images.length > 0 ? (
                    <img src={category.images[0]} alt={category.description} />
                  ) : null}
                  <div className="gallery-overlay">
                    <h2>{category.description}</h2>
                  </div>
                </div>

                <div className="gallery-title">
                  <h2>{category.event}</h2>
                </div>

                <div className="edit-del-cont">
                  <DeleteOutline
                    className="deletegal"
                    onClick={(e) => handleDeleteCategory(category.galleryID, e)}
                  />
                  <Link
                    className=""
                    to={`/admin/edit-gallery/${category.galleryID}`}
                  >
                    <Edit
                      className="editEdit"
                      onClick={(e) => handleEditCategory(category, e)}
                    />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="line"></div>
      {selectedCategory && (
        <div className="admin-selected-category">
          <div className="close-icon" onClick={handleCloseCategory}>
            <FontAwesomeIcon
              icon={faTimes}
              size="1x"
              style={{ background: "rgba(0, 0, 0, 0.9)" }}
            />
          </div>
          <div className="category-title">
            <h2>{categoryTitle}</h2>
          </div>
          <div className="category-description">
            <h2>{categoryDescription}</h2>
          </div>
          <div className="image-grid">
            {selectedCategory.images.map((image, index) => (
              <div
                className="image-wrapper"
                key={index}
                onClick={() => handleImageClick(image, index)}
              >
                <img src={image} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmation
          close={() => setShowDeleteConfirmation(false)}
          text="category"
          onDelete={handleConfirmDelete}
        />
      )}
      {showImageOverlay && selectedImage && (
        <div className="individual-image">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            className="arrow-icon-left"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          />
          <img src={selectedImage} alt="Selected" className="full-image" />
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            color="white"
            className="arrow-icon-right"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          />
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            className="close-icon"
            onClick={handleCloseImageOverlay}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
