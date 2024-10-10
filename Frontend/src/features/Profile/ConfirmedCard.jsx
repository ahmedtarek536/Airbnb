import { Check, Close } from "@mui/icons-material";
import { Box } from "@mui/material";

function ConfirmedCard({ user }) {
  return (
    <Box className="mt-10  border border-bColor rounded-3xl px-6 py-8 w-full">
      <h4 className=" text-xl ">{user?.fullName} confirmed Information</h4>
      <Box className="mt-4 font-mono">
        <Box className="mt-4 flex items-center justify-start gap-3">
          {user?.governmentID ? <Check /> : <Close />} Identity
        </Box>
        <Box className="mt-4 flex items-center justify-start gap-3">
          <Check /> Email Address
        </Box>
        <Box className="mt-4 flex items-center justify-start gap-3">
          {user?.phoneNumber ? <Check /> : <Close />}
          Phone Number
        </Box>
        <p className="font-mono text-xs underline cursor-pointer mt-8">
          Learn about identity vertfication
        </p>
      </Box>
    </Box>
  );
}

export default ConfirmedCard;
