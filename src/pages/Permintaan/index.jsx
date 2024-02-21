import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../../styles/permintaan.css";
import { ThemeProvider } from "@emotion/react";

import Sidebar from "../../components/Sidebar";

const defaultTheme = createTheme();

export default function Pemberangkatan() {
  return (
    <ThemeProvider theme={defaultTheme}>
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
            <h2 style={{marginLeft: "15%", marginTop: "6%"}}>Permintaan PKL</h2>
            <p style={{marginLeft: "15%", marginBottom: "3%"}}>Silahkan isi data pada form dibawah</p>
            <div style={{width: "70%", marginLeft: "15%"}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
                <TextField
                  label="Nama Lengkap"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
                <TextField
                  label="Nama Perusahaan"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
                <TextField
                  label="Alamat Perusahaan"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
                <TextField
                  label="Pemilik Perusahaan"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
                <TextField
                  label="Nomor Telepon"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
                <TextField
                  label="Alamat Email"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
                <TextField
                  label="Alamat Perusahaan"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
                <TextField
                  label="Pemilik Perusahaan"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  sx={{ width: "49%" }}
                />
              </div>
              <Button variant="outlined" style={{color: "#000", fontWeight: "600", width: "100%", borderColor: "#d5d5d5",}}>Kirim</Button>
            </div>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
