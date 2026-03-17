// Assessment Data
const ASSESSMENTS_DATA = {
  "PHQ9": {
    "title": "Depression Screening (PHQ-9)",
    "id": "PHQ9",
    "questions": [
      "Little interest or pleasure in doing things", 
      "Feeling down, depressed, irritable, or hopeless", 
      "Trouble falling asleep, staying asleep, or sleeping too much", 
      "Poor appetite, weight loss, or overeating", 
      "Feeling tired, or having little energy", 
      "Feeling bad about yourself – or feeling that you are a failure or have let yourself or your family down", 
      "Trouble concentrating on things, such as reading or watching TV", 
      "Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you were moving around a lot more than usual", 
      "Thoughts that you would be better off dead, or of hurting yourself in some way"
    ],
    "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    "scores": [0,1,2,3],
    "bands": [
      {"min":0,"max":4,"label":"None / Minimal","recommendation":"Great! Keep up healthy habits like regular exercise, good sleep, and staying connected with friends. Continue monitoring your mood."},
      {"min":5,"max":9,"label":"Mild","recommendation":"Consider self-help strategies like mindfulness meditation, regular physical activity, and journaling. Talk to trusted friends or family. Retake this assessment in 2-3 weeks."},
      {"min":10,"max":14,"label":"Moderate","recommendation":"It's important to reach out for support. Consider talking to a school counselor, trusted adult, or mental health professional. Explore coping skills and peer support groups."},
      {"min":15,"max":19,"label":"Moderately Severe","recommendation":"Professional help is strongly recommended. Please speak with a mental health professional, school counselor, or trusted adult as soon as possible."},
      {"min":20,"max":27,"label":"Severe","recommendation":"Seek professional support urgently. If you're having thoughts of self-harm, please call a crisis helpline immediately: KIRAN 1800-599-0019 (24/7)."}
    ]
  },
  "GAD7": {
    "title": "Anxiety Screening (GAD-7)",
    "id": "GAD7",
    "questions": [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen"
    ],
    "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    "scores": [0,1,2,3],
    "bands": [
      {"min":0,"max":4,"label":"Minimal","recommendation":"Great job managing anxiety! Maintain calming routines like deep breathing, good sleep hygiene, and regular physical activity."},
      {"min":5,"max":9,"label":"Mild","recommendation":"Try relaxation exercises, mindfulness apps, journaling, and talking with friends. Consider stress management techniques and maintaining a regular routine."},
      {"min":10,"max":14,"label":"Moderate","recommendation":"Consider speaking with a counselor or trying cognitive behavioral therapy (CBT) techniques. Apps like Headspace or Calm might help with anxiety management."},
      {"min":15,"max":21,"label":"Severe","recommendation":"Professional evaluation is recommended. Please reach out to a mental health professional, school counselor, or trusted adult for support promptly."}
    ]
  },
  "PSS10": {
    "title": "Perceived Stress Scale (PSS-10)",
    "id": "PSS10",
    "questions": [
      "In the last month, how often have you been upset because of something that happened unexpectedly?",
      "In the last month, how often have you felt that you were unable to control the important things in your life?",
      "In the last month, how often have you felt nervous or stressed?",
      "In the last month, how often have you felt confident about your ability to handle your personal problems?",
      "In the last month, how often have you felt that things were going your way?",
      "In the last month, how often have you found that you could not cope with all the things that you had to do?",
      "In the last month, how often have you been able to control irritations in your life?",
      "In the last month, how often have you felt that you were on top of things?",
      "In the last month, how often have you been angered because of things that were outside of your control?",
      "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    ],
    "reverseIndex": [3,4,6,7],
    "options": ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"],
    "scores": [0,1,2,3,4],
    "bands": [
      {"min":0,"max":13,"label":"Low","recommendation":"Your perceived stress is low. Keep balancing work and play! Maintain healthy habits and stress management techniques."},
      {"min":14,"max":26,"label":"Moderate","recommendation":"Practice time management, relaxation techniques, and seek social support. Consider regular exercise and maintain work-life balance."},
      {"min":27,"max":40,"label":"High","recommendation":"High stress detected. Consider professional guidance and stress-management programs. Don't hesitate to reach out for support."}
    ]
  }
};

const RESOURCES_DATA = [
  {"name":"KIRAN Mental Health Helpline","type":"helpline","city":"National","phone":"1800-599-0019","website":"https://mib.gov.in/mental-health-helpline","description":"24/7 toll-free mental health rehabilitation helpline","lat":23.5937,"lng":80.9629},
  {"name":"TeleMANAS","type":"helpline","city":"National","phone":"14416","website":"https://telemanas.mohfw.gov.in/","description":"Tele Mental Health Assistance and Networking Across States","lat":28.6139,"lng":77.2090},
  {"name":"Vandrevala Foundation","type":"helpline","city":"National","phone":"9999666555","website":"https://www.vandrevalafoundation.com/","description":"Free and confidential mental health helpline","lat":19.0760,"lng":72.8777},
  {"name":"NIMHANS","type":"hospital","city":"bangalore","phone":"080-2699-5000","website":"https://nimhans.ac.in/","description":"National Institute of Mental Health and Neurosciences","lat":12.944,"lng":77.596},
  {"name":"AIIMS Dept. of Psychiatry","type":"hospital","city":"delhi","phone":"011-2659-9260","website":"https://www.aiims.edu/","description":"All India Institute of Medical Sciences","lat":28.567,"lng":77.205},
  {"name":"Sumaitri","type":"ngo","city":"delhi","phone":"011-23389090","website":"http://sumaitri.net/","description":"Crisis intervention and suicide prevention","lat":28.6139,"lng":77.2090},
  {"name":"Aasra","type":"ngo","city":"mumbai","phone":"022-2754-6669","website":"http://www.aasra.info/","description":"Suicide prevention and emotional support","lat":19.0760,"lng":72.8777},
  {"name":"SNEHA","type":"ngo","city":"chennai","phone":"044-2464-0050","website":"http://www.snehaindia.org/","description":"Suicide prevention and emotional support","lat":13.0827,"lng":80.2707},
  {"name":"Samaritans","type":"ngo","city":"kolkata","phone":"033-2463-7401","website":"https://www.befrienders.org/","description":"Emotional support and crisis intervention","lat":22.5726,"lng":88.3639},
  {"name":"Connecting NGO","type":"ngo","city":"mumbai","phone":"022-6464-3267","website":"https://connectingngo.org/","description":"Mental health support and counseling","lat":19.0760,"lng":72.8777}
];

const CHATBOT_RESPONSES = {
  greetings: [
    "Hi there! I'm MindBot, your AI companion. I'm here to listen and support you. How are you feeling today?",
    "Hello! Thanks for reaching out to me. What's on your mind right now?",
    "Hey! I'm glad you're here. I'm here to help and support you. How can I assist you today?"
  ],
  anxiety: [
    "I understand you're feeling anxious. Let's try some deep breathing together. Breathe in slowly for 4 counts... hold for 4... then out for 4. 🌬️",
    "Anxiety can feel overwhelming, but you're not alone. What specific situation is making you feel this way? Sometimes talking about it helps.",
    "It's completely normal to feel anxious sometimes. Would you like to try a grounding exercise? Name 5 things you can see around you right now. 👀",
    "When anxiety hits, remember: this feeling is temporary. Try the 4-7-8 breathing technique - inhale for 4, hold for 7, exhale for 8. 💙"
  ],
  depression: [
    "I hear that you're going through a tough time. Your feelings are valid, and I want you to know that things can get better. 💙",
    "Depression can make everything feel heavy. Have you been able to do any small activities that usually bring you joy, even for a few minutes?",
    "Thank you for sharing this with me. Remember, seeking help is a sign of strength, not weakness. You're being brave by reaching out.",
    "When depression clouds everything, remember: you matter, your feelings are valid, and there are people who want to help you. 🤗"
  ],
  stress: [
    "Stress can be really challenging to deal with. What's been the biggest source of stress for you lately? Let's break it down together.",
    "When we're stressed, our bodies need extra care. Have you been getting enough sleep and staying hydrated? Small steps matter! 💧",
    "Let's tackle your stress step by step. Sometimes breaking big problems into smaller, manageable pieces makes them feel less overwhelming.",
    "School stress is so common! Remember: you're more than your grades. What's one small thing you can do today to feel a bit better? 📚"
  ],
  crisis: [
    "I'm very concerned about what you've shared. Please reach out to a crisis helpline immediately: KIRAN 1800-599-0019 (24/7). Your life matters! 🆘",
    "Your safety is the most important thing right now. Please call 1800-599-0019 or go to your nearest emergency room. You don't have to face this alone.",
    "I want to help, but I think you need to speak with a professional right away. Please call the crisis helpline: 1800-599-0019. You are not alone. 💙"
  ],
  coping: [
    "Here's a quick coping strategy: Try the 5-4-3-2-1 technique. Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. 🌟",
    "When emotions feel intense, try journaling. Write down exactly what you're feeling - no judgment, just let it out on paper. ✍️",
    "Physical movement can help! Even 5 minutes of stretching or walking can shift your mood. Your body and mind are connected. 🚶‍♀️",
    "Remember self-compassion: talk to yourself like you would a good friend. You deserve the same kindness you give others. 💕"
  ],
  sleep: [
    "Sleep troubles are so common for teens! Try creating a bedtime routine: no screens 1 hour before bed, maybe some light reading. 📖",
    "Racing thoughts at bedtime? Try writing them down in a 'worry journal' - this tells your brain it's safe to let go for now. 💭",
    "Your sleep matters so much for your mental health. Aim for 8-9 hours if possible, and try to keep a consistent sleep schedule. 😴"
  ],
  positive: [
    "I'm so glad to hear you're feeling good! What's contributing to this positive mood? It's great to recognize and celebrate these moments. ✨",
    "That's wonderful! When we feel good, it's a perfect time to practice gratitude or do something kind for someone else. 🌈",
    "I love your positive energy! How can you carry this feeling forward through your day? 😊"
  ]
};

// Application State
class MindLinkApp {
  constructor() {
    this.currentRoute = '/';
    this.currentQuiz = null;
    this.currentQuestionIndex = 0;
    this.quizAnswers = [];
    this.allAtOnceMode = false;
    this.onboardingStep = 1;
    this.selectedAvatar = '😊';
    this.animationsEnabled = true;
    
    this.init();
  }

  init() {
    this.setupRouter();
    this.setupNavigation();
    this.setupAnimatedBackground();
    this.setupOnboarding();
    this.setupDashboard();
    this.setupMoodTracker();
    this.setupJournal();
    this.setupChatbot();
    this.setupAssessments();
    this.setupQuizInterface();
    this.setupResources();
    this.setupSettings();
    this.setupModals();
    this.loadUserData();
    this.checkFirstVisit();
    
    // Navigate to initial route
    this.navigate(this.isFirstVisit() ? '/' : '/dashboard');
  }

  // Router System
  setupRouter() {
    window.addEventListener('popstate', (e) => {
      this.navigate(location.pathname, false);
    });
  }

  navigate(route, pushState = true) {
    if (pushState) {
      history.pushState({}, '', route);
    }
    
    this.currentRoute = route;
    this.showRoute(route);
    this.updateNavigation(route);
  }

  showRoute(route) {
    // Hide all route contents
    document.querySelectorAll('.route-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show target route
    let targetId;
    switch(route) {
      case '/': targetId = 'landing'; break;
      case '/onboard': targetId = 'onboard'; break;
      case '/dashboard': targetId = 'dashboard'; break;
      case '/mood': targetId = 'mood'; break;
      case '/journal': targetId = 'journal'; break;
      case '/chat': targetId = 'chat'; break;
      case '/assessments': targetId = 'assessments'; break;
      case '/quiz': targetId = 'quiz'; break;
      case '/quiz-results': targetId = 'quiz-results'; break;
      case '/resources': targetId = 'resources'; break;
      default: targetId = 'landing';
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.classList.add('active');
      
      // Load specific route data
      this.loadRouteData(route);
    }
  }

  loadRouteData(route) {
    switch(route) {
      case '/dashboard':
        this.loadDashboardData();
        break;
      case '/mood':
        this.loadMoodData();
        break;
      case '/journal':
        this.loadJournalEntries();
        break;
      case '/chat':
        this.loadChatHistory();
        break;
      case '/assessments':
        this.updateAssessmentBadges();
        break;
      case '/resources':
        this.renderResources();
        break;
    }
  }

  updateNavigation(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === route) {
        link.classList.add('active');
      }
    });
  }

  // Navigation Setup
  setupNavigation() {
    // Nav links
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]')) {
        e.preventDefault();
        const route = e.target.dataset.route;
        this.navigate(route);
      }
    });

    // Feature cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.feature-card[data-route]');
      if (card) {
        e.preventDefault();
        const route = card.dataset.route;
        this.navigate(route);
      }
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu) {
      mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }

    // Learn more button
    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', () => {
        document.querySelector('.features-section').scrollIntoView({ 
          behavior: 'smooth' 
        });
      });
    }
  }

  // Animated Background
  setupAnimatedBackground() {
    const particles = document.querySelectorAll('.particle');
    
    // Mouse interaction with particles
    document.addEventListener('mousemove', (e) => {
      if (!this.animationsEnabled) return;
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // Onboarding System
  setupOnboarding() {
    const startBtn = document.getElementById('start-onboard');
    const nicknameInput = document.getElementById('onboard-nickname');
    const privacyConsent = document.getElementById('privacy-consent');
    const completeBtn = document.getElementById('complete-onboard');
    
    // Start onboarding
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.nextOnboardingStep();
      });
    }

    // Nickname step
    const nextBtn2 = document.getElementById('onboard-next-2');
    const backBtn2 = document.getElementById('onboard-back-2');
    
    if (nextBtn2) {
      nextBtn2.addEventListener('click', () => {
        const nickname = nicknameInput.value.trim();
        if (nickname) {
          localStorage.setItem('userNickname', nickname);
          this.nextOnboardingStep();
        } else {
          this.showSnackbar('Please enter a nickname to continue.');
        }
      });
    }
    
    if (backBtn2) {
      backBtn2.addEventListener('click', () => {
        this.prevOnboardingStep();
      });
    }

    // Avatar step
    const nextBtn3 = document.getElementById('onboard-next-3');
    const backBtn3 = document.getElementById('onboard-back-3');
    
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('avatar-option')) {
        document.querySelectorAll('.avatar-option').forEach(option => {
          option.classList.remove('selected');
        });
        e.target.classList.add('selected');
        this.selectedAvatar = e.target.dataset.avatar;
      }
    });
    
    if (nextBtn3) {
      nextBtn3.addEventListener('click', () => {
        if (this.selectedAvatar) {
          localStorage.setItem('userAvatar', this.selectedAvatar);
          this.nextOnboardingStep();
        } else {
          this.showSnackbar('Please select an avatar to continue.');
        }
      });
    }
    
    if (backBtn3) {
      backBtn3.addEventListener('click', () => {
        this.prevOnboardingStep();
      });
    }

    // Privacy step
    const backBtn4 = document.getElementById('onboard-back-4');
    
    if (privacyConsent) {
      privacyConsent.addEventListener('change', () => {
        completeBtn.disabled = !privacyConsent.checked;
      });
    }
    
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        localStorage.setItem('onboardingComplete', 'true');
        this.showSnackbar('Welcome to MindLink! Your account is ready.');
        this.navigate('/dashboard');
      });
    }
    
    if (backBtn4) {
      backBtn4.addEventListener('click', () => {
        this.prevOnboardingStep();
      });
    }
  }

  nextOnboardingStep() {
    this.onboardingStep++;
    this.updateOnboardingStep();
  }

  prevOnboardingStep() {
    this.onboardingStep--;
    this.updateOnboardingStep();
  }

  updateOnboardingStep() {
    // Update progress dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index + 1 <= this.onboardingStep);
    });

    // Show current step
    document.querySelectorAll('.onboard-step').forEach((step, index) => {
      step.classList.toggle('active', index + 1 === this.onboardingStep);
    });

    // Pre-select user's current avatar if they have one
    if (this.onboardingStep === 3) {
      const currentAvatar = localStorage.getItem('userAvatar') || '😊';
      const avatarOption = document.querySelector(`[data-avatar="${currentAvatar}"]`);
      if (avatarOption) {
        avatarOption.classList.add('selected');
        this.selectedAvatar = currentAvatar;
      }
    }
  }

  // Dashboard
  setupDashboard() {
    // Quick mood check
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('mood-quick-btn')) {
        const mood = parseInt(e.target.dataset.mood);
        this.saveMoodEntry(mood, '', true);
        
        // Update UI
        document.querySelectorAll('.mood-quick-btn').forEach(btn => {
          btn.classList.remove('selected');
        });
        e.target.classList.add('selected');
        
        this.showSnackbar(`Mood logged: ${this.getMoodLabel(mood)} 😊`);
      }
    });

    // Breathing exercise
    const breathingBtn = document.getElementById('start-breathing');
    const breathingCircle = document.getElementById('breathing-circle');
    
    if (breathingBtn) {
      breathingBtn.addEventListener('click', () => {
        this.startBreathingExercise();
      });
    }
  }

  loadDashboardData() {
    this.setupGreeting();
    this.updateDashboardStats();
    this.loadTodaysMood();
  }

  setupGreeting() {
    const timeOfDay = document.getElementById('time-of-day');
    const userNickname = document.getElementById('user-nickname');
    const userAvatar = document.getElementById('user-avatar');
    
    if (timeOfDay) {
      const hour = new Date().getHours();
      if (hour < 12) timeOfDay.textContent = 'morning';
      else if (hour < 17) timeOfDay.textContent = 'afternoon';
      else timeOfDay.textContent = 'evening';
    }
    
    if (userNickname) {
      const nickname = localStorage.getItem('userNickname') || 'Friend';
      userNickname.textContent = nickname;
    }
    
    if (userAvatar) {
      const avatar = localStorage.getItem('userAvatar') || '😊';
      userAvatar.textContent = avatar;
    }
  }

  updateDashboardStats() {
    // Mood stats
    const moodData = this.getMoodData();
    const moodStats = document.getElementById('mood-stats');
    if (moodStats) {
      const statValue = moodStats.querySelector('.stat-value');
      const statLabel = moodStats.querySelector('.stat-label');
      statValue.textContent = moodData.length;
      statLabel.textContent = moodData.length === 1 ? 'day tracked' : 'days tracked';
    }

    // Journal stats
    const journalEntries = this.getJournalEntries();
    const journalStats = document.getElementById('journal-stats');
    if (journalStats) {
      const statValue = journalStats.querySelector('.stat-value');
      const statLabel = journalStats.querySelector('.stat-label');
      statValue.textContent = journalEntries.length;
      statLabel.textContent = journalEntries.length === 1 ? 'entry written' : 'entries written';
    }

    // Assessment stats
    const assessmentResults = this.getAssessmentResults();
    const totalAssessments = Object.values(assessmentResults).reduce((total, results) => total + results.length, 0);
    const assessmentStats = document.getElementById('assessment-stats');
    if (assessmentStats) {
      const statValue = assessmentStats.querySelector('.stat-value');
      const statLabel = assessmentStats.querySelector('.stat-label');
      statValue.textContent = totalAssessments;
      statLabel.textContent = totalAssessments === 1 ? 'assessment taken' : 'assessments taken';
    }
  }

  loadTodaysMood() {
    const today = new Date().toISOString().split('T')[0];
    const moodData = this.getMoodData();
    const todayMood = moodData.find(d => d.date === today);
    
    if (todayMood) {
      document.querySelectorAll('.mood-quick-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.dataset.mood) === todayMood.mood) {
          btn.classList.add('selected');
        }
      });
    }
  }

  startBreathingExercise() {
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = breathingCircle.querySelector('.breathing-text');
    const startBtn = document.getElementById('start-breathing');
    
    if (!breathingCircle || !this.animationsEnabled) return;
    
    startBtn.disabled = true;
    breathingCircle.classList.add('active');
    
    const phases = [
      { text: 'Breathe In', duration: 4000 },
      { text: 'Hold', duration: 2000 }, 
      { text: 'Breathe Out', duration: 4000 },
      { text: 'Rest', duration: 2000 }
    ];
    
    let currentPhase = 0;
    let cycles = 0;
    const maxCycles = 5;
    
    const runPhase = () => {
      breathingText.textContent = phases[currentPhase].text;
      
      setTimeout(() => {
        currentPhase = (currentPhase + 1) % phases.length;
        
        if (currentPhase === 0) {
          cycles++;
          if (cycles >= maxCycles) {
            breathingCircle.classList.remove('active');
            breathingText.textContent = 'Complete!';
            startBtn.disabled = false;
            
            setTimeout(() => {
              breathingText.textContent = 'Breathe';
            }, 2000);
            
            this.showSnackbar('Great job! You completed the breathing exercise. 🌬️');
            return;
          }
        }
        
        runPhase();
      }, phases[currentPhase].duration);
    };
    
    runPhase();
  }

  // Mood Tracker
  setupMoodTracker() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.mood-btn') || e.target.closest('.mood-btn')) {
        const moodBtn = e.target.closest('.mood-btn') || e.target;
        const mood = parseInt(moodBtn.dataset.mood);
        
        // Update UI
        document.querySelectorAll('.mood-btn').forEach(btn => {
          btn.classList.remove('selected');
        });
        moodBtn.classList.add('selected');
      }
    });

    const saveMoodBtn = document.getElementById('save-mood');
    if (saveMoodBtn) {
      saveMoodBtn.addEventListener('click', () => {
        const selectedBtn = document.querySelector('.mood-btn.selected');
        if (selectedBtn) {
          const mood = parseInt(selectedBtn.dataset.mood);
          const notes = document.getElementById('mood-notes').value.trim();
          this.saveMoodEntry(mood, notes);
          this.showSnackbar(`Mood saved: ${this.getMoodLabel(mood)}! 😊`);
        } else {
          this.showSnackbar('Please select a mood level first.');
        }
      });
    }
  }

  saveMoodEntry(mood, notes = '', isQuick = false) {
    const today = new Date().toISOString().split('T')[0];
    const moodData = this.getMoodData();
    
    // Update or add today's mood
    const existingIndex = moodData.findIndex(entry => entry.date === today);
    const entry = {
      date: today,
      mood: mood,
      notes: notes,
      timestamp: Date.now()
    };
    
    if (existingIndex >= 0) {
      moodData[existingIndex] = entry;
    } else {
      moodData.push(entry);
    }
    
    // Keep only last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const filteredData = moodData.filter(entry => 
      new Date(entry.date) >= ninetyDaysAgo
    );
    
    localStorage.setItem('moodData', JSON.stringify(filteredData));
    
    if (!isQuick) {
      this.loadMoodData();
      document.getElementById('mood-notes').value = '';
    }
  }

  getMoodData() {
    return JSON.parse(localStorage.getItem('moodData') || '[]');
  }

  getMoodLabel(mood) {
    const labels = ['', 'Very Low', 'Low', 'Neutral', 'Good', 'Great'];
    return labels[mood] || 'Unknown';
  }

  loadMoodData() {
    this.loadMoodChart();
    this.loadMoodCalendar();
    
    // Update today's mood selection
    const today = new Date().toISOString().split('T')[0];
    const moodData = this.getMoodData();
    const todayMood = moodData.find(d => d.date === today);
    
    if (todayMood) {
      document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.dataset.mood) === todayMood.mood) {
          btn.classList.add('selected');
        }
      });
      
      const notesField = document.getElementById('mood-notes');
      if (notesField && todayMood.notes) {
        notesField.value = todayMood.notes;
      }
    }
  }

  loadMoodChart() {
    const canvas = document.getElementById('mood-trend-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const moodData = this.getMoodData();
    const last7Days = this.getLast7Days();
    
    const chartData = last7Days.map(date => {
      const entry = moodData.find(d => d.date === date);
      return entry ? entry.mood : null;
    });
    
    const labels = last7Days.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Mood Level',
          data: chartData,
          borderColor: '#21808D',
          backgroundColor: 'rgba(33, 128, 141, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#21808D',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            min: 1,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                const labels = ['', 'Very Low', 'Low', 'Neutral', 'Good', 'Great'];
                return labels[value] || '';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const labels = ['', 'Very Low', 'Low', 'Neutral', 'Good', 'Great'];
                return `Mood: ${labels[context.parsed.y]}`;
              }
            }
          }
        }
      }
    });
  }

  loadMoodCalendar() {
    const calendar = document.getElementById('mood-calendar');
    if (!calendar) return;

    const moodData = this.getMoodData();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    calendar.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    dayHeaders.forEach(day => {
      const header = document.createElement('div');
      header.textContent = day;
      header.style.fontWeight = 'bold';
      header.style.textAlign = 'center';
      header.style.padding = '8px';
      header.style.color = 'var(--color-text-secondary)';
      calendar.appendChild(header);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day';
      calendar.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';
      dayDiv.textContent = day;
      
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const entry = moodData.find(d => d.date === dateString);
      
      if (entry) {
        dayDiv.classList.add(`mood-${entry.mood}`);
        dayDiv.title = `${this.getMoodLabel(entry.mood)}${entry.notes ? ': ' + entry.notes : ''}`;
      }
      
      // Highlight today
      if (day === today.getDate()) {
        dayDiv.style.border = '2px solid var(--color-primary)';
      }
      
      calendar.appendChild(dayDiv);
    }
  }

  getLast7Days() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }

  // Journal
  setupJournal() {
    const journalEntry = document.getElementById('journal-entry');
    const saveEntryBtn = document.getElementById('save-entry');
    const clearEntryBtn = document.getElementById('clear-entry');
    const wordCountBtn = document.getElementById('word-count');
    const entriesFilter = document.getElementById('entries-filter');
    
    if (journalEntry) {
      journalEntry.addEventListener('input', () => {
        this.analyzeSentiment(journalEntry.value);
        this.updateWordCount(journalEntry.value);
      });
    }
    
    if (saveEntryBtn) {
      saveEntryBtn.addEventListener('click', () => {
        this.saveJournalEntry();
      });
    }
    
    if (clearEntryBtn) {
      clearEntryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear this entry?')) {
          journalEntry.value = '';
          this.analyzeSentiment('');
          this.updateWordCount('');
        }
      });
    }
    
    if (entriesFilter) {
      entriesFilter.addEventListener('change', () => {
        this.filterJournalEntries(entriesFilter.value);
      });
    }
  }

  updateWordCount(text) {
    const wordCount = document.getElementById('word-count');
    if (wordCount) {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      wordCount.textContent = `${words} words`;
    }
  }

  analyzeSentiment(text) {
    const sentimentIcon = document.getElementById('sentiment-icon');
    const sentimentLabel = document.getElementById('sentiment-label');
    const sentimentDescription = document.getElementById('sentiment-description');
    
    if (!sentimentIcon || !sentimentLabel || !text.trim()) {
      if (sentimentIcon) sentimentIcon.textContent = '😐';
      if (sentimentLabel) sentimentLabel.textContent = 'Neutral';
      if (sentimentDescription) sentimentDescription.textContent = 'Your writing tone seems balanced';
      return 'neutral';
    }

    // Enhanced sentiment analysis
    const positiveWords = ['happy', 'joy', 'good', 'great', 'amazing', 'wonderful', 'love', 'excited', 'grateful', 'blessed', 'awesome', 'fantastic', 'excellent', 'perfect', 'beautiful', 'peaceful', 'confident', 'proud', 'hopeful', 'optimistic', 'successful', 'accomplished', 'satisfied', 'content', 'cheerful', 'delighted'];
    
    const negativeWords = ['sad', 'angry', 'bad', 'terrible', 'awful', 'hate', 'depressed', 'anxious', 'worried', 'scared', 'lonely', 'frustrated', 'upset', 'disappointed', 'hopeless', 'overwhelmed', 'stressed', 'hurt', 'pain', 'difficult', 'struggling', 'exhausted', 'devastated', 'heartbroken', 'miserable'];
    
    const words = text.toLowerCase().split(/\W+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    let sentiment;
    if (positiveCount > negativeCount * 1.2) {
      sentiment = 'positive';
      sentimentIcon.textContent = '😊';
      sentimentLabel.textContent = 'Positive';
      sentimentDescription.textContent = 'Your writing reflects positive emotions and thoughts';
    } else if (negativeCount > positiveCount * 1.2) {
      sentiment = 'negative';
      sentimentIcon.textContent = '😢';
      sentimentLabel.textContent = 'Difficult';
      sentimentDescription.textContent = 'Your writing shows you may be going through a tough time';
    } else {
      sentiment = 'neutral';
      sentimentIcon.textContent = '😐';
      sentimentLabel.textContent = 'Neutral';
      sentimentDescription.textContent = 'Your writing tone seems balanced and reflective';
    }
    
    return sentiment;
  }

  saveJournalEntry() {
    const journalEntry = document.getElementById('journal-entry');
    const text = journalEntry.value.trim();
    
    if (!text) {
      this.showSnackbar('Please write something before saving.');
      return;
    }
    
    const sentiment = this.analyzeSentiment(text);
    const entry = {
      id: Date.now(),
      text: text,
      sentiment: sentiment,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      wordCount: text.split(/\s+/).length
    };
    
    const entries = this.getJournalEntries();
    entries.unshift(entry);
    
    // Keep only last 100 entries
    if (entries.length > 100) {
      entries.splice(100);
    }
    
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    journalEntry.value = '';
    this.analyzeSentiment('');
    this.updateWordCount('');
    this.loadJournalEntries();
    this.updateJournalInsights();
    this.showSnackbar('Journal entry saved! 📝');
  }

  getJournalEntries() {
    return JSON.parse(localStorage.getItem('journalEntries') || '[]');
  }

  loadJournalEntries() {
    this.filterJournalEntries('all');
    this.updateJournalInsights();
  }

  filterJournalEntries(filter) {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;
    
    const entries = this.getJournalEntries();
    let filteredEntries = entries;
    
    if (filter !== 'all') {
      filteredEntries = entries.filter(entry => entry.sentiment === filter);
    }
    
    if (filteredEntries.length === 0) {
      entriesList.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center;">No entries found. Start writing to see them here!</p>';
      return;
    }
    
    entriesList.innerHTML = '';
    
    filteredEntries.slice(0, 10).forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'journal-entry-item';
      
      const date = new Date(entry.date);
      const preview = entry.text.length > 100 ? entry.text.substring(0, 100) + '...' : entry.text;
      
      entryDiv.innerHTML = `
        <div class="entry-date">${date.toLocaleDateString()}</div>
        <div class="entry-preview">${preview}</div>
        <div class="entry-sentiment">
          <span>${this.getSentimentIcon(entry.sentiment)}</span>
          <span>${entry.sentiment}</span>
          <span style="margin-left: auto; font-size: var(--font-size-xs);">${entry.wordCount} words</span>
        </div>
      `;
      
      entryDiv.addEventListener('click', () => {
        this.showJournalEntryModal(entry);
      });
      
      entriesList.appendChild(entryDiv);
    });
  }

  showJournalEntryModal(entry) {
    const date = new Date(entry.date);
    alert(`Entry from ${date.toLocaleDateString()}\n\n${entry.text}`);
  }

  updateJournalInsights() {
    const entries = this.getJournalEntries();
    
    // Total entries
    const totalEntriesEl = document.getElementById('total-entries');
    if (totalEntriesEl) {
      totalEntriesEl.textContent = entries.length;
    }
    
    // Writing streak
    const streakEl = document.getElementById('writing-streak');
    if (streakEl) {
      const streak = this.calculateWritingStreak(entries);
      streakEl.textContent = `${streak} ${streak === 1 ? 'day' : 'days'}`;
    }
    
    // Most common mood
    const commonMoodEl = document.getElementById('common-mood');
    if (commonMoodEl && entries.length > 0) {
      const sentimentCounts = entries.reduce((acc, entry) => {
        acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommon = Object.keys(sentimentCounts).reduce((a, b) => 
        sentimentCounts[a] > sentimentCounts[b] ? a : b
      );
      
      commonMoodEl.textContent = `${this.getSentimentIcon(mostCommon)} ${mostCommon}`;
    }
  }

  calculateWritingStreak(entries) {
    if (entries.length === 0) return 0;
    
    const dates = entries.map(entry => entry.date.split('T')[0]).sort().reverse();
    const uniqueDates = [...new Set(dates)];
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(today);
    
    for (const entryDate of uniqueDates) {
      const checkDate = currentDate.toISOString().split('T')[0];
      if (entryDate === checkDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  getSentimentIcon(sentiment) {
    switch(sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😢';
      default: return '😐';
    }
  }

  // Chatbot
  setupChatbot() {
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('send-message');
    const clearChatBtn = document.getElementById('clear-chat');
    
    if (chatInput) {
      chatInput.addEventListener('input', () => {
        sendBtn.disabled = !chatInput.value.trim();
        this.autoResizeTextarea(chatInput);
      });
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
    
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        this.sendMessage();
      });
    }
    
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the chat history?')) {
          this.clearChat();
        }
      });
    }
    
    // Quick responses
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-response-btn')) {
        const message = e.target.textContent;
        this.addUserMessage(message);
        this.generateBotResponse(message);
        this.hideQuickResponses();
      }
    });
  }

  loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messages = this.getChatHistory();
    if (messages.length === 0) {
      // Show welcome message only
      return;
    }
    
    // Clear except welcome message
    const welcomeMessage = chatMessages.querySelector('.message');
    chatMessages.innerHTML = '';
    if (welcomeMessage) {
      chatMessages.appendChild(welcomeMessage);
    }
    
    messages.forEach(message => {
      this.displayMessage(message.text, message.isUser, false);
    });
    
    this.scrollChatToBottom();
  }

  sendMessage() {
    const chatInput = document.getElementById('chat-input-field');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    this.addUserMessage(message);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    document.getElementById('send-message').disabled = true;
    
    this.generateBotResponse(message);
    this.hideQuickResponses();
  }

  addUserMessage(message) {
    this.displayMessage(message, true);
    this.saveChatMessage(message, true);
  }

  displayMessage(text, isUser, shouldScroll = true) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = isUser ? (localStorage.getItem('userAvatar') || '😊') : '🤖';
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <div class="message-text">${text}</div>
        <div class="message-time">${time}</div>
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    if (shouldScroll) {
      this.scrollChatToBottom();
    }
  }

  generateBotResponse(userMessage) {
    this.showTypingIndicator();
    
    const response = this.getBotResponse(userMessage);
    
    setTimeout(() => {
      this.hideTypingIndicator();
      this.displayMessage(response, false);
      this.saveChatMessage(response, false);
      this.showQuickResponses();
    }, 1500 + Math.random() * 1000); // Random delay for realism
  }

  getBotResponse(message) {
    const text = message.toLowerCase();
    
    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'better off dead', 'want to die', 'hurt myself', 'self harm'];
    if (crisisKeywords.some(keyword => text.includes(keyword))) {
      return this.getRandomResponse(CHATBOT_RESPONSES.crisis);
    }
    
    // Anxiety responses
    if (text.includes('anxious') || text.includes('anxiety') || text.includes('worried') || text.includes('panic')) {
      return this.getRandomResponse(CHATBOT_RESPONSES.anxiety);
    }
    
    // Depression responses
    if (text.includes('sad') || text.includes('depressed') || text.includes('depression') || text.includes('hopeless')) {
      return this.getRandomResponse(CHATBOT_RESPONSES.depression);
    }
    
    // Stress responses
    if (text.includes('stress') || text.includes('overwhelmed') || text.includes('school') || text.includes('exam')) {
      return this.getRandomResponse(CHATBOT_RESPONSES.stress);
    }
    
    // Sleep responses
    if (text.includes('sleep') || text.includes('insomnia') || text.includes('tired') || text.includes('can\'t sleep')) {
      return this.getRandomResponse(CHATBOT_RESPONSES.sleep);
    }
    
    // Positive responses
    if (text.includes('good') || text.includes('great') || text.includes('happy') || text.includes('better')) {
      return this.getRandomResponse(CHATBOT_RESPONSES.positive);
    }
    
    // Breathing exercises
    if (text.includes('breathing') || text.includes('breathe')) {
      return "Let's do a breathing exercise together! 🌬️ Find a comfortable position and follow along:\n\n1. Breathe in slowly through your nose for 4 counts\n2. Hold your breath for 4 counts\n3. Breathe out through your mouth for 6 counts\n4. Repeat 5 times\n\nThis can help calm your nervous system. How do you feel?";
    }
    
    // Default coping response
    return this.getRandomResponse(CHATBOT_RESPONSES.coping);
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.classList.remove('hidden');
      this.scrollChatToBottom();
    }
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.classList.add('hidden');
    }
  }

  showQuickResponses() {
    const quickResponses = document.getElementById('quick-responses');
    if (quickResponses) {
      quickResponses.style.display = 'flex';
    }
  }

  hideQuickResponses() {
    const quickResponses = document.getElementById('quick-responses');
    if (quickResponses) {
      quickResponses.style.display = 'none';
    }
  }

  scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  }

  clearChat() {
    localStorage.removeItem('chatHistory');
    const chatMessages = document.getElementById('chat-messages');
    
    // Keep only the welcome message
    chatMessages.innerHTML = `
      <div class="message bot-message">
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <div class="message-text">Hi there! I'm MindBot, your AI companion. I'm here to listen, support, and help you with coping strategies. How are you feeling today?</div>
          <div class="message-time">Now</div>
        </div>
      </div>
    `;
    
    this.showQuickResponses();
    this.showSnackbar('Chat history cleared.');
  }

  saveChatMessage(text, isUser) {
    const messages = this.getChatHistory();
    messages.push({
      text: text,
      isUser: isUser,
      timestamp: Date.now()
    });
    
    // Keep only last 50 messages
    if (messages.length > 50) {
      messages.splice(0, messages.length - 50);
    }
    
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }

  getChatHistory() {
    return JSON.parse(localStorage.getItem('chatHistory') || '[]');
  }

  // Assessments
  setupAssessments() {
    document.addEventListener('click', (e) => {
      const assessmentCard = e.target.closest('.assessment-card');
      if (assessmentCard && e.target.tagName === 'BUTTON' && !e.target.textContent.includes('Coming Soon')) {
        e.preventDefault();
        const assessmentId = assessmentCard.dataset.assessment;
        this.startAssessment(assessmentId);
      }
    });
  }

  startAssessment(assessmentId) {
    this.currentQuiz = assessmentId;
    this.currentQuestionIndex = 0;
    this.quizAnswers = [];
    this.allAtOnceMode = false;
    
    this.navigate('/quiz');
    this.loadQuizData();
  }

  updateAssessmentBadges() {
    const results = this.getAssessmentResults();
    
    Object.keys(ASSESSMENTS_DATA).forEach(assessmentId => {
      const assessmentResults = results[assessmentId];
      const badgeElement = document.getElementById(`${assessmentId.toLowerCase()}-last-result`);
      
      if (assessmentResults && assessmentResults.length > 0 && badgeElement) {
        const lastResult = assessmentResults[assessmentResults.length - 1];
        const badge = badgeElement.querySelector('.result-badge');
        const band = this.getResultBand(assessmentId, lastResult.score);
        
        badge.textContent = `Last: ${band.label}`;
        badge.className = `result-badge ${band.label.toLowerCase().replace(/ /g, '-').replace(/\//g, '-')}`;
        badgeElement.style.display = 'block';
      }
    });
    
    this.loadAssessmentHistoryChart();
  }

  loadAssessmentHistoryChart() {
    const canvas = document.getElementById('assessment-history-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const results = this.getAssessmentResults();
    
    // Prepare data for chart
    const datasets = [];
    const colors = ['#21808D', '#E68161', '#C05746'];
    let colorIndex = 0;
    
    Object.keys(ASSESSMENTS_DATA).forEach(assessmentId => {
      const assessmentResults = results[assessmentId];
      if (assessmentResults && assessmentResults.length > 0) {
        const data = assessmentResults.slice(-10).map(result => ({
          x: new Date(result.date).toLocaleDateString(),
          y: result.score
        }));
        
        datasets.push({
          label: ASSESSMENTS_DATA[assessmentId].title.split(' ')[0],
          data: data,
          borderColor: colors[colorIndex % colors.length],
          backgroundColor: colors[colorIndex % colors.length] + '20',
          borderWidth: 2,
          fill: false,
          tension: 0.4
        });
        
        colorIndex++;
      }
    });
    
    if (datasets.length === 0) {
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.font = '16px Arial';
      ctx.fillText('No assessment history yet', canvas.width / 2, canvas.height / 2);
      return;
    }

    new Chart(ctx, {
      type: 'line',
      data: { datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Score'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  getAssessmentResults() {
    return JSON.parse(localStorage.getItem('assessmentResults') || '{}');
  }

  // Quiz Interface
  setupQuizInterface() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const allAtOnceToggle = document.getElementById('all-at-once-toggle');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
    if (submitBtn) submitBtn.addEventListener('click', () => this.submitQuiz());
    
    if (allAtOnceToggle) {
      allAtOnceToggle.addEventListener('change', (e) => {
        this.allAtOnceMode = e.target.checked;
        this.loadQuizData();
      });
    }

    // Result actions
    const saveResultBtn = document.getElementById('save-result');
    const findSupportBtn = document.getElementById('find-support');
    
    if (saveResultBtn) saveResultBtn.addEventListener('click', () => this.saveAssessmentResult());
    if (findSupportBtn) findSupportBtn.addEventListener('click', () => this.findSupportNearby());
  }

  loadQuizData() {
    if (!this.currentQuiz) return;
    
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    if (!assessment) return;
    
    document.getElementById('quiz-title').textContent = assessment.title;
    
    if (this.allAtOnceMode) {
      this.showAllQuestions();
    } else {
      this.showSingleQuestion();
    }
  }

  showAllQuestions() {
    const quizContent = document.getElementById('quiz-content');
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    
    quizContent.innerHTML = '';
    quizContent.classList.add('all-questions-view');
    
    // Hide navigation buttons
    document.getElementById('prev-question').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('submit-quiz').classList.remove('hidden');
    
    // Update progress
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('progress-text').textContent = `All ${assessment.questions.length} questions`;
    
    assessment.questions.forEach((question, index) => {
      const questionCard = document.createElement('div');
      questionCard.className = 'question-card';
      questionCard.innerHTML = `
        <h3>Question ${index + 1}: ${question}</h3>
        <div class="question-options" data-question-index="${index}">
          ${assessment.options.map((option, optionIndex) => `
            <button class="option-button" data-value="${assessment.scores[optionIndex]}" data-question-index="${index}">
              ${option}
            </button>
          `).join('')}
        </div>
      `;
      
      quizContent.appendChild(questionCard);
    });
    
    // Add event listeners
    quizContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-button')) {
        const questionIndex = parseInt(e.target.dataset.questionIndex);
        const value = parseInt(e.target.dataset.value);
        
        // Clear other selections for this question
        const questionOptions = document.querySelector(`[data-question-index="${questionIndex}"]`);
        questionOptions.querySelectorAll('.option-button').forEach(btn => {
          btn.classList.remove('selected');
        });
        
        e.target.classList.add('selected');
        this.quizAnswers[questionIndex] = value;
        
        this.updateSubmitButton();
      }
    });
  }

  showSingleQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    
    quizContent.classList.remove('all-questions-view');
    
    // Show navigation buttons
    document.getElementById('prev-question').style.display = 'inline-flex';
    document.getElementById('next-question').style.display = 'inline-flex';
    document.getElementById('submit-quiz').classList.add('hidden');
    
    const question = assessment.questions[this.currentQuestionIndex];
    
    quizContent.innerHTML = `
      <div class="question-card">
        <h3>Question ${this.currentQuestionIndex + 1}: ${question}</h3>
        <div class="question-options">
          ${assessment.options.map((option, optionIndex) => `
            <button class="option-button" data-value="${assessment.scores[optionIndex]}">
              ${option}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    // Update progress
    const progress = ((this.currentQuestionIndex + 1) / assessment.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${this.currentQuestionIndex + 1} of ${assessment.questions.length}`;
    
    // Add event listeners
    quizContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('option-button')) {
        document.querySelectorAll('.option-button').forEach(btn => {
          btn.classList.remove('selected');
        });
        
        e.target.classList.add('selected');
        this.quizAnswers[this.currentQuestionIndex] = parseInt(e.target.dataset.value);
        
        this.updateNavigationButtons();
      }
    });
    
    // Restore previous answer
    if (this.quizAnswers[this.currentQuestionIndex] !== undefined) {
      const selectedValue = this.quizAnswers[this.currentQuestionIndex];
      document.querySelectorAll('.option-button').forEach(btn => {
        if (parseInt(btn.dataset.value) === selectedValue) {
          btn.classList.add('selected');
        }
      });
    }
    
    this.updateNavigationButtons();
  }

  updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    
    prevBtn.disabled = this.currentQuestionIndex === 0;
    nextBtn.disabled = this.quizAnswers[this.currentQuestionIndex] === undefined;
    
    if (this.currentQuestionIndex === assessment.questions.length - 1) {
      nextBtn.textContent = 'Finish Assessment';
    } else {
      nextBtn.textContent = 'Next';
    }
  }

  updateSubmitButton() {
    const submitBtn = document.getElementById('submit-quiz');
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    const allAnswered = this.quizAnswers.length === assessment.questions.length && 
                       this.quizAnswers.every(answer => answer !== undefined);
    
    submitBtn.disabled = !allAnswered;
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showSingleQuestion();
    }
  }

  nextQuestion() {
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    
    if (this.currentQuestionIndex < assessment.questions.length - 1) {
      this.currentQuestionIndex++;
      this.showSingleQuestion();
    } else {
      this.submitQuiz();
    }
  }

  submitQuiz() {
    const assessment = ASSESSMENTS_DATA[this.currentQuiz];
    
    // Validate all questions answered
    if (this.quizAnswers.length !== assessment.questions.length || 
        this.quizAnswers.some(answer => answer === undefined)) {
      this.showSnackbar('Please answer all questions before submitting.');
      return;
    }
    
    // Calculate score with reverse scoring for PSS10
    let totalScore = 0;
    this.quizAnswers.forEach((answer, index) => {
      if (this.currentQuiz === 'PSS10' && assessment.reverseIndex && assessment.reverseIndex.includes(index)) {
        // Reverse score: 0->4, 1->3, 2->2, 3->1, 4->0
        totalScore += (assessment.scores.length - 1) - answer;
      } else {
        totalScore += answer;
      }
    });
    
    this.currentQuizResult = {
      assessmentId: this.currentQuiz,
      score: totalScore,
      answers: [...this.quizAnswers],
      date: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    this.navigate('/quiz-results');
    this.showQuizResults();
  }

  showQuizResults() {
    if (!this.currentQuizResult) return;
    
    const assessment = ASSESSMENTS_DATA[this.currentQuizResult.assessmentId];
    const band = this.getResultBand(this.currentQuizResult.assessmentId, this.currentQuizResult.score);
    
    // Set result icon based on severity
    const resultIcon = document.getElementById('result-icon');
    if (resultIcon) {
      if (band.label.includes('Severe') || band.label.includes('High')) {
        resultIcon.textContent = '🚨';
      } else if (band.label.includes('Moderate')) {
        resultIcon.textContent = '⚠️';
      } else if (band.label.includes('Mild') || band.label.includes('Low')) {
        resultIcon.textContent = '⚡';
      } else {
        resultIcon.textContent = '✅';
      }
    }
    
    document.getElementById('result-level').textContent = band.label;
    document.getElementById('result-score-text').textContent = `Score: ${this.currentQuizResult.score}`;
    document.getElementById('result-description').textContent = band.recommendation;
    
    // Show recommendations
    const recommendationsContent = document.getElementById('recommendations-content');
    recommendationsContent.innerHTML = `
      <div style="margin-bottom: 16px;">
        <strong>Your Score: ${this.currentQuizResult.score}</strong>
      </div>
      <div style="margin-bottom: 16px;">
        <strong>What this means:</strong>
        <p>${band.recommendation}</p>
      </div>
      <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
        <strong>Important Note:</strong>
        <p style="margin: 8px 0 0 0; font-size: 14px;">This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions about your mental health.</p>
      </div>
    `;
    
    // Create animated gauge
    this.createResultGauge(this.currentQuizResult.score, assessment);
  }

  getResultBand(assessmentId, score) {
    const assessment = ASSESSMENTS_DATA[assessmentId];
    return assessment.bands.find(band => score >= band.min && score <= band.max) || assessment.bands[0];
  }

  createResultGauge(score, assessment) {
    const canvas = document.getElementById('result-gauge');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate percentage and determine color
    const maxScore = assessment.questions.length * Math.max(...assessment.scores);
    const percentage = (score / maxScore) * 100;
    const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    
    let gaugeColor = '#21808D'; // Default
    const band = this.getResultBand(this.currentQuizResult.assessmentId, score);
    
    if (band.label.includes('Severe') || band.label.includes('High')) {
      gaugeColor = '#C0152F'; // Red
    } else if (band.label.includes('Moderate')) {
      gaugeColor = '#A84B2F'; // Orange  
    } else if (band.label.includes('Mild')) {
      gaugeColor = '#E68161'; // Light orange
    }
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, 3 * Math.PI / 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.stroke();
    
    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
    ctx.lineWidth = 12;
    ctx.strokeStyle = gaugeColor;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw score text
    ctx.fillStyle = gaugeColor;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${score}`, centerX, centerY - 5);
    
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.fillText(`out of ${maxScore}`, centerX, centerY + 20);
    
    // Draw percentage
    ctx.fillStyle = '#999';
    ctx.font = '14px Arial';
    ctx.fillText(`${Math.round(percentage)}%`, centerX, centerY + 40);
  }

  saveAssessmentResult() {
    if (!this.currentQuizResult) return;
    
    const results = this.getAssessmentResults();
    const assessmentId = this.currentQuizResult.assessmentId;
    
    if (!results[assessmentId]) {
      results[assessmentId] = [];
    }
    
    results[assessmentId].push(this.currentQuizResult);
    
    // Keep only last 20 results per assessment
    if (results[assessmentId].length > 20) {
      results[assessmentId] = results[assessmentId].slice(-20);
    }
    
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    this.showSnackbar('Assessment result saved! 📊');
  }

  // Resources
  setupResources() {
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (locationFilter) {
      locationFilter.addEventListener('change', () => {
        this.filterResources();
      });
    }
    
    if (typeFilter) {
      typeFilter.addEventListener('change', () => {
        this.filterResources();
      });
    }
  }

  renderResources() {
    this.filterResources();
  }

  filterResources() {
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const resourcesGrid = document.getElementById('resources-grid');
    
    if (!resourcesGrid) return;
    
    const locationValue = locationFilter ? locationFilter.value : '';
    const typeValue = typeFilter ? typeFilter.value : '';
    
    let filteredResources = RESOURCES_DATA.filter(resource => {
      const locationMatch = !locationValue || resource.city.toLowerCase() === locationValue.toLowerCase();
      const typeMatch = !typeValue || resource.type === typeValue;
      return locationMatch && typeMatch;
    });
    
    resourcesGrid.innerHTML = '';
    
    if (filteredResources.length === 0) {
      resourcesGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--color-text-secondary);">No resources found for your selected filters.</p>';
      return;
    }
    
    filteredResources.forEach(resource => {
      const resourceCard = document.createElement('div');
      resourceCard.className = 'resource-card';
      
      const typeLabel = resource.type.charAt(0).toUpperCase() + resource.type.slice(1);
      const cityLabel = resource.city.charAt(0).toUpperCase() + resource.city.slice(1);
      
      resourceCard.innerHTML = `
        <h3>${resource.name}</h3>
        <div class="resource-type">${typeLabel}</div>
        <div class="resource-city">${cityLabel}</div>
        <div class="resource-phone">📞 ${resource.phone}</div>
        <p>${resource.description}</p>
        <div class="resource-actions">
          <a href="tel:${resource.phone}" class="btn btn--primary btn--sm">Call Now</a>
          <a href="${resource.website}" target="_blank" class="btn btn--outline btn--sm">Website</a>
        </div>
      `;
      
      resourcesGrid.appendChild(resourceCard);
    });
  }

  findSupportNearby() {
    const modal = document.getElementById('support-modal');
    const locationStatus = document.getElementById('location-status');
    const nearestResources = document.getElementById('nearest-resources');
    
    modal.classList.remove('hidden');
    locationStatus.innerHTML = '<p>🔍 Getting your location...</p>';
    nearestResources.innerHTML = '';
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          locationStatus.innerHTML = '<p>✅ Location found! Finding nearby resources...</p>';
          
          // Calculate distances and sort
          const resourcesWithDistance = RESOURCES_DATA
            .filter(r => r.type !== 'helpline' && r.lat && r.lng)
            .map(resource => ({
              ...resource,
              distance: this.haversineDistance(userLat, userLng, resource.lat, resource.lng)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
          
          nearestResources.innerHTML = '<h3>Nearest Resources:</h3>';
          
          resourcesWithDistance.forEach(resource => {
            const resourceDiv = document.createElement('div');
            resourceDiv.className = 'resource-card';
            resourceDiv.innerHTML = `
              <h4>${resource.name}</h4>
              <div class="resource-type">${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</div>
              <div class="resource-city">${resource.city.charAt(0).toUpperCase() + resource.city.slice(1)}</div>
              <div class="distance-info">📍 ${resource.distance.toFixed(1)} km away</div>
              <div class="resource-actions">
                <a href="tel:${resource.phone}" class="btn btn--primary btn--sm">Call Now</a>
                <a href="${resource.website}" target="_blank" class="btn btn--outline btn--sm">Website</a>
              </div>
            `;
            nearestResources.appendChild(resourceDiv);
          });
          
          // Add national helplines
          const helplinesDiv = document.createElement('div');
          helplinesDiv.innerHTML = `
            <h3 style="margin-top: 24px;">National Helplines (Available 24/7):</h3>
            ${RESOURCES_DATA.filter(r => r.type === 'helpline').map(helpline => `
              <div class="resource-card" style="margin-bottom: 12px;">
                <h4>${helpline.name}</h4>
                <div class="resource-phone">📞 ${helpline.phone}</div>
                <p>${helpline.description}</p>
                <a href="tel:${helpline.phone}" class="btn btn--primary btn--sm" style="margin-top: 8px;">Call Now</a>
              </div>
            `).join('')}
          `;
          nearestResources.appendChild(helplinesDiv);
        },
        (error) => {
          locationStatus.innerHTML = '<p>❌ Unable to get your location. Showing national helplines:</p>';
          
          nearestResources.innerHTML = RESOURCES_DATA
            .filter(r => r.type === 'helpline')
            .map(helpline => `
              <div class="resource-card" style="margin-bottom: 12px;">
                <h4>${helpline.name}</h4>
                <div class="resource-phone">${helpline.phone}</div>
                <p>${helpline.description}</p>
                <a href="tel:${helpline.phone}" class="btn btn--primary btn--sm" style="margin-top: 8px;">Call Now</a>
              </div>
            `).join('');
        }
      );
    } else {
      locationStatus.innerHTML = '<p>❌ Geolocation not supported. Showing national helplines:</p>';
      
      nearestResources.innerHTML = RESOURCES_DATA
        .filter(r => r.type === 'helpline')
        .map(helpline => `
          <div class="resource-card" style="margin-bottom: 12px;">
            <h4>${helpline.name}</h4>
            <div class="resource-phone">${helpline.phone}</div>
            <p>${helpline.description}</p>
            <a href="tel:${helpline.phone}" class="btn btn--primary btn--sm" style="margin-top: 8px;">Call Now</a>
          </div>
        `).join('');
    }
  }

  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  // Settings
  setupSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const saveNickname = document.getElementById('save-nickname');
    const nicknameInput = document.getElementById('nickname-input');
    const themeToggle = document.getElementById('theme-toggle');
    const animationsToggle = document.getElementById('animations-toggle');
    const changeAvatarBtn = document.getElementById('change-avatar');
    
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
        this.loadSettingsData();
      });
    }
    
    if (closeSettings) {
      closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
      });
    }
    
    if (saveNickname) {
      saveNickname.addEventListener('click', () => {
        const nickname = nicknameInput.value.trim();
        if (nickname) {
          localStorage.setItem('userNickname', nickname);
          this.setupGreeting();
          this.showSnackbar('Nickname saved! 😊');
        }
      });
    }
    
    if (themeToggle) {
      themeToggle.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        localStorage.setItem('darkMode', isDark);
        document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
        this.showSnackbar(`Switched to ${isDark ? 'dark' : 'light'} mode! 🌓`);
      });
    }
    
    if (animationsToggle) {
      animationsToggle.addEventListener('change', (e) => {
        this.animationsEnabled = e.target.checked;
        localStorage.setItem('animationsEnabled', this.animationsEnabled);
        this.showSnackbar(`Animations ${this.animationsEnabled ? 'enabled' : 'disabled'}! ✨`);
      });
    }
    
    if (changeAvatarBtn) {
      changeAvatarBtn.addEventListener('click', () => {
        document.getElementById('avatar-modal').classList.remove('hidden');
      });
    }
    
    // Avatar selection modal
    this.setupAvatarModal();
    
    // Data management buttons
    this.setupDataManagement();
  }

  setupAvatarModal() {
    const avatarModal = document.getElementById('avatar-modal');
    const closeAvatarModal = document.getElementById('close-avatar-modal');
    
    if (closeAvatarModal) {
      closeAvatarModal.addEventListener('click', () => {
        avatarModal.classList.add('hidden');
      });
    }
    
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('avatar-option-large')) {
        // Clear previous selections
        document.querySelectorAll('.avatar-option-large').forEach(option => {
          option.classList.remove('selected');
        });
        
        e.target.classList.add('selected');
        const newAvatar = e.target.dataset.avatar;
        
        // Save and update avatar
        localStorage.setItem('userAvatar', newAvatar);
        
        // Update displays
        const currentAvatarDisplay = document.getElementById('current-avatar-display');
        const userAvatar = document.getElementById('user-avatar');
        
        if (currentAvatarDisplay) currentAvatarDisplay.textContent = newAvatar;
        if (userAvatar) userAvatar.textContent = newAvatar;
        
        avatarModal.classList.add('hidden');
        this.showSnackbar('Avatar updated! 🎨');
      }
    });
  }

  setupDataManagement() {
    const exportDataBtn = document.getElementById('export-data');
    const clearButtons = [
      { id: 'clear-mood-data', key: 'moodData', message: 'Mood data cleared!' },
      { id: 'clear-journal-data', key: 'journalEntries', message: 'Journal entries cleared!' },
      { id: 'clear-results-data', key: 'assessmentResults', message: 'Assessment results cleared!' }
    ];
    
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => {
        this.exportUserData();
      });
    }
    
    clearButtons.forEach(({ id, key, message }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          if (confirm(`Are you sure you want to clear all ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}?`)) {
            localStorage.removeItem(key);
            this.showSnackbar(message);
            this.loadRouteData(this.currentRoute); // Refresh current view
            this.loadSettingsData(); // Refresh settings
          }
        });
      }
    });
    
    const clearAllBtn = document.getElementById('clear-all-data');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
          ['moodData', 'journalEntries', 'assessmentResults', 'chatHistory'].forEach(key => {
            localStorage.removeItem(key);
          });
          this.showSnackbar('All data cleared!');
          this.loadRouteData(this.currentRoute);
          this.loadSettingsData();
        }
      });
    }
  }

  loadSettingsData() {
    // Load current settings
    const nicknameInput = document.getElementById('nickname-input');
    const themeToggle = document.getElementById('theme-toggle');
    const animationsToggle = document.getElementById('animations-toggle');
    const currentAvatarDisplay = document.getElementById('current-avatar-display');
    
    if (nicknameInput) {
      nicknameInput.value = localStorage.getItem('userNickname') || '';
    }
    
    if (themeToggle) {
      themeToggle.checked = localStorage.getItem('darkMode') === 'true';
    }
    
    if (animationsToggle) {
      animationsToggle.checked = this.animationsEnabled;
    }
    
    if (currentAvatarDisplay) {
      currentAvatarDisplay.textContent = localStorage.getItem('userAvatar') || '😊';
    }
    
    // Update data counts
    this.updateDataCounts();
  }

  updateDataCounts() {
    const moodData = this.getMoodData();
    const journalEntries = this.getJournalEntries();
    const assessmentResults = this.getAssessmentResults();
    const totalAssessments = Object.values(assessmentResults).reduce((total, results) => total + results.length, 0);
    
    const moodCount = document.getElementById('mood-count');
    const journalCount = document.getElementById('journal-count');
    const assessmentCount = document.getElementById('assessment-count');
    
    if (moodCount) moodCount.textContent = moodData.length;
    if (journalCount) journalCount.textContent = journalEntries.length;
    if (assessmentCount) assessmentCount.textContent = totalAssessments;
  }

  exportUserData() {
    const data = {
      nickname: localStorage.getItem('userNickname'),
      avatar: localStorage.getItem('userAvatar'),
      moodData: this.getMoodData(),
      journalEntries: this.getJournalEntries(),
      assessmentResults: this.getAssessmentResults(),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindlink-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showSnackbar('Data exported successfully! 📁');
  }

  // Modals
  setupModals() {
    // Generic modal close handling
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-close')) {
        e.target.closest('.modal').classList.add('hidden');
      }
      
      if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
      }
    });
    
    // Close support modal
    const closeSupportBtn = document.getElementById('close-support');
    if (closeSupportBtn) {
      closeSupportBtn.addEventListener('click', () => {
        document.getElementById('support-modal').classList.add('hidden');
      });
    }
  }

  // User Data
  loadUserData() {
    // Load theme
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
    
    // Load animations preference
    this.animationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';
  }

  isFirstVisit() {
    return !localStorage.getItem('onboardingComplete');
  }

  checkFirstVisit() {
    if (this.isFirstVisit()) {
      // Show initial welcome
      setTimeout(() => {
        this.showSnackbar('Welcome to MindLink! Your mental wellness journey starts here. 🌟', 5000);
      }, 1000);
    }
  }

  // Utilities
  showSnackbar(message, duration = 3000) {
    const snackbar = document.getElementById('snackbar');
    const messageEl = document.getElementById('snackbar-message');
    const closeBtn = document.getElementById('snackbar-close');
    
    if (!snackbar || !messageEl) return;
    
    messageEl.textContent = message;
    snackbar.classList.remove('hidden');
    
    const hideSnackbar = () => {
      snackbar.classList.add('hidden');
    };
    
    if (closeBtn) {
      closeBtn.onclick = hideSnackbar;
    }
    
    setTimeout(hideSnackbar, duration);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.mindLinkApp = new MindLinkApp();
});