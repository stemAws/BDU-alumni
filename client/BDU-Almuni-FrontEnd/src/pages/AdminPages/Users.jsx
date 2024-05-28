
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../../styles/Users.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";

    const columns = [
        { field: "id", headerName: "ID", width: 30 },
        { field: "firstname", headerName: "First Name", width: 100 },
        { field: "lastname", headerName: "Last Name", width: 100 },
        { field: "gender", headerName: "Gender", width: 100 },
        { field: "role", headerName: "Role", width: 100 },
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
                  onClick={() => handleYes(params.row.id)}
                >
                  Yes
                </button>
              )}
              {params.row.notable === 1 && (
                <button
                  className="decline"
                  onClick={() => handleNo(params.row.id)}
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
                    onClick={() => handleActivate(params.row.id)}
                  >
                    Activate
                  </button>
                  <button
                    className="decline"
                    onClick={() => handleDeactivate(params.row.id)}
                  >
                    Deactivate
                  </button>
                </>
              )}
              {params.row.verified === 1 && (
                <button
                  className="decline"
                  onClick={() => handleDeactivate(params.row.id)}
                >
                  Deactivate
                </button>
              )}
              {params.row.verified === 0 && (
                <button
                  className="userListEdit"
                  onClick={() => handleActivate(params.row.id)}
                >
                  Activate
                </button>
              )}
            </>
          ),
        },
      ];

      const rows = [
        { id: 1, firstname: 'Jon', lastname: 'Snow', gender: 'Male', role: 'King in the North', isNotable: 'yes', notable: 0, status: 'Activated', verified: null },
    { id: 2, firstname: 'Cersei', lastname: 'Lannister', gender: 'Female', role: 'Queen of the Seven Kingdoms', isNotable: 'yes', notable: 1, status: 'Deactivated', verified: 1 },
    { id: 3, firstname: 'Jaime', lastname: 'Lannister', gender: 'Male', role: 'Kingsguard', isNotable: 'no', notable: 0, status: 'Deactivated', verified: 0 },
    { id: 4, firstname: 'Arya', lastname: 'Stark', gender: 'Female', role: 'Assassin', isNotable: 'yes', notable: 1, status: 'Activated', verified: null },
    { id: 5, firstname: 'Daenerys', lastname: 'Targaryen', gender: 'Female', role: 'Mother of Dragons', isNotable: 'no', notable: 0, status: 'Deactivated', verified: 1 },
    { id: 6, firstname: 'Tyrion', lastname: 'Lannister', gender: 'Male', role: 'Hand of the Queen', isNotable: 'no', notable: 1, status: 'Activated', verified: 0 },
    { id: 7, firstname: 'Sansa', lastname: 'Stark', gender: 'Female', role: 'Lady of Winterfell', isNotable: 'yes', notable: 0, status: 'Activated', verified: 1 },
    { id: 8, firstname: 'Bran', lastname: 'Stark', gender: 'Male', role: 'Three-Eyed Raven', isNotable: 'no', notable: 1, status: 'Activated', verified: 0 },
    { id: 9, firstname: 'Brienne', lastname: 'of Tarth', gender: 'Female', role: 'Knight', isNotable: 'no', notable: 0, status: 'Activated', verified: 1 },
    { id: 10, firstname: 'Samwell', lastname: 'Tarly', gender: 'Male', role: 'Maester', isNotable: 'no', notable: 1, status: 'Activated', verified: 0 },
    { id: 11, firstname: 'Theon', lastname: 'Greyjoy', gender: 'Male', role: 'Reek', isNotable: 'no', notable: 0, status: 'Deactivated', verified: 1 },
    { id: 12, firstname: 'Jorah', lastname: 'Mormont', gender: 'Male', role: 'Exiled Knight', isNotable: 'no', notable: 1, status: 'Deactivated', verified: 0 },
    { id: 13, firstname: 'Gendry', lastname: '', gender: 'Male', role: 'Lord of Storm\'s End', isNotable: 'yes', notable: 0, status: 'Activated', verified: 1 },
    ];
    

export default function Users() {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  
  return (
    <div className='userlist'>
    <ThemeProvider theme={customTheme}>
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </ThemeProvider>
    </div>
  );
}

