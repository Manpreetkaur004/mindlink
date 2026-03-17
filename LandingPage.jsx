import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';

const Landing = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #C8D9F1 0%, #D8EDE5 100%)',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '40px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Hero Section */}
        <div
          className="hero flex flex-col items-center justify-center text-center px-6 lg:px-0"
          style={{ position: 'relative' }}
        >
          <div className="hero-content max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                fontWeight: 600,
                color: '#003642',
                fontSize: '60px',
                letterSpacing: '0.5px',
              }}
            >
              Welcome to AuraCare
            </motion.h1>
            <p className="hero-subtitle mt-3 text-lg" style={{ color: '#2a4850' }}>
              Your personalized mental wellness companion designed specifically for teenagers.
              Take assessments, track your mood, chat with AI support, and get the help you deserve all in a safe, private space.
            </p>

            <div className="hero-stats flex gap-8 justify-center mt-6 flex-wrap">
              <div className="stat">
                <div className="stat-number text-3xl font-bold" style={{ color: '#003642' }}>10%</div>
                <div className="stat-label text-sm">of teens need mental health support</div>
              </div>
              <div className="stat">
                <div className="stat-number text-3xl font-bold" style={{ color: '#003642' }}>70%</div>
                <div className="stat-label text-sm">improvement with early intervention</div>
              </div>
            </div>

            <div className="hero-actions flex gap-4 justify-center mt-8 flex-wrap">
              <button className="btn btn--primary text-white" onClick={() => navigate('/onboarding')}>
                Get Started
              </button>
              <button
                className="btn btn--outline"
                style={{ color: '#000', borderColor: '#000' }}
                onClick={scrollToFeatures}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section" style={{ backgroundColor: '#fff', padding: '60px 0' }}>
          <div className="container">
            <h2 className="section-title" style={{ color: '#000', fontWeight: '700', textAlign: 'center' }}>
              Everything you need for mental wellness
            </h2>
            <div className="features-grid">
              {[
                { icon: '😊', title: 'Mood Tracking', desc: 'Track your daily emotions and discover patterns with beautiful visualizations' },
                { icon: '🤖', title: 'AI Support Chat', desc: '24/7 AI companion trained to provide empathetic support and coping strategies' },
                { icon: '📋', title: 'Mental Health Assessments', desc: 'Evidence-based screenings for depression, anxiety, and stress levels' },
                { icon: '📱', title: 'Private & Secure', desc: 'Your data stays on your device. Complete privacy and control over your information' },
              ].map((item, index) => (
                <div key={index} className="feature-item" style={{ backgroundColor: '#ffffff' }}>
                  <div className="feature-icon" style={{ fontSize: '2rem' }}>{item.icon}</div>
                  <h3 style={{ fontWeight: '600', color: '#000' }}>{item.title}</h3>
                  <p style={{ color: '#000' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Landing;
