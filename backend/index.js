const express = require('express');
const cors = require('cors');

const app = express();

// Allow all CORS requests
app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Backend!' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
