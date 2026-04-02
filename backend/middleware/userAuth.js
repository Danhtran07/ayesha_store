const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return res.status(401).json({ msg: "Không có token, truy cập bị từ chối" })
    }

    const decoded = jwt.verify(token, "secret123")
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token không hợp lệ" })
  }
}

module.exports = auth
