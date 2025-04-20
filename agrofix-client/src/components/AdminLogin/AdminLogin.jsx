import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const jwt_admin_token = Cookies.get("jwt_admin_token");
    if(jwt_admin_token !== undefined){
        return <Navigate to = "/admin/dashboard" />
    }
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try{
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/login`,
          {
            adminSecretKey : secretKey
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const jwt_admin_token = response?.data?.token
        toast.success("sucessfully logged in")

        Cookies.set("jwt_admin_token", jwt_admin_token, { expires: 30 });
        navigate("/admin/dashboard")
      }
      catch(err){
        console.log("Error while loggin in",err)
        toast.error(err?.response?.data?.message || "error")
      }
    };
  
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f4f6f8"
      >
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" mb={2} textAlign="center">
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Admin Secret Key"
              variant="outlined"
              type="password"
              fullWidth
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    );
  };

export default AdminLogin