import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4caf50", "#f44336", "#ff9800"];

function StatsChart() {
  const [data, setData] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/stats");
      const chartData = Object.keys(res.data).map((key, index) => ({
        name: key,
        value: res.data[key],
      }));
      setData(chartData);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4>Sentiment Distribution</h4>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default StatsChart;
