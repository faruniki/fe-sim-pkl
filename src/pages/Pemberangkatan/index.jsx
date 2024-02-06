import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import "../../styles/pemberangkatan.css";
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
            ml: "-4%",
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
            <h2>Jadwal Pemberangkatan</h2>
            <p>Coding disini</p>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
