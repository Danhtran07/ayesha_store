const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")

const {
  getProducts,
  createProduct
} = require("../controllers/productController")

// GET all products
router.get("/", getProducts)

// CREATE product (có upload ảnh)
router.post("/", upload.single("image"), createProduct)

module.exports = router