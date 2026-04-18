// ============================
// GOAL GRAVITY — Main App JS
// ============================

// ---- Counter Animation ----
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current >= 1000
        ? Math.round(current).toLocaleString()
        : Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger on scroll into view
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
}, { threshold: 0.3 });
const heroEl = document.querySelector('.hero-stats');
if (heroEl) heroObserver.observe(heroEl);

// ---- Slider Labels ----
const motivSlider = document.getElementById('motivation');
const importSlider = document.getElementById('importance');
if (motivSlider) motivSlider.addEventListener('input', () => {
  document.getElementById('motivLabel').textContent = motivSlider.value;
});
if (importSlider) importSlider.addEventListener('input', () => {
  document.getElementById('importLabel').textContent = importSlider.value;
});

// ---- Challenge Pills ----
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// ---- Scroll to Predict ----
window.scrollToPredict = function () {
  document.getElementById('predict').scrollIntoView({ behavior: 'smooth' });
};

// ---- AI Analysis Engine ----
window.runAnalysis = async function () {
  const btn = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('btnText');
  const habitName = document.getElementById('habitName').value.trim() || 'Your Habit';
  const streak = parseInt(document.getElementById('streak').value) || 0;
  const motivation = parseInt(document.getElementById('motivation').value) || 7;
  const importance = parseInt(document.getElementById('importance').value) || 8;
  const frequency = document.getElementById('frequency').value;
  const challenge = document.querySelector('.pill.active')?.getAttribute('data-val') || 'motivation';

  // Loading state
  btn.disabled = true;
  btnText.innerHTML = `<span class="analyzing"><span></span><span></span><span></span></span> COMPUTING...`;

  // Simulate AI computation
  await new Promise(r => setTimeout(r, 1800));

  // --- GRAVITY SCORE ALGORITHM ---
  let score = 0;

  // Streak contribution (0–25)
  score += Math.min(25, streak * 1.5 + (streak > 21 ? 10 : 0));

  // Motivation (0–25)
  score += motivation * 2.5;

  // Importance (0–20)
  score += importance * 2;

  // Frequency bonus
  const freqBonus = { 'Daily': 10, '5x per week': 8, '3x per week': 5, 'Weekly': 2 };
  score += freqBonus[frequency] || 5;

  // Challenge penalty
  const challengePenalty = { time: 8, motivation: 12, consistency: 15, environment: 10, social: 6 };
  score -= challengePenalty[challenge] || 8;

  // Noise
  score += (Math.random() - 0.5) * 6;
  score = Math.max(5, Math.min(98, Math.round(score)));

  // Derived metrics
  const persistProb = Math.min(98, Math.round(score * 0.9 + Math.random() * 5));
  const crystalScore = streak > 21
    ? Math.min(95, Math.round(60 + streak * 1.2))
    : Math.min(70, Math.round(30 + streak * 2));
  const dropRisk = Math.max(5, Math.round(100 - score + (Math.random() * 10 - 5)));

  // Grade
  let grade, gradeMsg;
  if (score >= 80) { grade = 'HABIT CRYSTALLIZING'; gradeMsg = 'STRONG GRAVITATIONAL PULL'; }
  else if (score >= 60) { grade = 'BUILDING MOMENTUM'; gradeMsg = 'MODERATE GRAVITATIONAL PULL'; }
  else if (score >= 40) { grade = 'FRAGILE ORBIT'; gradeMsg = 'WEAK GRAVITATIONAL PULL'; }
  else { grade = 'DECAY IMMINENT'; gradeMsg = '⚠ ESCAPE VELOCITY RISK'; }

  // AI Message
  const messages = {
    high: [
      `${habitName} has achieved significant gravitational mass. Neural analysis shows strong identity fusion — this habit is beginning to define who you are, making it structurally resistant to disruption. Your ${streak}-day streak has passed the critical threshold.`,
      `Impressive orbital stability detected for ${habitName}. The AI predicts a 87% chance of 30-day persistence. Your motivation-importance alignment is rare — most habits collapse when these diverge. Protect this window.`
    ],
    medium: [
      `${habitName} is in a precarious orbit. Your current trajectory has a ${Math.round(100 - score)}% probability of decay within 14 days without a behavioral intervention. The AI has identified your ${challenge.replace('_', ' ')} pattern as the primary friction vector.`,
      `Neural modeling reveals ${habitName} sits at a tipping point. Streak of ${streak} days provides some inertia, but motivation score of ${motivation}/10 creates instability. You're in the "valley of death" — the most dangerous phase of habit formation.`
    ],
    low: [
      `${habitName} is experiencing critical gravitational decay. Drop probability exceeds 78% within 7 days. The AI has flagged ${challenge.replace('_', ' ')} as your primary threat. Immediate micro-habit decomposition is recommended.`,
      `Warning: ${habitName} is losing orbital velocity. Without course correction, behavioral entropy will cause complete habit collapse within 5 days. Your ${challenge} pattern has been the dominant disruption force in 84% of similar profiles.`
    ]
  };

  const msgGroup = score >= 70 ? 'high' : score >= 45 ? 'medium' : 'low';
  const aiMsg = messages[msgGroup][Math.floor(Math.random() * 2)];

  // Tactics
  const tacticMap = {
    time: [
      'Compress the habit to a 2-minute minimum viable version',
      'Stack it onto an existing daily anchor (after coffee, before sleep)',
      'Block 15 minutes in your calendar as non-negotiable'
    ],
    motivation: [
      'Deploy implementation intentions: "When X happens, I will do Y"',
      'Create a visual progress tracker visible from your bed',
      'Find a habit partner for accountability pressure'
    ],
    consistency: [
      'Establish a "never miss twice" recovery protocol',
      'Reduce the habit bar during low-energy periods (minimum viable action)',
      'Set environmental triggers that auto-cue the behavior'
    ],
    environment: [
      'Redesign your environment to make the habit path frictionless',
      'Remove all competing stimuli from your habit zone',
      'Pre-load habit materials the night before'
    ],
    social: [
      'Public commitment via social media creates external accountability gravity',
      'Join a community where the habit is the norm, not the exception',
      'Find one person to do this with — social habits are 65% more persistent'
    ]
  };

  const tactics = tacticMap[challenge] || tacticMap.motivation;

  // Show results
  document.getElementById('resultActive').style.display = 'block';
  document.querySelector('.result-idle').style.display = 'none';

  document.getElementById('resultScore').textContent = score;
  document.getElementById('resultGrade').textContent = gradeMsg;

  document.getElementById('aiMessage').textContent = aiMsg;

  // Animate bars
  setTimeout(() => {
    const barPersist = document.getElementById('barPersist');
    const barCrystal = document.getElementById('barCrystal');
    const barRisk = document.getElementById('barRisk');

    barPersist.style.width = persistProb + '%';
    barCrystal.style.width = crystalScore + '%';
    barRisk.style.width = dropRisk + '%';

    document.getElementById('valPersist').textContent = persistProb + '%';
    document.getElementById('valCrystal').textContent = crystalScore + '%';
    document.getElementById('valRisk').textContent = dropRisk + '%';
  }, 100);

  // Tactics
  const ul = document.getElementById('tacticsUl');
  ul.innerHTML = tactics.map(t => `<li>${t}</li>`).join('');

  // Color score based on value
  const scoreEl = document.getElementById('resultScore');
  if (score >= 70) { scoreEl.style.color = '#ff2233'; scoreEl.style.textShadow = '0 0 40px rgba(255,34,51,0.6)'; }
  else if (score >= 45) { scoreEl.style.color = '#ffcc00'; scoreEl.style.textShadow = '0 0 40px rgba(255,204,0,0.4)'; }
  else { scoreEl.style.color = '#cc0000'; scoreEl.style.textShadow = '0 0 40px rgba(200,0,0,0.4)'; }

  // Add to habit table
  addToTable(habitName, frequency, streak, score);

  // Reset button
  btn.disabled = false;
  btnText.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> Re-Analyze`;
};

// ---- Populate Habits Table ----
const defaultHabits = [
  { name: '🏃 Morning Run', cat: 'Fitness', streak: 23, score: 87, forecast: 82, status: 'alive' },
  { name: '💧 Hydration', cat: 'Health', streak: 8, score: 71, forecast: 68, status: 'alive' },
  { name: '📚 Daily Reading', cat: 'Learning', streak: 5, score: 42, forecast: 31, status: 'risk' },
  { name: '🧘 Meditation', cat: 'Mindfulness', streak: 2, score: 28, forecast: 18, status: 'critical' },
  { name: '🥗 Healthy Eating', cat: 'Nutrition', streak: 14, score: 64, forecast: 58, status: 'alive' },
];

function renderTable(habits) {
  const tbody = document.getElementById('habitsTableBody');
  if (!tbody) return;
  tbody.innerHTML = habits.map(h => `
    <tr>
      <td>${h.name}</td>
      <td style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);letter-spacing:1px;">${h.cat}</td>
      <td>
        <span style="font-family:var(--font-display);font-size:1.5rem;color:var(--red);">${h.streak}</span>
        <span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text-muted);margin-left:4px;">days</span>
      </td>
      <td>
        <span class="score-pill ${h.score >= 70 ? 'score-high' : h.score >= 45 ? 'score-med' : 'score-low'}">${h.score}</span>
      </td>
      <td>
        <div class="forecast-bar">
          <div class="fbar-track"><div class="fbar-fill" style="width:${h.forecast}%"></div></div>
          <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);">${h.forecast}%</span>
        </div>
      </td>
      <td>
        <span class="status-tag ${h.status === 'alive' ? 'tag-alive' : h.status === 'risk' ? 'tag-risk' : 'tag-critical'}">
          ${h.status === 'alive' ? '● STABLE' : h.status === 'risk' ? '⚠ AT RISK' : '✕ CRITICAL'}
        </span>
      </td>
    </tr>
  `).join('');
}

function addToTable(name, freq, streak, score) {
  const forecast = Math.max(10, score - Math.floor(Math.random() * 15));
  const status = score >= 70 ? 'alive' : score >= 45 ? 'risk' : 'critical';
  defaultHabits.unshift({ name: '⚡ ' + name, cat: freq, streak, score, forecast, status });
  renderTable(defaultHabits);
}

// Init table
renderTable(defaultHabits);

// ---- Fade-in on scroll ----
const fadeEls = document.querySelectorAll('.card, .step-card, .streak-item, .insight-item');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});
