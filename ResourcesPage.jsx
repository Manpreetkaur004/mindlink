import React, { useState } from "react";
import { motion } from "framer-motion";

const RESOURCES_DATA = [
  { name: "KIRAN Mental Health Helpline", type: "helpline", city: "National", phone: "1800-599-0019", description: "24/7 toll-free mental health rehabilitation helpline", website: "https://mohfw.gov.in" },
  { name: "TeleMANAS", type: "helpline", city: "National", phone: "14416", description: "Tele Mental Health Assistance and Networking Across States", website: "https://telemanas.gov.in" },
  { name: "Vandrevala Foundation", type: "helpline", city: "National", phone: "9999666555", description: "Free and confidential mental health helpline", website: "https://www.vandrevalafoundation.com/" },
  { name: "Asara", type: "ngo", city: "Mumbai", phone: "022-2754-6669", description: "Suicide prevention and emotional support", website: "https://aasra.info/" },
  { name: "SNEHA", type: "ngo", city: "Chennai", phone: "044-2464-0050", description: "Suicide prevention and emotional support", website: "http://snehaindia.org/" },
  { name: "Samaritans", type: "ngo", city: "Kolkata", phone: "033-2463-7401", description: "Emotional support and crisis intervention", website: "https://samaritansindia.org/" },
  { name: "Connecting NGO", type: "ngo", city: "Mumbai", phone: "022-6464-3267", description: "Mental health support and counseling", website: "https://connectingngo.org/" }
];

const ResourcesPage = () => {
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = RESOURCES_DATA.filter(r => {
    return (locationFilter === "All" || r.city === locationFilter) &&
      (typeFilter === "All" || r.type === typeFilter);
  });

  return (
    <section className="w-full min-h-screen pt-4 pb-16 bg-gradient-to-b from-[#e5ecff] to-[#e1f4f0]">
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6"
      >
        <h1 className="text-center text-4xl font-bold mb-2" style={{ color: "#273943" }}>
          Mental Health Resources
        </h1>
        <p className="text-center mb-10" style={{ color: "#5f7584" }}>
          Find professional support, crisis help, and mental health resources in your area.
        </p>

        <div
          className="flex items-center justify-between gap-4 rounded-xl border-[3px] mb-10 px-6 py-3"
          style={{ borderColor: "#bd182e", background: "linear-gradient(-45deg,#f2f4f8,#e6ecf2)" }}
        >
          <div className="bg-pink-500 text-white px-5 py-2 rounded-md font-bold">SOS</div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl mb-1" style={{ color: "#bd182e" }}>In Crisis? Get Immediate Help</h3>
            <p className="text-sm" style={{ color: "#334256" }}>If you're having thoughts of self-harm or suicide, please reach out immediately</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:1800-599-0019" className="px-5 py-2 rounded-md text-white font-medium" style={{ background: "#01748b" }}>Call KIRAN: 1800-599-0019</a>
            <a href="tel:112" className="px-5 py-2 rounded-md font-medium border" style={{ borderColor: "#999", color: "#333" }}>Emergency: 112</a>
          </div>
        </div>

        <div className="flex gap-6 justify-center mb-12 flex-wrap">
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="bg-white border px-4 py-2 rounded-md font-semibold text-gray-800">
            <option value="All">All locations</option>
            <option value="National">National</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white border px-4 py-2 rounded-md font-semibold text-gray-800">
            <option value="All">All types</option>
            <option value="helpline">Helpline</option>
            <option value="ngo">NGO</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((r, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white p-6 border border-gray-200 shadow-md hover:shadow-lg transition"
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h3 className="text-[20px] font-bold mb-1" style={{ color: "#01579B" }}>{r.name}</h3>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mb-1 capitalize">{r.type}</span>
              <div className="text-gray-600 text-sm mb-2">{r.city}</div>
              <div className="font-medium mb-3 text-gray-800">📞 {r.phone}</div>
              <p className="text-sm text-gray-800 mb-4">{r.description}</p>
              <div className="flex gap-3">
                <a href={`tel:${r.phone}`} className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm font-semibold">Call Now</a>
                <a href={r.website} target="_blank" rel="noreferrer" className="border border-gray-400 rounded-md px-4 py-2 text-sm font-semibold text-gray-800 bg-white">Website</a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ResourcesPage;
