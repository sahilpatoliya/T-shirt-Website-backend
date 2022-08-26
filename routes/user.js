const express = require("express");
const router = express.Router();

const {
  getUserById,
  getuser,
  getalluser,
  updateuser,
  userpurchaselist,
} = require("../controllers/user");
const { isSignedin, isauthenticated, isadmin } = require("../controllers/auth");

router.param("userid", getUserById);

router.get("/user/:userid", isSignedin, isauthenticated, getuser);
router.get("/users", getalluser);
router.put("/user/:userid", isSignedin, isauthenticated, updateuser);

router.get(
  "/orders/user/:userid",
  isSignedin,
  isauthenticated,
  updateuser,
  userpurchaselist
);

module.exports = router;
