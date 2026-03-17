import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthPage = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  // ✅ Google Sign-In
  const handleGoogleClick = async () => {
    try {
      await signInWithPopup(auth, provider);
      setPopupMessage("✅ Logged in with Google!");
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setPopupMessage("❌ Google sign-in failed.");
    }
  };

  // ✅ Email/Password Login or Signup
  const handleSubmit = async () => {
    if (!email || !password) {
      setPopupMessage("⚠️ Please enter email and password.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setPopupMessage("✅ Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setPopupMessage("🎉 Account created successfully!");
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setPopupMessage("❌ Authentication failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2
          className="text-3xl font-extrabold text-center mb-6"
          style={{
            background: "linear-gradient(to right, #000000, #444444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {isLogin ? "Login" : "Sign up"}
        </h2>

        <input
          type="email"
          placeholder="Enter your mail id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black placeholder-gray-500"
        />

        <button
          className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-semibold"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Sign up"}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleClick}
          className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
            className="mr-2"
          >
            <path
              fill="#4285F4"
              d="M44.5 20H24v8.5h11.8C34.7 32.4 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l5.9-5.9C34.2 6.6 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"
            />
            <path
              fill="#34A853"
              d="M6.3 14.7l6.6 4.8C14.1 15.2 18.7 12 24 12c3.1 0 5.9 1.1 8 3l5.9-5.9C34.2 6.6 29.4 4 24 4 16 4 9.1 8.8 6.3 14.7z"
            />
            <path
              fill="#FBBC05"
              d="M24 44c5.5 0 10.2-1.8 13.6-4.9l-6.4-5.3c-2 1.3-4.6 2.1-7.2 2.1-6.1 0-11.2-3.6-13.1-8.7l-6.6 5.1C9.1 39.2 16 44 24 44z"
            />
            <path
              fill="#EA4335"
              d="M44.5 20H24v8.5h11.8c-.9 2.7-2.6 5-4.8 6.6l6.4 5.3c3.7-3.4 6.1-8.4 6.1-14.4 0-1.3-.1-2.7-.3-4z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-teal-600 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {popupMessage && (
          <p className="text-center text-sm text-teal-600 mt-4 font-medium">
            {popupMessage}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
