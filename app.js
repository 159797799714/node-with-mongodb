const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

const app = express();

// 中间件
app.use(express.json());

// 路由
app.use('/mongoApi/products', require('./routes/product'));

// 首页路由
app.get('/', (req, res) => {
  res.send('欢迎使用 Node.js MongoDB CRUD API');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});