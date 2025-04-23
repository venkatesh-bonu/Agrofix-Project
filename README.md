# AgroFix

AgroFix is a web-based platform where buyers can explore and purchase agricultural products, and admins can manage inventory and track orders through a dashboard.

---

## ⚠️ Important Note on Backend Delay

> 🕒 The backend hosted on [Render](https://render.com) can take up to **1 minute** to spin up after inactivity.  
> This means that **after clicking the login button**, the response may take **~60 seconds** if the backend is waking up.  
> Please be patient! This is a limitation of the free Render tier's cold start time.



## 🔐 Login Instructions

Note : For admin login use "SECRET_ADMIN_CODE" as admin secret key

### 👤 User Login
- Users can **register or log in** from the main login page.

### 🛡️ Admin Login
- On the login page, click **"Login as Admin"**.
- Enter the following **secret key** to access admin features: SECRET_ADMIN_CODE
- you can change the ADMIN_SECRET_CODE in .evn file to change the admin secret code  


---

## 🔥 Features

### 🛒 Buyer Features
- Browse products from the **Products** section.
- View product details and **add items to cart**.
- **Buy** items from the cart with one-click checkout.
- Track order status in the **Orders** section.

### 🛠️ Admin Features
- Access the **Admin Dashboard** for platform statistics.
- **Add**, **Edit**, or **Delete** product details.
- Update order statuses from:
- `Pending` → `In Progress` → `Delivered`.

---


🧰 Technologies Used
🔙 Backend
🟢 MongoDB – Database for storing users, products, and orders

🟩 Node.js – JavaScript runtime for building the server

⚙️ Express.js – Web framework for creating REST APIs

🔐 JWT (JSON Web Tokens) – For user and admin authentication

☁️ Cloudinary – For uploading and managing product images

🖥️ Frontend
⚛️ React.js – UI library for building the frontend

🔄 Redux – For managing global application state

📡 Axios – For making API calls to the backend

🍪 js-cookie – For handling auth tokens via cookies

🎨 Material UI (MUI) – Pre-built component library for consistent styling


## ⚙️ Setup Instructions

### 🖥️ Client Setup

```bash
cd agrofix-client
npm install
npm start
```

### 🖥️ Server Setup

```bash
cd server
npm install
node index.js
```
## 📦 Server Environment Variables

Create a `.env` file inside the `server/` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_ADMIN_SECRET=your_jwt_admin_secret_key
ADMIN_SECRET=your_custom_admin_code
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🌐 Client Environment Variable

The frontend relies on the following environment variable:

| Variable Name         | Description                        | Example                        |
|-----------------------|------------------------------------|--------------------------------|
| `REACT_APP_API_URL`   | URL of the backend API endpoint    | `https://your-backend.com` |

Make sure to create a `.env` file in the `client/` directory with the following content:

```env
REACT_APP_API_URL=https://your-backend.com
```


##  🔗 Live URL  
🔗 Live URL: https://agrofix-frontend-nu.vercel.app/


##  File Structure   
```
Agrofix-Project/
├── agrofix-client/     # React frontend
└── server/             # Node.js backend with Express
```





