import { Box, Container, Drawer, IconButton, Tooltip, Typography,Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Cookies from "js-cookie";

const Header = () => {
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove("jwt_token");
    navigate("/login")
  }
  const handleCancelOrOutsideClick = () => {
    setOpen(false);
  };

  const getLink = (path, name, icon) => {
    return (
      <Link to={path} style={{ color: "#FFFFFF", textDecoration: "none" }}>
        <Typography
          sx={{ display: { xs: "none", md: "block" }, fontSize: "20px",fontFamily : "Roboto" }}
          variant="p"
          marginLeft={"20px"}
          fontFamily={"sans-serif"}
        >
          {name}
        </Typography>

        <Tooltip
        title={name}
        sx={{
          fontSize: "1rem",
          borderRadius: "4px",
          display: { xs: "block", md: "none" },
          marginLeft: "10px",
        }}
      >
        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            marginLeft: "20px",
            fontSize: "30px",
          }}
        >
          {icon}
        </IconButton>
        </Tooltip>
      </Link>
    );
  };

  return (
    <Container
      sx={{
        backgroundColor: "#077A7D",
        height: "10vh",
        padding: "10px",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        color: "#FFFFFF",
      }}
    >
      <Typography variant="h1" fontSize={"30px"} fontFamily={"Roboto"} color="white">
        Agrofix
      </Typography>
      <Typography sx={{ flexGrow: 1 }}></Typography>
      {getLink("/", "Home", <HomeIcon fontSize="20px" />)}
      {getLink("/products", "Products", <ShoppingBasketIcon fontSize="20px" />)}
      {getLink("/orders", "Orders", <ShoppingCartIcon fontSize="20px" />)}
      {getLink("/cart", "Cart", <ReceiptLongIcon fontSize="20px" />)}
      <Typography
        sx={{ display: { xs: "none", md: "block" }, fontSize: "18px",cursor:"pointer" }}
        variant="p"
        marginLeft={"15px"}
        fontFamily={"sans-serif"}
        onClick={() => {setOpen(true)}}
      >
        Logout
      </Typography>
      <Tooltip
        title="logout"
        sx={{
          fontSize: "1rem",
          borderRadius: "4px",
          display: { xs: "block", md: "none" },
          marginLeft: "10px",
        }}
      >
        <IconButton onClick={() => {setOpen(true)}}>
          <ExitToAppIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleCancelOrOutsideClick} // Called when clicking outside
      >
        <Box
          p={3}
          textAlign="center"
          role="presentation"
          sx={{ minHeight: 150 }}
        >
          <Typography variant="h6">Are you sure you want to logout?</Typography>

          <Box mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                logout(); 
                setOpen(false);
              }}
              sx={{ mr: 2 }}
            >
              Yes, Logout
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelOrOutsideClick}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Header;
