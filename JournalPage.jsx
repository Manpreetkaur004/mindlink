import { useEffect, useState } from "react";

const JournalPage = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: entry,
      sentiment: "neutral",
      createdAt: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setEntry("");
  };

  const clearEntry = () => setEntry("");

  const filteredEntries = entries.filter((e) =>
    filter === "all" ? true : e.sentiment === filter
  );

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <section
      id="journal"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #C8D9F1 0%, #D8EDE5 100%)",
        color: "#000",
        paddingTop: "20px",
        marginTop: "0",
      }}
    >
      <style>{`
        @keyframes slideUpSlow {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0);  }
        }
        .slideUpJournal {
          animation: slideUpSlow 1.6s ease forwards;
        }
      `}</style>

      <div className="slideUpJournal container">
        <div className="page-header mb-4">
          <h1 style={{ color: "#000", fontWeight: 600 }}>Private Journal</h1>
          <p className="text-black">
            Write about your thoughts and feelings. Your entries are completely
            private and secure.
          </p>
        </div>

        <div className="journal-interface">
          {/* NEW ENTRY */}
          <div className="journal-editor mb-6" style={cardStyle}>
            <div className="editor-header">
              <h3 style={{ color: "#000", fontWeight: 600 }}>New Entry</h3>
              <div className="editor-tools">
                <button className="tool-btn text-black" id="word-count">
                  {entry.split(/\s+/).filter((w) => w).length} words
                </button>
              </div>
            </div>
            <textarea
              placeholder="What's on your mind today? How are you feeling? What happened that was significant?"
              maxLength="5000"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              style={{
                background: "#fff",
                borderRadius: "6px",
                padding: "8px",
                border: "1px solid #ccc",
                color: "#000",
                caretColor: "#000",
                height: "300px",          
              }}
              className="w-full mt-2"
            />

            <div className="journal-actions mt-4 flex items-center justify-between">
              <div style={{
                background:"#dbefdf",
                padding:"8px 12px",
                borderRadius:"8px",
                display:"flex",
                alignItems:"center",
                gap:"6px",
                fontSize:"14px",
                color:"#000",
              }}>
                😊 <b>Neutral</b> <span>Your writing tone seems balanced</span>
              </div>

              <div className="entry-actions flex gap-2">
                <button
                  style={{
                    border: "2px solid #0d9488",
                    color: "#000",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "transparent",
                    fontWeight: 600,
                    transition: "0.3s",
                  }}
                  onClick={clearEntry}
                >
                  Clear
                </button>
                <button
                  style={{
                    background: "#0d9488",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 600,
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#0b8179")}
                  onMouseLeave={(e) => (e.target.style.background = "#0d9488")}
                  onClick={saveEntry}
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="journal-sidebar">
            <div className="journal-entries mb-6" style={cardStyle}>
              <h3 style={{ color: "#000", fontWeight: 600 }}>Recent Entries</h3>
              <div className="entries-filter mb-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ background: "#fff", color: "#000" }}
                  className="form-control"
                >
                  <option value="all">All entries</option>
                  <option value="positive">Positive entries</option>
                  <option value="negative">Difficult entries</option>
                  <option value="neutral">Neutral entries</option>
                </select>
              </div>
              <div id="entries-list">
                {filteredEntries.length ? (
                  filteredEntries.map((e) => (
                    <div
                      key={e.id}
                      style={{
                        background: "#ffffff",
                        color: "#000",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <p style={{ color: "#000", marginBottom: "4px" }}>
                        {e.text.slice(0, 100)}
                      </p>
                      <span style={{ color: "#000" }}>{e.createdAt}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#000" }}>No entries available.</p>
                )}
              </div>
            </div>

            <div className="journal-insights" style={cardStyle}>
              <h3 style={{ color: "#000", fontWeight: 600 }}>Writing Insights</h3>
              <div className="insight-item">
                <span style={{ color: "#000" }}>Total entries:</span>
                <span style={{ color: "#000" }}>{entries.length}</span>
              </div>
              <div className="insight-item">
                <span style={{ color: "#000" }}>Most common mood:</span>
                <span style={{ color: "#000" }}>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalPage;
