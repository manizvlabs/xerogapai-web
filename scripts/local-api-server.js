// Local API server for testing the contact form
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
// multer import is kept for reference but no longer used in the route.
// The route now passes the raw Express req stream directly to formidable inside
// the handler, so multer pre-processing is not needed (see route comments below).
// import multer from 'multer';

// Load environment variables
dotenv.config();

// Import the handler function
// FIXED: was '../api/submit-to-zoho.ts' — wrong extension, the actual file is .js not .ts
import handler from '../api/submit-to-zoho.js';

const app = express();
const PORT = process.env.PORT || 3000;

// multer setup commented out — no longer used since the route was fixed to pass
// the raw stream directly to formidable. Kept here for historical reference.
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//     files: 10 // Maximum 10 files
//   }
// });

// CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Local API server is running' });
});

// Contact form submission endpoint
//
// WHY THE OLD ROUTE WAS COMMENTED OUT:
// The original route used `upload.array('attachments')` (multer) as middleware.
// Multer pre-consumed the entire multipart stream before the handler ran, then a
// plain JS object (vercelReq) was passed to the handler instead of a real stream.
// The handler uses formidable internally (form.parse(req)), which MUST receive a
// real Node.js IncomingMessage readable stream — passing a plain object caused
// formidable to fail with an unhandled error, producing a 500 response.
//
// OLD CODE — do not restore (broken: multer drains the stream before formidable):
// app.post('/api/submit-to-zoho', upload.array('attachments'), async (req, res) => {
//   try {
//     console.log('📨 Received form submission with', req.files?.length || 0, 'files');
//     // Convert Express req to VercelRequest-like format
//     const vercelReq = {
//       method: req.method,
//       headers: req.headers,
//       body: req.body,
//       query: req.query,
//       files: req.files, // Add files to the request
//     };
//     // Convert Express res to VercelResponse-like format
//     const vercelRes = {
//       status: (code) => { res.status(code); return vercelRes; },
//       json: (data) => { res.json(data); return vercelRes; },
//       setHeader: (name, value) => { res.setHeader(name, value); return vercelRes; }
//     };
//     // Call the handler
//     await handler(vercelReq, vercelRes);
//   } catch (error) {
//     console.error('❌ API Error:', error);
//     res.status(500).json({ error: 'Internal server error', message: error.message });
//   }
// });
//
// FIX: Removed multer middleware so the raw multipart stream is NOT pre-consumed.
// The real Express req (which extends Node.js IncomingMessage) is passed directly
// to the handler so formidable can read the raw stream from it.
// Note: express.json() and express.urlencoded() are JSON/urlencoded-only parsers —
// they do NOT touch multipart/form-data, so the stream remains intact.
app.post('/api/submit-to-zoho', async (req, res) => {
  try {
    console.log('📨 Received form submission');

    // Convert Express res to VercelResponse-like format
    const vercelRes = {
      status: (code) => {
        res.status(code);
        return vercelRes;
      },
      json: (data) => {
        res.json(data);
        return vercelRes;
      },
      setHeader: (name, value) => {
        res.setHeader(name, value);
        return vercelRes;
      }
    };

    // Pass the real Express req directly — it IS a Node.js IncomingMessage stream,
    // so formidable inside submit-to-zoho.js can parse the raw multipart data.
    await handler(req, vercelRes);

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/submit-to-zoho`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend should be running on http://localhost:5173`);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down local API server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});