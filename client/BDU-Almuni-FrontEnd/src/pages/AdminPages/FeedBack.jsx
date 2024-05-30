import "../../styles/FeedBack.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import React from "react";
import { DeleteOutline } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Message from "./Message";
import DeleteConfirmation from "../../component/DeleteConfirmation";

const FeedBack = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [feedbackData, setFeedbackData] = useState([
    { feedBackID: 1, fullName: 'John Doe', email: 'john.doe@example.com', sendAT: '2024-05-20', message: 'Great job!' },
    { feedBackID: 2, fullName: 'Jane Smith', email: 'jane.smith@example.com', sendAT: '2024-05-21', message: 'Keep it up!' },
    { feedBackID: 3, fullName: 'John Doe', email: 'john.doe@example.com', sendAT: '2024-05-20', message: 'Great job!' },
    { feedBackID: 4, fullName: 'Jane Smith', email: 'jane.smith@example.com', sendAT: '2024-05-21', message: 'Keep it up!' },
    { feedBackID: 5, fullName: 'Alice Johnson', email: 'alice.johnson@example.com', sendAT: '2024-05-22', message: 'Very informative.' },
    { feedBackID: 6, fullName: 'Alice Johnson', email: 'alice.johnson@example.com', sendAT: '2024-05-22', message: 'Very informative.' },
    { feedBackID: 8, fullName: 'John Doe', email: 'john.doe@example.com', sendAT: '2024-05-20', message: 'Great job!' },
  ]);

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

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const handleConfirmDelete = async () => {
    setFeedbackData((prevData) =>
      prevData.filter((feedback) => feedback.feedBackID !== deleteConfirmationId)
    );
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationId(null);
  };

  const rows = feedbackData.map((feedback) => ({
    id: feedback.feedBackID,
    Name: feedback.fullName,
    Email: feedback.email,
    date: feedback.sendAT, // Convert sendAT to a readable date
    message: feedback.message,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Name", headerName: " Name", width: 150 },
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
            text="feedback" // You can customize this text based on your needs
            onDelete={handleConfirmDelete}
          />
        )}
     
    </ThemeProvider>
    </div>
  );
};

export default FeedBack;
