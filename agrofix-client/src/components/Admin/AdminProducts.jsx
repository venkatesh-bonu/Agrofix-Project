import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  Cancel,
  Delete,
  Edit,
  Save,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [productOpen, setProductOpen] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    category: "",
    image: null,
    imagePreview: null,
  });

  const handleClose = () => {
    setProductOpen(false);
    setProductData({
      productName: "",
      price: "",
      category: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("image", productData.image);

    console.log("Submitting product:", productData);
    const toastId = toast.loading("Adding Product", { duration: 10000 });
    try {
      const jwt_admin_token = Cookies.get("jwt_admin_token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt_admin_token}`,
          },
        }
      );

      const product = response?.data?.product;
      setProducts((prevProducts) => [product, ...prevProducts]);
      toast.success("Product added successfully", { id: toastId });
      handleClose();
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      toast.error(error?.response?.data?.message || "Error", { id: toastId });
    }
  };
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleUpdate = async (updatedProduct) => {
    console.log("Updating product:", updatedProduct);
    const toastId = toast.loading("Updating Product");
    try {
      const jwt_admin_token = Cookies.get("jwt_admin_token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/products/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${jwt_admin_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response?.data?.product;
      console.log(data);
      setProducts((prevProduct) =>
        prevProduct.map((product) =>
          product._id === data._id ? data : product
        )
      );
      toast.success("Product updated successfully", { id: toastId });
    } catch (err) {
      console.log("error while updating products data", err);
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting product with id:", id);
    const toastId = toast.loading("Deleting Product");
    try {
      const jwt_admin_token = Cookies.get("jwt_admin_token");
      const respone = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/` + id,
        {
          headers: {
            Authorization: `Bearer ${jwt_admin_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Product deleted successfully", { id: toastId });
      console.log(respone);
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.log("Error while deleting the data", err);
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const jwt_admin_token = Cookies.get("jwt_admin_token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${jwt_admin_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response?.data?.products;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Error");
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <AdminHeader />
      <Container sx={{ minWidth: "100vw", padding: "20px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            marginBottom={"30px"}
          >
            Products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setProductOpen(true);
            }}
          >
            Add Product
          </Button>
        </Grid>
        {products.map((prod) => (
          <ProductItem
            key={prod._id}
            product={prod}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </Container>
      <Dialog open={productOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add New Product
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {productData.imagePreview && (
              <Box
                component="img"
                src={productData.imagePreview}
                alt="Preview"
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  mb: 2,
                  borderRadius: 2,
                }}
              />
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            <TextField
              label="Product Name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="fruit">Fruit</MenuItem>
              <MenuItem value="vegetable">Vegetable</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ProductItem = ({ product, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClick = () => {
    onUpdate(editedProduct);
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    onDelete(product._id);
  };

  return (
    <Card sx={{ marginBottom: 2, boxShadow: 3 }}>
      <CardContent>
        {editMode ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="productName"
                  value={editedProduct.productName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={editedProduct.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={editedProduct.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="fruit">fruit</MenuItem>
                  <MenuItem value="vegetable">vegetable</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleUpdateClick}
              sx={{ mt: 2, mr: 1 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={() => setEditMode(false)}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography width={"25%"} variant="h6">
                {product.productName}
              </Typography>
              <Typography width={"25%"} variant="body1">
                Price: ${product.price}
              </Typography>
              <Typography width={"25%"} variant="body2">
                Category: {product.category}
              </Typography>
              <Box sx={{ display: "flex" }} spacing={2} maxWidth="25%">
                <IconButton color="primary" onClick={() => setEditMode(true)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={handleDeleteClick}>
                  <Delete />
                </IconButton>
              </Box>
            </Container>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default AdminProducts;
