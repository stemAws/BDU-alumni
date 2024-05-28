
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
    { id: 1, firstname: 'Jon', lastName: 'Snow', gender: 'F', actions: ''},
    { id: 2, firstname: 'Cersei',lastName: 'Lannister',  gender: 'F'},
    { id: 3, firstname: 'Jaime',lastName: 'Lannister',  gender: 'F'},
    { id: 4, lastName: 'Stark', firstname: 'Arya', gender: 'F'},
    { id: 5, lastName: 'Targaryen', firstname: 'Daenerys', gender: 'F'} ,
    { id: 6, lastName: 'Melisandre', firstname: 'kjsd', gender: 'F'},
    { id: 7, lastName: 'Clifford', firstname: 'Ferrara', gender: 'F'},
    { id: 8, lastName: 'Frances', firstname: 'Rossini', gender: 'F'},
    { id: 9, lastName: 'Roxie', firstname: 'Harvey', gender: 'F'},
    { id: 10, lastName: 'Snow', firstname: 'Jon', gender: 'F'},
    { id: 20, lastName: 'Lannister', firstname: 'Cersei', gender: 'F'},
    { id: 30, lastName: 'Lannister', firstname: 'Jaime', gender: 'F'},
    { id: 40, lastName: 'Stark', firstname: 'Arya', gender: 'F'},
    { id: 50, lastName: 'Targaryen', firstname: 'Daenerys', gender: 'F'} ,
    { id: 60, lastName: 'Melisandre', firstname: 'ahsbf', gender: 'F'},
    { id: 70, lastName: 'Clifford', firstname: 'Ferrara', gender: 'F'},
    { id: 80, lastName: 'Frances', firstname: 'Rossini', gender: 'F'},
    { id: 90, lastName: 'Roxie', firstname: 'Harvey', gender: 'F'},
];

export default function Users() {
  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  
  return (
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
  );
}

