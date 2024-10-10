import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddReview } from "../../services/apiReview";
import toast from "react-hot-toast";
import { Rating } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function ReviewModal({ review_id }) {
  // console.log(review_id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rate, setRate] = React.useState(2);
  const [description, setDescription] = React.useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: AddReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries("product");
      toast.success(data.message);
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSave() {
    if (!description) {
      toast.error("please enter your rate");
      return;
    }
    mutate({
      review_id: review_id,
      description: description,
      rate: rate,
    });
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg shadow-md border border-bColor">
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
            />
          </Box>
          <textarea
            className="input w-full my-6"
            placeholder="Enter your review"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
}
