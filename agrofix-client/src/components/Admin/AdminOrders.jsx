import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const updateOrderStatus = async (orderId, status) => {
    const toastId = toast.loading("Updating Status");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
        {
          status,
        },
        {
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt_admin_token")}`,
              "Content-Type": "application/json",
            },  
        }
      );
      toast.success("Status updated successfully", { id: toastId });
      console.log("Order status updated:", response.data);
    } catch (err) {
      console.error(
        "Failed to update status:",
        err.response?.data || err.message
      );
      toast.error(err?.response?.data?.message || "Error", { id: toastId });
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const toastId = toast.loading("Fetching Orders");
      try {
        const jwt_admin_token = Cookies.get("jwt_admin_token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${jwt_admin_token}`,
            "Content-Type": "application/json",
          },
        });
        setOrders(response?.data?.orders || []);
        toast.success("Orders fetched successfully", { id: toastId });
        console.log("Orders fetched:", response?.data?.orders || []);
      } catch (error) {
        console.error(
          "Failed to fetch orders:",
          error.response?.data || error.message
        );
        toast.error(error?.response?.data?.message || "Error", { id: toastId });
      }
    };

    fetchOrders();
  }, []);
  return (
    <div style={{ maxWidth: "100vw",overflow : "hidden" }}>
      <AdminHeader />
      <Box padding={"20px"}>
        <Typography variant="h4" mb={3}>
          Orders
        </Typography>

        {orders.map((order, index) => (
          <Card key={order._id || index} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Buyer: {order.buyer_name}</Typography>
              <Typography>Contact: {order.buyer_contact}</Typography>
              <Typography>Address: {order.delivery_address}</Typography>
              <Typography>
                Placed At: {new Date(order.createdAt).toLocaleString()}
              </Typography>

              <Typography mt={2} fontWeight="bold">
                Products:
              </Typography>
              <List dense>
                {order.productsList.map((product) => (
                  <ListItem key={product._id}>
                    <ListItemText
                      primary={`${product.productName} (Qty: ${product.quantity})`}
                      secondary={`Price: $${product.price}`}
                    />
                  </ListItem>
                ))}
              </List>

              <TextField
                select
                label="Update Status"
                value={order.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                fullWidth
                sx={{ my: 2 }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In progress">In progress</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </TextField>

              <Button
                variant="contained"
                color="primary"
                onClick={() => updateOrderStatus(order._id, order.status)}
              >
                Update Status
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default AdminOrders;
