// src/Components/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl p-5 text-center cursor-pointer w-[240px] h-[230px] flex flex-col items-center justify-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;
