import "../../styles/FeedBack.css";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Message from "./Message";
import DeleteConfirmation from "../../component/DeleteConfirmation";

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
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/feedback`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();

        // Sort the data by the  submittedAt timestamp in descending order
        data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

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
      fontFamily: "Arial, sans-serif",
    },
  });

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/feedback/${deleteConfirmationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setFeedbackData((prevData) =>
          prevData.filter(
            (feedback) => feedback.feedbackId !== deleteConfirmationId
          )
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
    id: feedback.feedbackId,
    Name: feedback.name,
    Email: feedback.email,
    date: feedback.submittedAt,
    message: feedback.message,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Name", headerName: "Name", width: 150 },
    {
      field: "Email",
      headerName: "Email",
      width: 200,
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
      width: 300,
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
      field: "actions",
      headerName: "Actions",
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
    <div className="feedback-cont">
      <div className="SuggestedJobheader">
        <h3
          style={{
            marginLeft: "400px",
          }}
        >
          {" "}
          BDU Alumni Website User Feedbacks{" "}
        </h3>
      </div>
      <div className="listContainer">
        <ThemeProvider theme={customTheme}>
          <DataGrid rows={rows} columns={columns} autoHeight />
          <Message
            open={Boolean(selectedMessage)}
            handleClose={handleCloseMessageDialog}
            message={selectedMessage}
          />
          {isDeleteConfirmationOpen && (
            <DeleteConfirmation
              close={handleCancelDelete}
              text="feedback"
              onDelete={handleConfirmDelete}
            />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default FeedBack;
