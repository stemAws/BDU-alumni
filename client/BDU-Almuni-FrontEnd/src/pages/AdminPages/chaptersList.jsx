import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from '../../component/DeleteConfirmation';

const chapterList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationChapterId, setDeleteConfirmationChapterId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationChapterId(id);
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
        throw new Error(`Failed to fetch chapters. Status: ${response.status}`);
      }

      const chaptersData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      chaptersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Only keep the necessary fields
      const formattedData = chaptersData.map(({ chapterId, chapterName, description, website }) => ({
        chapterId,
        chapterName,
        description,
        website,
      }));

      setData(formattedData);
      
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
          item.chapterName &&
          item.chapterName.toLowerCase().includes(searchQuery.toLowerCase())
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
        `${import.meta.env.VITE_BACKEND_URL}/delete-chapter/${deleteConfirmationChapterId}`,
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

      setData(data.filter((item) => item.chapterId !== deleteConfirmationChapterId));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationChapterId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationChapterId(null);
  };

  const handleEdit = (chapterId) => {
    navigate(`/admin/News/${chapterId}`);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const getRowId = (row) => row.chapterId;

  const columns = [
    { field: "chapterId", headerName: "ID", width: 90 },
    { field: "chapterName", headerName: "Club Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "website", headerName: "Link", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
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
            placeholder="Search by chapter name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h3>Bahir Dar University Alumni Clubs</h3>
          <Link to="/admin/AddChapter">
            <button className="addEvent">+ Add Chapter</button>
          </Link>
        </div>
        <div className="listContainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <DataGrid rows={filteredData} columns={columns} getRowId={getRowId} />
              {isDeleteConfirmationOpen && (
                <DeleteConfirmation
                  close={handleCancelDelete}
                  text="Chapter"
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

export default chapterList;
