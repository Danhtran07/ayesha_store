const express = require("express")
const router = express.Router()
const adminAuth = require("../middleware/adminAuth")

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/adminController")

const {
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController")

router.use(adminAuth) // Tất cả routes cần admin quyền

// Product routes
router.get("/products", getProducts)
router.post("/products", createProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

// Order routes
router.get("/orders", getAllOrders)
router.put("/orders/:id/status", updateOrderStatus)

module.exports = router