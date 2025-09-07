# 📝 Customer Sentiment Analyzer

A full-stack project that analyzes customer feedback using **Natural Language Processing (NLP)**, stores results in **MySQL**, and visualizes sentiment distribution on a **React dashboard**.

![App Screenshot](screenshot.jpg)
---

## 🚀 Features
- **NLP Sentiment Analysis** (Flask + TextBlob)
- **REST API** (Node.js + Express)
- **Database Storage** (MySQL)
- **Interactive Dashboard** (React + Recharts + Bootstrap)
- **Real-time Auto-Refresh** (updates every 5s)

---

## 🛠️ Tech Stack
- **Frontend:** React, Axios, Bootstrap, Recharts  
- **Backend:** Node.js, Express, Axios, Dotenv  
- **NLP Service:** Python Flask, TextBlob  
- **Database:** MySQL  

---

## 📂 Project Structure
```
customer-sentiment-analyzer/
│
├── flask-service/         # Python NLP service
│   ├── app.py
│   └── requirements.txt
│
├── node-backend/          # Express.js backend
│   ├── server.js
│   └── .env
│
├── frontend/              # React dashboard
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   │       ├── FeedbackForm.js
│   │       ├── FeedbackList.js
│   │       └── StatsChart.js
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Run Flask NLP Service
```bash
cd flask-service
python -m venv venv
venv\Scripts\activate   # (Windows)
pip install -r requirements.txt
python app.py
```
Flask runs on **http://127.0.0.1:5000**

---

### 2️⃣ Setup MySQL Database
Log into MySQL:
```bash
mysql -u root -p
```
Create database and table:
```sql
CREATE DATABASE sentimentdb;
USE sentimentdb;

CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(500),
    sentiment VARCHAR(20),
    polarity FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3️⃣ Run Node.js Backend
```bash
cd node-backend
npm install
```

Create `.env` file:
```env
PORT=3000
FLASK_URL=http://127.0.0.1:5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your password
DB_NAME=sentimentdb
```

Start server:
```bash
node server.js
```
Backend runs on **http://127.0.0.1:3000**

---

### 4️⃣ Run React Frontend
```bash
cd frontend
npm install
npm start
```
Frontend opens at **http://localhost:3001**

---

## 📊 API Endpoints

### POST `/feedback`
Send feedback text → analyze → store in MySQL.
```json
{
  "text": "I love this product!"
}
```
Response:
```json
{
  "text": "I love this product!",
  "sentiment": "positive",
  "polarity": 0.62
}
```

---

### GET `/stats`
Get sentiment distribution.
```json
{
  "positive": 5,
  "negative": 2,
  "neutral": 1
}
```

---

### GET `/feedbacks`
Get recent feedbacks (last 50).
```json
[
  { "id": 1, "text": "Great service!", "sentiment": "positive", "polarity": 0.8 },
  { "id": 2, "text": "The delivery was late", "sentiment": "negative", "polarity": -0.6 }
]
```

---

## 📸 Screenshots (to add after running)
- Dashboard Home  
- Pie Chart of Sentiments  
- Recent Feedback List  

---

## 🏆 Conclusion
This project demonstrates a **full-stack workflow**:
1. Collect feedback  
2. Analyze using NLP (Flask + Python)  
3. Store in database (MySQL)  
4. Display insights (React Dashboard)  

💡 Perfect for showcasing **Full Stack + Data + AI integration** skills!
