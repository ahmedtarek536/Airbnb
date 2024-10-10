import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserProduts } from "../services/apiProduct";
import UserProductCard from "../features/Products/UserProductCard";
import EmptyItem from "../components/EmptyItem";
import Footer from "../components/Footer";

function ProductsManages() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: getUserProduts,
  });
  return (
    <Box>
      <Header />
      <Container>
        <Box className="flex items-center justify-between mt-12">
          <h3 className="text-lg sm:text-3xl font-semibold">
            Your Experiences
          </h3>
          <Box className="w-fil">
            <button
              className="button text-xs px-3 sm:text-base sm:px-6"
              onClick={() => {
                navigate("new");
              }}
            >
              Creat a new idea
            </button>
          </Box>
        </Box>
        <Box className="">
          {data?.data?.length ? (
            data?.data?.map((product) => (
              <UserProductCard product={product} key={product?._id} />
            ))
          ) : (
            <EmptyItem>
              You don’t have any expresines , go and create new one.
            </EmptyItem>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default ProductsManages;
