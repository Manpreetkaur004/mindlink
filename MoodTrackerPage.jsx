import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodData")) || [];
    setMoodHistory(saved);
  }, []);

  useEffect(() => {
    drawChart();
  }, [moodHistory]);

  const moods = [
    { id: 1, emoji: "😔", label: "Very Low", description: "Feeling really down, hopeless" },
    { id: 2, emoji: "😕", label: "Low", description: "Sad, unmotivated" },
    { id: 3, emoji: "😐", label: "Neutral", description: "Okay, nothing special" },
    { id: 4, emoji: "😊", label: "Good", description: "Happy, content" },
    { id: 5, emoji: "😄", label: "Great", description: "Excited, energetic" },
  ];

  const handleMoodSelect = (mood) => setSelectedMood(mood);

  const handleSave = () => {
    if (!selectedMood) return;
    const updated = [
      ...moodHistory,
      { id: Date.now(), mood: selectedMood, notes, date: new Date().toISOString() }
    ];
    setMoodHistory(updated);
    localStorage.setItem("moodData", JSON.stringify(updated));
    setSelectedMood(null);
    setNotes("");
  };

  const drawChart = () => {
    const canvas = document.getElementById("trendChart");
    if (!canvas) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: moodHistory.slice(-7).map(e => new Date(e.date).toLocaleDateString()),
        datasets: [{ data: moodHistory.slice(-7).map(e => e.mood.id) }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { stepSize: 1, color: "#000" } },
          x: { ticks: { color: "#000" } }
        }
      }
    });
  };

  const moodColors = { 1: "#ffdddd", 2: "#ffe4b5", 3: "#fff8b3", 4: "#d2f6c5", 5: "#bce4ff" };

  const generateCalendar = () => {
    const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    return [...Array(days).keys()].map((_, d) => {
      const match = moodHistory.find(m => new Date(m.date).getDate() === d + 1);
      return (
        <div key={d} style={{ ...styles.day, background: match ? moodColors[match.mood.id] : "#fff" }}>
          {d + 1}
        </div>
      );
    });
  };

  return (
    <section style={styles.page}>
      <div className="animate-all" style={styles.animatedWrapper}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Mood Tracker</h1>
          <p style={styles.p}>How are you feeling today? Track your mood to understand patterns.</p>
        </div>

        <div style={styles.bigCard}>
          <h3 style={styles.centerHeading}>Today's Mood</h3>
          <div style={styles.moodOptions}>
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => handleMoodSelect(m)}
                style={{ ...styles.moodBtn, ...(selectedMood?.id === m.id ? styles.selected : {}) }}>
                <div style={styles.emoji}>{m.emoji}</div>
                <strong style={{ color: "#000" }}>{m.label}</strong>
                <div style={{ fontSize: "0.75rem", color: "#000" }}>{m.description}</div>
              </button>
            ))}
          </div>
          <h4 style={{ ...styles.h4, textAlign: "center" }}>What's affecting your mood today?</h4>
          <textarea
            style={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional: Add a note..."
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={styles.saveBtn} onClick={handleSave}>Save Mood Entry</button>
          </div>
        </div>

        {moodHistory.length > 0 && (
          <div style={styles.insights}>
            <div style={styles.insightCard}>
              <h3 style={styles.h3}>Mood Trends (Last 7 Days)</h3>
              <canvas id="trendChart" height="260"></canvas>
            </div>
            <div style={styles.insightCard}>
              <h3 style={styles.h3}>Monthly Overview</h3>
              <div style={styles.calendar}>{generateCalendar()}</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          to { opacity:1; transform:translateY(0); }
        }
        .animate-all {
          opacity:0;
          transform:translateY(40px);
          animation: slideUp 1s ease forwards;
        }
      `}</style>
    </section>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to bottom right, #dde9f6, #d7f4d9)",
    minHeight: "100vh",
    paddingTop: "20px",     // ↓ moved closer to navbar
    paddingBottom: "40px",
    color: "#000"
  },
  animatedWrapper: {
    opacity: 0, transform: "translateY(40px)", animation: "slideUp 1s ease forwards"
  },
  header: { textAlign: "center", marginBottom: "25px" },
  h1: { fontSize: "2.3rem", margin: 0, color: "#000" },
  p: { marginTop: 5, color: "#000" },
  bigCard: {
    width: "85%",
    margin: "0 auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
  },
  centerHeading: { textAlign: "center", marginBottom: "25px", color: "#000" },
  moodOptions: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" },
  moodBtn: {
    width: "170px",
    background: "#eef3ff",
    border: "2px solid transparent",
    borderRadius: "10px",
    padding: "15px",
    cursor: "pointer",
    color: "#000",
    textAlign: "center",
    transition: "all .3s"
  },
  selected: { transform: "translateY(-4px)", background: "#dff5ff", borderColor: "#007b8f" },
  emoji: { fontSize: "2rem" },
  h4: { marginTop: "25px", color: "#000" },
  textarea: {
    width: "100%",
    height: "90px",
    borderRadius: "8px",
    padding: "12px",
    resize: "none",
    border: "1px solid #ccc",
    color: "#000"
  },
  saveBtn: {
    background: "#007b8f",
    padding: "12px 30px",
    fontWeight: "600",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  insights: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "20px"
  },
  insightCard: {
    width: "45%",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
  },
  h3: { marginBottom: "15px", color: "#000" },
  calendar: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" },
  day: {
    padding: "15px 0",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #ddd",
    color: "#000"
  }
};

export default MoodTracker;
