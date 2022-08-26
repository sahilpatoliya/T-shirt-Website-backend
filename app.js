require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//my routes
const authroutes = require("./routes/auth");
const userroutes = require("./routes/user");
const categoryroutes = require("./routes/category");
const productroutes = require("./routes/product");
const orderroutes = require("./routes/order");
//db connection
mongoose
  .connect(
    process.env.DATABASE,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch(console.log("DB is not connected"));
// this is my middlwer
app.use(bodyParser.json());
app.use(cookieParser());
const { createProxyMiddleware } = require("http-proxy-middleware");

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

//my routes
app.use("/api", authroutes);
app.use("/api", userroutes);
app.use("/api", categoryroutes);
app.use("/api", productroutes);
app.use("/api", orderroutes);
//port
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
