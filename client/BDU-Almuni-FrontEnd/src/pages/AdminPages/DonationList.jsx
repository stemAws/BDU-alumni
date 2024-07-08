import "../../styles/DonationList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteConfirmation from '../../component/DeleteConfirmation'
const DonationList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const history = useHistory();


  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const handleDelete = (id) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationId(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/donation`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }

      const donationData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      donationData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(donationData);
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
        `${process.env.REACT_APP_BACKEND_URL}/donation/${deleteConfirmationId}`,
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

  // const handleEdit = (id) => {
  //   // Render the EditEvent component with the onUpdate callback
  //   history.push(`/admin/donation/${id}`);
  // };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Replace 'YourDesiredFont' with the actual font-family
    },
  });

  const getRowId = (row) => row.id; // Specify the custom ID field

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Donation Title", width: 100 },
    { field: "link", headerName: "Link", width: 100 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "actions", headerName: "Actions", width: 100 },
    {
      renderCell: (params) => (
        <>
          <DeleteOutline
            key={`delete-${params.row.id}`}
            className="eventListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
          <Edit
            key={`edit-${params.row.id}`}
            className="eventListEdit"
            // onClick={() => handleEdit(params.row.id)}
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
          placeholder="Search by donation title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h3> Bahir Dar University Alumni Donation </h3>
        <Link to="/admin/AddDonation">
          <button className="addEvent">+ Add Donation</button>
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

export default DonationList;
