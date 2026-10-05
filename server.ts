import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Health check endpoint for Cloud Run / load balancers
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from built Vite distribution directory
const distDir = path.resolve(__dirname, 'dist');
app.use(express.static(distDir));

// Fallback to index.html for Single Page Application routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
