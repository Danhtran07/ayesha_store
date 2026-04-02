const express = require("express")
const router = express.Router()

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/adminUserController")

const adminAuth = require("../middleware/adminAuth")

// Apply admin auth to all routes
router.use(adminAuth)

// User management routes
router.get('/users', getAllUsers)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router
