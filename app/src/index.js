const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Sample products data
const products = [
  { id: 1, name: 'Apple', price: 40, category: 'Fruits', stock: 100 },
  { id: 2, name: 'Milk', price: 60, category: 'Dairy', stock: 50 },
  { id: 3, name: 'Bread', price: 35, category: 'Bakery', stock: 75 },
  { id: 4, name: 'Rice', price: 120, category: 'Grains', stock: 200 },
  { id: 5, name: 'Eggs', price: 80, category: 'Dairy', stock: 150 }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🛒 Welcome to ShopEase API!',
    version: '1.0.0',
    endpoints: ['/products', '/health', '/ready', '/metrics']
  });
});

app.get('/products', (req, res) => {
  const end = httpRequestDuration.startTimer();
  res.json({ success: true, data: products, total: products.length });
  end({ method: 'GET', route: '/products', status_code: 200 });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Health check - Kubernetes ke liye
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Readiness check - Kubernetes ke liye
app.get('/ready', (req, res) => {
  res.json({ status: 'ready', timestamp: new Date().toISOString() });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`🚀 ShopEase server running on port ${PORT}`);
});

module.exports = app;