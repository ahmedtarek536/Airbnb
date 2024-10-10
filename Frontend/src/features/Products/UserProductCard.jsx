import { Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DeleteProduct } from "../../services/apiProduct";

function UserProductCard({ product }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries("product");
      toast.success("Delete Product Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    mutate(product?._id);
  };
  return (
    <Box className="p-4  shadow-md border border-bColor mt-8 rounded-lg mb-4">
      <Box className="flex items-center justify-between gap-2">
        <Box>
          <h5 className="text-xl sm:text-2xl font-semibold">Experiences</h5>
          <p className="text-xs sm:text-sm mt-1">{product?.title}</p>
        </Box>
        <img src={product?.images?.at(0)} className="w-24 sm:w-40 rounded-xl" />
      </Box>
      <Box className="flex items-center gap-4 text-sm py-6 mt-6 border-y border-bColor">
        <Telegram />
        <Box>
          <h6 className="font-semibold">Finshing submiting your experiences</h6>
          <p className="font-xs">
            Make sure to complete all sections to make your expreince
            recommanded
          </p>
        </Box>
      </Box>
      <Box className="flex items-center gap-6 pt-4 pb-2">
        <p
          className="font-semibold cursor-pointer underline"
          onClick={() => {
            navigate(`/products/${product._id}`);
          }}
        >
          Continue
        </p>
        <p
          className="font-semibold cursor-pointer underline"
          onClick={handleDelete}
        >
          Delete
        </p>
      </Box>
    </Box>
  );
}

export default UserProductCard;
