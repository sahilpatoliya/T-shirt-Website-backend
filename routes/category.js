const express = require("express");
const router = express.Router();


const {
  getCategoryById,
  createcategory,
  getcategory,
  getallcategory,
  updatecategory,
  removecategory
} = require("../controllers/category");
const { isSignedin, isadmin, isauthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userid", getUserById);
router.param("categoryid", getCategoryById);

//actual routers goes here

//create routes
router.post(
  "/category/create/:userid",
  isSignedin, isadmin, isauthenticated,
  createcategory
);

//read
router.get("/category/:categoryid", getcategory);
router.get("/categories", getallcategory);


//update
router.put(
    "/category/:categoryid/:userid",
    isSignedin,
    isauthenticated,
    isadmin,
    updatecategory
  );
//delete
router.delete(
    "/category/:categoryid/:userid",
    isSignedin,
    isauthenticated,
    isadmin,
    removecategory
  );



module.exports = router;
