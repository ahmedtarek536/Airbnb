import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserProdutsById } from "../../services/apiProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/Loader";

function ProfileProducts({ userId }) {
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => getUserProdutsById(userId),
    queryKey: ["product", "user", "profile"],
  });

  useEffect(
    function () {
      refetch();
    },
    [userId]
  );

  const products = data?.data;
  if (isLoading) return <Loader />;
  return (
    <Box className="grid grid-template-200 gap-4 mt-6">
      {products?.map((product) => (
        <Card key={product?._id} product={product} />
      ))}
    </Box>
  );
}

function Card({ product }) {
  const navigate = useNavigate();
  return (
    <Box>
      <img
        src={product?.images[0]}
        alt=""
        className="rounded-lg h-[200px] w-full object-cover"
      />
      <Box
        className=" cursor-pointer"
        onClick={() => navigate(`/products/${product?._id}`)}
      >
        <h5 className="font-semibold">{product?.title}</h5>
        <p className="text-sm text-secondary">{product?.location}</p>
      </Box>
    </Box>
  );
}

export default ProfileProducts;
