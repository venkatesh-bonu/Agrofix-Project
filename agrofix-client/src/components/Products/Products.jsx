import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./products.css";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { productsCatalog } from "../../sampleData";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [productName, setProductName] = useState("");

  const [isFruits, setIsFruits] = useState(false);
  const [isVegetables, setIsVegetables] = useState(false);

  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onProductSearch = (event) => {
    setProductName(event.target.value);
  };

  const onChagneFruits = () => {
    setIsFruits((prev) => !prev);
  };

  const onChagneVegetables = () => {
    setIsVegetables((prev) => !prev);
  };

  useEffect(() => {
    // fetchin the data
    const fetchProductsList = async () => {
      setIsLoading(true);
      try {
        const jwt_token = Cookies.get("jwt_token");
        let url = `${process.env.REACT_APP_API_URL}/api/products` + "?";
        console.log(url);
        url += `productName=${productName}&`;
        if (isFruits) url += "fruit=fruit&";
        if (isVegetables) url += "vegetable=vegetable";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "Content-Type": "application/json",
          },
        });
        const products = response?.data?.products || [];
        setProductsList(products);
      } catch (err) {
        console.log("error while fetching the data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsList();
  }, [isFruits, isVegetables, productName]);

  const renderFilters = () => {
    return (
      <>
        {" "}
        <Typography
          gutterBottom
          variant="h1"
          sx={{
            fontSize: "25px",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Product Filters
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: "20px",
            marginBottom: "15px",
          }}
        >
          Enter the product :
        </Typography>
        <TextField
          label="Product Name"
          fullWidth
          value={productName}
          onChange={onProductSearch}
          marginTop={"15px"}
        />
        <div className="fiter-checkbox-container">
          <div className="each-filter-contianer">
            <input
              type="checkbox"
              className="filter-checkbox"
              id="fruit"
              onChange={onChagneFruits}
            />
            <label style={{ cursor: "pointer    " }} htmlFor="fruit">
              Fruits
            </label>
          </div>
          <div className="each-filter-contianer">
            <input
              type="checkbox"
              className="filter-checkbox"
              id="vegetable"
              onChange={onChagneVegetables}
            />
            <label style={{ cursor: "pointer" }} htmlFor="vegetable">
              Vegetables
            </label>
          </div>
        </div>
      </>
    );
  };

  const ProductCard = ({ product }) => (
    <Card
      sx={{
        width: "100%",
        color: "auto",
        borderRadius: "5px",
        textDecoration: "none",
      }}
      component={Link}
      border="1px solid black"
      to={`/products/${product._id}`}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.productUrl}
        alt={product.productName}
      />
      <CardContent sx={{ backgroundColor: "white" }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
          ₹ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div className="products-container">
      <Header />
      <Grid
        container
        spacing={0}
        sx={{ minHeight: "90vh", backgroundColor: "white" }}
        display={"flex"}
        flexDirection={"row"}
      >
        <Grid
          item
          spacing={2}
          padding={"20px"}
          display={"flex"}
          flexDirection={"column"}
          size={{ xs: 0, md: 3 }}
          sx={{
            backgroundColor: "lightcement",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 2px 0 rgba(31, 38, 135, 0.37)",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          {renderFilters()}
        </Grid>
        <Grid
          item
          size={{ xs: 12, md: 9 }}
          spacing={2}
          display={"flex"}
          flexDirection={"column"}
        >
          <Container minWidth="100%" sx={{ display: { md: "none" } }}>
            {renderFilters()}
          </Container>
          <div className="products-list-container">
            <Container minWidth={"100%"} sx={{ mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Products Catalog
              </Typography>
              {isLoading ? (
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {productsList.map((product) => (
                    <Grid
                      sx={{
                        border: "1px solid black",
                        borderRadius: "15px",
                        overflow: "hidden",
                      }}
                      item
                      key={product._id}
                      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
