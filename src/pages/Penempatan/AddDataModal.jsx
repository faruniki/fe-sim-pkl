import React, { useState } from "react";
import { Modal, Box, TextField  , IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/penempatan.css";
import Tooltip from "@mui/material/Tooltip";

function AddDataModal({
  setIsLoading,
  toast,
  isLoading,
  handleClose,
  open,
  token,
  fetchPenempatan,
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
            height: 450,
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
                label="Industri"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.industri}
                onChange={(e) => handleInputChange("industri", e.target.value)}
              ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-select-currency"
                label="Pemetaan"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.pemetaan}
                onChange={(e) => handleInputChange("pemetaan", e.target.value)}
              ></TextField>{" "}
              <TextField
                id="outlined-select-currency"
                label="Pembimbing"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.pembimbing}
                onChange={(e) =>
                  handleInputChange("pembimbing", e.target.value)
                }
              ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-select-currency"
                label="Kontak"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.kontak_pic}
                onChange={(e) =>
                  handleInputChange("kontak_pic", e.target.value)
                }
              ></TextField>
              <TextField
                id="outlined-select-currency"
                label="Keterangan"
                sx={{ width: "49%", mt: 2 }}
                size="small"
                value={formData.keterangan}
                onChange={(e) =>
                  handleInputChange("keterangan", e.target.value)
                }
              ></TextField>
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
            style={{ width: "100%", height: "40px" }}
          >
            {isLoading ? "Loading..." : "SUBMIT"}
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default AddDataModal;
