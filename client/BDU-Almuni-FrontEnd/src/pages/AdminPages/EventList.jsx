import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from '../../component/DeleteConfirmation'
const EventList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationEventId, setDeleteConfirmationEventId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationEventId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/adminEvents`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }

      const eventData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      eventData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(eventData);
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
        `${process.env.REACT_APP_BACKEND_URL}/adminEvents/${deleteConfirmationEventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }

      setData(data.filter((item) => item.eventId !== deleteConfirmationEventId));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationEventId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationEventId(null);
  };

  const handleEdit = (eventId) => {
    // Render the EditEvent component with the onUpdate callback
   navigate(`/admin/adminEvents/${eventId}`);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const getRowId = (row) => row.eventId; // Specify the custom ID field

  const columns = [
    { field: "eventId", headerName: "ID", width: 90 },
    { field: "title", headerName: "Event Title", width: 100 },
    { field: "organizer", headerName: "Organizer", width: 100 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 100 },
    { field: "actions", headerName: "Actions", width: 100 },
    {
      renderCell: (params) => (
        <>
          <DeleteOutline
            key={`delete-${params.row.eventId}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.eventId)}
          />
          <Edit
            key={`edit-${params.row.eventId}`}
            className="eventListEdit"
            onClick={() => handleEdit(params.row.eventId)}
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
        <h3> Bahir Dar STEM Center Alumni Events </h3>
        <Link to="/admin/AddEvent">
          <button className="addEvent">+ Add Event</button>
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
                  text="event"  // You can customize this text based on your needs
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

export default EventList;
