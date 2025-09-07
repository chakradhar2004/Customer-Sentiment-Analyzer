import React, { useEffect, useState } from "react";
import axios from "axios";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-3 shadow-sm">
      <h4>Recent Feedbacks</h4>
      <ul className="list-group">
        {feedbacks.map((fb) => (
          <li key={fb.id} className="list-group-item">
            {fb.text} → <b>{fb.sentiment}</b> ({fb.polarity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
