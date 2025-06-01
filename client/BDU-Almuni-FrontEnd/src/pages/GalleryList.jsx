import { useState, useEffect, useRef } from "react";
import Batches from "./Batches";
import "../styles/AdminGallery.css";

const GalleryList = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(""); // Store the selected year
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility
  const dropdownRef = useRef(null);

  const updateCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/gallery`
      );
      const data = await response.json();

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
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/gallery`
        );
        const data = await response.json();

        const sortedData = data.sort((a, b) => b.year - a.year);

        const uniqueYears = [...new Set(sortedData.map((item) => item.year))];

        setYears(uniqueYears);
        setFilteredBatches(uniqueYears.map((year) => ({ id: year, year })));
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setIsDropdownOpen(true);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setFilteredBatches(
      years
        .filter((yearItem) => yearItem.toString().includes(year))
        .map((year) => ({ id: year, year }))
    );
    setIsDropdownOpen(false);
  };

  return (
    <div className="admin-gallery">
      <div
        className="admin-galleryContainers galleryContainer"
        style={{ position: "fixed", top: "50px" }}
      >
        <h3 style={{ marginLeft: "100px", width: "100%" }}>
          Bahir Dar University Alumni Gallery
        </h3>

        <div className="dropdown-container" ref={dropdownRef}>
          <input
            type="text"
            className="search Search"
            placeholder="Select Year"
            value={selectedYear}
            onFocus={handleSearchClick}
            readOnly
            style={{ marginLeft: "650px" }}
          />
          {isDropdownOpen && (
            <div className="dropdown">
              {years.map((year) => (
                <div
                  key={year}
                  className="dropdown-item"
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Batches
        batchData={filteredBatches}
        updateCategories={updateCategories}
        years={years}
        setYears={setYears}
        setFilteredBatches={setFilteredBatches}
      />
    </div>
  );
};

export default GalleryList;
