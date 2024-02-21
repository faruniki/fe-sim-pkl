import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import "../../styles/pemberangkatan.css";
import { ThemeProvider } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sidebar from "../../components/Sidebar";

// Create a theme
const theme = createTheme();

export default function Pemberangkatan() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const [currentGelombang, setCurrentGelombang] = React.useState(1);

  const currentYear = new Date().getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            ml: "-9vh",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <div
            style={{
              width: "97%",
              marginLeft: "1.7%",
              marginTop: "1.7%",
              marginBottom: "1.7%",
            }}
          >
            {currentGelombang === 1 && (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 style={{ marginTop: "0px" }}>
                    Jadwal Pemberangkatan PKL Tahun {currentYear}
                  </h2>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "15%",
                    }}
                  >
                    <IconButton
                      variant="text"
                      onClick={() => setCurrentGelombang(2)}
                      style={{
                        width: "40px",
                        marginBottom: "10px",
                        fontSize: "10px",
                      }}
                      disabled
                    >
                      <ArrowBackIosIcon
                        style={{
                          fontSize: "16px",
                        }}
                      />
                    </IconButton>
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Januari - Juli
                    </p>
                    <IconButton
                      variant="text"
                      onClick={() => setCurrentGelombang(2)}
                      style={{
                        width: "40px",
                        marginBottom: "10px",
                        fontSize: "10px",
                      }}
                    >
                      <ArrowForwardIosIcon
                        style={{
                          fontSize: "16px",
                        }}
                      />
                    </IconButton>
                  </div>
                </div>
                <Box>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    pageSizeOptions={[100]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              </>
            )}
            {currentGelombang === 2 && (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 style={{ marginTop: "0px" }}>
                    Jadwal Pemberangkatan PKL Tahun {currentYear}
                  </h2>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "15%",
                    }}
                  >
                    <IconButton
                      variant="text"
                      onClick={() => setCurrentGelombang(1)}
                      style={{
                        width: "40px",
                        marginBottom: "10px",
                        fontSize: "10px",
                      }}
                    >
                      <ArrowBackIosIcon
                        style={{
                          fontSize: "16px",
                        }}
                      />
                    </IconButton>
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Juli - Desember
                    </p>
                    <IconButton
                      variant="text"
                      onClick={() => setCurrentGelombang(2)}
                      style={{
                        width: "40px",
                        marginBottom: "10px",
                        fontSize: "10px",
                      }}
                      disabled
                    >
                      <ArrowForwardIosIcon
                        style={{
                          fontSize: "16px",
                        }}
                      />
                    </IconButton>
                  </div>
                </div>
                <Box>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    pageSizeOptions={[100]}
                    disableRowSelectionOnClick
                  />
                </Box>
              </>
            )}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
