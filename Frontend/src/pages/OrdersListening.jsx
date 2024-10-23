import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getHostOrder } from "../services/apiOrder";
import { useEffect, useState } from "react";
import OrderListening from "../features/Orders/OrderListening";
import EmptyItem from "../components/EmptyItem";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function OrdersListening() {
  const { isLoading, data } = useQuery({
    queryKey: ["order"],
    queryFn: getHostOrder,
  });
  const [ordersStatus, setOrdersStatus] = useState("Pending");
  const [Orders, setOrders] = useState(data?.data);

  useEffect(
    function () {
      setOrders(() =>
        data?.data?.filter((order) => order?.orderStatus == ordersStatus)
      );
    },
    [ordersStatus, data?.data]
  );

  return (
    <Box>
      <Header />
      <Container>
        <Box className="mt-16">
          <h3 className="text-lg sm:text-3xl ">Welcom Back, user</h3>
        </Box>
        <Box className="mt-12 flex justify-between items-center gap-4">
          <h3 className="text-base sm:text-2xl font-semibold ">
            Your reservation
          </h3>
          <p className="font-mono text-xs sm:text-base underline">
            All reservations ({data?.data.length})
          </p>
        </Box>
        <Box className="flex items-center justify-start gap-2 text-sm mt-6 flex-wrap">
          <button
            className={
              `${
                ordersStatus == "Pending" &&
                "border-2 border-black bg-gray-100 "
              }` +
              " py-[5px] px-6 rounded-3xl border border-bColor cursor-pointer hover:bg-gray-100"
            }
            onClick={() => {
              setOrdersStatus("Pending");
            }}
          >
            Pending
          </button>
          <button
            className={
              `${
                ordersStatus == "Confirmed" &&
                "border-2 border-black bg-gray-100 "
              }` +
              " py-[5px] px-6 rounded-3xl border border-bColor cursor-pointer hover:bg-gray-100"
            }
            onClick={() => {
              setOrdersStatus("Confirmed");
            }}
          >
            Confirmed
          </button>
          <button
            className={
              `${
                ordersStatus == "Currently hosting" &&
                "border-2 border-black bg-gray-100 "
              }` +
              " py-[5px] px-6 rounded-3xl border border-bColor cursor-pointer hover:bg-gray-100"
            }
            onClick={() => {
              setOrdersStatus("Currently hosting");
            }}
          >
            Currently hosting
          </button>
          <button
            className={
              `${
                ordersStatus == "Completed" &&
                "border-2 border-black bg-gray-100 "
              }` +
              " py-[5px] px-6 rounded-3xl border border-bColor cursor-pointer hover:bg-gray-100"
            }
            onClick={() => {
              setOrdersStatus("Completed");
            }}
          >
            Completed
          </button>
          <button
            className={
              `${
                ordersStatus == "Cancelled" &&
                "border-2 border-black bg-gray-100 "
              }` +
              " py-[5px] px-6 rounded-3xl border border-bColor cursor-pointer hover:bg-gray-100"
            }
            onClick={() => {
              setOrdersStatus("Cancelled");
            }}
          >
            Cancelled
          </button>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            {Orders?.length ? (
              Orders?.map((order) => (
                <OrderListening key={order._id} order={order} />
              ))
            ) : (
              <EmptyItem>
                You don’t have any orders today, check next section.
              </EmptyItem>
            )}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default OrdersListening;
