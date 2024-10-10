import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UpdateOrder } from "../../services/apiOrder";

const ListOrderStatus = [
  "Pending",
  "Confirmed",
  "Currently hosting",
  "Completed",
  "Cancelled",
];

function OrderListening({ order }) {
  const product = order?.product_id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: UpdateOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries("product");
      toast.success("update Order Successful");
    },
    onError: (error) => {
      toast.error("update Order Fail");
    },
  });

  const handleUpdate = (status) => {
    mutate({ orderId: order?._id, data: { orderStatus: status } });
  };
  return (
    <Box className="p-4  shadow-md mt-8 rounded-lg mb-4 border border-bColor">
      <Box className="flex items-center justify-between gap-4">
        <Box>
          <h5 className="text-lg sm:text-2xl font-semibold">
            {product?.title}
          </h5>
          <p className="text-xs sm:text-sm mt-1">{product?.location}</p>
        </Box>
        <img src={product?.images?.at(0)} className="w-24 sm:w-40 rounded-xl" />
      </Box>
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm py-6 mt-6 border-y border-bColor font-mono ">
        <p>
          {" "}
          <span className="font-semibold">Guests:</span> {order?.guests}
        </p>
        <p>
          {" "}
          <span className="font-semibold">Nights:</span> {order?.quantityNights}
        </p>
        <p>
          <span className="font-semibold">Price per Night:</span> {order?.price}
        </p>
        <p>
          <span className="font-semibold">Payment Method:</span>{" "}
          {order?.paymentMethod}
        </p>
        <p>
          <span className="font-semibold">Payment Status:</span>{" "}
          {order?.paymentStatus}
        </p>
        <p>
          <span className="font-semibold">Order Status :</span>{" "}
          {order?.orderStatus}
        </p>
        <p>
          <span className="font-semibold">Delivered At:</span>{" "}
          {new Date(order?.deliveredAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Leave At:</span>{" "}
          {new Date(order?.leaveAt).toLocaleDateString()}
        </p>
      </Box>
      <Box className="flex items-center justify-between gap-8 text-xs sm:text-base">
        <Box className="flex items-center gap-2 sm:gap-6 pt-4 pb-2">
          {order?.orderStatus == "Cancelled" ||
          order?.orderStatus == "Completed" ? null : (
            <>
              <button
                className="font-semibold cursor-pointer underline"
                onClick={() => {
                  handleUpdate(
                    ListOrderStatus[
                      ListOrderStatus.indexOf(order?.orderStatus) + 1
                    ]
                  );
                }}
              >
                {
                  ListOrderStatus[
                    ListOrderStatus.indexOf(order?.orderStatus) + 1
                  ]
                }
              </button>
              <button
                className="font-semibold cursor-pointer underline"
                onClick={() => handleUpdate("Cancelled")}
              >
                {order?.orderStatus != "Cancelled" && "Cancel"}
              </button>
            </>
          )}
        </Box>
        <Box className="font-mono mt-1">
          Total Amount: {order?.totalAmount?.toFixed(2)} $
        </Box>
      </Box>
    </Box>
  );
}

export default OrderListening;
