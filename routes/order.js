const express = require("express");
const router = express.Router();
const { isSignedin, isauthenticated, isadmin } = require("../controllers/auth");
const { getUserById, pushorderinpurchaselist } = require("../controllers/user");
const { updatestock } = require("../controllers/product");

const {
  getorderById,
  createorder,
  getallorders,
  getorderstatus,
  updatestatus,
} = require("../controllers/order");

//params
router.param("userid", getUserById);
router.param("orderid", getorderById);
//actual routes

//create
router.post(
  "/order/create/:userid",
  isSignedin,
  isauthenticated,
  pushorderinpurchaselist,
  updatestock,
  createorder
);
//read
router.get(
  "/order/all/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  getallorders
);

//status of order
router.get(
  "/order/status/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  getorderstatus
);
router.put(
  "/order/:orderid/status/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  updatestatus
);

module.exports = router;
