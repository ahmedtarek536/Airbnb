import { Star } from "@mui/icons-material";
import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";

function ProductCard({ product }) {
  const numReviews = product.reviews_id?.reviews?.length;
  const totalRate = product.reviews_id?.reviews?.reduce(
    (cur, next) => cur + next.rate,
    0
  );

  const averageRate = (totalRate / numReviews).toFixed(2);
  const navigate = useNavigate();
  function handleOpenProduct() {
    navigate(`/products/${product?._id}`);
  }

  return (
    <Box className="">
      <ImageSlider images={product?.images} style={"h-[270px]"} />
      <Box className="flex items-start justify-between gap-6 mt-2">
        <h2
          className="font-semibold text-sm cursor-pointer"
          onClick={handleOpenProduct}
        >
          {product?.title}
        </h2>
        <p className="flex items-center justify-center gap-1 text-md font-mono">
          <Star sx={{ fontSize: "15px" }} />{" "}
          {averageRate != "NaN" ? averageRate : "New"}
        </p>
      </Box>
      <p
        className="text-md text-secondary cursor-pointer"
        onClick={handleOpenProduct}
      >
        {product?.location}
      </p>
      <p className="font-semibold text-sm font-mono mt-1">
        {product?.information?.price} US / night
      </p>
    </Box>
  );
}

export default ProductCard;
