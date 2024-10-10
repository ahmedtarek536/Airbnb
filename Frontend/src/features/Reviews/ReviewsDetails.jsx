import { Star } from "@mui/icons-material";
import { Box } from "@mui/material";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

function ReviewsDetails({ product }) {
  const numReviews = product?.reviews_id?.reviews?.length;
  const totalRate = product?.reviews_id?.reviews?.reduce(
    (cur, next) => cur + next.rate,
    0
  );

  const averageRate = (totalRate / numReviews).toFixed(1);
  return (
    <Box className="mt-12">
      <Box className="flex items-center justify-between">
        <h4 className="font-semibold text-xl font-mono">
          <Star /> {averageRate != "NaN" ? averageRate : "New"} . {numReviews}{" "}
          Reviews
        </h4>
        <ReviewModal review_id={product?.reviews_id?._id} />
      </Box>
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-10">
        {product?.reviews_id?.reviews?.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </Box>
    </Box>
  );
}

export default ReviewsDetails;
