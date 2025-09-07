import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import StatsChart from "./components/StatsChart";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📝 Customer Sentiment Analyzer</h1>
      <div className="row">
        <div className="col-md-6">
          <FeedbackForm />
          <StatsChart />
        </div>
        <div className="col-md-6">
          <FeedbackList />
        </div>
      </div>
    </div>
  );
}

export default App;
