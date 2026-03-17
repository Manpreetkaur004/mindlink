import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("😊");
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleComplete = () => {
    localStorage.setItem("userNickname", nickname);
    localStorage.setItem("userAvatar", avatar);
    localStorage.setItem("onboardingComplete", "true");
    navigate("/dashboard");
  };

  const steps = [1, 2, 3, 4];

  const animationProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center overflow-hidden">
        <div className="flex justify-center mb-6 space-x-2">
          {steps.map((s) => (
            <div
              key={s}
              className={`h-2 w-2 rounded-full ${
                step === s ? "bg-teal-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...animationProps}>
              <div className="text-4xl mb-4">👋</div>
              <h2
                style={{ color: "#000", fontWeight: 600 }}
                className="text-xl mb-2"
              >
                Welcome to Auracare!
              </h2>
              <p className="text-black font-semibold mb-6">
                Let’s set up your personal mental wellness space. This will only
                take a few minutes and everything stays private on your device.
              </p>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Let’s Begin
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...animationProps}>
              <div className="text-4xl mb-4">😊</div>
              <h2
                style={{ color: "#000", fontWeight: 600 }}
                className="text-xl mb-2"
              >
                What should we call you?
              </h2>
              <p className="text-black font-semibold mb-4">
                Choose a nickname that makes you comfortable. You can change this
                anytime.
              </p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 placeholder-gray-400"
              />
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={nickname.trim() ? nextStep : undefined}
                  disabled={!nickname.trim()}
                  className={`px-4 py-2 rounded ${
                    nickname.trim()
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...animationProps}>
              <div className="text-4xl mb-4">🎨</div>
              <h2
                style={{ color: "#000", fontWeight: 600 }}
                className="text-xl mb-2"
              >
                Choose your avatar
              </h2>
              <p className="text-black font-semibold mb-4">
                Pick an avatar that represents you!
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {["😊", "😎", "🌞", "🦄", "🌈", "🐱", "🌸", "⚡"].map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setAvatar(icon)}
                    className={`text-2xl p-2 rounded border transition ${
                      avatar === icon
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" {...animationProps}>
              <div className="text-4xl mb-4">🔒</div>
              <h2
                style={{ color: "#000", fontWeight: 600 }}
                className="text-xl mb-2"
              >
                Your Privacy Matters
              </h2>
              <ul className="text-left text-black font-semibold mb-6 space-y-2">
                <li>📱 All data stays on your device</li>
                <li>🔐 No personal information is shared</li>
                <li>🗑️ You can delete everything anytime</li>
              </ul>
              <label className="flex items-center gap-2 mb-6 text-black font-semibold">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I understand and agree to these privacy practices
              </label>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={consent ? handleComplete : undefined}
                  disabled={!consent}
                  className={`px-4 py-2 rounded ${
                    consent
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition`}
                >
                  Complete Setup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
