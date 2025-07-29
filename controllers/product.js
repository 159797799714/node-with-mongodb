const Product = require('../models/product');

// @desc    获取所有产品
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
};

// @desc    获取单个产品
// @route   GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到产品'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
};

// @desc    创建新产品
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: '服务器错误'
      });
    }
  }
};

// @desc    更新产品
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到产品'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: '服务器错误'
      });
    }
  }
};

// @desc    删除产品
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到产品'
      });
    }
    
    await product.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
};