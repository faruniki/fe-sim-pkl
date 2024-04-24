import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";

import "../../styles/laporan.css";
import { ThemeProvider } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sidebar from "../../components/Sidebar";

// Create a theme
const theme = createTheme();

export default function DataLaporan() {

  const [currentGelombang, setCurrentGelombang] = React.useState(1);

  const currentYear = new Date().getFullYear();

  const token = Cookies.get("token") || "";

  const [isLoading, setIsLoading] = useState(false);

  // read gelombang 1
  const [dataLaporan, setDataLaporan] = useState([]);

  async function fetchLaporan() {
    try {
      setDataLaporan([]);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/jadwal`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = await response.json();
        setDataLaporan(data);
      } else if (response.status === 404) {
        setDataLaporan([]);
      }
    } catch (error) {
      // Handle error
    }
  }

  useEffect(() => {
    fetchLaporan();
  }, [])

  const columns = [
    {
      field: "name",
      headerName: "Nama Lengkap",
      width: 300,
      editable: true,
    },
    {
      field: "nis",
      headerName: "NIS",
      width: 300,
      editable: true,
    },
    {
      field: "rombel",
      headerName: "Rombel",
      width: 300,
      editable: true,
    },
    {
      field: "rayon",
      headerName: "Rayon",
      width: 250,
      editable: true,
    },
    {
      field: "priode",
      headerName: "Gelombang",
      width: 250,
      editable: true,
    },
    {
      field: "pt",
      headerName: "Perusahaan",
      width: 250,
      editable: true,
    },
    // {
    //   headerClassName: "super-app-theme--header",
    //   align: "center",
    //   headerAlign: "center",
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 160,
    //   cellClassName: "actions",
    //   getActions: (rowData) => {
    //     return [
    //       <Tooltip title="Edit Data">
    //         <GridActionsCellItem
    //           icon={<EditIcon />}
    //           label="Edit Master Gudang"
    //           className="textPrimary"
    //           color="inherit"
    //           sx={{ width: "40px" }}
    //           onClick={() => handleEditClick(rowData)}
    //         />
    //       </Tooltip>,
    //       <Tooltip title="Delete Data">
    //         <GridActionsCellItem
    //           icon={<DeleteIcon />}
    //           label="Delete"
    //           color="inherit"
    //           sx={{ width: "40px", color: "#f35c65" }}
    //           onClick={() => openDeleteConfirmationModal(rowData.id)}
    //         />
    //       </Tooltip>,
    //     ];
    //   },
    // },
  ];

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
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 style={{ marginTop: "0px" }}>
                    Data Laporan PKL Tahun {currentYear}
                  </h2>
                </div>
                <Box>
                  <DataGrid
                    rows={dataLaporan}
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
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
