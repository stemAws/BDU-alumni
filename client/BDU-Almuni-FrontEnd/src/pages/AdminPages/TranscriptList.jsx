import "../../styles/DonationList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from "../../component/DeleteConfirmation";
const RequestedTranscript = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reqStatus, setReqStatus] = useState("");
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const updateStatus = (id, status) => {
    console.log(status);
    console.log(id);
    if (status === "Canceled") {
      setDeleteConfirmationOpen(true);
      setDeleteConfirmationId(id);
    }
    setReqStatus(status);
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
        `${import.meta.env.VITE_BACKEND_URL}/requested-transcrpts`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch requested transcripts. Status: ${response.status}`
        );
      }

      const transcriptData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      transcriptData.sort(
        (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
      );

      setData(transcriptData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    console.log(deleteConfirmationId);
    console.log("status", reqStatus);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/update-status/${deleteConfirmationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestStatus: reqStatus,
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
      console.error("Error deleting data:", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationId(null);
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
    { field: "fullName", headerName: "Transcript requestor", width: 200 },
    { field: "reservationDate", headerName: "Requested Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            className="userListEdit"
            onClick={() => handleConfirmStatus(params.row.id)}
            disabled={params.row.status === "Confirmed"}
          >
            Accept
          </button>
          <button
            className="decline"
            onClick={() => updateStatus(params.row.id, "Canceled")}
            disabled={params.row.status === "Canceled"}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <div className="eventlist">
        <div className="addEventheader">
          <h3 className="title">
            Bahir Dar University Alumni Requested Transcripts{" "}
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
