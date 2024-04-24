import React, { useState } from "react";
import { Modal, Box, TextField  , IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/penempatan.css";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from '@mui/material/MenuItem';

function AddDataModal({
  isLoading,
  handleClose,
  open,
  formData,
  handleCreateSubmit,
  handleInputChange,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            ...style,
            width: 800,
            height: 400,
            border: "0px solid #000",
            boxShadow: 24,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              borderRadius: "0 0 3px 3px",
              flex: 1,
            }}
          >
            <div
              className="label"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p
                className="text-wrapper"
                style={{
                  bgcolor: "#000000",
                  fontFamily: "Montserrat",
                  fontWeight: 800,
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: "10px"
                }}
              >
                Tambah Data
              </p>
              <Tooltip title="Tutup Modal" placement="top">
                <IconButton
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    width: "40px",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
            <TextField
              id="outlined-select-currency"
              label="Nama Lengkap"
              sx={{ width: "100%" }}
              size="small"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            ></TextField>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-select-currency"
                label="Nomor Induk Siswa"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.nis}
                onChange={(e) => handleInputChange("nis", e.target.value)}
              ></TextField>{" "}
              <TextField
                id="outlined-select-currency"
                label="Rombel"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.rombel}
                onChange={(e) => handleInputChange("rombel", e.target.value)}
              ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-select-currency"
                label="Rayon"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.rayon}
                onChange={(e) => handleInputChange("rayon", e.target.value)}
              ></TextField>{" "}
              <TextField
                id="outlined-select-currency"
                label="Perusahaan"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.pt}
                onChange={(e) => handleInputChange("pt", e.target.value)}
              ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-select-currency"
                label="Email"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              ></TextField>{" "}
              <TextField
                id="outlined-select-currency"
                label="Gelombang"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.priode}
                onChange={(e) =>
                  handleInputChange("priode", e.target.value)
                }
                select
              >
                <MenuItem value="1">1 (Satu)</MenuItem>
                <MenuItem value="2">2 (Dua)</MenuItem>
              </TextField>
            </div>
          </div>
          <button
            variant="contained"
            disableRipple
            disabled={isLoading}
            onClick={handleCreateSubmit}
            // sx={{
            //   width: "100%",
            //   ml: "2%",
            //   mt: 4,
            //   borderRadius: 2.5,
            //   backgroundColor: "#32AE2F",
            //   "&:hover": {
            //     backgroundColor: "#1d691b",
            //     boxShadow: "none",
            //   },
            // }}
            className="buttonTambah"
            style={{ width: "100%", height: "40px", color: "#FFF" }}
          >
            {isLoading ? "Loading..." : "SUBMIT"}
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default AddDataModal;
