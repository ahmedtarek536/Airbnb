import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/apiUser";
import ConfirmedCard from "../features/Profile/ConfirmedCard";
import About from "../features/Profile/About";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AboutEdit from "../features/Profile/AboutEdit";
import { useState } from "react";
import ProfileProducts from "../features/Products/ProfileProducts";
import ProfileCardEdit from "../features/Profile/ProfileCardEdit";
import Footer from "../components/Footer";
import ProfileCard from "../features/Profile/ProfileCard";

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  if (token == null) navigate("/users/login");
  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  if (error) {
    navigate("/");
  }
  function handleEditMode(val) {
    setEditMode(val);
  }
  return (
    <Box>
      <Header />
      <Container>
        <Box className="flex flex-col  md:flex-row items-start justify-start gap-16 w-full ">
          <Box className="">
            {editMode ? (
              <ProfileCardEdit user={data?.data} />
            ) : (
              <ProfileCard user={data?.data} />
            )}
            {!editMode && <ConfirmedCard user={data?.data} />}
          </Box>
          <Box>
            {editMode ? (
              <AboutEdit user={data?.data} onMode={handleEditMode} />
            ) : (
              <>
                <About user={data?.data}>
                  <button
                    className="button w-fit mt-4"
                    onClick={() => {
                      handleEditMode(true);
                    }}
                  >
                    Edit Profile
                  </button>
                </About>
                <br />
                <hr />
                <h4 className="mt-4 text-lg font-semibold">
                  {data?.data?.fullName} Listening
                </h4>
                <ProfileProducts userId={data?.data?._id} />
              </>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default UserProfile;
