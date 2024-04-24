import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import "../../styles/pemberangkatan.css";
import { ThemeProvider } from "@emotion/react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import Sidebar from "../../components/Sidebar";
import AddDataModal from "../Pemberangkatan/AddDataModal";
import EditDataModal from "../Pemberangkatan/EditDataModal";
import DeleteDataModal from "../Pemberangkatan/DeleteDataModal";

// Create a theme
const theme = createTheme();

export default function Pemberangkatan() {
  const token = Cookies.get("token") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [currentGelombang, setCurrentGelombang] = React.useState(1);
  const currentYear = new Date().getFullYear();

  // read gelombang 1
  const [dataJadwal, setDataJadwal] = useState([]);

  async function fetchJadwal() {
    try {
      setDataJadwal([]);
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
        setDataJadwal(data);
      } else if (response.status === 404) {
        setDataJadwal([]);
      }
    } catch (error) {
      // Handle error
    }
  }

  // create data
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    rayon: "",
    rombel: "",
    pt: "",
    email: "",
    priode: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCreateSubmit = async () => {
    setIsLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/jadwal/create`;

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
        handleClose();
        await fetchJadwal();
        setFormData(false);
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

  // delete data
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openDeleteConfirmationModal = (itemId) => {
    setItemToDelete(itemId);
    setDeleteModalOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setItemToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteItem = async (itemId) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/jadwal/delete/${itemId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Data berhasil di hapus!");
        await fetchJadwal();
      } else if (response.status === 400) {
        console.error("Failed to delete item");
        toast.error("Data tidak ditemukan!");
      } else {
        toast.error("Ada kesalahan!");
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error during item deletion", error);
    }
  };

  // edit data
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editDataId, setEditDataId] = useState(null);

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditDataId();
    setEditedData({});
  };

  const handleEditClick = (rowData) => {
    setEditedData(rowData.row);
    setEditDataId(rowData.id);
    setEditModalOpen(true);
  };

  const handleUpdateData = async () => {
    setIsLoading(true);
    if (editDataId) {
      try {
        const editedDataData = {
          name: editedData.name,
          nis: editedData.nis,
          rombel: editedData.rombel,
          rayon: editedData.rayon,
          pt: editedData.pt,
          email: editedData.email,
          priode: editedData.priode,
        };
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/jadwal/update/${editDataId}`;

        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDataData),
        });

        if (response.status === 200) {
          toast.success("Data berhasil diubah!");
          handleCloseEditModal();
          await fetchJadwal();
        } else if (response.status === 400) {
          toast.error("Data tidak ditemukan!");
          console.error("Failed to update data");
        } else {
          toast.error("Ada kesalahan!");
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setIsLoading(false);
  };

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
    {
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 160,
      cellClassName: "actions",
      getActions: (rowData) => {
        return [
          <Tooltip title="Edit Data">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit Master Gudang"
              className="textPrimary"
              color="inherit"
              sx={{ width: "40px" }}
              onClick={() => handleEditClick(rowData)}
            />
          </Tooltip>,
          <Tooltip title="Delete Data">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="inherit"
              sx={{ width: "40px", color: "#f35c65" }}
              onClick={() => openDeleteConfirmationModal(rowData.id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];

  useEffect(() => {
    fetchJadwal();
  }, []);

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
                  <div>
                    <h2 style={{ marginTop: "0px" }}>
                      Jadwal Pemberangkatan PKL Tahun {currentYear}
                    </h2>
                    <h6>Gelombang 1</h6>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "44vh",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "27vh",
                      }}
                    >
                      <IconButton
                        variant="text"
                        onClick={() => setCurrentGelombang(2)}
                        style={{
                          width: "40px",
                          marginBottom: "60px",
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
                          marginBottom: "60px",
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
                    <button className="buttonTambah" style={{color: "#FFF"}}  onClick={handleOpen}>
                      Tambah
                    </button>
                  </div>
                </div>
                <Box>
                  <DataGrid
                    rows={dataJadwal.filter((item) => item.priode === "1")}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 100,
                        },
                      },
                    }}
                    pageSizeOptions={[100]}
                    // checkboxSelection
                    // disableRowSelectionOnClick
                  />
                </Box>
              </>
            )}
            {currentGelombang === 2 && (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h2 style={{ marginTop: "0px" }}>
                      Jadwal Pemberangkatan PKL Tahun {currentYear}
                    </h2>
                    <h6>Gelombang 2</h6>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "44vh",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "27vh",
                      }}
                    >
                      <IconButton
                        variant="text"
                        onClick={() => setCurrentGelombang(1)}
                        style={{
                          width: "40px",
                          marginBottom: "60px",
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
                          marginBottom: "60px",
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
                    <button className="buttonTambah" style={{color: "#FFF"}} onClick={handleOpen}>
                      Tambah
                    </button>
                  </div>
                </div>
                <Box>
                  <DataGrid
                    rows={dataJadwal.filter((item) => item.priode === "2")}
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
      {/* delete modal */}
      <DeleteDataModal
        deleteModalOpen={deleteModalOpen}
        closeDeleteConfirmationModal={closeDeleteConfirmationModal}
        handleDeleteItem={handleDeleteItem}
        itemToDelete={itemToDelete}
        isLoading={isLoading}
      />
      {/* create modal */}
      <AddDataModal
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        handleClose={handleClose}
        open={open}
        formData={formData}
        handleCreateSubmit={handleCreateSubmit}
        handleInputChange={handleInputChange}
      />
      {/* edit modal */}
      <EditDataModal
        editedData={editedData}
        isLoading={isLoading}
        handleCloseEditModal={handleCloseEditModal}
        editModalOpen={editModalOpen}
        setEditedData={setEditedData}
        handleUpdateData={handleUpdateData}
      />
    </ThemeProvider>
  );
}
