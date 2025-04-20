import React from "react";
import Header from "../Header/Header";
import { productsCatalog } from "../../sampleData";
import { Button, Container, Typography } from "@mui/material";
import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#F1F8E9",
      }}
    >
      {<Header />}
      <div className="home-container">
        <div className="home-description-container">
          <Typography
            variant="h1"
            sx={{ fontSize: "40px", fontWeight: "600", fontFamily: "sans-serif" }}
          >
            Algofix
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "20px",
              fontWeight: "400",
              fontFamily: "sans-serif",
              marginTop: "20px",
              lineHeight : "30px"
            }}
          >
            Welcome to our store – your trusted source for fresh fruits and
            vegetables. We offer a wide variety of farm-fresh produce, carefully
            selected to bring you the best in taste and quality. Whether you're
            looking for everyday essentials or seasonal specialties, we’re here
            to help you eat fresh and live healthy.
          </Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/products"
            sx={{ alignSelf: "flex-start", marginTop: "20px" }}
          >
            Buy Products
          </Button>
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/046/822/496/non_2x/a-wicker-basket-overflowing-with-an-assortment-of-vibrant-organic-vegetables-and-fruits-isolated-on-a-transparent-background-free-png.png"
          className="home-img"
        />
      </div>
    </div>
  );
};

export default Home;
