const express = require("express")
const router = express.Router()
const auth = require("../middleware/userAuth")
const adminAuth = require("../middleware/adminAuth")
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById
} = require("../controllers/orderController")

// User routes (cần authentication)
router.post("/", auth, createOrder)
router.get("/my-orders", auth, getUserOrders)
router.get("/:id", auth, getOrderById)

// Admin routes
router.get("/", adminAuth, getAllOrders) // Admin lấy tất cả orders
router.put("/:id/status", adminAuth, updateOrderStatus) // Admin cập nhật trạng thái

module.exports = router
