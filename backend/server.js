const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await initializeCategories();
    await initializeServiceTypes();
  })
  .then(() => {
    // Start the server after categories are initialized
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function initializeCategories() {
  const categories = [
    { name: 'Food & Beverage', icon: 'restaurant-menu' },
    { name: 'Home & Kitchen', icon: 'house' },
    { name: 'Fashion & Kids', icon: 'checkroom' },
    { name: 'Health & Beauty', icon: 'spa' },
    { name: 'Business', icon: 'business-center' },
    { name: 'Construction', icon: 'construction' },
    { name: 'Books & Media', icon: 'menu-book' },
    { name: 'Sports', icon: 'sports-basketball' },
  ];

  try {
    for (const category of categories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        { $setOnInsert: category },
        { upsert: true, new: true }
      );
    }
    console.log('Categories initialized successfully');
  } catch (error) {
    console.error('Error initializing categories:', error);
    throw error;
  }
}

async function initializeServiceTypes() {
  const services = [
    { name: 'Catering & Food Delivery', icon: 'local-dining' },
    { name: 'Interior Design & Cleaning', icon: 'cleaning-services' },
    { name: 'Clothing Alterations & Kids Care', icon: 'child-care' },
    { name: 'Spa & Personal Training', icon: 'fitness-center' },
    { name: 'Consulting & Accounting', icon: 'work' },
    { name: 'Renovation & Plumbing', icon: 'build' },
    { name: 'Tutoring & Publishing', icon: 'school' },
    { name: 'Coaching & Equipment Rental', icon: 'sports' },
  ];

  try {
    for (const service of services) {
      await ServiceType.findOneAndUpdate(
        { name: service.name },
        { $setOnInsert: service },
        { upsert: true, new: true }
      );
    }
    console.log('Service types initialized successfully');
  } catch (error) {
    console.error('Error initializing service types:', error);
    throw error;
  }
}

// Schemas
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, trim: true },
  image: { type: String, default: null },
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  profession: { type: String, required: true, trim: true },
  products: [productSchema],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  serviceHistory: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
  }],
  createdAt: { type: Date, default: Date.now },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  icon: { type: String, default: 'category' }
}, { timestamps: true });

const serviceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  icon: { type: String, default: 'build' }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Create models
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Review = mongoose.model('Review', reviewSchema);
const Service = mongoose.model('Service', serviceSchema);
const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

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

// ===== Authentication Endpoints =====

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ 
    success: true, 
    message: 'Login successful', 
    token, 
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      profession: user.profession 
    } 
  });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password, profession } = req.body;
  if (!name || !email || !password || !profession) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, profession });
  await user.save();
  res.status(201).json({ success: true, message: 'Account created successfully' });
});

// ===== User Profile Endpoints =====

app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/profile', authenticate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'profession', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
  if (!isValidOperation) {
    return res.status(400).json({ success: false, message: 'Invalid updates' });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    for (const update of updates) {
      if (update === 'password' && req.body[update]) {
        user[update] = await bcrypt.hash(req.body[update], 10);
      } else {
        user[update] = req.body[update];
      }
    }

    await user.save();
    res.json({ 
      success: true, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        profession: user.profession 
      } 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/users/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all categories with service counts
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'services'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          icon: 1,
          count: { $size: '$services' }
        }
      }
    ]);

    // Format the count to be more readable (e.g., 1.5k+)
    const formattedCategories = categories.map(cat => ({
      ...cat,
      count: formatCount(cat.count)
    }));

    res.json({ success: true, categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Helper function to format count (e.g., 1500 -> '1.5k+')
function formatCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k+';
  }
  return count.toString() + '+';
}

// ===== Service Types Endpoints =====
app.get('/api/service-types', async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find().sort({ name: 1 });

    res.json({
      success: true,
      services: serviceTypes.map(s => ({
        id: s._id,
        name: s.name,
        icon: s.icon
      }))
    });
  } catch (error) {
    console.error('Error fetching service types:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/categories/:id/services', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const services = await Service.find({ categoryId: req.params.id, isAvailable: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Service.countDocuments({ categoryId: req.params.id, isAvailable: true });
    
    res.json({
      success: true,
      services,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Favorites Endpoints =====

app.get('/api/favorites', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('favorites')
      .select('favorites');
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/favorites/:serviceId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.favorites.includes(req.params.serviceId)) {
      user.favorites.push(req.params.serviceId);
      await user.save();
    }
    res.json({ success: true, message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/favorites/:serviceId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== req.params.serviceId);
    await user.save();
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Service History Endpoints =====

app.get('/api/history', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('serviceHistory.serviceId')
      .select('serviceHistory');
    res.json({ success: true, history: user.serviceHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/history', authenticate, async (req, res) => {
  const { serviceId, status = 'completed' } = req.body;
  
  if (!serviceId) {
    return res.status(400).json({ success: false, message: 'Service ID is required' });
  }

  try {
    const user = await User.findById(req.user.userId);
    user.serviceHistory.push({ serviceId, status });
    await user.save();
    res.json({ success: true, message: 'Added to history' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Service Endpoints =====

app.get('/api/services', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    const query = { isAvailable: true };

    if (category) query.categoryId = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await Service.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name email')
      .populate('categoryId', 'name');

    const count = await Service.countDocuments(query);
    
    res.json({
      success: true,
      services,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('categoryId', 'name');
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const reviews = await Review.find({ serviceId: service._id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      service: {
        ...service._doc,
        reviews
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Review Endpoints =====

app.post('/api/services/:id/reviews', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Please provide a valid rating (1-5)' });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    const existingReview = await Review.findOne({ 
      userId: req.user.userId, 
      serviceId: req.params.id 
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this service' 
      });
    }

    const review = new Review({
      userId: req.user.userId,
      serviceId: req.params.id,
      rating,
      comment
    });

    await review.save();

    const reviews = await Review.find({ serviceId: req.params.id });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    service.rating = averageRating;
    service.reviewCount = reviews.length;
    await service.save();

    res.status(201).json({ 
      success: true, 
      message: 'Review added successfully',
      review: {
        ...review._doc,
        userId: { _id: req.user.userId, name: req.user.name }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/services/:id/reviews', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const reviews = await Review.find({ serviceId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Review.countDocuments({ serviceId: req.params.id });

    res.json({
      success: true,
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Search Endpoint =====

app.get('/api/search', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy = 'rating', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
    const query = { isAvailable: true };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (category) query.categoryId = category;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const services = await Service.find(query)
      .populate('userId', 'name email')
      .populate('categoryId', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Service.countDocuments(query);

    res.json({
      success: true,
      services,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== Product Endpoints (Existing) =====

app.post('/api/products', authenticate, upload.single('productImage'), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and price are required' 
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      description: description ? description.trim() : '',
      image: imageUrl
    };

    user.products.push(newProduct);
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: 'Product added successfully', 
      product: user.products[user.products.length - 1]
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add product',
      error: error.message 
    });
  }
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

app.get('/api/users/:userId/products', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('products');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, products: user.products });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

app.delete('/api/products/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const productIndex = user.products.findIndex(p => p._id.toString() === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Remove the product from the array
    user.products.splice(productIndex, 1);
    await user.save();

    res.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete product',
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});
