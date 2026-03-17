import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("Friend");
  const [avatar, setAvatar] = useState("😊");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [showToast, setShowToast] = useState("");

  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingText, setBreathingText] = useState("Breathe");

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening");
    setNickname(localStorage.getItem("userNickname") || "Friend");
    setAvatar(localStorage.getItem("userAvatar") || "😊");
    const moods = JSON.parse(localStorage.getItem("moodData")) || [];
    setMoodData(moods);
    const today = new Date().toISOString().split("T")[0];
    const todayMood = moods.find((m) => m.date.split("T")[0] === today);
    if (todayMood) setSelectedMood(todayMood.mood);
  }, []);

  const moodsArr = [
    { emoji: "😔", label: "Sad" },
    { emoji: "😕", label: "Down" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😊", label: "Happy" },
    { emoji: "😄", label: "Excited" },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    const newMood = { mood, date: new Date().toISOString() };
    const updatedMoods = [...moodData, newMood];
    setMoodData(updatedMoods);
    localStorage.setItem("moodData", JSON.stringify(updatedMoods));
    setShowToast(`Mood logged: ${mood.label} ${mood.emoji}`);
    setTimeout(() => setShowToast(""), 3000);
  };

  const startBreathingExercise = () => {
    if (breathingActive) return;
    setBreathingActive(true);
    const phases = [
      { text: "Breathe In", duration: 4000 },
      { text: "Hold", duration: 2000 },
      { text: "Breathe Out", duration: 4000 },
      { text: "Rest", duration: 2000 },
    ];
    let current = 0,
      cycles = 0,
      maxCycles = 5;
    const run = () => {
      setBreathingText(phases[current].text);
      setTimeout(() => {
        current = (current + 1) % phases.length;
        if (current === 0) {
          cycles++;
          if (cycles >= maxCycles) {
            setBreathingActive(false);
            setBreathingText("Complete!");
            setTimeout(() => setBreathingText("Breathe"), 2000);
            setShowToast("Great job! You completed the breathing exercise. 🌬️");
            return;
          }
        }
        run();
      }, phases[current].duration);
    };
    run();
  };

  return (
    <section
      id="dashboard"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-6 px-4 pt-6"
    >
      <style>{`
        /* Slow smooth fade slide up */
        @keyframes slideUpSlow {
          from { opacity:0; transform:translateY(60px); }
          to { opacity:1; transform:translateY(0); }
        }
        .slideUpWrap {
          animation: slideUpSlow 2s ease forwards;
        }
      `}</style>

      {/* animate only the wrapper not whole section */}
      <div className="slideUpWrap">
        <div className="max-w-6xl mx-auto container">
          <div className="mb-8">
            <div className="flex items-center gap-5 mb-6">
              <div className="text-5xl w-20 h-20 rounded-full flex items-center justify-center border-4 border-teal-500">
                {avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold !text-black mb-2">
                  Good <span>{timeOfDay}</span>, <span>{nickname}</span>! 👋
                </h1>
                <p className="text-gray-600 m-0">How are you feeling today?</p>
              </div>
            </div>
          </div>

          <div className="bg-white text-black rounded-xl shadow p-6 mb-8">
            <h3 className="text-lg font-bold !text-black mb-4 text-center">
              Quick Mood Check
            </h3>
            <div className="flex gap-3 justify-center">
              {moodsArr.map((m) => (
                <button
                  key={m.label}
                  onClick={() => handleMoodClick(m)}
                  className={`text-2xl p-3 rounded-lg border transition ${
                    selectedMood?.label === m.label
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Mood Tracker",
                desc: "Log your daily mood and see trends over time",
                stats: `${moodData.length} ${
                  moodData.length === 1 ? "day" : "days"
                } tracked`,
                onClick: () => navigate("/mood"),
                btn: "Track Mood",
              },
              {
                icon: "📝",
                title: "Private Journal",
                desc: "Write about your thoughts and feelings with AI insights",
                stats: "0 entries written",
                onClick: () => navigate("/journal"),
                btn: "Start Writing",
              },
              {
                icon: "🤖",
                title: "AI Support Chat",
                desc: "Talk to your AI companion for support and guidance",
                stats: "24/7 available",
                onClick: () => navigate("/chat"),
                btn: "Start Chat",
              },
              {
                icon: "🔍",
                title: "Mental Health Assessments",
                desc: "Take evidence-based screenings for depression, anxiety & stress",
                stats: "0 assessments taken",
                onClick: () => navigate("/assessments"),
                btn: "Take Assessment",
              },
              {
                icon: "🆘",
                title: "Crisis Support",
                desc: "Find immediate help and professional resources near you",
                stats: "Emergency: 1800-599-0019",
                onClick: () => navigate("/resources"),
                btn: "Find Resources",
              },
              {
                icon: "🫁",
                title: "Breathing Exercise",
                desc: "Take a moment to center yourself with guided breathing",
                stats: "",
                onClick: null,
                btn: "Start Exercise",
              },
            ].map((card, i) => (
              <div
                key={i}
                onClick={card.onClick}
                className="cursor-pointer bg-white text-gray-700 rounded-xl p-6 shadow transition transform duration-300 hover:-translate-y-2 flex flex-col items-center"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold !text-black mb-1">{card.title}</h3>
                <p className="text-sm mb-4 text-center">{card.desc}</p>
                {card.stats && card.title !== "Breathing Exercise" && (
                  <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded mb-4 text-sm">
                    <span>{card.stats}</span>
                  </div>
                )}
                {card.title === "Breathing Exercise" ? (
                  <button
                    onClick={startBreathingExercise}
                    disabled={breathingActive}
                    className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                  >
                    {breathingText}
                  </button>
                ) : (
                  <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
                    {card.btn}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow animate-fadeUp">
          {showToast}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
