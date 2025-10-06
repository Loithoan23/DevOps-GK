const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dữ liệu tạm
let products = [
  { name: 'Sản phẩm A', price: 100000 },
  { name: 'Sản phẩm B', price: 200000 }
];

// Phục vụ front-end
app.use(express.static(path.join(__dirname, 'public')));

// API
app.get('/products', (req, res) => res.json(products));

app.post('/products', (req, res) => {
  products.push(req.body);
  res.status(201).json(req.body);
});

app.delete('/products/:index', (req, res) => {
  const i = parseInt(req.params.index);
  if (products[i]) products.splice(i, 1);
  res.json({ message: 'Đã xóa' });
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
