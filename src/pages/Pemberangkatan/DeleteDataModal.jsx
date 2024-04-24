import { React } from "react";
import { Modal, Box } from "@mui/material";

function DeleteDataModal({
  deleteModalOpen,
  closeDeleteConfirmationModal,
  handleDeleteItem,
  itemToDelete,
  isLoading,
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
      open={deleteModalOpen}
      onClose={closeDeleteConfirmationModal}
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
          width: 500,
          height: 200,
          border: "0px solid #000",
          boxShadow: 24,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <div
        style={{
          borderRadius: "0 0 3px 3px",
          flex: 1,
        }}
      > */}
        <p
          className="text-wrapper"
          style={{
            bgcolor: "#000000",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Apakah anda yakin ingin menghapus data ini?
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            variant="contained"
            disableRipple
            disabled={isLoading}
            onClick={closeDeleteConfirmationModal}
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
            className="buttonDelete"
            style={{ width: "49%", height: "40px" }}
          >
            {isLoading ? "Loading..." : "TIDAK"}
          </button>
          <button
            variant="contained"
            disableRipple
            disabled={isLoading}
            onClick={() => {
              handleDeleteItem(itemToDelete);
              closeDeleteConfirmationModal();
            }}
            className="buttonTambah"
            style={{ width: "49%", height: "40px" }}
          >
            {isLoading ? "Loading..." : "HAPUS"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteDataModal;
