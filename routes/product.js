const express = require("express");
const router = express.Router();

const {
  getproductbyid,
  createproduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getallproducts,
  getalluniquecategories,
} = require("../controllers/product");
const { isSignedin, isauthenticated, isadmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userid", getUserById);
router.param("productid", getproductbyid);

//all of actual routes
router.post(
  "/product/create/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  createproduct
);
// read routes
router.get("/product/:productid", getProduct);
router.get("/product/photo/:productid", photo);

//delete routes
router.delete(
  "/product/:productid/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  deleteProduct
);
//update routes
router.put(
  "/product/:productid/:userid",
  isSignedin,
  isauthenticated,
  isadmin,
  updateProduct
);
//listing routes
router.get("/products", getallproducts);

router.get("/products/categories", getalluniquecategories);

module.exports = router;
