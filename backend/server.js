const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, trim: true },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  profession: { type: String, required: true, trim: true },
  products: [productSchema],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email, profession: user.profession } });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password, profession } = req.body;
  if (!name || !email || !password || !profession) return res.status(400).json({ success: false, message: 'All fields are required' });

  if (await User.findOne({ email })) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, profession });
  await user.save();
  res.status(201).json({ success: true, message: 'Account created successfully' });
});

// Product endpoints
app.post('/api/products', authenticate, async (req, res) => {
  const { name, price, description, image } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'Name and price are required' });

  const user = await User.findById(req.user.userId);
  user.products.push({ name, price, description, image });
  await user.save();
  res.status(201).json({ success: true, message: 'Product added successfully', products: user.products });
});

app.get('/api/products', authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId).select('products');
  res.json({ success: true, products: user.products });
});

app.put('/api/products/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  const user = await User.findById(req.user.userId);
  const product = user.products.id(id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  product.image = image ?? product.image;
  await user.save();

  res.json({ success: true, message: 'Product updated successfully', products: user.products });
});

app.delete('/api/products/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user.userId);
  const product = user.products.id(id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  product.remove();
  await user.save();

  res.json({ success: true, message: 'Product deleted successfully', products: user.products });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
