import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuery } from "../hooks/mainReducer";

function Logo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate("/");
        dispatch(setQuery(""));
      }}
    >
      <h1 className="text-primary font-bold text-2xl  cursor-pointer font-mono flex items-center gap-1">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.h7XeAZB8m0tydtSzecgD4wAAAA&pid=Api&P=0&h=220"
          alt=""
          className="w-10"
        />
        airbnb
      </h1>
    </Box>
  );
}

export default Logo;
