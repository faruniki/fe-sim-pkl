import { React } from "react";
import { Modal, Box, TextField, IconButton } from "@mui/material";
import "../../styles/penempatan.css";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from '@mui/material/MenuItem';

function EditDataModal({
  isLoading,
  editedData,
  editModalOpen,
  setEditedData,
  handleUpdateData,
  handleCloseEditModal,
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
    <Modal
      open={!!editModalOpen}
      onClose={handleCloseEditModal}
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
          height: 410,
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
              Edit Data
            </p>
            <Tooltip title="Tutup Modal" placement="top">
              <IconButton
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                  width: "40px",
                }}
                onClick={handleCloseEditModal}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            variant="outlined"
            id="outlined-select-currency"
            label="Nama Lengkap"
            value={editedData.name}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                name: e.target.value,
              })
            }
            sx={{ width: "100%", mt: 2 }}
            size="small"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Nomor Induk Siswa"
              value={editedData.nis}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  nis: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
            />
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Rombel"
              value={editedData.rombel}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  rombel: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Rayon"
              value={editedData.rayon}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  rayon: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
            />
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Perusahaan"
              value={editedData.pt}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  pt: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Email"
              value={editedData.email}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  email: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
            />
            <TextField
              variant="outlined"
              id="outlined-select-currency"
              label="Gelombang"
              value={editedData.priode}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  priode: e.target.value,
                })
              }
              sx={{ width: "49%", mt: 2 }}
              size="small"
              select
              >
                <MenuItem value="1">1 (Satu)</MenuItem>
                <MenuItem value="2">2 (Dua)</MenuItem>
              </TextField>
          </div>
          <button
            variant="contained"
            disableRipple
            disabled={isLoading}
            onClick={handleUpdateData}
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
            style={{ width: "100%", height: "40px", marginTop: "20px"}}
          >
            {isLoading ? "Loading..." : "UPDATE"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditDataModal;
