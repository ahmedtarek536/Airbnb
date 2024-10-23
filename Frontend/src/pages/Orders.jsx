import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserOrder } from "../services/apiOrder";
import OrderCard from "../features/Orders/OrderCard";
import EmptyItem from "../components/EmptyItem";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Orders() {
  const { isLoading, data } = useQuery({
    queryKey: ["order"],
    queryFn: getUserOrder,
  });

  return (
    <Box>
      <Header />
      <Container>
        <Box className="flex items-center justify-between mt-12">
          <h3 className="text-lg sm:text-3xl font-semibold">Your Orders</h3>
          <Box className="w-fil"></Box>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            {data?.data?.length ? (
              data?.data?.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <EmptyItem>
                You don’t have any orders today, go to shopping page.
              </EmptyItem>
            )}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default Orders;
