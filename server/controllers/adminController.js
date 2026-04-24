const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// @desc    Get all system data overview
// @route   GET /api/admin/system
// @access  Private/Admin
const getSystemData = async (req, res) => {
  const userCount = await User.countDocuments({});
  const productCount = await Product.countDocuments({});
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(50).populate('user', 'name email');
  
  res.json({
    stats: {
      users: userCount,
      assets: productCount,
    },
    recentAssets: products
  });
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot delete an admin user');
    }
    // Delete all products associated with the user
    await Product.deleteMany({ user: user._id });
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = {
  getUsers,
  getSystemData,
  deleteUser
};
