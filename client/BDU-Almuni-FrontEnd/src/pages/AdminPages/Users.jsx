import "../../styles/Users.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const UserList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-alumni`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
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

  const handleDeactivate = async (alumniID) => {
    try {
      // Send a PUT request to deactivate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verify-alumni/${alumniID}`,
        {
          method: "PUT",
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
  const handleNo = async (alumniID) => {
    try {
      // Send a PUT request to deactivate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/notable/${alumniID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isNotable: 0 }), // Send 0 to deactivate
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

  const handleActivate = async (alumniID) => {
    try {
      // Send a PUT request to activate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/verify-alumni/${alumniID}`,
        {
          method: "PUT",
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
  const handleYes = async (alumniID) => {
    try {
      // Send a PUT request to activate the alumni
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/notable/${alumniID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isNotable: 1 }), // Send 1 to activate
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to make alumni notable. Status: ${response.status}`
        );
      }
      // Fetch updated data after activation
      fetchData();
    } catch (error) {
      console.error("Error making alumni notable:", error.message);
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

  const getNotable = (notable) => {
    if (notable === 1) {
      return "Notable";
    } else if (notable === 0) {
      return "Not Notable";
    } else {
      // Handle other cases if needed
      return "Unknown";
    }
  };

  const columns = [
    { field: "alumniID", headerName: "ID", width: 30 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "major", headerName: "Department", width: 250 },
    { field: "isNotable", headerName: "Is Notable", width: 100 },
    {
      field: "notable",
      headerName: "Make Notable",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.notable === 0 && (
            <button
              className="userListEdit"
              onClick={() => handleYes(params.row.alumniID)}
            >
              Yes
            </button>
          )}
          {params.row.notable === 1 && (
            <button
              className="decline"
              onClick={() => handleNo(params.row.alumniID)}
            >
              No
            </button>
          )}
        </>
      ),
    },

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
                onClick={() => handleActivate(params.row.alumniID)}
              >
                Activate
              </button>
              <button
                className="decline"
                onClick={() => handleDeactivate(params.row.alumniID)}
              >
                Deactivate
              </button>
            </>
          )}
          {params.row.verified === 1 && (
            <button
              className="decline"
              onClick={() => handleDeactivate(params.row.alumniID)}
            >
              Deactivate
            </button>
          )}
          {params.row.verified === 0 && (
            <button
              className="userListEdit"
              onClick={() => handleActivate(params.row.alumniID)}
            >
              Activate
            </button>
          )}
        </>
      ),
    },
  ];

  const rows = filteredData.map((item) => ({
    id: item.alumniId,
    alumniID: item.alumniId,
    fullName: item.fullName, // Change here to match your data's key
    gender: item.gender,
    major: item.major,
    isNotable: getNotable(item.isNotable),
    notable: item.isNotable,
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
          <h3> Bahir Dar University Alumni </h3>
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
              getRowId={(row) => row.alumniID}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserList;
