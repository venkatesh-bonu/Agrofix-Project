import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  duration,
} from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, Navigate, useNavigate} from 'react-router-dom'

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const jwt_token = Cookies.get("jwt_token");
  if(jwt_token !== undefined){
    return <Navigate to = "/" />
  }


  const setCookieAndNavigateToHomePage = (jwt_token) => {
    Cookies.set("jwt_token", jwt_token, { expires: 30 });
    navigate("/")
  };

  const registerHandler = async (data) => {
    const toastId = toast.loading("Registering User", { duration: 10000 });
    try {
      const userData = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        data
      );

      const jwt_token = userData.data.token;
      setCookieAndNavigateToHomePage(jwt_token);

      toast.success("Successfully registerd", { duration: 3000,id : toastId });
      console.log(userData);
    } catch (err) {
      console.log("Error while registering users", err);
      toast.error(err?.response?.data?.message || "Failed Registering user", {
        id: toastId,
      });
    }
  };

  const loginHandler = async (data) => {
    const toastId = toast.loading("Logging the User", { duration: 4000 });
    try {
      const userData = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        data
      );

      const jwt_token = userData.data.jwt_token;
      setCookieAndNavigateToHomePage(jwt_token);
       
      toast.success("Successfully loggedin", { duration: 3000,id : toastId });
    } catch (err) {
      console.log("Error while fetching loggin in", err);
      toast.error(err?.response?.data?.message || "Failed Registering user", {
        id: toastId,
      });
    }
  };

  const onSubmit = (data) => {
    if (isRegister) {
      registerHandler(data);
    } else {
      loginHandler(data);
    }
    // this will resets the form every time when i submit
    reset();
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(to right, #a8e063, #56ab2f)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, mt: 8, width: "300px" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            color: "#2e7d32",
          }}
        >
          AgroFix
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          {isRegister ? "Register" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {isRegister && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}

          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              {isRegister ? "Register" : "Login"}
            </Button>
          </Box>
        </form>

        <Box textAlign="center" mt={3}>
          <Button onClick={() => setIsRegister((prev) => !prev)}>
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
        </Box>
        <Box textAlign="center" mt={3}>
          <Button component = {Link} to = "/admin/login">
            Login as admin
          </Button>
        </Box>

      </Paper>
    </Container>
  );
};

export default Login;

/*


export default LoginRegisterForm;

*/
