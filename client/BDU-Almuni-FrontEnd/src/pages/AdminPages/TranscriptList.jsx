import "../../styles/DonationList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from "../../component/DeleteConfirmation";
import { DeleteOutline } from "@mui/icons-material";

const RequestedTranscript = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationId(id);
  };

  const handleConfirmStatus = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestStatus: "Confirmed",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update request status. Status: ${response.status}`
        );
      }

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Confirmed" } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/doc-requests`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch requested transcripts. Status: ${response.status}`
        );
      }

      const transcriptData = await response.json();
      // Sort the data by the createdAt timestamp in descending order
      transcriptData.sort((a, b) => b.status - a.status).reverse();

      setData(transcriptData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/delete-request/${deleteConfirmationId}`,
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

      setData(data.filter((item) => item.id !== deleteConfirmationId));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      deleteConfirmationId(null);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestStatus: "Canceled",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update request status. Status: ${response.status}`
        );
      }

      setData(data.filter((item) => item.id !== deleteConfirmationId));
    } catch (error) {
      console.error("Error canceling request:", error.message);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationId(null);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const getRowId = (row) => row.id; // Specify the custom ID field

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Document requestor", width: 200 },
    { field: "email", headerName: "Requestor Email", width: 200 },
    { field: "reservationDate", headerName: "Requested Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },

    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <button
            className="userListEdit"
            onClick={() => handleConfirmStatus(params.row.id)}
            // disabled={params.row.status === "Confirmed"}
          >
            Accept
          </button>
          <button
            className="decline"
            onClick={() => handleCancel(params.row.id)}
            // disabled={params.row.status === "Canceled"}
          >
            Cancel
          </button>
          <DeleteOutline
            key={`delete-${params.row.id}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <div className="eventlist">
        <div className="addEventheader">
          <h3 className="title">
            Bahir Dar University Alumni Transcript requests{" "}
          </h3>
        </div>
        <div className="listCOntainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <DataGrid rows={data} columns={columns} getRowId={getRowId} />
              {isDeleteConfirmationOpen && (
                <DeleteConfirmation
                  close={handleCancelDelete}
                  text="request"
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

export default RequestedTranscript;
