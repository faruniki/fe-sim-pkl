import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import "../../styles/permintaan.css";
import { ThemeProvider } from "@emotion/react";

import Sidebar from "../../components/Sidebar";

const defaultTheme = createTheme();

export default function Pemberangkatan() {
  const token = Cookies.get("token") || "";

  const [isLoading, setIsLoading] = useState(false);

  // create data
  const [formData, setFormData] = useState({
    name: "",
    jabatan: "",
    pt: "",
    alamat: "",
    pic: "",
    kontak_pic: "",
    email: "",
    kebutuhan: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCreateSubmit = async () => {
    setIsLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/permintaan/create`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Data berhasil dibuat!");
      } else if (response.status === 400) {
        const detail = await response.json();
        toast.error("Ada kesalahan!");
      } else {
        console.error("Failed to submit data");
        toast.error("Ada kesalahan!");
      }
    } catch (error) {
      console.error("Error during data submission", error);
    }
    setIsLoading(false);
  };

  const [dataPermintaan, setDataPermintaan] = useState("");
  const [dataUser, setDataUser] = useState("");

  // read table
  async function fetchPermintaan() {
    const queryParams = new URLSearchParams();

    const queryString = queryParams.toString();
    const apiUrl =
      `${process.env.REACT_APP_API_URL}/api/permintaan` +
      (queryString ? `?${queryString}` : "");

    try {
      setDataPermintaan([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { data } = await response.json();
        setDataPermintaan(data);
      } else if (response.status === 404) {
        setDataPermintaan([]);
      }
    } catch (error) {
      // Handle error
    }
  }

  async function fetchUser() {
    const queryParams = new URLSearchParams();

    const queryString = queryParams.toString();
    const apiUrl =
      `${process.env.REACT_APP_API_URL}/api/user` +
      (queryString ? `?${queryString}` : "");

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { role } = await response.json();
        setDataUser(role);
        console.log(dataUser);
      } else if (response.status === 404) {
      }
    } catch (error) {
      // Handle error
    }
  }

  useEffect(() => {
    fetchPermintaan();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Nama Lengkap",
      width: 300,
      editable: true,
    },
    {
      field: "jabatan",
      headerName: "Jabatan",
      width: 250,
      editable: true,
    },
    {
      field: "pt",
      headerName: "Perusahaan",
      width: 300,
      editable: true,
    },
    {
      field: "alamat",
      headerName: "Alamat",
      width: 300,
      editable: true,
    },
    {
      field: "pic",
      headerName: "PIC",
      width: 250,
      editable: true,
    },
    {
      field: "kontak_pic",
      headerName: "Kontak PIC",
      width: 190,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "kebutuhan",
      headerName: "Kebutuhan",
      width: 300,
      editable: true,
    },
  ];

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
          {dataUser === "admin" ? (
            <Box>
              <h2
                style={{
                  marginTop: "0px",
                  marginLeft: "3.5vh",
                  marginTop: "20px",
                }}
              >
                Permintaan PKL
              </h2>
              <DataGrid
                style={{ width: "97%", marginLeft: "3.5vh", marginTop: 10 }}
                rows={dataPermintaan}
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
          ) : dataUser === "user" ? (
            <div
              style={{
                width: "97%",
                marginLeft: "1.7%",
                marginTop: "1.7%",
                marginBottom: "1.7%",
              }}
            >
              <h2 style={{ marginLeft: "15%", marginTop: "6%" }}>
                Permintaan PKL
              </h2>
              <p style={{ marginLeft: "15%", marginBottom: "3%" }}>
                Silahkan isi data pada form dibawah
              </p>
              <div style={{ width: "70%", marginLeft: "15%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2%",
                  }}
                >
                  <TextField
                    label="Nama Lengkap"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                  <TextField
                    label="Jabatan"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.jabatan}
                    onChange={(e) =>
                      handleInputChange("jabatan", e.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2%",
                  }}
                >
                  <TextField
                    label="Industri"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.pt}
                    onChange={(e) => handleInputChange("pt", e.target.value)}
                  />
                  <TextField
                    label="Alamat"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.alamat}
                    onChange={(e) =>
                      handleInputChange("alamat", e.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2%",
                  }}
                >
                  <TextField
                    label="Pembimbing"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.pic}
                    onChange={(e) => handleInputChange("pic", e.target.value)}
                  />
                  <TextField
                    label="Kontak Pembimbing"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.kontak_pic}
                    onChange={(e) =>
                      handleInputChange("kontak_pic", e.target.value)
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2%",
                  }}
                >
                  <TextField
                    label="Email"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <TextField
                    label="Kebutuhan"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    sx={{ width: "49%" }}
                    value={formData.kebutuhan}
                    onChange={(e) =>
                      handleInputChange("kebutuhan", e.target.value)
                    }
                  />
                </div>
                <button
                  disableRipple
                  variant="outlined"
                  style={{
                    fontWeight: "600",
                    width: "100%",
                    height: "40px",
                  }}
                  onClick={handleCreateSubmit}
                  disabled={isLoading}
                  className="buttonTambah"
                >
                  {isLoading ? "Loading..." : "SUBMIT"}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "40vh" }}>
              Loading...
            </div>
          )}{" "}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
