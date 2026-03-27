const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ msg: "Chưa đăng nhập" })
  }

  try {
    const decoded = jwt.verify(token, "secret123")

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Không có quyền admin" })
    }
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ msg: "Token không hợp lệ" })
  }
}