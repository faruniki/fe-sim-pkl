import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import "../../styles/penempatan.css";
import { ThemeProvider } from "@emotion/react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import Sidebar from "../../components/Sidebar";
import AddDataModal from "../Penempatan/AddDataModal";
import DeleteDataModal from "../Penempatan/DeleteDataModal";
import EditDataModal from "../Penempatan/EditDataModal";
import { Tooltip } from "@mui/material";

// Create a theme
const theme = createTheme();

export default function Penempatan() {
  const token = Cookies.get("token") || "";

  const [dataPenempatan, setDataPenempatan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // read table
  async function fetchPenempatan() {
    const queryParams = new URLSearchParams();

    const queryString = queryParams.toString();
    const apiUrl =
      `${process.env.REACT_APP_API_URL}/api/penempatan` +
      (queryString ? `?${queryString}` : "");

    try {
      setDataPenempatan([]);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { data } = await response.json();
        setDataPenempatan(data);
      } else if (response.status === 404) {
        setDataPenempatan([]);
      }
    } catch (error) {
      // Handle error
    }
  }

  // create data
  const [formData, setFormData] = useState({
    nis: "",
    name: "",
    rayon: "",
    rombel: "",
    industri: "",
    pemetaan: "",
    pembimbing: "",
    kontak_pic: "",
    keterangan: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCreateSubmit = async () => {
    setIsLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/penempatan/create`;

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
        await fetchPenempatan();
        setFormData(false)
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
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/penempatan/delete/${itemId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Data berhasil di hapus!");
        await fetchPenempatan();
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
           industri: editedData.industri,
           pemetaan: editedData.pemetaan,
           pembimbing: editedData.pembimbing,
           kontak_pic: editedData.kontak_pic,
           keterangan: editedData.keterangan,
         };
         const apiUrl = `${process.env.REACT_APP_API_URL}/api/penempatan/update/${editDataId}`;
 
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
           await fetchPenempatan();
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
    // {
    //   field: "gelombang",
    //   headerName: "Gelombang",
    //   width: 140,
    //   editable: true,
    // },
    {
      field: "industri",
      headerName: "Industri",
      width: 250,
      editable: true,
    },
    {
      field: "pemetaan",
      headerName: "Pemetaan",
      width: 190,
      editable: true,
    },
    {
      field: "pembimbing",
      headerName: "Pembimbing",
      width: 190,
      editable: true,
    },
    {
      field: "kontak_pic",
      headerName: "Kontak",
      width: 190,
      editable: true,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      width: 180,
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

  const [currentGelombang, setCurrentGelombang] = React.useState(1);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchPenempatan();
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ marginTop: "0px" }}>
                  Penempatan Siswa PKL Tahun {currentYear}
                </h2>
                <button className="buttonTambah" onClick={handleOpen}>
                  Tambah
                </button>
              </div>
              <Box>
                <DataGrid
                  rows={dataPenempatan}
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
        token={token}
        fetchPenempatan={fetchPenempatan}
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
