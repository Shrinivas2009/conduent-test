import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider, List, ListItem } from "@mui/material";

const LeftMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* User Name */}
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Welcome, {user || "User"}
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Navigation Menu */}
      <List>
        <ListItem button>
          <Typography>Dashboard</Typography>
        </ListItem>
        <ListItem button>
          <Typography>Settings</Typography>
        </ListItem>
      </List>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        fullWidth
      >
        Logout
      </Button>
    </Box>
  );
};

export default LeftMenu;
