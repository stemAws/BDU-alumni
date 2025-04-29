import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Batches from "./Batches";
import "../../styles/AdminGallery.css";

const GalleryList = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const updateCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/gallery`,
        { credentials: "include" }
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
          `${import.meta.env.VITE_BACKEND_URL}/gallery`,
          { credentials: "include" }
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/AddGallery");
  };

  return (
    <div className="admin-gallery" style={{ padding: 0, marginTop: 0 }}>
      {/* Header Row */}
      <div className="aadmin-gallery-header">
        <div className="header-left">
          <div className="adropdown-container" ref={dropdownRef}>
            <input
              type="text"
              className="asearch"
              placeholder="Select Year"
              value={selectedYear}
              onFocus={handleSearchClick}
              readOnly
            />
            {isDropdownOpen && (
              <div className="adropdown">
                {years.map((year) => (
                  <div
                    key={year}
                    className="adropdown-item"
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="header-center">
          <h3>Bahir Dar University Alumni Gallery</h3>
        </div>

        <div className="header-right">
          <Link to="/admin/AddGallery">
            <button className="aaddGallery" onClick={handleClick}>
              + Add Gallery
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
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
