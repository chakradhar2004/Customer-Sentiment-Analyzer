require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// POST /feedback -> send text to Flask + save result in MySQL
app.post('/feedback', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text is required" });

    // call Flask NLP service
    const flaskResponse = await axios.post(`${process.env.FLASK_URL}/analyze`, { text });
    const { sentiment, polarity } = flaskResponse.data;

    // save into MySQL
    const conn = await pool.getConnection();
    await conn.execute(
      "INSERT INTO feedbacks (text, sentiment, polarity) VALUES (?, ?, ?)",
      [text, sentiment, polarity]
    );
    conn.release();

    res.json({ text, sentiment, polarity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /stats -> sentiment distribution
app.get('/stats', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT sentiment, COUNT(*) as count FROM feedbacks GROUP BY sentiment");
    conn.release();

    const result = { positive: 0, negative: 0, neutral: 0 };
    rows.forEach(r => { result[r.sentiment] = r.count; });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /feedbacks -> list latest
app.get('/feedbacks', async (req, res) => {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT * FROM feedbacks ORDER BY created_at DESC LIMIT 50");
  conn.release();
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Node backend running on port ${PORT}`));
