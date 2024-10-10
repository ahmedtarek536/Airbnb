import { ProductionQuantityLimits } from "@mui/icons-material";
import { Box } from "@mui/material";

function EmptyItem({ children }) {
  return (
    <Box className=" bg-[#eee] rounded-lg text-center px-12 py-24 mt-4">
      <ProductionQuantityLimits sx={{ fontSize: "40px" }} />
      <p className="mt-4 text-sm ">{children}</p>
    </Box>
  );
}

export default EmptyItem;
