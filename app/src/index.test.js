const request = require('supertest');
const app = require('./index');

describe('ShopEase API Tests', () => {
  
  test('GET / - Welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('🛒 Welcome to ShopEase API!');
  });

  test('GET /products - All products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(5);
  });

  test('GET /products/1 - Single product', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Apple');
  });

  test('GET /products/999 - Product not found', async () => {
    const res = await request(app).get('/products/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /health - Health check', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /ready - Readiness check', async () => {
    const res = await request(app).get('/ready');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ready');
  });

});