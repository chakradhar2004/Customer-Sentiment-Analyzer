import React, { useState } from "react";
import axios from "axios";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:3000/feedback", { text });
      setResponse(res.data);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4>Submit Feedback</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          placeholder="Enter your feedback..."
          required
        />
        <button type="submit" className="btn btn-primary">
          Analyze
        </button>
      </form>

      {response && (
        <div className="alert alert-info mt-3">
          Sentiment: <b>{response.sentiment}</b> (Polarity: {response.polarity})
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
