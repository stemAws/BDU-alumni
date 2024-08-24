import { useState, useEffect } from "react";
import Batches from "./Batches";
import "../styles/AdminGallery.css";

const GalleryList = () => {
  const [years, setYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBatches, setFilteredBatches] = useState([]);

  const updateCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/gallery`
      );
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
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = years.filter((year) => year.toString().includes(term));
    setFilteredBatches(filtered.map((year) => ({ id: year, year })));
  };

  return (
    <div className="admin-gallery">
      <div className="admin-galleryContainers galleryContainer">
       
        <h3> Bahir Dar University Alumni Gallery </h3>
      </div>
       <input
          className="search Search"
          type="text"
          placeholder="Search by year"
          value={searchTerm}
          onChange={handleSearch}
        />
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
