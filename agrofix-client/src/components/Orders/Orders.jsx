import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

const OrderItem = ({ order }) => {
  const { _id, status, productsList, createdAt, delivery_address } = order;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginBottom: 3,
        borderRadius: 3,
        backgroundColor: "#f8f9fa",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Order ID: {_id}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Ordered on: {new Date(createdAt).toLocaleString()}
        </Typography>

        <Typography variant="body1" fontWeight={500}>
          Delivery Address: {delivery_address}
        </Typography>

        <Divider />

        <Typography variant="subtitle1" fontWeight={600}>
          Products:
        </Typography>
        {productsList.map((item, idx) => (
          <Box key={idx} sx={{ pl: 2 }}>
            <Typography variant="body2">
              • {item.productName} ({item.quantity} pcs) - ₹{item.price}
            </Typography>
          </Box>
        ))}

        <Divider />

        <Typography
          variant="body1"
          fontWeight={600}
          color={
            status === "Delivered"
              ? "green"
              : status === "In progress"
              ? "blue"
              : "red"
          }
        >
          Status: {status}
        </Typography>
      </Stack>
    </Paper>
  );
};

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const jwt_token = Cookies.get("jwt_token");
        const url = `${process.env.REACT_APP_API_URL}/api/user/orders/`;
        console.log(url)
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "Content-Type": "application/json",
          },
        });
        const orders = response?.data?.orders || [];
        setOrdersList(orders);
      } catch (err) {
        console.log("error while fetching the data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e9ecef" }}>
      <Header />
      <Box sx={{ padding: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={600} marginBottom={4}>
          Your Orders
        </Typography>

        {isLoading ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : ordersList.length === 0 ? (
          <Typography
            textAlign="center"
            variant="h5"
            fontWeight={500}
            color="text.secondary"
          >
            No orders found
          </Typography>
        ) : (
          ordersList.map((order) => <OrderItem key={order._id} order={order} />)
        )}
      </Box>
    </Box>
  );
};

export default Orders;


// previous orders code before styling

// import React, { useEffect, useState } from "react";
// import "./orders.css";
// import Header from "../Header/Header";
// import { Typography } from "@mui/material";
// import { sampleOrdersList } from "../../sampleData";
// import Cookies from "js-cookie";
// import axios from "axios";

// const OrderItem = ({ order }) => {
//   const { _id, status, productsList } = order;

//   return (
//     <div className="order-item">
//       <Typography variant="p" fontFamily={"roboto"} fontSize={"18px"}>
//         Order Id : {_id}
//       </Typography>
//       <div className="order-products-list">
//         <Typography
//           variant="h5"
//           fontFamily={"roboto"}
//           fontSize={"20px"}
//           fontWeight={"600"}
//         >
//           Products:
//         </Typography>
//         {productsList.map((item, index) => (
//           <Typography
//             key={index}
//             variant="p"
//             fontSize={"15px"}
//             display={"block"}
//             marginLeft={"15px"}
//           >
//             {item.productName}
//           </Typography>
//         ))}
//       </div>
//       <Typography variant="p" display={"block"} marginLeft={"20px"}>
//         Order Status :{" "}
//         <span
//           style={{
//             color:
//               status === "Delivered"
//                 ? "green"
//                 : status === "In progress"
//                 ? "blue"
//                 : "red",
//           }}
//         >
//           {status}
//         </span>
//       </Typography>
//     </div>
//   );
// };

// const Orders = () => {
//   const [ordersList, setOrdersList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // fetchin the data
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const jwt_token = Cookies.get("jwt_token");
//         let url = `http://localhost:5000/api/user/orders/`;
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${jwt_token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const orders = response?.data?.orders || [];
//         console.log(orders);
//         setOrdersList(orders);
//       } catch (err) {
//         console.log("error while fetching the data", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);
//   return (
//     <div className="orders-container">
//       <Header />
//       <div className="orders-details-container">
//         <Typography
//           variant="h1"
//           fontFamily={"roboto"}
//           fontSize={"30px"}
//           fontWeight={"600"}
//         >
//           Your Orders
//         </Typography>
//         {ordersList.length === 0 ? (
//           <Typography
//             textAlign={"center"}
//             fontFamily={"roboto"}
//             fontSize={"40px"}
//             fontWeight={"500"}
//             marginTop={"20px"}
//           >
//             No orders found
//           </Typography>
//         ) : (
//           ordersList.map((order) => <OrderItem key={order._id} order={order} />)
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;
