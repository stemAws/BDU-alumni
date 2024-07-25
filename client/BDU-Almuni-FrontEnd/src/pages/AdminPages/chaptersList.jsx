import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from '../../component/DeleteConfirmation'

const chaptersList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationchapterId, setDeleteConfirmationchapterId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationchapterId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/list-chapters`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch chapter. Status: ${response.status}`);
      }

      const chapterData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      chapterData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(chapterData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterData = useCallback(() => {
    try {
      const filtered = data.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error("Error filtering data:", error);
      setFilteredData([]);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    // Update filtered data when the searchQuery changes
    filterData();
  }, [searchQuery, data, filterData]);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/list-chapters/${deleteConfirmationchapterId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete chapter. Status: ${response.status}`);
      }

      setData(data.filter((item) => item.chapterId !== deleteConfirmationchapterId));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationchapterId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationchapterId(null);
  };

  const handleEdit = (chapterId) => {
    // Render the EditEvent component with the onUpdate callback
   navigate(`/admin/chapters/${chapterId}`);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const getRowId = (row) => row.chapterId; // Specify the custom ID field

  const columns = [
    { field: "chapterId", headerName: "ID", width: 90 },
    { field: "title", headerName: "Chapter Title", width: 200 },
    { field: "discription", headerName: "discription", width: 500 },
    // { field: "startDate", headerName: "Start Date", width: 150 },
    // { field: "endDate", headerName: "End Date", width: 100 },
    { field: "actions", headerName: "Actions", width: 100 },
    {
      renderCell: (params) => (
        <>
          <DeleteOutline
            key={`delete-${params.row.chapterId}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.chapterId)}
          />
          <Edit
            key={`edit-${params.row.chapterId}`}
            className="eventListEdit"
            onClick={() => handleEdit(params.row.chapterId)}
          />
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
    <div className="eventlist">
      <div className="addEventheader">
        <input
          className="search"
          type="text"
          placeholder="Search by event title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h3> Bahir Dar University Alumni Chapters </h3>
        <Link to="/admin/AddChapter">
          <button className="addEvent">+ Add Chapters</button>
        </Link>
      </div>
      <div className="listCOntainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
              <DataGrid rows={filteredData} columns={columns} getRowId={getRowId} />
              {isDeleteConfirmationOpen && (
                <DeleteConfirmation
                  close={handleCancelDelete}
                  text="chapter"  // You can customize this text based on your needs
                  onDelete={handleConfirmDelete}
                />
              )}
            </>
      )}
      </div>
    </div>
    </ThemeProvider>
  );
};

export default chaptersList;
