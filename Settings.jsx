import { useEffect, useState, useRef } from "react";

const avatarOptions = ["😊","😎","🌟","🦄","🌈","🎭","🌸","⚡","🎨","🎵","🚀","🌺"];

export default function Settings({ isOpen, onClose }) {
  const [nickname, setNickname] = useState(localStorage.getItem("userNickname") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || "😊");
  const [showAvatars, setShowAvatars] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(localStorage.getItem("animationsEnabled") !== "false");

  const [moodCount, setMoodCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [assessmentCount, setAssessmentCount] = useState(0);

  const containerRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      updateCounts();
      const escHandler = (e) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", escHandler);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", escHandler);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem("animationsEnabled", animationsEnabled);
  }, [animationsEnabled]);

  const updateCounts = () => {
    const moodData = JSON.parse(localStorage.getItem("moodData") || "[]");
    const journalData = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    const assessmentResults = JSON.parse(localStorage.getItem("assessmentResults") || "{}");
    const totalAssessments = Object.values(assessmentResults).reduce((acc, arr) => acc + arr.length, 0);
    setMoodCount(moodData.length);
    setJournalCount(journalData.length);
    setAssessmentCount(totalAssessments);
  };

  const handleSaveNickname = () => {
    localStorage.setItem("userNickname", nickname);
    alert("Nickname saved 😊");
  };

  const handleChangeAvatar = (newAvatar) => {
    setAvatar(newAvatar);
    localStorage.setItem("userAvatar", newAvatar);
    setShowAvatars(false);
    alert("Avatar updated 🎨");
  };

  const handleExportData = () => {
    const dataToExport = {
      nickname,
      avatar,
      moodData: JSON.parse(localStorage.getItem("moodData") || "[]"),
      journalEntries: JSON.parse(localStorage.getItem("journalEntries") || "[]"),
      assessmentResults: JSON.parse(localStorage.getItem("assessmentResults") || "{}"),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auracare-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = (key, label) => {
    if (confirm(`Are you sure you want to clear ${label}?`)) {
      localStorage.removeItem(key);
      alert(`${label} cleared`);
      updateCounts();
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear ALL data? This cannot be undone.")) {
      ["moodData","journalEntries","assessmentResults","chatHistory"].forEach(localStorage.removeItem.bind(localStorage));
      alert("All data cleared");
      updateCounts();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade" onClick={onClose}>
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          className="settings-popup
            bg-white text-black font-medium
            w-full max-w-2xl mx-2 rounded-xl shadow-2xl
            p-6 overflow-y-auto relative animate-scale
            max-h-[90vh] md:mx-auto
          "
        >
          <button className="absolute top-3 right-4 text-2xl text-black" onClick={onClose}>×</button>
          <h1 className="text-3xl text-black font-bold mb-5">Settings</h1>

          {/* Profile */}
          <div className="mb-6">
            <h2 className="text-xl text-black font-bold border-b pb-2 mb-4">Profile</h2>
            <div className="mb-4">
              <label className="block text-black font-medium mb-1">Your Nickname</label>
              <div className="flex gap-2">
                <input type="text" className="border rounded-md px-3 py-1 w-full text-black" maxLength={20} value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <button className="px-3 py-1 border rounded-md bg-white text-black" onClick={handleSaveNickname}>Save</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black font-medium mb-1">Your Avatar</label>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{avatar}</div>
                <button className="px-3 py-1 border rounded-md bg-white text-black" onClick={() => setShowAvatars(!showAvatars)}>Change</button>
              </div>
            </div>

            {showAvatars && (
              <div className="mt-4 grid grid-cols-6 gap-3">
                {avatarOptions.map((option) => (
                  <button key={option} onClick={() => handleChangeAvatar(option)} className={`text-2xl p-2 border rounded-md hover:bg-gray-100 text-black ${avatar === option ? "bg-blue-100" : ""}`}>{option}</button>
                ))}
              </div>
            )}
          </div>

          {/* Appearance */}
          <div className="mb-6">
            <h2 className="text-xl text-black font-bold border-b pb-2 mb-4">Appearance</h2>
            <div className="flex items-center gap-2">
              <input id="animationsToggle" type="checkbox" checked={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />
              <label htmlFor="animationsToggle" className="cursor-pointer text-black font-medium">Enable Animations</label>
            </div>
          </div>

          {/* Privacy & Data */}
          <div>
            <h2 className="text-xl text-black font-bold border-b pb-2 mb-4">Privacy & Data</h2>
            <div className="bg-white border rounded-md p-4 mb-4 text-sm font-medium text-black">
              <div className="flex justify-between mb-1"><span>Mood entries:</span><span>{moodCount}</span></div>
              <div className="flex justify-between mb-1"><span>Journal entries:</span><span>{journalCount}</span></div>
              <div className="flex justify-between"><span>Assessment results:</span><span>{assessmentCount}</span></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExportData} className="px-3 py-1 border rounded-md bg-white text-black">Export My Data</button>
              <button onClick={() => handleClearData("moodData", "Mood data")} className="px-3 py-1 border rounded-md bg-white text-black">Clear Mood Data</button>
              <button onClick={() => handleClearData("journalEntries", "Journal entries")} className="px-3 py-1 border rounded-md bg-white text-black">Clear Journal</button>
              <button onClick={() => handleClearData("assessmentResults", "Assessment results")} className="px-3 py-1 border rounded-md bg-white text-black">Clear Results</button>
              <button onClick={handleClearAll} className="px-3 py-1 border rounded-md bg-red-100 hover:bg-red-200 text-red-600">Clear All Data</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes scaleIn { from {transform:scale(0.9);opacity:0} to {transform:scale(1);opacity:1} }
        .animate-fade { animation: fadeIn .3s ease forwards; }
        .animate-scale{ animation: scaleIn .3s ease forwards; }

        .settings-popup h1, .settings-popup h2 {
          color: #000 !important;
        }
      `}</style>
    </>
  );
}
