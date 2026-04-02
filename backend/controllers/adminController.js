const Product = require("../models/Product")

// Lấy danh sách sản phẩm (admin)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body
    
    if (!name || !price) {
      return res.status(400).json({ msg: "Tên và giá sản phẩm là bắt buộc" })
    }

    const product = new Product({
      name,
      price,
      description,
      image
    })

    await product.save()
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Cập nhật sản phẩm (admin)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body
    const productId = req.params.id

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, image },
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ msg: "Không tìm thấy sản phẩm" })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Xóa sản phẩm (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return res.status(404).json({ msg: "Không tìm thấy sản phẩm" })
    }

    res.json({ msg: "Xóa sản phẩm thành công" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
