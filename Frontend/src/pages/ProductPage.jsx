import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { FavoriteBorder, IosShare } from "@mui/icons-material";
import ProductDetails from "../features/Products/ProductDetails";
import HostDetails from "../features/Host/HostDetails";
import ReviewsDetails from "../features/Reviews/ReviewsDetails";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import ReserveCard from "../features/Products/ReserveCard";
import { useQuery } from "@tanstack/react-query";
import { getProdutcById } from "../services/apiProduct";
import Footer from "../components/Footer";

function ProductPage() {
  const { productID } = useParams();
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProdutcById(productID),
  });
  const product = data?.data;

  return (
    <Box>
      <Header />
      <Container>
        <Box className="flex justify-between items-center gap-4 mt-8 mb-4">
          <h2 className="text-lg sm:text-2xl font-semibold  ">
            {product?.title}
          </h2>
          <Box className="flex gap-2 sm:gap-5 text-sm font-medium font-mono">
            <p className="cursor-pointer flex items-center ">
              <IosShare sx={{ fontSize: "17px" }} />{" "}
              <span className="underline">Share</span>
            </p>
            <p className="cursor-pointer flex items-center ">
              <FavoriteBorder sx={{ fontSize: "18px" }} />{" "}
              <span className="underline">Save</span>
            </p>
          </Box>
        </Box>
        <Box className="overflow-hiddegn">
          <ImageSlider
            images={product?.images}
            style={"h-[300px] sm:h-[500px]"}
          />
        </Box>
        <Box className="flex gap-6 mt-8">
          <Box className=" w-full">
            <Box className="lg:flex gap-40 items-start  justify-between">
              <ProductDetails product={product} />
              <Box className="hidden lg:block">
                <ReserveCard product={product} />
              </Box>
            </Box>
            <HostDetails product={product} />
          </Box>
        </Box>
        <ReviewsDetails product={product} />
      </Container>
      <Footer />
    </Box>
  );
}

export default ProductPage;
