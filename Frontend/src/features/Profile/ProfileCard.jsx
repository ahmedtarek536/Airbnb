import { Avatar, Box } from "@mui/material";

function ProfileCard({ user }) {
  return (
    <Box className="shadow-md border border-bColor rounded-3xl  flex items-center justify-start  px-6  py-4 sm:px-16  gap-6 sm:gap-16 w-full mt-8">
      <Box className="flex items-center px-6 sm:px-12 py-6 justify-center m-auto w-full">
        <Box className="text-center  m-auto w-full">
          <Avatar
            sx={{ width: "150px", height: "150px" }}
            className="m-auto"
            alt={user?.fullName}
            src={user?.profileImage}
          />
          <h4 className="font-semibold text-lg mt-3">{user?.fullName}</h4>
          <p className="">Host</p>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileCard;
