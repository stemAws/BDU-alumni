import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from "../../component/DeleteConfirmation";
const JobList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationEventId, setDeleteConfirmationEventId] =
    useState(null);

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
        `${import.meta.env.VITE_BACKEND_URL}/admin-jobs`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs. Status: ${response.status}`);
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
          item.jobTitle &&
          item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/delete-job/${deleteConfirmationEventId}`,
        {
          method: "DELETE",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }

      setData(
        data.filter((item) => item.jobPostingId !== deleteConfirmationEventId)
      );
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

  const handleEdit = (jobPostingId) => {
    // Render the EditEvent component with the onUpdate callback
    navigate(`/admin/edit-job/${jobPostingId}`);
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const getRowId = (row) => row.jobPostingId; // Specify the custom ID field

  const columns = [
    { field: "jobPostingId", headerName: "ID", width: 90 },
    { field: "jobTitle", headerName: "Job Title", width: 200 },
    { field: "companyName", headerName: "Company Name", width: 300 },
    { field: "deadline", headerName: "Deadline", width: 200 },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,

      renderCell: (params) => (
        <>
          <DeleteOutline
            key={`delete-${params.row.jobPostingId}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.jobPostingId)}
          />
          <Edit
            key={`edit-${params.row.eventId}`}
            className="eventListEdit"
            onClick={() => handleEdit(params.row.jobPostingId)}
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
            placeholder="Search by job title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h3> Bahir Dar University Job offers from BDU </h3>
          <div className="adminAddEventButtons">
            <Link to="/admin/jobOffer">
              <button className="addEvent">+ Add Job</button>
            </Link>
            <Link to="/admin/suggestedJob">
              <button className="addJob" style={{ width: "120px" }}>
                {" "}
                Suggested Job
              </button>
            </Link>
          </div>
        </div>
        <div className="listCOntainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <DataGrid
                rows={filteredData}
                columns={columns}
                getRowId={getRowId}
              />
              {isDeleteConfirmationOpen && (
                <DeleteConfirmation
                  close={handleCancelDelete}
                  text="event" // You can customize this text based on your needs
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

export default JobList;
