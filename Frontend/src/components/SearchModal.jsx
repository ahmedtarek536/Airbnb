import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Search, SearchOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setQuery } from "../hooks/mainReducer";

const style = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SearchOutlined
        sx={{ fontSize: "17px" }}
        className="text-white text-sm"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }} className="flex gap-2 w-full p-2 mt-2">
          <input
            type="text"
            className="input w-full"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button className="button w-fit">
            <Search
              onClick={() => {
                dispatch(setQuery(searchQuery));
                setSearchQuery("");
                handleClose();
              }}
            />
          </button>
        </Box>
      </Modal>
    </div>
  );
}
