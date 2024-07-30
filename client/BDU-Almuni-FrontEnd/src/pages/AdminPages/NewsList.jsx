import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from '../../component/DeleteConfirmation';

const NewsList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationNewsId, setDeleteConfirmationNewsId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationNewsId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/all-news`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch news. Status: ${response.status}`);
      }

      const newsData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      newsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(newsData);
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
        `${import.meta.env.VITE_BACKEND_URL}/delete-news/${deleteConfirmationNewsId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete News. Status: ${response.status}`);
      }

      setData(data.filter((item) => item.newsId !== deleteConfirmationNewsId));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationNewsId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationNewsId(null);
  };

  const handleEdit = (newsId) => {
    // console.log(`Navigating to News/${newsId}`);
    navigate(`edit-news/${newsId}`);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const getRowId = (row) => row.newsId;

  const columns = [
    { field: "newsId", headerName: "ID", width: 90 },
    { field: "title", headerName: "News Title", width: 200 },
    { field: "content", headerName: "Content", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <DeleteOutline
            key={`delete-${params.row.newsId}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.newsId)}
          />
          <Edit
            key={`edit-${params.row.newsId}`}
            className="eventListEdit editIcon"
            onClick={() => handleEdit(params.row.newsId)}
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
            placeholder="Search by news title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h3>Bahir Dar University Alumni News</h3>
          <Link to="/admin/AddNews">
            <button className="addEvent">+ Add News</button>
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
                  text="News"
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

export default NewsList;
