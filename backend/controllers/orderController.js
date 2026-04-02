const Order = require("../models/Order")
const Product = require("../models/Product")

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body
    
    // Kiểm tra và tính tổng tiền
    let totalAmount = 0
    for (let item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(400).json({ msg: `Sản phẩm ${item.product} không tồn tại` })
      }
      totalAmount += product.price * item.quantity
    }
    
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    })
    
    await order.save()
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Lấy danh sách đơn hàng của user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Cập nhật trạng thái đơn hàng (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product', 'name')
    
    if (!order) {
      return res.status(404).json({ msg: "Không tìm thấy đơn hàng" })
    }
    
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Lấy chi tiết đơn hàng
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'email')
      .populate('items.product', 'name image price')
    
    if (!order) {
      return res.status(404).json({ msg: "Không tìm thấy đơn hàng" })
    }
    
    // Kiểm tra quyền truy cập
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: "Không có quyền truy cập" })
    }
    
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}