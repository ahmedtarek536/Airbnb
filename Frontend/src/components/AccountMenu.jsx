import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { NotificationsOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logoutToken } from "../hooks/userReducer";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";

export default function AccountMenu() {
  const [searchMode, setSearchMode] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
  const user = data?.data;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleSearchMode() {
    setSearchMode((e) => !e);
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 2 }}>
          <Box className="hidden sm:block">
            <NotificationsOutlined sx={{ fontSize: "25px" }} />
          </Box>
          <Box
            className="bg-primary w-8 h-8 rounded-full flex justify-center items-center sm:hidden"
            onClick={handleSearchMode}
          >
            <SearchModal />
          </Box>
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user?.profileImage}
              alt={user?.title}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/users/profile");
          }}
        >
          <Avatar src={user?.profileImage} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>Messeges</MenuItem>
        <MenuItem onClick={handleClose}>Notfications</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/orders");
          }}
        >
          Orders
        </MenuItem>
        <MenuItem onClick={handleClose}>White List</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/orders/listening");
          }}
        >
          Mannage Listengin
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/products/manage");
          }}
        >
          Mannage Experience
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/users/account");
          }}
        >
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logoutToken());
            navigate("/");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
