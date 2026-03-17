import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

/* Assessment dataset with badge-types */
const ASSESSMENTS_DATA = {
  PHQ9: {
    badge: "Clinical",
    icon: "😔",
    title: "Depression Screening (PHQ-9)",
    time: "5 minutes",
    questions: [
      "Little interest or pleasure in doing things?",
      "Feeling down, depressed or hopeless?",
      "Trouble falling or staying asleep, or sleeping too much?",
      "Feeling tired or having little energy?",
      "Poor appetite or overeating?",
      "Feeling bad about yourself — or that you're a failure?",
      "Trouble concentrating on things, such as reading or watching TV?",
      "Moving or speaking slowly — or being so fidgety you've been moving a lot?",
      "Thoughts that you would be better off dead, or hurting yourself?"
    ],
    options: ["Not at all", "Several days", "Over half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
    bands: [
      { label: "Minimal", min: 0, max: 4, recommendation: "Normal." },
      { label: "Mild", min: 5, max: 9, recommendation: "Keep monitoring." },
      { label: "Moderate", min: 10, max: 14, recommendation: "Clinical support recommended." },
      { label: "Moderately-Severe", min: 15, max: 19, recommendation: "Seek help." },
      { label: "Severe", min: 20, max: 27, recommendation: "Seek urgent help." }
    ]
  },
  GAD7: {
    badge: "Clinical",
    icon: "😰",
    title: "Anxiety Screening (GAD-7)",
    time: "4 minutes",
    questions: [
      "Feeling nervous, anxious, or on edge?",
      "Not being able to stop or control worrying?",
      "Worrying too much about different things?",
      "Trouble relaxing?",
      "Being so restless it's hard to sit still?",
      "Becoming easily annoyed or irritable?",
      "Feeling afraid that something awful might happen?"
    ],
    options: ["Not at all", "Several days", "Over half the days", "Nearly every day"],
    scores: [0, 1, 2, 3],
    bands: [
      { label: "Minimal", min: 0, max: 4, recommendation: "Likely normal." },
      { label: "Mild", min: 5, max: 9, recommendation: "Monitor." },
      { label: "Moderate", min: 10, max: 14, recommendation: "Seek support." },
      { label: "Severe", min: 15, max: 21, recommendation: "Seek professional care." }
    ]
  },
  PSS10: {
    badge: "Research",
    icon: "🤯",
    title: "Stress Assessment (PSS-10)",
    time: "6 minutes",
    questions: [
      "Been upset because of unexpected events?",
      "Felt that you were unable to control important things in your life?",
      "Felt nervous and stressed?",
      "Felt confident about your ability to handle personal problems?",
      "Felt that things were going your way?",
      "Found that you could not cope with all the things you had to do?",
      "Been able to control irritations in your life?",
      "Felt that you were on top of things?",
      "Been angered because of things that happened outside of your control?",
      "Felt difficulties were piling up so high that you could not overcome them?"
    ],
    options: ["Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"],
    scores: [0, 1, 2, 3, 4],
    reverseIndex: [3, 4, 6, 7],
    bands: [
      { label: "Low", min: 0, max: 13, recommendation: "Low perceived stress." },
      { label: "Moderate", min: 14, max: 26, recommendation: "Moderate perceived stress." },
      { label: "High", min: 27, max: 40, recommendation: "High stress." }
    ]
  }
};

export default function AssessmentPage() {
  const [step, setStep] = useState("assess");
  const [current, setCurrent] = useState("PHQ9");
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState([]);
  const [result, setResult] = useState(null);
  const historyCanvas = useRef(null);

  useEffect(() => {
    if (step === "assess") drawHistory();
  }, [step]);

  function drawHistory() {
    if (!historyCanvas.current) return;
    const exist = Chart.getChart(historyCanvas.current);
    if (exist) exist.destroy();
    const d = JSON.parse(localStorage.getItem("assessmentResults") || "{}");
    const sets = [];
    Object.keys(d).forEach(k => {
      const arr = d[k].slice(-10).map(r => ({ x: new Date(r.date).toLocaleDateString(), y: r.score }));
      sets.push({ label: k, data: arr, borderColor: "#008080", backgroundColor: "#00808020", fill: false });
    });
    new Chart(historyCanvas.current, { type: 'line', data: { datasets: sets } });
  }

  function startQuiz(key) {
    setCurrent(key);
    setIdx(0);
    setAns([]);
    setStep("quiz");
  }

  function next() {
    if (idx < ASSESSMENTS_DATA[current].questions.length - 1) {
      setIdx(idx + 1);
    } else {
      submit();
    }
  }

  function prev() {
    setIdx(idx - 1);
  }

  function submit() {
    let scr = 0;
    ans.forEach((a, i) => {
      if (current === "PSS10" && ASSESSMENTS_DATA[current].reverseIndex?.includes(i)) {
        scr += (ASSESSMENTS_DATA[current].scores.length - 1) - a;
      } else scr += a;
    });
    const record = { assessmentId: current, score: scr, date: new Date().toISOString() };
    const stored = JSON.parse(localStorage.getItem("assessmentResults") || "{}");
    stored[current] = stored[current] || [];
    stored[current].push(record);
    localStorage.setItem("assessmentResults", JSON.stringify(stored));
    setResult(record);
    setStep("result");
  }

  function band() {
    const b = ASSESSMENTS_DATA[current].bands.find(b => result.score >= b.min && result.score <= b.max);
    return b || {};
  }

  function cycle() {
    const order = ["PHQ9", "GAD7", "PSS10"];
    const i = order.indexOf(current);
    startQuiz(order[(i + 1) % order.length]);
  }

  return (
    <section style={{ background: "linear-gradient(180deg,#d9e8f1,#e4f2ec)", minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px" }}>
      {step === "assess" && (
        <div className="container">
          <h1 style={{ color: "#000", fontWeight: "700" }}>Mental Health Assessments</h1>
          <p style={{ color: "#000" }}>Take evidence-based screenings to better understand your mental health.</p>
          <div className="grid">
            {Object.keys(ASSESSMENTS_DATA).map(k => (
              <div className="card" key={k}>
                <div className="top">
                  <span className="icon">{ASSESSMENTS_DATA[k].icon}</span>
                  <span className="badge">{ASSESSMENTS_DATA[k].badge}</span>
                </div>
                <h3>{ASSESSMENTS_DATA[k].title}</h3>
                <p className="desc">{ASSESSMENTS_DATA[k].questions.length} questions • {ASSESSMENTS_DATA[k].time}</p>
                <button className="btn" onClick={() => startQuiz(k)}>Take Assessment</button>
              </div>
            ))}
            <div className="card coming">
              <div className="top"><span className="icon">🌟</span><span className="badge">Custom</span></div>
              <h3>Teen Wellness Check</h3>
              <p className="desc">A comprehensive check-in.</p>
              <button className="btn disabled">Coming Soon</button>
            </div>
          </div>
          <div className="history">
            <h3 style={{ color: "#000" }}>Your Assessment History</h3>
            <canvas ref={historyCanvas} height="250" />
          </div>
        </div>
      )}

      {step === "quiz" && (
        <div className="container">
          <div className="qcard">
            <h3 style={{ color: "#000" }}>{ASSESSMENTS_DATA[current].title}</h3>
            <p style={{ color: "#000" }}>Question {idx + 1} of {ASSESSMENTS_DATA[current].questions.length}</p>
            <div className="quest">{ASSESSMENTS_DATA[current].questions[idx]}</div>
            {ASSESSMENTS_DATA[current].options.map((o, i) => (
              <button
                style={{ color: "#000" }}
                key={i}
                className={`opt ${ans[idx] === ASSESSMENTS_DATA[current].scores[i] ? "sel" : ""}`}
                onClick={() => {
                  ans[idx] = ASSESSMENTS_DATA[current].scores[i];
                  setAns([...ans]);
                }}
              >
                {o}
              </button>
            ))}
            <div className="actions">
              <button disabled={idx === 0} onClick={prev}>Prev</button>
              <button onClick={next}>{idx === ASSESSMENTS_DATA[current].questions.length - 1 ? "Submit" : "Next"}</button>
            </div>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="container">
          <div className="qcard" style={{ textAlign: "center" }}>
            <h3 style={{ color: "#000" }}>Result: {ASSESSMENTS_DATA[current].title}</h3>
            <div style={{ fontSize: "48px", margin: "20px 0", color: "#000" }}>{result.score}</div>
            <h3 style={{ color: "#000" }}>{band().label}</h3>
            <p style={{ color: "#000" }}>{band().recommendation}</p>
            <button className="btn" onClick={cycle}>Take Another</button>
          </div>
        </div>
      )}

      <style>{`
        .container{max-width:1100px;margin:auto;padding:32px;text-align:center}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;margin-top:40px}
        .card{background:#ffffff;border-radius:14px;padding:32px;box-shadow:0 8px 24px rgba(0,0,0,0.08);text-align:left}
        .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
        .icon{font-size:40px}
        .badge{
          background:#008080;
          color:#fff;
          padding:5px 16px;
          height:28px;
          min-width:70px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size:13px;
          border-radius:20px
        }
        .card h3{color:#000;font-weight:600;margin:12px 0}
        .desc{color:#000;margin-bottom:20px}
        .btn{background:#008080;color:#fff;padding:12px 24px;border:none;border-radius:8px;margin-top:8px}
        .coming{opacity:0.65;border:3px dashed #bbbbbb;}
        .btn.disabled{background:#bbb;cursor:not-allowed}
        .history{margin-top:60px;background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05)}
        .qcard{background:#fff;border-radius:12px;padding:32px;box-shadow:0 8px 24px rgba(0,0,0,0.08);max-width:600px;margin:auto;margin-top:40px;}
        .quest{font-weight:700;margin-bottom:16px;color:#000;text-align:left}
        .opt{display:block;width:100%;margin-bottom:8px;padding:12px;border:2px solid transparent;background:#f0f4f3;border-radius:8px;color:#000;text-align:left}
        .opt.sel{background:#d6f0ec;border-color:#008080}
        .actions button{background:#008080;color:#fff;border:none;padding:10px 18px;margin:8px;border-radius:6px}
      `}</style>
    </section> 
  );
}
