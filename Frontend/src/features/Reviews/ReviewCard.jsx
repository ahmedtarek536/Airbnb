import { Star } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";

function ReviewCard({ review }) {
  return (
    <Box>
      <Box className="flex gap-5 items-center ">
        <Avatar
          sx={{ width: "44px", height: "44px" }}
          alt={review?.user_id?.fullName}
          src={review?.user_id?.profileImage}
        />
        <div className="">
          <p className="font-mono ">{review?.user_id?.fullName}</p>
          <p className="text-xs text-secondary ">{review?.user_id?.location}</p>
        </div>
      </Box>
      <Box className="font-xs  font-semibold mt-2 font-mono">
        {[...Array(review?.rate)].map((_, index) => (
          <Star key={index} sx={{ fontSize: "15px" }} />
        ))}
        {" . "}

        {new Date(review?.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </Box>
      <Box className="font-sm ">{review?.description}</Box>
    </Box>
  );
}

export default ReviewCard;
