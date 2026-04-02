const User = require('../models/User')

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create new user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'Email đã tồn tại' })
    }

    // Hash password
    const bcrypt = require('bcryptjs')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      email,
      password: hashedPassword,
      role: role || 'user'
    })

    await user.save()
    
    // Return user without password
    const userResponse = user.toObject()
    delete userResponse.password
    
    res.status(201).json(userResponse)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { email, password, role } = req.body
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy user' })
    }

    // Update email if provided
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ msg: 'Email đã tồn tại' })
      }
      user.email = email
    }

    // Update password if provided
    if (password) {
      const bcrypt = require('bcryptjs')
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    // Update role if provided
    if (role) {
      user.role = role
    }

    await user.save()
    
    // Return user without password
    const userResponse = user.toObject()
    delete userResponse.password
    
    res.json(userResponse)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy user' })
    }

    // Prevent deleting the main admin
    if (user.email === 'admin@store.com') {
      return res.status(400).json({ msg: 'Không thể xóa tài khoản admin chính' })
    }

    await User.findByIdAndDelete(userId)
    res.json({ msg: 'Xóa user thành công' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
