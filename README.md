# ⬡ Goal Gravity — AI Habit Persistence Predictor

**A web-based AI project for habit behavioral analysis and persistence prediction.**

---

## 📁 Project Structure

```
goal-gravity/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Full stylesheet (Red + Black theme)
├── js/
│   ├── particles.js    # Background particle system
│   ├── chart.js        # 30-day forecast canvas chart
│   └── app.js          # Main app logic & AI predictor
└── README.md
```

---

## 🚀 How to Run

Simply open `index.html` in any modern browser. No build tools or server required.

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (recommended)
npx serve .
# or
python3 -m http.server 3000
```

---

## 🧠 Features

- **Hero Section** — Animated orbital visualizer with floating habit nodes
- **Live Dashboard** — Overall gravity score, active streaks, AI alerts
- **AI Forecast Chart** — 30-day persistence curve (canvas-drawn, no deps)
- **AI Predictor Form** — Input your habit parameters and get a computed gravity score
- **Habit Registry Table** — Track all your habits with status, streak, and forecast
- **How It Works** — Explains the 4-step neural analysis process

---

## 🎯 AI Scoring Algorithm

The Gravity Score (0–100) is computed from:

| Factor | Weight |
|--------|--------|
| Current Streak (days) | Up to 25 pts |
| Motivation Level (1–10) | Up to 25 pts |
| Goal Importance (1–10) | Up to 20 pts |
| Frequency Target | Up to 10 pts |
| Challenge Penalty | –6 to –15 pts |

Scores above **70** = Habit Crystallizing  
Scores **45–69** = Building Momentum  
Scores **20–44** = Fragile Orbit  
Scores below **20** = Decay Imminent  

---

## 🎨 Design

- **Color Palette**: Deep black (#050005) + Crimson red (#ff2233) + Gold accents
- **Typography**: Bebas Neue (display) + Space Mono (labels) + Rajdhani (body)
- **Aesthetic**: Cyberpunk / AI-research / Data visualization
- **Animations**: Particle network, orbital rings, floating nodes, scroll reveals

---

## 📌 Academic Context

Built as part of an Artificial Intelligence course project demonstrating:
- Behavioral prediction modeling concepts
- Multi-factor scoring algorithms
- Real-time data visualization
- Human-AI interaction design

---

*© 2025 GoalGravity — AI Research Project*
