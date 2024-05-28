import "../../styles/FeedBack.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Message from "./Message";
// import DeleteConfirmation from "../../components/DeleteConfirmation";
const FeedBack = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationId(id);
  };
  


  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseMessageDialog = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    // Fetch feedback data when the component mounts
    fetchFeedbackData();
  }, []);
  const fetchFeedbackData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/feedback`
      );
      if (response.ok) {
        const data = await response.json();

        // Sort the data by the createdAt timestamp in descending order
        data.sort((a, b) => new Date(b.sendAT) - new Date(a.sendAT));

        setFeedbackData(data);
      } else {
        console.error("Failed to fetch feedback data");
      }
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/feedback/${deleteConfirmationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFeedbackData((prevData) =>
          prevData.filter((feedback) => feedback.feedBackID !== deleteConfirmationId)
        );
      } else {
        console.error(`Failed to delete row with ID: ${deleteConfirmationId}`);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationId(null);
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationId(null);
  };
  
  const rows = feedbackData.map((feedback) => ({
    id: feedback.feedBackID,
    Name: feedback.fullName,
    Email: feedback.email,
    date: feedback.sendAT, // Convert sentAt to a readable date
    message: feedback.message,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Name", headerName: " Name", width: 100 },
    {
      field: "Email",
      headerName: "Email",
      width: 100,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleEmailClick(params.value)}
        >
          {params.value}
        </div>
      ),
    },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "message",
      headerName: "Message",
      width: 400,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleMessageClick(params.value)}
        >
          {params.value}
        </div>
      ),
    },
    {
      width: 50,
      renderCell: (params) => (
        <div
          className="feedbackListDelete"
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteOutline />
        </div>
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <div className="feedback-cont">
        <DataGrid rows={rows} columns={columns} />
        <Message
          open={Boolean(selectedMessage)}
          handleClose={handleCloseMessageDialog}
          message={selectedMessage}
        />
        {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          close={handleCancelDelete}
          text="feedback" // You can customize this text based on your needs
          onDelete={handleConfirmDelete}
        />
)}
      </div>
    </ThemeProvider>
  );
};

export default FeedBack;
