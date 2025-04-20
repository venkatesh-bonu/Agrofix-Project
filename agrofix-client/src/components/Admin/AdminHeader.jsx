import { Box, Button, Container, Drawer, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwt_admin_token");
    navigate("/login");
  };

  const handleCancelOrOutsideClick = () => {
    setOpen(false);
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
      <Typography
        variant="h1"
        fontSize={"30px"}
        fontFamily={"Roboto"}
        color="white"
      >
        Agrofix
      </Typography>
      <Typography sx={{ flexGrow: 1 }}></Typography>
      <Typography
        sx={{
          fontSize: {
            xs: '0.9rem',
            sm: '1.2rem',   
            md: '1.2rem',   
          },
          cursor: "pointer",
          textDecoration : "none",
        }}
        variant="p"
        marginLeft={"15px"}
        color="white"
        fontFamily={"sans-serif"}
        component={Link}
        to="/admin/dashboard"
      >
        Dashboard
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: '0.9rem',
            sm: '1.2rem',   
            md: '1.2rem', 
          },
          cursor: "pointer",
          textDecoration : "none"
        }}
        variant="p"
        marginLeft={"15px"}
        color="white"
        fontFamily={"sans-serif"}
        component={Link}
        to="/admin/products"
      >
        Products
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: '0.9rem',
            sm: '1.2rem',   
            md: '1.2rem', 
          },
          cursor: "pointer",
          textDecoration: "none",
        }}
        variant="p"
        color="white"
        marginLeft={"15px"}
        fontFamily={"sans-serif"}
        component={Link}
        to="/admin/orders"
      >
        Orders
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: '0.9rem',
            sm: '1.2rem',   
            md: '1.2rem', 
          },
          cursor: "pointer",
        }}
        variant="p"
        marginLeft={"15px"}
        fontFamily={"sans-serif"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Logout
      </Typography>
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
          <Typography variant="h6">Are you sure you want to logout as Admin?</Typography>

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

export default AdminHeader;

/*
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
*/
