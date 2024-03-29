const express = require("express")
const router = express.Router();
const {

    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,

    getProductReviews,
    deleteReview,
    getAdminProducts

} = require("../controllers/productControllers");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");

//User routes  
router.route("/products").get(getProducts);
 
router.route(`/product/:id`).get(getSingleProduct);

//Admin routes
router.route("/admin/products").get(getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),newProduct);

router.route(`/admin/product/:id`)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews")
    .get(isAuthenticatedUser,getProductReviews )
    .delete(isAuthenticatedUser,deleteReview )

 
module.exports = router;  