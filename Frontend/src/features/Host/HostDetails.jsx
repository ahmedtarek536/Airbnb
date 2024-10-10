import { Star } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HostDetails({ product }) {
  const navigate = useNavigate();
  const numReviews = product?.reviews_id?.reviews?.length;
  const totalRate = product?.reviews_id?.reviews?.reduce(
    (cur, next) => cur + next.rate,
    0
  );
  const averageRate = (totalRate / numReviews).toFixed(0);
  const createdAt = new Date(product?.host_id?.createdAt);
  const now = Date.now();
  const diffInMs = now - createdAt;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  let hostingNumber = 0;
  let hostingText = "";

  if (diffInYears >= 1) {
    hostingNumber = diffInYears;
    hostingText = `Year${diffInYears > 1 ? "s" : ""} Hosting`;
  } else if (diffInMonths >= 1) {
    hostingNumber = diffInMonths;
    hostingText = `Month${diffInMonths > 1 ? "s" : ""} Hosting`;
  } else {
    hostingNumber = diffInDays;
    hostingText = `Day${diffInDays > 1 ? "s" : ""} Hosting`;
  }
  return (
    <Box>
      <Box className="border-y border-bgColor mt-10 py-12  ">
        <h4 className="mt-4 text-xl font-[600]">Meet your Host</h4>
        <Box className="shadow-xl rounded-3xl  flex items-center justify-start px-6  py-4 sm:px-16 gap-6 sm:gap-16 w-fit mt-8">
          <Box className="flex items-center justify-center">
            <Box className="text-center">
              <Avatar
                sx={{ width: "88px", height: "88px" }}
                className="m-auto cursor-pointer"
                alt={product?.host_id?.fullName}
                src={product?.host_id?.profileImage}
                onClick={() => navigate(`/profile/${product?.host_id?._id}`)}
              />
              <h4 className="font-semibold text-xl mt-3">
                {product?.host_id?.fullName}
              </h4>
              <p className="">Host</p>
            </Box>
          </Box>

          <Box className="">
            <Box className="border-b border-bgColor  flex items-start justify-center flex-col gap- p-2">
              <p className="font-semibold text-lg">{numReviews}</p>
              <span className="text-[10px]">Reviews</span>
            </Box>
            <Box className="border-b border-bgColor  flex items-start justify-center flex-col gap- p-2">
              <p className="font-semibold text-sm flex items-center">
                {averageRate != "NaN" ? averageRate : "New"}
                <Star sx={{ fontSize: "15px", marginLeft: "2px" }} />
                {""}
              </p>
              <span className="text-[10px]">Rating</span>
            </Box>
            <Box className="border-b border-bgColor  flex items-start justify-center flex-col gap- p-2">
              <p className="font-semibold text-xs p-0 m-0">{hostingNumber}</p>
              <span className="text-[10px]">{hostingText}</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HostDetails;
