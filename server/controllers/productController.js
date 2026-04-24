const Product = require('../models/Product');
const { calculateStatus } = require('../utils/warrantyHelper');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      brand,
      category,
      purchaseDate,
      warrantyPeriod,
      price,
      serialNumber,
      notes,
    } = req.body;

    const invoiceUrl = req.file ? `/uploads/${req.file.filename}` : '';

    if (!req.user) {
      res.status(401);
      throw new Error('User not found in request');
    }

    const product = new Product({
      user: req.user._id,
      productName,
      brand,
      category,
      purchaseDate,
      warrantyPeriod: Number(warrantyPeriod),
      price: price === '' ? 0 : Number(price),
      serialNumber,
      invoiceUrl,
      notes,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create Product Error:', error.message);
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    throw error;
  }
};

// @desc    Get all products for logged in user
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        productName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ user: req.user._id, ...keyword });
  const products = await Product.find({ user: req.user._id, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  // Dynamically update status based on current date
  const updatedProducts = products.map((product) => {
    product.status = calculateStatus(product.expiryDate);
    return product;
  });

  res.json({ products: updatedProducts, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.user.toString() === req.user._id.toString()) {
    product.status = calculateStatus(product.expiryDate);
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.user.toString() === req.user._id.toString()) {
    product.productName = req.body.productName || product.productName;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.purchaseDate = req.body.purchaseDate || product.purchaseDate;
    product.warrantyPeriod = req.body.warrantyPeriod || product.warrantyPeriod;
    product.price = req.body.price || product.price;
    product.serialNumber = req.body.serialNumber || product.serialNumber;
    product.notes = req.body.notes || product.notes;

    if (req.file) {
      product.invoiceUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.user.toString() === req.user._id.toString()) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
