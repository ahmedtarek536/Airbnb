import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserbById } from "../services/apiUser";
import ProfileCard from "../features/Profile/ProfileCard";
import ConfirmedCard from "../features/Profile/ConfirmedCard";
import About from "../features/Profile/About";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ProfileProducts from "../features/Products/ProfileProducts";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserbById(id),
  });

  useEffect(
    function () {
      refetch;
    },
    [id]
  );

  if (error) {
    navigate("/");
  }

  return (
    <Box>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Box className="flex flex-col  md:flex-row items-start justify-start gap-16 w-full ">
            <Box className="">
              <ProfileCard user={data?.data} />
              <ConfirmedCard user={data?.data} />
            </Box>
            <Box>
              <About user={data?.data} />
              <br />
              <hr />
              <h4 className="mt-4 text-lg font-semibold">
                {data?.data?.fullName} Listening
              </h4>
              <ProfileProducts userId={data?.data?._id} />
            </Box>
          </Box>
        </Container>
      )}
      <Footer />
    </Box>
  );
}

export default Profile;
