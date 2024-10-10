import { Lock, ShoppingBag, Visibility } from "@mui/icons-material";
import { Box } from "@mui/material";

function FAQSection() {
  return (
    <Box className="border border-bColor rounded-3xl p-8 ">
      <Box className="border-b border-bColor py-8">
        <Box>
          <Lock sx={{ fontSize: "45px" }} />
        </Box>
        <h5 className="font-semibold text-xl mt-2">
          Why isn’t my info shown here?
        </h5>
        <p className="text-secondary mt-3">
          We’re hiding some account details to protect your identity.
        </p>
      </Box>
      <Box className="border-b border-bColor py-8">
        <Box>
          <ShoppingBag sx={{ fontSize: "45px" }} />
        </Box>
        <h5 className="font-semibold text-xl mt-2">
          Which details can be edited?
        </h5>
        <p className="text-secondary mt-3">
          Contact info and personal details can be edited. If this info was used
          to verify your identity, you’ll need to get verified again the next
          time you book or to continue hosting.
        </p>
      </Box>
      <Box className="border-b border-bColor py-8">
        <Box>
          <Visibility sx={{ fontSize: "45px" }} />
        </Box>
        <h5 className="font-semibold text-xl mt-2">
          What info is shared with others?
        </h5>
        <p className="text-secondary mt-3">
          Airbnb only releases contact information for Hosts and guests after a
          reservation is confirmed.
        </p>
      </Box>
    </Box>
  );
}

export default FAQSection;
