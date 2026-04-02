const express = require("express")
const router = express.Router()
const adminAuth = require("../middleware/adminAuth")

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/adminController")

router.use(adminAuth) // Tất cả routes dưới đây都需要admin quyền

router.get("/products", getProducts)
router.post("/products", createProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)

module.exports = router
