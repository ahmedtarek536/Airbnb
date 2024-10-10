import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getProducts } from "../../services/apiProduct";
import { useEffect } from "react";

function Products() {
  const query = useSelector((state) => state.main.query);

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["product", query],
    queryFn: () => getProducts(query),
  });
  useEffect(
    function () {
      refetch();
    },
    [query]
  );

  const products = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <Box className="mt-4">
      <Box className="grid grid-template-250 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default Products;
