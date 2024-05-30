import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DeleteConfirmation from '../../component/DeleteConfirmation';

const EventList = () => {

  const [data, setData] = useState([
    { eventId: 1, title: 'Event 1', organizer: 'Organizer 1', startDate: '2024-01-01', endDate: '2024-01-02' },
    { eventId: 2, title: 'Event 2', organizer: 'Organizer 2', startDate: '2024-02-01', endDate: '2024-02-02' },
    { eventId: 3, title: 'Event 3', organizer: 'Organizer 3', startDate: '2024-03-01', endDate: '2024-03-02' },
    { eventId: 4, title: 'Event 1', organizer: 'Organizer 1', startDate: '2024-01-01', endDate: '2024-01-02' },
    { eventId: 5, title: 'Event 2', organizer: 'Organizer 2', startDate: '2024-02-01', endDate: '2024-02-02' },
    { eventId: 6, title: 'Event 3', organizer: 'Organizer 3', startDate: '2024-03-01', endDate: '2024-03-02' },
    { eventId: 7, title: 'Event 1', organizer: 'Organizer 1', startDate: '2024-01-01', endDate: '2024-01-02' },
    { eventId: 8, title: 'Event 2', organizer: 'Organizer 2', startDate: '2024-02-01', endDate: '2024-02-02' },
    { eventId: 9, title: 'Event 3', organizer: 'Organizer 3', startDate: '2024-03-01', endDate: '2024-03-02' },
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationEventId, setDeleteConfirmationEventId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationEventId(id);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationEventId(null);
  };

  const handleEdit = (eventId) => {
    // Implement the logic to edit the event
    console.log(`Editing event with ID: ${eventId}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

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

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const getRowId = (row) => row.eventId; // Specify the custom ID field

  const columns = [
    { field: "eventId", headerName: "ID", width: 90 },
    { field: "title", headerName: "Event Title", width: 150 },
    { field: "organizer", headerName: "Organizer", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
            onChange={handleSearch}
          />
          <h3>Bahir Dar STEM Center Alumni Events</h3>
          <Link to="/admin/AddEvent">
            <button className="addEvent">+ Add Event</button>
          </Link>
        </div>
        <div className="EventlistContainer">
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
        </div>
      </div>
    </ThemeProvider>

  );
};

export default EventList;
