import { SearchOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../hooks/mainReducer";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  function handleSearch() {
    if (!searchQuery) return;
    dispatch(setQuery(searchQuery));
    setSearchQuery("");
  }
  return (
    <Box className="relative w-[35%] hidden sm:block">
      <input
        type="search"
        placeholder="Any week  |  Any where  |  Search"
        className="py-2 px-6   sm:w-full rounded-3xl border border-bColor shadow-sm outline-none "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-primary w-8 h-8 rounded-full flex justify-center items-center  absolute top-[5px] right-2 cursor-pointer"
        onClick={handleSearch}
      >
        <SearchOutlined
          sx={{ fontSize: "17px" }}
          className="text-white text-sm"
        />
      </button>
    </Box>
  );
}

export default Searchbar;
