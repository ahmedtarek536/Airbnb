import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { AddProduct } from "../services/apiProduct";
import TextEditor from "../components/TextEditor";
import Header from "../components/Header";
import FileInput from "../components/FileInput";
import Footer from "../components/Footer";
const categories = [
  { id: 1, name: "Icons" },
  { id: 2, name: "National parks" },
  { id: 3, name: "Amazing views" },
  { id: 4, name: "Amazing pools" },
  { id: 5, name: "Tiny homes" },
  { id: 6, name: "Rooms" },
  { id: 7, name: "Trending" },
  { id: 8, name: "Islands" },
  { id: 9, name: "Beachfront" },
  { id: 10, name: "Lakefront" },
  { id: 11, name: "Cabins" },
  { id: 12, name: "Arctic" },
  { id: 13, name: "A-frames" },
  { id: 14, name: "Historical homes" },
  { id: 15, name: "Campers" },
  { id: 16, name: "Skiing" },
  { id: 17, name: "Ryokans" },
  { id: 18, name: "Shepherd's huts" },
  { id: 19, name: "Minsus" },
  { id: 20, name: "Yurts" },
  { id: 21, name: "Off-the-grid" },
  { id: 22, name: "Houseboats" },
  { id: 23, name: "Adapted" },
  { id: 24, name: "Ski-in/out" },
  { id: 25, name: "Beach" },
  { id: 26, name: "Lake" },
  { id: 27, name: "Countryside" },
  { id: 28, name: "Mountains" },
  { id: 29, name: "Villas" },
];

function Signup() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  if (!token) navigate("/users/login");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: AddProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries("product");
      toast.success(data.message);
      reset();
      navigate("/products/manage");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    const values = {
      title: data.title,
      location: data.location,
      category: category,
      information: {
        price: Number(data.price),
        cleaning: Number(data.cleaning),
        guests: Number(data.guests),
        bedroom: Number(data.bedroom),
        bed: Number(data.bed),
        bathroom: Number(data.bathroom),
      },
      description: content,
      images: images,
    };

    mutate(values);
  }

  return (
    <Box>
      <Header />
      <Container className="mt-16">
        <div className="m-auto mb-28  rounded-3xl   px-4 sm:px-10 py-12 shadow-sm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="input w-full"
                placeholder="Enter Title"
                {...register("title")}
                required
              />
            </div>
            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="input w-full"
                placeholder="country, city, street"
                {...register("location")}
                required
              />
            </div>

            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="category">
                Category
              </label>
              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="categoroy"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Box>
              <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap">
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="input w-full"
                    placeholder="0.00 $"
                    {...register("price")}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="cleaning ">
                    Cleaning Fease
                  </label>
                  <input
                    id="cleaning"
                    type="number"
                    className="input w-full"
                    placeholder="0.00 $"
                    {...register("cleaning")}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="guests">
                    Guests
                  </label>
                  <input
                    id="guests"
                    type="number"
                    className="input w-full"
                    placeholder="0"
                    {...register("guests")}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="bedroom">
                    Bedroom
                  </label>
                  <input
                    id="bedroom"
                    type="number"
                    className="input w-full"
                    placeholder="0"
                    {...register("bedroom")}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="bed">
                    Bed
                  </label>
                  <input
                    id="bedroom"
                    type="number"
                    className="input w-full"
                    placeholder="0"
                    {...register("bed")}
                    required
                  />
                </div>
                <div className="mt-4 flex flex-col items-start justify-start gap-1">
                  <label className="font-semibold" htmlFor="bathroom">
                    Bathroom
                  </label>
                  <input
                    id="bedroom"
                    type="number"
                    className="input w-full"
                    placeholder="0"
                    {...register("bathroom")}
                    required
                  />
                </div>
              </Box>
            </Box>

            <div className="mt-4 flex flex-col items-start justify-start gap-1">
              <label className="font-semibold" htmlFor="description">
                Description
              </label>

              <TextEditor setContent={setContent} />
            </div>
            <FileInput onImages={setImages} />

            <p className="mt-4 text-xs text-stone-700">
              By continuing, you agree to Furniro Conditions of Use and Privacy
              Notice.
            </p>
            <div className="text-center">
              <button className="button mt-6">Continue</button>
            </div>
          </form>
        </div>
      </Container>
      <Footer />
    </Box>
  );
}

export default Signup;
