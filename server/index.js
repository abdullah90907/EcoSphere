import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPromise from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'ecosphere-secret-key-2026';
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:5001';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize database and start server
const startServer = async () => {
  const db = await dbPromise;

  // Helper function to execute SQL queries with sql.js
  const queryDB = (sql, params = []) => {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  };

  // Helper function to run INSERT/UPDATE/DELETE and get last insert id
  const runDB = (sql, params = []) => {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    stmt.step();
    const lastInsertRowid = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    
    // Save the database after write operations
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
    
    return { lastInsertRowid };
  };

  // Try to start Python service (optional)
  try {
    const pythonProcess = spawn('python', ['server/inference_service.py'], {
      env: { 
        ...process.env, 
        PYTHONDONTWRITEBYTECODE: '1',
        PYTHONUNBUFFERED: '1',
        HOST: '0.0.0.0',
        PORT: process.env.PYTHON_PORT || '5001'
      }
    });

    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString().trim();
      console.log(`[Python Service]: ${output}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (!output.includes('DeprecationWarning') && !output.includes('UserWarning')) {
        console.error(`[Python Service Error]: ${output}`);
      }
    });

    process.on('exit', () => {
      pythonProcess.kill();
    });
  } catch (e) {
    console.log('Python service not started (optional)');
  }

  // Middleware to verify JWT
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // Helper for retrying the Python service connection
  const callPythonInference = async (image, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(`${PYTHON_SERVICE_URL.replace(/\/$/, '')}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image }),
          timeout: 30000
        });

        if (response.ok) return await response.json();
        
        if (response.status === 503 && i < retries - 1) {
          console.log(`Python service still loading model (attempt ${i + 1}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(`Python service returned ${response.status}`);
      } catch (error) {
        if (i === retries - 1) throw error;
        console.log(`Connection to Python service failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  // --- Auth Routes ---

  // Signup
  app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if email already exists
      const existingUsers = queryDB('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const info = runDB('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
      
      // Initialize user stats
      runDB('INSERT INTO user_stats (user_id) VALUES (?)', [info.lastInsertRowid]);

      const token = jwt.sign({ id: info.lastInsertRowid, email }, JWT_SECRET);
      res.status(201).json({ token, user: { id: info.lastInsertRowid, name, email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Login
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const users = queryDB('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) return res.status(400).json({ error: 'User not found' });
      const user = users[0];

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, profile_image: user.profile_image } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // --- User Routes ---

  // Get User Profile
  app.get('/api/user/profile', authenticateToken, (req, res) => {
    const users = queryDB('SELECT id, name, email, profile_image FROM users WHERE id = ?', [req.user.id]);
    res.json(users[0] || {});
  });

  // Update Profile
  app.put('/api/user/profile', authenticateToken, async (req, res) => {
    const { name, profile_image } = req.body;
    try {
      runDB('UPDATE users SET name = ?, profile_image = ? WHERE id = ?', [name, profile_image, req.user.id]);
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

  // Change Password
  app.put('/api/user/password', authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const users = queryDB('SELECT password FROM users WHERE id = ?', [req.user.id]);
      if (users.length === 0) return res.status(400).json({ error: 'User not found' });
      const user = users[0];

      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) return res.status(400).json({ error: 'Invalid current password' });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      runDB('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  });

  // Get User Stats
  app.get('/api/user/stats', authenticateToken, (req, res) => {
    const stats = queryDB('SELECT * FROM user_stats WHERE user_id = ?', [req.user.id]);
    res.json(stats[0] || { food_saved: 0, water_saved: 0, carbon_offset: 0, alerts_count: 0 });
  });

  // --- Plant Disease Detection (Two-Tier Inference) ---

  app.post('/api/analyze-plant', async (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'Image is required' });

    try {
      const results = await callPythonInference(image);
      const topResult = results[0];

      console.log(`Local Inference Result: ${topResult.label} (Confidence: ${(topResult.score * 100).toFixed(2)}%)`);

      if (topResult.score > 0.75) {
        const isHealthy = topResult.label.toLowerCase().includes('healthy');
        
        return res.json({
          fallback: false,
          result: {
            title: topResult.label,
            category: 'Plant Health',
            status: isHealthy ? 'Healthy' : 'Diseased',
            confidence: topResult.score,
            description: `Identified as ${topResult.label} with high confidence by Local AI Model.`,
            recommendations: isHealthy 
              ? ["Continue current care routine", "Monitor for seasonal changes", "Ensure consistent sunlight"]
              : ["Identify and remove affected leaves", "Apply appropriate organic fungicide", "Isolate the plant if possible"],
            source: 'Local AI Model'
          }
        });
      } else {
        console.log("Confidence <= 75%, triggering Gemini fallback.");
        return res.json({ 
          fallback: true, 
          score: topResult.score, 
          label: topResult.label,
          reason: 'Low confidence' 
        });
      }
    } catch (error) {
      console.error("Local Inference Error:", error.message);
      return res.json({ fallback: true, error: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch(console.error);
