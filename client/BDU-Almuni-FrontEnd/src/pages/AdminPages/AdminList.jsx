import "../../styles/Users.css";
import "../../styles/EventList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (personId) => {
    // Render the EditEvent component with the onUpdate callback
    navigate(`/admin/edit-admin/${personId}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin-list`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch admin. Status: ${response.status}`);
      }

      const userData = await response.json();

      // Sort the data by the createdAt timestamp in descending order
      userData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(userData);
      setFilteredData(userData); // Update filteredData with the fetched and sorted data
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const filterData = useCallback(() => {
    try {
      const filtered = data.filter((item) => {
        const lowerFirstName = item.fullName ? item.fullName.toLowerCase() : "";
        const lowerSearchQuery = searchQuery.toLowerCase();

        // Check if the first name starts with the search query
        return lowerFirstName.startsWith(lowerSearchQuery);
      });

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

  const handleDeactivate = async (personId) => {
    try {
      // Send a PUT request to deactivate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verify-admin/${personId}`,
        {
          method: "PUT",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verified: 0 }), // Send 0 to deactivate
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to deactivate alumni. Status: ${response.status}`
        );
      }

      // Fetch updated data after deactivation
      fetchData();
    } catch (error) {
      console.error("Error deactivating alumni:", error.message);
    }
  };

  const handleActivate = async (personId) => {
    try {
      // Send a PUT request to activate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verify-admin/${personId}`,
        {
          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verified: 1 }), // Send 1 to activate
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to activate alumni. Status: ${response.status}`
        );
      }
      // Fetch updated data after activation
      fetchData();
    } catch (error) {
      console.error("Error activating alumni:", error.message);
    }
  };

  const getStatus = (verified) => {
    if (verified === null) {
      return "On queue";
    } else if (verified === 1) {
      return "Activated";
    } else if (verified === 0) {
      return "Deactivated";
    } else {
      // Handle other cases if needed
      return "Unknown Status";
    }
  };

  const columns = [
    { field: "personId", headerName: "ID", width: 30 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          {params.row.verified === null && (
            <>
              <button
                className="userListEdit"
                onClick={() => handleActivate(params.row.personId)}
              >
                Activate
              </button>
              <button
                className="decline"
                onClick={() => handleDeactivate(params.row.personId)}
              >
                Deactivate
              </button>
            </>
          )}
          {params.row.verified === 1 && (
            <button
              className="decline"
              onClick={() => handleDeactivate(params.row.personId)}
            >
              Deactivate
            </button>
          )}
          {params.row.verified === 0 && (
            <button
              className="userListEdit"
              onClick={() => handleActivate(params.row.personId)}
            >
              Activate
            </button>
          )}
          <Edit
            key={`edit-${params.row.personId}`}
            className="eventListEdit"
            onClick={() => handleEdit(params.row.personId)}
          />
        </>
      ),
    },
  ];

  const rows = filteredData.map((item) => ({
    id: item.personId,
    personId: item.personId,
    fullName: item.fullName, // Change here to match your data's key
    gender: item.gender,
    email: item.email,
    role: item.role,
    status: getStatus(item.verified),
    verified: item.verified, // Ensure this line is present
  }));

  return (
    <ThemeProvider theme={customTheme}>
      <div className="userlist">
        <div className="addUserheader">
          <input
            className="search"
            type="text"
            placeholder="Search by first name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <h3> Bahir Dar University Alumni Website Admin List </h3>
          <Link to="/admin/AddUser">
            <button className="addUser">+ Add User</button>
          </Link>
        </div>

        <div className="listCOntainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              getRowId={(row) => row.personId}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminList;
