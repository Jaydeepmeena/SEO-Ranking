import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jobRoutes from './routes/jobs.js';
import n8nRoutes from './routes/n8n.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from backend directory
const envPath = path.join(__dirname, '.env');
console.log('📁 Loading .env from:', envPath);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (no auth routes - using shared secret key authentication)
app.use('/api/jobs', jobRoutes);
app.use('/api/n8n', n8nRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SEO Ranking API Server',
    endpoints: {
      health: '/health',
      jobs: '/api/jobs',
      n8n: '/api/n8n'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Debug endpoint to check environment variables (remove in production)
app.get('/debug/env', (req, res) => {
  res.json({
    PORT: process.env.PORT || 5000,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL ? 'SET' : 'NOT SET',
    N8N_WEBHOOK_URL_length: process.env.N8N_WEBHOOK_URL ? process.env.N8N_WEBHOOK_URL.length : 0
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method,
    availableRoutes: ['/', '/health', '/api/jobs', '/api/n8n', '/debug/env']
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`📋 Environment variables loaded:`);
  console.log(`   PORT: ${process.env.PORT || 5000}`);
  console.log(`   N8N_WEBHOOK_URL: ${process.env.N8N_WEBHOOK_URL ? 'SET' : 'NOT SET'}`);
  console.log(`✅ API Routes available:`);
  console.log(`   GET  /`);
  console.log(`   GET  /health`);
  console.log(`   GET  /debug/env`);
  console.log(`   POST /api/jobs/upload`);
  console.log(`   GET  /api/jobs/status`);
  console.log(`   GET  /api/jobs/download/:jobId`);
});

