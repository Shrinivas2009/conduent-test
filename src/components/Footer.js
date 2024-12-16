import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: 2,
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Application. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
