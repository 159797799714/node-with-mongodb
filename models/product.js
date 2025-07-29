const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请输入产品名称'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '请输入产品描述']
  },
  price: {
    type: Number,
    required: [true, '请输入产品价格'],
    min: [0, '价格不能为负数']
  },
  category: {
    type: String,
    required: [true, '请输入产品类别']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);