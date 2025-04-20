import React, { useState } from "react";
import "./cart.css";
import Header from "../Header/Header";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../reducers/cartReducer";
import Cookies from "js-cookie";
import axios from 'axios'
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const { productName, _id, quantity, productUrl, category, price } = item;
  const dispatch = useDispatch();
  const onRemoveFromCart = () => {
    dispatch(removeFromCart(_id));
  };
  return (
    <div className="cart-item">
      <img src={productUrl} className="cart-item-img" />
      <div className="cart-item-details-container">
        <Typography
          variant="p1"
          fontFamily={"roboto"}
          fontSize={"15px"}
          fontWeight={"400"}
          marginTop={"10px"}
        >
          {productName}
        </Typography>
        <Typography
          variant="p1"
          fontFamily={"roboto"}
          fontSize={"15px"}
          fontWeight={"400"}
          marginTop={"10px"}
        >
          ${price}
        </Typography>
      </div>
      <Typography
        variant="p1"
        fontFamily={"roboto"}
        fontSize={"15px"}
        fontWeight={"400"}
        marginRight={"30px"}
      >
        quantity: {quantity}
      </Typography>
      <Button
        variant="outlined"
        onClick={onRemoveFromCart}
        sx={{
          color: "black",
          borderColor: "black",
          "&:hover": {
            borderColor: "black",
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        Remove
      </Button>
    </div>
  );
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    buyerContact: "",
    deliveryAddress: "",
  });

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let totalPrice = 0;
  for (let item of items) totalPrice += item.quantity * item.price;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted form:", formData);
    const { buyerContact, deliveryAddress } = formData;
    const productsList = items.map((item) => ({
      _id: item._id,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      productUrl: item.productUrl,
    }));

    const toastId = toast.loading("Adding Order");
    try{
      const jwt_token = Cookies.get("jwt_token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        { productsList, buyerContact, deliveryAddress },
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Order added successfully", { id: toastId });
      dispatch(clearCart());
    }
    catch(err){
      console.log("error while adding the order",err)
      toast.error(err?.response?.data?.message || "Error");
    }

    // console.log(productsList,buyerContact,deliveryAddress);

    setOpen(false);
  };

  const onBuyProducts = () => {
    console.log("Making an order");
    alert("Order was successful");
    // make an order for the backend
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <Header />
      <div className="cart-details-container">
        <Typography
          variant="h1"
          fontWeight={"500"}
          fontFamily={"roboto"}
          fontSize={"30px"}
          marginBottom={"30px"}
        >
          Shopping Cart
        </Typography>
        {items.length > 0 ? (
          items.map((eachItem) => (
            <CartItem key={eachItem._id} item={eachItem} />
          ))
        ) : (
          <Typography
            variant="p"
            display={"block"}
            textAlign={"center"}
            fontSize={"20px"}
            width={"100%"}
          >
            No Items in the cart
          </Typography>
        )}
        <div className="buy-button-container">
          <Typography
            variant="h4"
            fontFamily={"roboto"}
            fontWeight={"600"}
            marginTop={"40px"}
            marginBottom={"20px"}
          >
            Total Price=${totalPrice}
          </Typography>
        </div>
        <div className="buy-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            disabled={items.length === 0}
          >
            Buy
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ width: "300px" }}>
          Please confirm the order
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="buyerContact"
                label="Contact number"
                variant="outlined"
                value={formData.buyerContact}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="deliveryAddress"
                label="Delivery Address"
                variant="outlined"
                multiline
                rows={3}
                value={formData.deliveryAddress}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={items.length === 0} type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Cart;
