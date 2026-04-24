const express = require('express');
const router = express.Router();
const { getUsers, getSystemData, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/system').get(protect, admin, getSystemData);

module.exports = router;
