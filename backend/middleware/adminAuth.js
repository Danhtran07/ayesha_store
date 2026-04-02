const jwt = require("jsonwebtoken")

const adminAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return res.status(401).json({ msg: "Không có token, truy cập bị từ chối" })
    }

    const decoded = jwt.verify(token, "secret123")
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Bạn không có quyền admin" })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token không hợp lệ" })
  }
}

module.exports = adminAuth
