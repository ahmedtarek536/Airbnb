import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { dateDifferenceInDays } from "../../../utils/help";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddOrder } from "../../services/apiOrder";
import toast from "react-hot-toast";

function ReserveCard({ product }) {
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [nights, setNights] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const totalNights = (nights ? nights : 1) * product?.information?.price;
  const cleaningFee = product?.information?.cleaning;
  const airbnbFee = totalNights / 10;
  const totalPrice = totalNights + cleaningFee + airbnbFee;

  useEffect(
    function () {
      setNights(dateDifferenceInDays(checkin, checkout));
    },
    [checkin, checkout]
  );

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: AddOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries("order");
      toast.success(data.message);
      reset();
      setCheckin("");
      setCheckout("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    const values = {
      product_id: product._id,
      host_id: product.host_id,
      quantityNights: +nights,
      price: product?.information?.price,
      guests: data.guests,
      totalAmount: totalPrice,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      deliveredAt: checkin,
      leaveAt: checkout,
    };
    mutate(values);
  }
  return (
    <>
      <div className="shadow-md px-4 sm:px-8 py-4 rounded-xl border border-bColor w-full ">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <Box className="sm:flex gap-1">
              <div className="mt-3 flex flex-col items-start justify-start gap-1 w-full">
                <label className="font-semibold" htmlFor="chekin">
                  Checkin
                </label>
                <input
                  id="checkin"
                  type="date"
                  min={formattedDate}
                  value={checkin}
                  onInput={(e) => setCheckin(e.target.value)}
                  className="input w-full"
                  {...register("checkin")}
                  required
                />
              </div>
              <div className="mt-3 flex flex-col items-start justify-start gap-1 w-full">
                <label className="font-semibold" htmlFor="checkout">
                  Check out
                </label>
                <input
                  id="checkout"
                  type="date"
                  min={checkin}
                  value={checkout}
                  onInput={(e) => setCheckout(e.target.value)}
                  className="input w-full"
                  {...register("checkout")}
                  required
                />
              </div>
            </Box>
            <div className="mt-2 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold block sm:hidden" htmlFor="guests">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                className="input w-full"
                placeholder="num guests"
                {...register("guests")}
                required
              />
            </div>

            <div className="text-center">
              <button className="button mt-4 ">Reserve</button>
            </div>
            <p className="text-center text-xs mt-4">You won't be charged yet</p>
            <Box className="flex items-center justify-between gap-4 mt-6">
              <p className="text-mono text-sm underline">
                {product?.information?.price}.us x {nights ? nights : 1} nights
              </p>
              <span className="font-mono">{totalNights?.toFixed(2)} $</span>
            </Box>
            <Box className="flex items-center justify-between gap-4 mt-2">
              <p className="text-sm underline">Cleaning service fee</p>
              <span className="font-mono">{cleaningFee?.toFixed(2)} $</span>
            </Box>
            <Box className="flex items-center justify-between gap-4 mt-2">
              <p className="text-sm underline">Airbnb service fee</p>
              <span className="font-mono">{airbnbFee?.toFixed(2)} $</span>
            </Box>

            <Box className="flex items-center justify-between gap-4 mt-3 border-t pt-3 border-bColor">
              <p className="font-semibold">Total Price</p>
              <span className="font-mono">{totalPrice?.toFixed(2)} $</span>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReserveCard;
