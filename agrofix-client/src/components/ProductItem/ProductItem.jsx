import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sampleProduct } from "../../sampleData";
import "./productItem.css";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../Header/Header";
import { Add as AddIcon, Remove as MinusIcon } from "@mui/icons-material";

import { UseDispatch, useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";
import Cookies from "js-cookie";
import axios from "axios";

const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const {
    productName = "",
    category = "",
    productUrl = "",
    price = "",
  } = productDetails;

  const onAddToCart = () => {
    dispatch(
      addToCart({ _id: id, quantity, productUrl, category, productName, price })
    );
    alert("Item added to cart");
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const minusQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    // fetchin the data
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const jwt_token = Cookies.get("jwt_token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const productData = response?.data?.product || {};
        setProductDetails(productData);
      } catch (err) {
        console.log("error while fetching the data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="product-item-container">
      <Header />
      <Grid
        container
        spacing={4}
        height={"90vh"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        sx={{ p: { xs: 2, md: 5 } }}
      >
        <Grid item xs={12} md={6}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={productUrl}
              alt={productName}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6} width={"500px"}>
          <Paper elevation={0} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 2, fontSize: { xs: "1.8rem", md: "2.4rem" } }}
            >
              {productName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 1 }}>
              <strong>Price:</strong>{" "}
              <span style={{ color: "blue" }}>${price}</span>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 3 }}>
              <strong>Category:</strong>{" "}
              <span style={{ color: "green" }}>{category}</span>
            </Typography>

            <Box display="flex" alignItems="center" mb={3}>
              <IconButton
                onClick={minusQuantity}
                sx={{ border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <MinusIcon />
              </IconButton>
              <Typography
                sx={{
                  mx: 2,
                  fontSize: "1.3rem",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </Typography>
              <IconButton
                onClick={addQuantity}
                sx={{ border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={onAddToCart}
              sx={{ mt: 2, fontSize: "1rem", px: 3 }}
            >
              Add To Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductItem;

//  copy for product item
/*
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sampleProduct } from "../../sampleData";
import "./productItem.css";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import Header from "../Header/Header";
import { Add as AddIcon, Remove as MinusIcon } from "@mui/icons-material";

import { UseDispatch, useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";
import Cookies from "js-cookie";
import axios from "axios";

const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const { productName="", category="", productUrl="", price="" } = productDetails;

  const onAddToCart = () => {
    dispatch(
      addToCart({ _id: id, quantity, productUrl, category, productName, price })
    );
    alert("Item added to cart")
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const minusQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    // fetchin the data
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const jwt_token = Cookies.get("jwt_token");
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const productData = response?.data?.product || {}
        setProductDetails(productData);
      } catch (err) {
        console.log("error while fetching the data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="product-item-container">
      <Header />
      <Grid
        container
        sx={{
          backgroundColor: "skyblue",
          minHeight: "90vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            backgroundColor: "palegoldenrod",
            height: { xs: "45vh", md: "100vh" },
            overflow: "hidden",
          }}
        >
          <img src={productUrl} className="product-item-img" />
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ height: { xs: "45vh", md: "100vh" }, padding: "20px" }}
        >
          <Typography
            variant="h3"
            fontFamily={"Roboto"}
            fontWeight={"500"}
            marginBottom={"20px"}
          >
            {productName}
          </Typography>
          <Typography
            variant="p"
            fontFamily={"Roboto"}
            fontSize={"25px"}
            fontWeight={"400"}
          >
            Price : <span style={{ color: "blue" }}>${price}</span>
          </Typography>
          <Typography
            variant="p"
            fontFamily={"Roboto"}
            fontSize={"25px"}
            fontWeight={"400"}
            display={"block"}
            marginTop={"20px"}
          >
            Category : <span style={{ color: "green" }}>{category}</span>
          </Typography>
          <div className="quantity-container">
            <IconButton
              onClick={minusQuantity}
              sx={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
            >
              <MinusIcon />
            </IconButton>
            <Typography
              variant="p"
              display={"inline"}
              margin={"15px"}
              fontSize={"20px"}
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={addQuantity}
              sx={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Button variant="contained" color="primary" onClick={onAddToCart}>
            Add To Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductItem;

*/
