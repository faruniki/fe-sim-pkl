import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import "../../styles/laporan.css";
import { ThemeProvider } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sidebar from "../../components/Sidebar";

// Create a theme
const theme = createTheme();

export default function DataLaporan() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "namaLengkap",
      headerName: "Nama Lengkap",
      width: 250,
      editable: true,
    },
    {
      field: "nis",
      headerName: "NIS",
      width: 150,
      editable: true,
    },
    {
      field: "rombel",
      headerName: "Rombel",
      width: 150,
      editable: true,
    },
    {
      field: "rayon",
      headerName: "Rayon",
      width: 140,
      editable: true,
    },
    {
      field: "gelombang",
      headerName: "Gelombang",
      width: 140,
      editable: true,
    },
    {
      field: "perusahaan",
      headerName: "Perusahaan",
      width: 250,
      editable: true,
    },
    {
      field: "nilai",
      headerName: "Nilai",
      width: 110,
      editable: true,
    },
    {
      field: "sertifikasi",
      headerName: "Sertifikasi",
      width: 110,
      editable: true,
    },
    {
      field: "laporan",
      headerName: "Laporan",
      width: 110,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, namaLengkap: "Najib Fahruna Akbar", nis: "12108643", rombel: "PPLG XII-3", rayon: "Wikrama 4", gelombang: "2 (Dua)", perusahaan: "PT Exorty Indonesia", nilai: "90", sertifikasi: "Ada", laporan: "Selesai" },
    { id: 2, namaLengkap: "Dzaki Nur Muhammad Aflah", nis: "12108643", rombel: "PPLG XII-3", rayon: "Ciawi 9", gelombang: "2 (Dua)", perusahaan: "PT Ada di Tanggerang", nilai: "90", sertifikasi: "Ada", laporan: "Selesai"  },
    { id: 3, namaLengkap: "Muhammad Riyan Firdaus", nis: "12108643", rombel: "PPLG XII-9", rayon: "Ciawi 1", gelombang: "2 (Dua)", perusahaan: "PT Ada di Gatau", nilai: "90", sertifikasi: "Ada", laporan: "Selesai"  },
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
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
