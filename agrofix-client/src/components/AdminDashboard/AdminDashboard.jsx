import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import AdminHeader from "../Admin/AdminHeader";

export const fetchOrders = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt_admin_token")}`,
      "Content-Type": "application/json",
    },
  });
  return res?.data?.orders || [];
};

export const fetchProducts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/admin/products`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt_admin_token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res?.data?.products || [];
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("Loading Dashboard Data");
      try {
        const ordersData = await fetchOrders();
        const productsData = await fetchProducts();

        setOrders(ordersData);
        setProducts(productsData);
        toast.success("Dashboard data loaded successfully", { id: toastId });
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        toast.error("Error loading dashboard data", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    InProgress: orders.filter((o) => o.status === "In progress").length,
  };

  const productStats = {
    total: products.length,
    fruits: products.filter((p) => p.category === "fruit").length,
    vegetables: products.filter((p) => p.category === "vegetable").length,
    outOfStock: products.filter((p) => p.quantity === 0).length,
  };

  if (loading)
    return (
      <Grid
        container
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <>
      <AdminHeader />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Order Stats */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: "#f0f0f0", borderLeft: "5px solid #1976d2" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <ShoppingCartIcon sx={{ mr: 1 }} />
                  Orders
                </Typography>
                <Typography>Total: {orderStats.total}</Typography>
                <Typography>Pending: {orderStats.pending}</Typography>
                <Typography>Delivered: {orderStats.delivered}</Typography>
                <Typography>InProgress: {orderStats.InProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Product Stats */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: "#f0f0f0", borderLeft: "5px solid #43a047" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Inventory2Icon sx={{ mr: 1 }} />
                  Products
                </Typography>
                <Typography>Total: {productStats.total}</Typography>
                <Typography>Fruits: {productStats.fruits}</Typography>
                <Typography>Vegetables: {productStats.vegetables}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default AdminDashboard;
