import { Star } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import ReserveCard from "./ReserveCard";

function ProductDetails({ product }) {
  const numReviews = product?.reviews_id?.reviews?.length;
  const totalRate = product?.reviews_id?.reviews?.reduce(
    (cur, next) => cur + next.rate,
    0
  );
  const averageRate = (totalRate / numReviews).toFixed(2);

  return (
    <Box className="">
      {" "}
      <h3 className="font-semibold text-lg sm:text-xl ">{product?.location}</h3>
      <Box className="flex gap-6 text-sm">
        <span>{product?.information?.guests} guests </span>
        <span>{product?.information?.bedroom} bedroom</span>
        <span>{product?.information?.bed} bed</span>
        <span>{product?.information?.bed} bath</span>
      </Box>
      <p className="flex items-center  gap-4 text-md font-mono text-md mt-2">
        <div>
          <Star sx={{ fontSize: "15px", marginRight: "4px" }} />
          {""}
          {averageRate != "NaN" ? averageRate : "New"}
        </div>
        <p className="underline cursor-pointer">{numReviews} Reviews</p>
      </p>
      <Box className="mt-4 block lg:hidden">
        <ReserveCard product={product} />
      </Box>
      <Box className="flex gap-5 items-center mt-8 py-5 border-y border-bColor">
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          alt={product?.host_id?.fullName}
          src={product?.host_id?.profileImage}
        />
        <div className="">
          <p className="font-mono ">{product?.host_id?.fullName}</p>
          <p className="text-xs text-secondary ">{product?.host_id?.email}</p>
        </div>
      </Box>
      <Box className="mt-8 ">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></div>
      </Box>
    </Box>
  );
}

export default ProductDetails;
