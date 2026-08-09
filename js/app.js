// safeLocalStorage is defined globally in the head of index.html

class ConfettiCelebration {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.active = false;
    this.particles = [];
    this.colors = ['#06b6d4', '#8b5cf6', '#fbbf24', '#10b981', '#f43f5e', '#ff7e33', '#3b82f6'];
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.active = true;
    this.particles = [];
    this.canvas.style.display = 'block';
    
    // Spawn initial particles (increased density)
    for (let i = 0; i < 250; i++) {
      this.particles.push(this.createParticle(true));
    }
    this.animate();
  }

  stop() {
    this.active = false;
    this.canvas.style.display = 'none';
  }

  createParticle(initial = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: initial ? Math.random() * -this.canvas.height : -20,
      r: Math.random() * 7 + 4,
      d: Math.random() * this.canvas.height,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      tilt: Math.random() * 12 - 6,
      tiltAngleIncremental: Math.random() * 0.08 + 0.03,
      tiltAngle: 0,
      speed: Math.random() * 4 + 2.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 6 - 3,
      layer: Math.random() > 0.5 ? 1 : 2 // 1: foreground, 2: background depth
    };
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p, idx) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.layer === 1 ? p.speed : p.speed * 0.7; // foreground falls faster
      p.x += Math.sin(p.tiltAngle) * 0.6;
      p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
      p.rotation += p.rotationSpeed;

      this.ctx.save();
      this.ctx.translate(p.x + p.tilt, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      
      const sizeMultiplier = p.layer === 1 ? 1 : 0.65; // depth resizing
      
      if (idx % 2 === 0) {
        this.ctx.fillRect(-p.r * sizeMultiplier, -p.r * sizeMultiplier / 2, p.r * 2 * sizeMultiplier, p.r * sizeMultiplier);
      } else {
        this.ctx.arc(0, 0, p.r * sizeMultiplier / 1.2, 0, Math.PI * 2, true);
        this.ctx.fill();
      }
      
      this.ctx.restore();

      if (p.y > this.canvas.height) {
        this.particles[idx] = this.createParticle(false);
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

const confetti = new ConfettiCelebration('confetti-canvas');

function shuffleQuestionOptions(q) {
  if (!q || !q.o || !Array.isArray(q.o) || q.a === undefined) return q;
  let qCopy = JSON.parse(JSON.stringify(q));
  let originalOptions = qCopy.o;
  let correctAnswerText = originalOptions[qCopy.a];
  
  let indices = Array.from({length: originalOptions.length}, (_, i) => i);
  indices.sort(() => Math.random() - 0.5);
  qCopy.o = indices.map(i => originalOptions[i]);
  qCopy.a = qCopy.o.indexOf(correctAnswerText);
  
  return qCopy;
}

// New Game Modes and Achievements state
let gameMode = 'campaign'; // 'campaign', 'timeattack', 'suddendeath', 'flags'
let spTurnActive = false;
let playedVisualQuestions = new Set();
let playedSessionQuestions = new Set();
let currentQuestionData = null; // campaign mode global reference for explanations
let rapidFireQuestions = [];
let rapidFireIndex = 0;
let singlePlayerScore = 0;
let timeAttackTimerInterval = null;
let timeAttackTimeLeft = 60;
let currentStreak = 0;
let currentStreakNoJoker = 0;
let riskStreak = 0;
let flagQuestions = [];
let flagQuestionIndex = 0;
let currentFlagQuestion = null;
let statsCategoryAnswers = { 1: { c: 0, w: 0 }, 2: { c: 0, w: 0 }, 3: { c: 0, w: 0 }, 4: { c: 0, w: 0 }, 5: { c: 0, w: 0 } };

let achievements = {
  eubuerger: { id: "eubuerger", name: "EU-Bürger", desc: "Beantworte deine allererste Frage richtig", unlocked: false },
  stimmzettel: { id: "stimmzettel", name: "Der Stimmzettel", desc: "Beantworte 10 Fragen im Mehrspieler-Modus richtig", unlocked: false },
  president: { id: "president", name: "Europarats-Präsident", desc: "Beantworte 10 Fragen in Folge richtig, ohne einen Joker zu benutzen", unlocked: false },
  schengen: { id: "schengen", name: "Schengen-Grenzgänger", desc: "Beantworte Fragen zu 15 verschiedenen Ländern der EU richtig", unlocked: false },
  blitz: { id: "blitz", name: "Blitz-Demokrat", desc: "Beantworte eine Frage in unter 3 Sekunden richtig", unlocked: false },
  grossherzog: { id: "grossherzog", name: "Großherzog von Luxemburg", desc: "Erreiche eine Punktzahl von über 40 Punkten in einer Spielrunde", unlocked: false }
};

// --- Version 5.0 Mobile Duel State Variables ---
let duelModeType = 'local'; // 'local' or 'mobile'
let duelMobileRoomCode = null;
let duelMobileIsHost = false;
let duelMobilePlayerId = null; // 'player1' or 'player2'
let duelMobilePlayers = {};
let duelRoomRef = null;

// Listen for fullscreen change events to update the UI button
document.addEventListener('fullscreenchange', () => {
  const btn = document.getElementById('fullscreen-toggle-btn');
  const icon = document.getElementById('fullscreen-icon');
  if (btn && icon) {
    if (document.fullscreenElement) {
      btn.style.borderColor = 'var(--success)';
      btn.style.color = 'var(--success)';
      icon.innerHTML = `<path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"></path>`;
    } else {
      btn.style.borderColor = '';
      btn.style.color = '';
      icon.innerHTML = `<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>`;
    }
  }
});

let teams = [];
let activeTeam = 0;
let currentCIdx = null;
let currentLvl = 0;
let correctAnswer = null;
let jokerUsed = false;
let currentRound = 1;
let maxRounds = 5;
let activeCategory = 1;
let tipOpenedForCurrentQuestion = false;

// Premium Ultimate Variables
let timerDuration = 0; // 0 = off, 15, 30, 45 seconds
let timeLeft = 0;
let timerInterval = null;
let rescueActive = false;
let riskActive = false;
let sessionHighscores = [];
let justMasteredCIdx = null;
let mapSelectionActive = false;
let mapTargetCountry = "";

  // STATIC QUESTIONS AND MAP DATA MOVED TO js/questions.js
function toggleTheme() { 
  document.body.classList.toggle('dark-mode'); 
  const isDark = document.body.classList.contains('dark-mode');
  const toggle1 = document.getElementById('theme-toggle');
  const toggle2 = document.getElementById('access-theme-toggle');
  if (toggle1) toggle1.checked = isDark;
  if (toggle2) toggle2.checked = isDark;
  sounds.playClick();
}

function showInstr() { 
  sounds.playClick();
  document.getElementById('start-screen').style.display='none'; 
  document.getElementById('instr-screen').style.display='flex'; 
}

function showCategorySelect() {
  try { sounds.playClick(); } catch (e) {}
  if (typeof playedCategories !== 'undefined' && playedCategories.clear) {
    playedCategories.clear();
  }
  const instr = document.getElementById('instr-screen');
  if (instr) instr.style.display = 'none';
  const spInstr = document.getElementById('sp-instr-screen');
  if (spInstr) spInstr.style.display = 'none';

  const sub = document.querySelector('#category-screen p');
  if (sub) {
    sub.innerHTML = "Wähle das Hauptthema für dein Quiz. Alle Fragen drehen sich um diesen Bereich:";
  }
  const cards = document.querySelectorAll('#category-screen .category-card');
  cards.forEach(card => {
    card.classList.remove('card-disabled');
    card.classList.remove('disabled');
    card.style.pointerEvents = 'auto';
    card.style.opacity = '1';
  });

  const catScreen = document.getElementById('category-screen');
  if (catScreen) {
    catScreen.style.pointerEvents = 'auto';
    catScreen.style.display = 'flex';
  }
}

function goBackFromRules() {
  sounds.playClick();
  document.getElementById('instr-screen').style.display = 'none';
  document.getElementById('sp-instr-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function goBackFromTimeSelect() {
  sounds.playClick();
  document.getElementById('time-select-screen').style.display = 'none';
  document.getElementById('sp-instr-screen').style.display = 'flex';
}

function goBackFromCategory() {
  sounds.playClick();
  document.getElementById('category-screen').style.display = 'none';
  if (gameMode === 'campaign') {
    document.getElementById('instr-screen').style.display = 'flex';
  } else {
    document.getElementById('setup-screen').style.display = 'flex';
  }
}

function goBackFromSetup() {
  sounds.playClick();
  document.getElementById('setup-screen').style.display = 'none';
  if (gameMode === 'campaign') {
    document.getElementById('category-screen').style.display = 'flex';
  } else if (gameMode === 'timeattack') {
    document.getElementById('time-select-screen').style.display = 'flex';
  } else if (gameMode === 'suddendeath') {
    document.getElementById('sp-instr-screen').style.display = 'flex';
  }
}

function toggleMusic() {
  sounds.init();
  sounds.musicMuted = !sounds.musicMuted;
  const btn = document.getElementById('music-toggle-btn');
  const icon = document.getElementById('music-icon');
  const modalBtn = document.getElementById('modal-music-btn');
  
  if (sounds.musicMuted) {
    if (btn) {
      btn.style.borderColor = 'rgba(244,63,94,0.5)';
      btn.style.color = 'var(--error)';
    }
    if (icon) icon.innerHTML = `<line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>`;
    if (modalBtn) {
      modalBtn.innerText = "Musik stumm";
      modalBtn.style.background = "rgba(244,63,94,0.1)";
      modalBtn.style.borderColor = "rgba(244,63,94,0.3)";
      modalBtn.style.color = "var(--error)";
    }
  } else {
    if (btn) {
      btn.style.borderColor = 'var(--success)';
      btn.style.color = 'var(--success)';
    }
    if (icon) icon.innerHTML = `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`;
    if (modalBtn) {
      modalBtn.innerText = "Musik an";
      modalBtn.style.background = "rgba(16,185,129,0.1)";
      modalBtn.style.borderColor = "rgba(16,185,129,0.3)";
      modalBtn.style.color = "var(--success)";
    }
    sounds.playClick();
  }
}

function toggleFullscreen() {
  sounds.playClick();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

function updateHallOfFame() {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  sessionHighscores.push({
    round: sessionHighscores.length + 1,
    winner: sorted[0].name,
    score: sorted[0].score,
    category: categoryNames[activeCategory]
  });
  const medals = ['🥇','🥈','🥉','🏅'];
  document.getElementById('hall-of-fame-list').innerHTML = sessionHighscores.map((g, i) => `
    <div style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(251,191,36,0.15);border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.2rem;">${medals[Math.min(i, 3)]}</span>
        <div>
          <div style="font-weight:800;font-family:'Space Grotesk',sans-serif;font-size:0.95rem;">Runde ${g.round}: ${g.winner}</div>
          <div style="opacity:0.6;font-size:0.78rem;">Kategorie: ${g.category}</div>
        </div>
      </div>
      <span style="font-weight:800;color:var(--gold);font-size:1rem;font-family:'Space Grotesk',sans-serif;">${Number(g.score.toFixed(1))} PTS</span>
    </div>`).join('');
}

function restartTournamentRound() {
  sounds.setMusicState('menu');
  confetti.stop();
  countries.forEach(c => {
    c.p = {1:0, 2:0, 3:0};
    c.correct = {1:0, 2:0, 3:0};
    c.teamCorrect = {1: null, 2: null, 3: null};
  });
  activeTeam = 0; currentRound = 1; jokerUsed = false; rescueActive = false; riskActive = false; timerInterval = null;
  playedCategories.clear();
  playedVisualQuestions.clear();
  
  teams.forEach(t => {
    t.score = 0;
    if (gameMode === 'suddendeath') {
      t.jokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 2, revive: 2 };
    } else if (gameMode === 'campaign') {
      t.jokers = { fiftyFifty: 2, class: 2, rescue: 2 };
    } else {
      t.jokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 0, revive: 0 };
    }
  });
  
  document.getElementById('winner-screen').style.display = 'none';
  document.getElementById('category-indicator').style.display = 'none';
  document.getElementById('round-counter').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
  sounds.playClick();
}

function endGame() {
  if (typeof clearBotTimeouts === 'function') clearBotTimeouts();
  if (typeof setUiLock === 'function') setUiLock(false);
  stopTimer();
  sounds.playFanfare();
  sounds.setMusicState('victory');
  document.getElementById('end-game-btn').style.display = 'none';
  document.getElementById('game-dashboard').style.display = 'none';
  document.getElementById('round-counter').style.display = 'none';
  document.getElementById('category-indicator').style.display = 'none';
  document.getElementById('winner-screen').style.display = 'flex';
  if (typeof renderCategoryStats === 'function') renderCategoryStats();

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const podium = document.getElementById('podium-area');
  const otherRanks = document.getElementById('other-ranks');
  const maxScore = sorted[0].score;
  const winners = sorted.filter(t => t.score === maxScore);

  if (winners.length > 1) {
    document.getElementById('win-heading').innerText = "UNENTSCHIEDEN!";
    const winnerNames = winners.map(w => w.name).join(" & ");
    document.getElementById('win-subheading').innerText = `Hervorragende Leistung! Die gemeinsamen Champions sind: ${winnerNames}`;
    podium.innerHTML = `
      <div class="podium-step p-2">
        <div class="podium-name" style="width:180px;">Geteilter Sieg</div>
        <div class="step-bar">🤝</div>
        <div style="margin-top:10px;font-weight:bold;font-size:1.2rem;font-family:'Space Grotesk',sans-serif;">TIE</div>
      </div>
      <div class="podium-step p-1">
        <div class="crown-icon">👑</div>
        <div class="podium-name" style="width:240px;font-size:1.15rem;font-weight:800;color:var(--gold);white-space:normal;overflow:visible;">
          ${winners.map(w => `<div>🏆 ${w.name}</div>`).join('')}
        </div>
        <div class="step-bar">1</div>
        <div style="margin-top:10px;font-weight:bold;font-size:1.2rem;font-family:'Space Grotesk',sans-serif;">${Number(maxScore.toFixed(1))} PTS</div>
      </div>`;
    setTimeout(() => document.querySelectorAll('.podium-step').forEach(el => el.classList.add('animate')), 100);
    otherRanks.innerHTML = sorted.filter(t => t.score < maxScore).map((team, idx) => `
      <div class="rank-row">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:800;opacity:0.6;">#${winners.length + idx + 1}</span>
          <span style="font-weight:600;">${team.name}</span>
        </div>
        <span style="font-weight:700;color:var(--accent);font-family:'Space Grotesk',sans-serif;">${Number(team.score.toFixed(1))} PTS</span>
      </div>`).join('');
  } else {
    document.getElementById('win-heading').innerText = "EU CHAMPION";
    document.getElementById('win-subheading').innerText = `Der Gewinner steht fest: Glückwunsch an ${sorted[0].name}!`;
    const order = [1, 0, 2];
    podium.innerHTML = order.map(pos => {
      if (!sorted[pos]) return '';
      const cls = pos === 0 ? 'p-1' : (pos === 1 ? 'p-2' : 'p-3');
      const crown = pos === 0 ? '<div class="crown-icon">👑</div>' : '';
      return `<div class="podium-step ${cls}">
        ${crown}
        <div class="podium-name" title="${sorted[pos].name}">${sorted[pos].name}</div>
        <div class="step-bar">${pos + 1}</div>
        <div style="margin-top:10px;font-weight:bold;font-size:1.1rem;font-family:'Space Grotesk',sans-serif;">${Number(sorted[pos].score.toFixed(1))} PTS</div>
      </div>`;
    }).join('');
    setTimeout(() => document.querySelectorAll('.podium-step').forEach(el => el.classList.add('animate')), 100);
    if (sorted.length > 3) {
      otherRanks.innerHTML = sorted.slice(3).map((t, i) => `
        <div class="rank-row">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:800;opacity:0.6;">#${i+4}</span>
            <span style="font-weight:600;">${t.name}</span>
          </div>
          <span style="font-weight:700;color:var(--accent);font-family:'Space Grotesk',sans-serif;">${Number(t.score.toFixed(1))} PTS</span>
        </div>`).join('');
    } else { otherRanks.innerHTML = ''; }
  }
    updateHallOfFame();
  
  if (document.getElementById('single-player-stats-container')) {
    document.getElementById('single-player-stats-container').style.display = 'none';
  }
  document.getElementById('podium-area').style.display = 'flex';
  document.getElementById('other-ranks').style.display = 'flex';
  
  if (typeof UserProfile !== 'undefined' && typeof UserProfile.recordGameFinished === 'function') {
    let totalCorrect = 0;
    if (teams && teams.length > 0) {
      teams.forEach(t => { totalCorrect += (t.score || 0); });
    }
    UserProfile.recordGameFinished({
      correct: Math.round(totalCorrect),
      total: Math.max(1, (maxRounds || 5) * (teams ? teams.length : 1)),
      mode: gameMode || 'campaign',
      durationMinutes: 5
    });
  }

  confetti.start();
}

// --- NEW MODE SELECTION, ACHIEVEMENT, AND SINGLE-PLAYER SYSTEM ---

function openRanksDialog() {
  sounds.playClick();
  const achsHTML = Object.values(achievements).map(ach => `
    <div style="display:flex; align-items:center; gap: 12px; padding: 10px; background: ${ach.unlocked ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${ach.unlocked ? 'rgba(251,191,36,0.2)' : 'var(--card-border)'}; border-radius: 8px; font-size:0.8rem;">
      <div style="font-size: 1.5rem; filter: ${ach.unlocked ? 'none' : 'grayscale(1) opacity(0.3)'};">
        ${ach.id === 'diplomat' ? '💼' : (ach.id === 'weltenbummler' ? '🗺️' : (ach.id === 'millionaire' ? '💰' : (ach.id === 'streak' ? '🔥' : '💥')))}
      </div>
      <div style="flex:1;">
        <div style="font-weight:800; color: ${ach.unlocked ? 'var(--gold)' : 'var(--text-secondary)'};">${ach.name} ${ach.unlocked ? '🏆' : ''}</div>
        <div style="font-size:0.75rem; opacity:0.7;">${ach.desc}</div>
      </div>
    </div>
  `).join('');
  document.getElementById('ranks-achievements-container').innerHTML = achsHTML;

  const hofHTML = sessionHighscores.length > 0 ? sessionHighscores.map((g, i) => `
    <div style="padding:8px 12px; background:rgba(255,255,255,0.02); border:1px solid rgba(251,191,36,0.1); border-radius:8px; display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
      <span>🏆 Runde ${g.round}: <strong>${g.winner}</strong> (${g.category})</span>
      <strong style="color:var(--gold);">${Number(g.score.toFixed(1))} PTS</strong>
    </div>
  `).join('') : `<div style="text-align:center; opacity:0.5; padding: 15px; font-size:0.8rem;">Noch keine Einträge vorhanden.</div>`;
  document.getElementById('ranks-halloffame-container').innerHTML = hofHTML;

  document.getElementById('ranks-dialog').showModal();
}

function closeRanksDialog() {
  sounds.playClick();
  document.getElementById('ranks-dialog').close();
}

function showModeSelect() {
  sounds.playClick();
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function backToStart() {
  sounds.playClick();
  
  const spScreen = document.getElementById('singleplayer-menu-screen');
  const mpScreen = document.getElementById('multiplayer-menu-screen');
  const modeScreen = document.getElementById('mode-screen');
  const startScreen = document.getElementById('start-screen');
  
  function executeBack() {
    if (modeScreen) modeScreen.style.display = 'none';
    if (spScreen) {
      spScreen.style.display = 'none';
      spScreen.classList.remove('ios-app-close-left');
    }
    if (mpScreen) {
      mpScreen.style.display = 'none';
      mpScreen.classList.remove('ios-app-close-right');
    }
  }

  // Show homescreen (start-screen) immediately so there is ZERO delay or blank ladezeit
  if (startScreen) {
    startScreen.classList.remove('ios-app-open-center', 'ios-home-fade-in');
    void startScreen.offsetWidth; // force reflow
    startScreen.classList.add('ios-home-fade-in');
    startScreen.style.display = 'flex';
  }
  if (typeof refreshStartScreenStats === 'function') refreshStartScreenStats();

  if (spScreen && spScreen.style.display === 'flex') {
    spScreen.classList.add('ios-app-close-left');
    setTimeout(executeBack, 380);
  } else if (mpScreen && mpScreen.style.display === 'flex') {
    mpScreen.classList.add('ios-app-close-right');
    setTimeout(executeBack, 380);
  } else {
    executeBack();
  }
}

function selectMode(mode) {
  sounds.playSuccess();
  gameMode = mode;
  if (typeof playedCategories !== 'undefined' && playedCategories.clear) {
    playedCategories.clear();
  }
  document.getElementById('mode-screen').style.display = 'none';
  document.getElementById('singleplayer-menu-screen').style.display = 'none';
  document.getElementById('multiplayer-menu-screen').style.display = 'none';
  
  if (mode === 'campaign') {
    document.getElementById('instr-screen').style.display = 'flex';
  } else if (mode === 'multiplayer') {
    document.getElementById('mp-role-screen').style.display = 'flex';
  } else if (mode === 'duel') {
    document.getElementById('duel-role-screen').style.display = 'flex';
  } else {
    let title = "";
    let rules = "";
    if (mode === 'timeattack') {
      title = "⏱️ Gegen die Zeit";
      rules = `
        <ul style="line-height: 1.8; padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 8px;"><b>Team-Modus (Max. 5 Teams)</b>: Jedes Team spielt nacheinander.</li>
          <li style="margin-bottom: 8px;"><b>Zeitlimit</b>: Einstellbare Zeit (1-5 Min) pro Team.</li>
          <li style="margin-bottom: 8px;"><b>Themenwahl</b>: Jedes Team wählt ein eigenes Thema. Bereits gewählte Themen sind für die nachfolgenden Teams gespernt!</li>
          <li style="margin-bottom: 8px;"><b>Punkte u. Zeitbonus</b>: Richtige Antworten bringen Punkte (Level-basiert) und +2 Sek. Falsche Antworten ziehen 5 Sek. ab.</li>
          <li style="margin-bottom: 8px;"><b>Siegerehrung</b>: Wer am Ende die meisten Punkte gesammelt hat, gewinnt!</li>
        </ul>
      `;
    } else if (mode === 'suddendeath') {
      title = "💀 Sudden Death";
      rules = `
        <ul style="line-height: 1.8; padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 8px;"><b>Überlebensmodus (Max. 5 Teams)</b>: Jedes Team spielt nacheinander.</li>
          <li style="margin-bottom: 8px;"><b>Ein Fehler u. Ende</b>: Die erste falsche Antwort beendet deine Runde!</li>
          <li style="margin-bottom: 8px;"><b>Drei Joker</b>: Jedes Team startet mit genau 2x Frage tauschen und 2x Wiederbeleben (Revive) Jokern. 50:50 und andere Joker sind gesperrt.</li>
          <li style="margin-bottom: 8px;"><b>Themenwahl</b>: Jedes Team wählt ein eigenes Thema (gesperrt für nachfolgende Teams).</li>
          <li style="margin-bottom: 8px;"><b>Siegerehrung</b>: Wer am längsten überlebt und die meisten Punkte sammelt, siegt!</li>
        </ul>
      `;
    }
    
    document.getElementById('sp-instr-title').innerText = title;
    document.getElementById('sp-instr-content').innerHTML = rules;
    document.getElementById('sp-instr-screen').style.display = 'flex';
  }
}

function checkInGameAchievements(qData) {
  // 1. EU-Bürger (Allererste richtige Antwort)
  let totalCorrect = parseInt(safeLocalStorage.getItem('stats_correct_answers') || '0', 10);
  if (totalCorrect >= 1 && !achievements.eubuerger.unlocked && safeLocalStorage.getItem('ach_eubuerger') !== 'true') {
    achievements.eubuerger.unlocked = true;
    safeLocalStorage.setItem('ach_eubuerger', 'true');
    showAchievementUnlockedToast(achievements.eubuerger);
  }

  // 2. Der Stimmzettel (10 Mehrspieler-Fragen richtig)
  let mpCorrect = parseInt(safeLocalStorage.getItem('stats_mp_correct_answers') || '0', 10);
  if (mpCorrect >= 10 && !achievements.stimmzettel.unlocked && safeLocalStorage.getItem('ach_stimmzettel') !== 'true') {
    achievements.stimmzettel.unlocked = true;
    safeLocalStorage.setItem('ach_stimmzettel', 'true');
    showAchievementUnlockedToast(achievements.stimmzettel);
  }
  
  // 3. Europarats-Präsident (10 richtige Antworten in Folge ohne Joker)
  if (typeof currentStreakNoJoker !== 'undefined' && currentStreakNoJoker >= 10 && !achievements.president.unlocked && safeLocalStorage.getItem('ach_president') !== 'true') {
    achievements.president.unlocked = true;
    safeLocalStorage.setItem('ach_president', 'true');
    showAchievementUnlockedToast(achievements.president);
  }
  
  // 4. Schengen-Grenzgänger (15 verschiedene Länder richtig)
  if (typeof countries !== 'undefined') {
    let correctCountriesCount = countries.filter(c => c.correct && (c.correct[1] || c.correct[2] || c.correct[3])).length;
    if (correctCountriesCount >= 15 && !achievements.schengen.unlocked && safeLocalStorage.getItem('ach_schengen') !== 'true') {
      achievements.schengen.unlocked = true;
      safeLocalStorage.setItem('ach_schengen', 'true');
      showAchievementUnlockedToast(achievements.schengen);
    }
  }
  
  // 5. Großherzog von Luxemburg (über 40 Punkte in einer Spielrunde)
  let highestScore = Math.max(singlePlayerScore, ...teams.map(t => t.score || 0), 0);
  if (highestScore > 40 && !achievements.grossherzog.unlocked && safeLocalStorage.getItem('ach_grossherzog') !== 'true') {
    achievements.grossherzog.unlocked = true;
    safeLocalStorage.setItem('ach_grossherzog', 'true');
    showAchievementUnlockedToast(achievements.grossherzog);
  }
}

function showAchievementUnlockedToast(ach) {
  sounds.playSuccess();
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: rgba(251, 191, 36, 0.95);
    color: #03020a;
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4);
    z-index: 9999;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Space Grotesk', sans-serif;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;
  toast.innerHTML = `🏆 Errungenschaft freigeschaltet: <strong>${ach.name}</strong>`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

function saveAchievements() {
  try {
    safeLocalStorage.setItem('eu_quiz_achievements', JSON.stringify(achievements));
  } catch (e) {
    console.error("Could not save achievements", e);
  }
}

function loadAchievements() {
  try {
    const saved = safeLocalStorage.getItem('eu_quiz_achievements');
    if (saved) {
      const parsed = JSON.parse(saved);
      for (let key in parsed) {
        if (achievements[key]) {
          achievements[key].unlocked = parsed[key].unlocked;
        }
      }
    }
  } catch (e) {
    console.error("Could not load achievements", e);
  }
}
loadAchievements();

function getExplanation(qText, correctAnswerText) {
  if (qText.includes("EGKS")) {
    return "Die Europäische Gemeinschaft für Kohle und Stahl (EGKS oder Montanunion) wurde 1951 durch den Vertrag von Paris gegründet und war das Fundament der heutigen EU.";
  }
  if (qText.includes("Tindemans")) {
    return "Der Tindemans-Bericht von 1975 schlug konkrete Schritte zur EU-Integration vor, darunter eine Wirtschafts- und Währungsunion sowie eine gemeinsame Außenpolitik.";
  }
  if (qText.includes("Spaak")) {
    return "Paul-Henri Spaak war einer der Gründerväter der EU. Seine Berichte führten direkt zur Unterzeichnung der Römischen Verträge im Jahr 1957.";
  }
  if (qText.includes("Maastricht")) {
    return "Der Vertrag von Maastricht (1992) schuf die Europäische Union in ihrer modernen Form und ebnete den Weg für die gemeinsame Währung, den Euro.";
  }
  if (qText.includes("Robert Schuman")) {
    return "Die Schuman-Erklärung am 9. Mai 1950 schlug vor, die Kohle- und Stahlproduktion Deutschlands und Frankreichs zusammenzulegen. Daher feiern wir den Europatag am 9. Mai.";
  }
  if (qText.includes("Schengen")) {
    return "Das Schengen-Abkommen von 1985 hob schrittweise die Grenzkontrollen an den Binnengrenzen der teilnehmenden Staaten auf.";
  }
  if (qText.includes("Dracula")) {
    return "Das Schloss Bran (Törzburg) gilt wegen seiner markanten Architektur als Vorbild für Draculas Schloss im weltberühmten Roman von Bram Stoker.";
  }
  if (qText.includes("Lipizzaner")) {
    return "Die Lipizzaner stammen ursprünglich aus dem Gestüt Lipica in Slowenien und sind berühmt für ihre klassische Dressurleistung.";
  }
  
  return `Wusstest du schon? Die richtige Antwort lautet: <strong>${correctAnswerText}</strong>.`;
}

// Die Texte als Variablen speichern
const impressumText = `
    <h2 style="margin-top: 0;">Impressum</h2>
    <p><strong>Diensteanbieter & Medieninhaber:</strong><br>
    Leading Developer: Thiemo Greger<br>
    Manager of Content: David Schwarz<br>
    Head of Testing: Matthias Hackl<br><br>
    <strong>Erreichbar unter der Anschrift:</strong><br>
    Carnerigasse 30-32<br>
    8010 Graz<br>Österreich</p>
    <p><strong>Kontakt:</strong><br>E-Mail: thiemo.greger@carneri.at oder david.schwarz@carneri.at</p>
    <p><strong>Blattlinie:</strong><br>Diese Website und das darauf bereitgestellte Spiel wurden im Rahmen eines Schulprojekts erstellt. Die Bereitstellung erfolgt rein zu Bildungszwecken und verfolgt keinerlei kommerzielle Interessen.</p>
`;

const datenschutzText = `
    <h2 style="margin-top: 0;">Datenschutzerklärung</h2>
    <h3>1. Allgemeine Hinweise</h3>
    <p>Verantwortlich für die Datenverarbeitung auf dieser Website sind die im Impressum genannten Personen. Diese Website richtet sich ausschließlich an Nutzer mit Wohnsitz oder Aufenthalt in Europa.</p>
    <h3>2. Hosting durch GitHub Pages</h3>
    <p>Diese Website wird auf Servern von GitHub Inc. (USA) bereitgestellt. GitHub erfasst automatisch Logfiles (u.a. IP-Adresse, Browsertyp, Datum/Uhrzeit des Zugriffs). Dies ist technisch erforderlich. GitHub ist unter dem EU-US Data Privacy Framework zertifiziert.</p>
    <h3>3. Cookiebot & Google Analytics 4</h3>
    <p>Diese Website nutzt Google Analytics 4 der Google Ireland Limited zur statistischen Analyse der Nutzung. Die Datenverarbeitung erfolgt nur nach Ihrer Einwilligung über das Cookiebot-Banner. Ihre IP-Adresse wird anonymisiert übertragen. Sie können Ihre Einstellungen jederzeit über das Cookie-Symbol unten links anpassen.</p>
    <h3>4. Firebase Services (Database, Firestore & Auth)</h3>
    <p>Für die Multiplayer-Funktionalität und Benutzerkonten nutzen wir Firebase-Dienste der Google Ireland Limited:</p>
    <ul>
        <li><strong>Realtime Database:</strong> Dient der Echtzeit-Übertragung von Spielständen, Antworten und selbst gewählten Spitznamen im Multiplayer. Alle temporären Raumdaten werden nach dem Verlassen gelöscht.</li>
        <li><strong>Firebase Authentication & Cloud Firestore:</strong> Ermöglicht die optionale Erstellung eines Benutzerkontos (per E-Mail/Passwort oder Google-Login) und das Speichern Ihres persönlichen Fortschritts (XP, Level, freigeschaltete Avatare, Tages-Streak & Europapass-Statistiken) zur geräteübergreifenden Synchronisation. Sie können Ihr Konto jederzeit löschen oder im anonymen Gast-Modus verbleiben.</li>
        <li><strong>Feedback-Funktion:</strong> Wenn Sie freiwillig eine Bewertung abgeben, werden Ihre Sternebewertung, Ihr optionaler Textkommentar, ein Zeitstempel sowie technische Metadaten Ihres Browsers in der Datenbank gespeichert, um das Quiz stetig zu verbessern.</li>
    </ul>
    <h3>5. Lokaler Speicher (localStorage)</h3>
    <p>Um das Spielerlebnis komfortabel zu gestalten, werden bestimmte Daten lokal in Ihrem Browser (localStorage) gespeichert: z.B. Ihre freigeschalteten Erfolge (Achievements), lokaler Profilfortschritt sowie Ihre persönlichen Spiel-Einstellungen. Diese Daten verbleiben auf Ihrem Endgerät und können von Ihnen jederzeit über die Browsereinstellungen gelöscht werden.</p>
    <h3>6. Ihre Rechte</h3>
    <p>Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Beschwerden können an die österreichische Datenschutzbehörde (DSB) gerichtet werden.</p>
`;

const versionText = `
    <h2 style="margin-top: 0;">Versionshinweise (v5.5)</h2>
    <hr style="border: 0; border-top: 1px solid #444; margin-bottom: 15px;">
    
    <h3 style="color: var(--success); margin-bottom: 5px;">Version 5.5 (Veröffentlicht)</h3>
    <p style="margin-top: 0; line-height: 1.5;">
        - **XP System**: Sammle Erfahrungspunkte für richtige Antworten und steige in den Diplomaten-Rängen auf.<br>
        - **Benutzerkonten**: Erstelle optional ein Konto per E-Mail oder Google Sign-In und passe deinen Avatar an.<br>
        - **Achievement System**: Verfolge deine freigeschalteten Erfolge und deinen Fortschritt.<br>
        - **Persönlicher Europapass**: Vollständiger Diplomaten-Pass mit deinen Spielstatistiken (Lieblingsland, Lieblingsmodus, Spielzeit).<br>
    </p>
    
    <h3 style="color: var(--accent-alt); margin-top: 20px; margin-bottom: 5px;">Version 5.6 (Unveröffentlicht)</h3>
    <p style="margin-top: 0; line-height: 1.5;">
        - Vertiefende Zusatzinformationen &amp; Kontext nach jeder Antwort.<br>
        - Detaillierte Runden- &amp; Leistungsstatistiken am Spielende.<br>
        - Mehrfachauswahl-Fragemodus im Multiplayer mit neuen Fragentypen.<br>
    </p>
    
    <h3 style="color: var(--text-secondary); margin-top: 20px; margin-bottom: 5px;">Version 5.7 (Unveröffentlicht)</h3>
    <p style="margin-top: 0; line-height: 1.5;">
        - Mehrsprachigkeit (Quiz in weiteren europäischen Sprachen).<br>
        - Neue Fragensammlungen &amp; visuelle Bildfragen.<br>
        - Erweiterte Schwierigkeitsstufen &amp; Performance-Optimierung der v5.6-Funktionen.<br>
    </p>
`;

// Elemente holen
const modal = document.getElementById("legalModal");
const legalContent = document.getElementById("legalContent");
const closeModal = document.getElementById("closeModal");

// Event Listener für Klicks (Impressum)
document.getElementById("openImpressum").addEventListener("click", function(e) {
    e.preventDefault();
    legalContent.innerHTML = impressumText;
    modal.style.display = "block";
});

// Event Listener für Klicks (Datenschutz)
document.getElementById("openDatenschutz").addEventListener("click", function(e) {
    e.preventDefault();
    legalContent.innerHTML = datenschutzText;
    modal.style.display = "block";
});



// Schließen bei Klick auf das X
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Schließen bei Klick außerhalb des Fensters
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
function checkWelcomeModal() {}
function closeWelcomeModal() {}

function openWelcomeLegal(type) {
  sounds.playClick();
  if (type === 'impressum') {
    legalContent.innerHTML = impressumText;
  } else if (type === 'datenschutz') {
    legalContent.innerHTML = datenschutzText;
  }
  modal.style.display = "block";
}

function setUiLock(locked) {
  const isBotTurn = (typeof teams !== 'undefined' && teams && teams[activeTeam] && teams[activeTeam].isBot);
  const shouldLock = locked || isBotTurn;
  const val = shouldLock ? 'none' : 'auto';

  const grid = document.getElementById('grid');
  if (grid) grid.style.pointerEvents = val;
  const optionsContainer = document.getElementById('options-container');
  if (optionsContainer) optionsContainer.style.pointerEvents = val;
  const diffBtns = document.getElementById('difficulty-buttons');
  if (diffBtns) diffBtns.style.pointerEvents = val;
  const riskPrompt = document.getElementById('risk-prompt-area');
  if (riskPrompt) riskPrompt.style.pointerEvents = val;
  const catScreen = document.getElementById('category-screen');
  if (catScreen) catScreen.style.pointerEvents = val;
  const arsenal = document.getElementById('joker-arsenal');
  if (arsenal) arsenal.style.pointerEvents = val;

  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`btn-lvl-${i}`);
    if (btn) btn.style.pointerEvents = val;
  }

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    if (isBotTurn) {
      nextBtn.style.display = 'none';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.style.pointerEvents = 'auto';
    }
  }
}

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get('room');
  if (roomCode && roomCode.length >= 4 && roomCode.length <= 6 && !isNaN(roomCode)) {
    setTimeout(() => {
      if (typeof mpShowJoinScreenDirect === 'function') {
        mpShowJoinScreenDirect();
        const codeInput = document.getElementById('mp-join-code');
        if (codeInput) codeInput.value = roomCode;
      }
    }, 1200);
  }
});

function selectDuelChoice(choice) {
  sounds.playClick();
  const choiceDiag = document.getElementById('duel-choice-dialog');
  if (choiceDiag) {
    try { choiceDiag.close(); } catch(e) {}
  }
  const roleScreen = document.getElementById('duel-role-screen');
  if (roleScreen) roleScreen.style.display = 'none';
  
  document.getElementById('duel-mode-type').value = choice;
  document.getElementById('duel-setup-screen').style.display = 'flex';
  
  if (typeof duelToggleModeType === 'function') duelToggleModeType();
  if (typeof duelToggleP2Type === 'function') duelToggleP2Type();
}

function closeDuelChoiceDialog() {
  sounds.playClick();
  const choiceDiag = document.getElementById('duel-choice-dialog');
  if (choiceDiag) {
    try { choiceDiag.close(); } catch(e) {}
  }
  const roleScreen = document.getElementById('duel-role-screen');
  if (roleScreen) roleScreen.style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function toggleQuestionTip() {
  const textEl = document.getElementById('q-tip-text');
  const countEl = document.getElementById('q-tip-count');
  const arrowEl = document.getElementById('q-tip-arrow');
  const currentTeamObj = (teams && teams[activeTeam]) ? teams[activeTeam] : null;

  if (!currentTeamObj) return;

  if (currentTeamObj.tipsLeft === undefined) {
    currentTeamObj.tipsLeft = 2;
  }

  if (textEl.style.display === 'block') {
    textEl.style.display = 'none';
    if (arrowEl) arrowEl.style.transform = 'rotate(0deg)';
  } else {
    if (currentTeamObj.tipsLeft > 0) {
      if (!tipOpenedForCurrentQuestion) {
        currentTeamObj.tipsLeft--;
        tipOpenedForCurrentQuestion = true;
      }
      textEl.style.display = 'block';
      if (arrowEl) arrowEl.style.transform = 'rotate(180deg)';
      sounds.playClick();
    } else {
      sounds.playError();
      alert("Dieses Team hat keine Tipps mehr übrig!");
    }
  }

  if (countEl) {
    countEl.innerText = currentTeamObj.tipsLeft;
  }
}

// --- Version 5.3 Dashboard & Navigation Features ---

const euFacts = [
  "Die Europäische Union hat 24 offizielle Amtssprachen. Alle Gesetze werden in all diese Sprachen übersetzt.",
  "Die EU hat keine offizielle Hauptstadt. Die wichtigsten Institutionen befinden sich in Brüssel, Straßburg und Luxemburg.",
  "Das kleinste EU-Land ist Malta mit einer Fläche von nur 316 Quadratkilometern – das ist kleiner als Wien.",
  "Die Europäische Flagge hat immer 12 Sterne. Die Zahl 12 steht für Vollkommenheit und Einheit, nicht für die Anzahl der Länder.",
  "Der Euro ist die offizielle Währung in 20 der 27 EU-Mitgliedstaaten (Eurozone).",
  "Bulgarien verwendet das kyrillische Alphabet. Seit dem EU-Beitritt Bulgariens ist Kyrillisch neben Lateinisch und Griechisch die dritte offizielle Schrift der EU.",
  "Die EU wurde 2012 mit dem Friedensnobelpreis ausgezeichnet für ihren Beitrag zur Förderung von Frieden und Versöhnung.",
  "Das Schengener Abkommen ermöglicht es über 400 Millionen Menschen, ohne Grenzkontrollen zwischen den meisten EU-Ländern zu reisen.",
  "Der höchste Berg der EU ist der Mont Blanc an der Grenze zwischen Frankreich und Italien mit einer Höhe von 4.805 Metern.",
  "Das Erasmus+-Programm hat seit 1987 Millionen von Studierenden und Jugendlichen geholfen, im Ausland zu lernen und zu arbeiten.",
  "Das Europäische Parlament ist das einzige direkt gewählte Organ der EU. Die Abgeordneten werden alle 5 Jahre gewählt.",
  "Die EU-Hymne basiert auf der Melodie von Beethovens 'Ode an die Freude' und hat bewusst keinen Text, um keine Sprache zu bevorzugen.",
  "Das waldreichste Land der EU ist Schweden (fast 70% der Fläche), während Malta fast keine Wälder hat.",
  "In der EU gibt es über 150 verschiedene Regionalkäsesorten, die gesetzlich geschützt sind (z.B. Feta aus Griechenland oder Parmigiano Reggiano).",
  "Österreich trat der EU am 1. Jänner 1995 bei, zusammen mit Schweden und Finnland.",
  "Das Europäische Parlament tagt an zwei Orten: Die Ausschüsse arbeiten in Brüssel, die Plenarsitzungen finden in Straßburg statt.",
  "Die älteste Demokratie der Welt, Griechenland, ist seit 1981 Mitglied der EU.",
  "Der geografische Mittelpunkt der EU befindet sich heute in einem kleinen Dorf namens Gadheim in Bayern, Deutschland.",
  "Die EU-Richtlinie zum Roaming sorgt dafür, dass du in jedem EU-Land ohne zusätzliche Gebühren telefonieren und surfen kannst.",
  "Das am dünnsten besiedelte EU-Land ist Finnland mit nur etwa 18 Einwohnern pro Quadratkilometer."
];



function refreshStartScreenStats() {
  const totalAnswersEl = document.getElementById('stats-total-answers');
  const unlockedAchievementsEl = document.getElementById('stats-unlocked-achievements');
  
  if (totalAnswersEl) {
    totalAnswersEl.innerText = safeLocalStorage.getItem('stats_total_answers') || '0';
  }
  
  if (unlockedAchievementsEl) {
    let unlocked = 0;
    if (typeof achievements !== 'undefined') {
      for (let key in achievements) {
        if (achievements[key].unlocked || safeLocalStorage.getItem('ach_' + key) === 'true') unlocked++;
      }
    } else {
      const achKeys = ['eubuerger', 'stimmzettel', 'president', 'schengen', 'blitz', 'grossherzog'];
      achKeys.forEach(k => {
        if (safeLocalStorage.getItem('ach_' + k) === 'true') unlocked++;
      });
    }
    unlockedAchievementsEl.innerText = `${unlocked}/6`;
  }
}

function openAchievementsModal() {
  sounds.playClick();
  const legalContent = document.getElementById("legalContent");
  const modal = document.getElementById("legalModal");
  if (!legalContent || !modal) return;
  
  let html = `<h2 style="margin-top: 0; font-family: 'Space Grotesk', sans-serif;">🏆 Deine Erfolgs-Roadmap</h2>`;
  html += `<p style="opacity: 0.7; margin-bottom: 30px; font-size: 0.9rem;">Schließe spielerische Herausforderungen ab, um Erfolge freizuschalten.</p>`;
  
  html += `<div class="legal-timeline" style="position: relative; padding-left: 35px; margin-left: 20px; border-left: 2px solid rgba(0, 188, 212, 0.15); display: flex; flex-direction: column; gap: 25px; text-align: left;">`;
  
  const order = ['eubuerger', 'stimmzettel', 'president', 'schengen', 'blitz', 'grossherzog'];
  const difficultyColors = {
    eubuerger: '#4caf50',
    stimmzettel: '#03a9f4',
    president: '#ff9800',
    schengen: '#ff5722',
    blitz: '#9c27b0',
    grossherzog: '#fbbf24'
  };
  
  order.forEach((key, index) => {
    const ach = achievements[key];
    if (!ach) return;
    
    const isUnlocked = ach.unlocked || safeLocalStorage.getItem('ach_' + key) === 'true';
    const badgeColor = difficultyColors[key];
    const delay = (index * 0.08).toFixed(2);
    
    html += `
      <div class="timeline-item-animate" style="position: relative; opacity: ${isUnlocked ? '1' : '0.55'}; animation-delay: ${delay}s;">
        <!-- Milestone circle on the timeline path -->
        <span style="position: absolute; left: -46px; top: 4px; width: 20px; height: 20px; border-radius: 50%; background: ${isUnlocked ? badgeColor : '#334155'}; border: 4px solid ${isUnlocked ? '#ffffff' : '#1e293b'}; box-shadow: ${isUnlocked ? '0 0 10px ' + badgeColor : 'none'}; transition: all 0.3s ease;"></span>
        
        <div style="background: ${isUnlocked ? 'rgba(255, 255, 255, 0.02)' : 'transparent'}; border: 1px solid ${isUnlocked ? 'rgba(255,255,255,0.06)' : 'transparent'}; padding: ${isUnlocked ? '12px 18px' : '0 18px'}; border-radius: 16px;">
          <h4 style="margin: 0; font-family: 'Space Grotesk', sans-serif; color: ${isUnlocked ? 'var(--text-primary)' : 'var(--text-secondary)'}; font-size: 1.05rem;">
            <span>${isUnlocked ? '🏆' : '🔒'} ${ach.name}</span>
          </h4>
          <p style="margin: 5px 0 0 0; font-size: 0.85rem; opacity: 0.8; color: var(--text-primary);">${ach.desc}</p>
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  
  legalContent.innerHTML = html;
  modal.style.display = "block";
}

function showSingleplayerMenu(isBackNav = false) {
  sounds.playClick();
  const startScreen = document.getElementById('start-screen');
  const spScreen = document.getElementById('singleplayer-menu-screen');
  if (startScreen) startScreen.style.display = 'none';
  if (spScreen) {
    spScreen.classList.remove('ios-app-close-left', 'ios-app-open-left');
    void spScreen.offsetWidth; // force reflow
    if (!isBackNav) {
      spScreen.classList.add('ios-app-open-left');
    }
    spScreen.style.display = 'flex';
  }
}

function showMultiplayerMenu(isBackNav = false) {
  sounds.playClick();
  const startScreen = document.getElementById('start-screen');
  const mpScreen = document.getElementById('multiplayer-menu-screen');
  if (startScreen) startScreen.style.display = 'none';
  if (mpScreen) {
    mpScreen.classList.remove('ios-app-close-right', 'ios-app-open-right');
    void mpScreen.offsetWidth; // force reflow
    if (!isBackNav) {
      mpScreen.classList.add('ios-app-open-right');
    }
    mpScreen.style.display = 'flex';
  }
}

// MutationObserver to track when a new question is loaded to support the Blitz-Demokrat achievement
let questionStartTime = 0;
document.addEventListener('DOMContentLoaded', () => {
  const qTextEl = document.getElementById('q-text');
  if (qTextEl) {
    const observer = new MutationObserver(() => {
      if (qTextEl.innerText.trim().length > 0) {
        questionStartTime = Date.now();
      }
    });
    observer.observe(qTextEl, { childList: true, characterData: true, subtree: true });
  }
});

// Centralized statistics trackers
function trackLifetimeAnswer(isCorrect) {
  let answered = parseInt(safeLocalStorage.getItem('stats_total_answers') || '0', 10);
  answered++;
  safeLocalStorage.setItem('stats_total_answers', answered.toString());
  
  if (isCorrect) {
    let correct = parseInt(safeLocalStorage.getItem('stats_correct_answers') || '0', 10);
    correct++;
    safeLocalStorage.setItem('stats_correct_answers', correct.toString());
    
    // Check Blitz-Demokrat (under 3 seconds)
    let secondsTaken = (Date.now() - questionStartTime) / 1000;
    if (secondsTaken < 3 && questionStartTime > 0 && safeLocalStorage.getItem('ach_blitz') !== 'true') {
      achievements.blitz.unlocked = true;
      safeLocalStorage.setItem('ach_blitz', 'true');
      showAchievementUnlockedToast(achievements.blitz);
    }

    if (typeof currentStreakNoJoker !== 'undefined') {
      if (!jokerUsed) {
        currentStreakNoJoker++;
      } else {
        currentStreakNoJoker = 0;
      }
    }
    currentStreak++;
  } else {
    currentStreak = 0;
    if (typeof currentStreakNoJoker !== 'undefined') {
      currentStreakNoJoker = 0;
    }
    jokerUsed = false; // Reset streak and joker use on wrong answer
  }

  // Increment multiplayer answers if in MP modes
  if (gameMode === 'campaign' || gameMode === 'multiplayer' || gameMode === 'duel') {
    let mpCount = parseInt(safeLocalStorage.getItem('stats_mp_answers') || '0', 10) + 1;
    safeLocalStorage.setItem('stats_mp_answers', mpCount.toString());
    if (isCorrect) {
      let mpCorrectCount = parseInt(safeLocalStorage.getItem('stats_mp_correct_answers') || '0', 10) + 1;
      safeLocalStorage.setItem('stats_mp_correct_answers', mpCorrectCount.toString());
    }
  }

  // Run general achievement check
  if (typeof checkInGameAchievements === 'function') {
    checkInGameAchievements();
  }
}

function trackLifetimeGameStarted() {
  let games = parseInt(safeLocalStorage.getItem('stats_games_played') || '0', 10);
  games++;
  safeLocalStorage.setItem('stats_games_played', games.toString());
}

// In-Game Feedback modal management
let currentFeedbackRating = 0;
function setFeedbackRating(rating) {
  sounds.playClick();
  currentFeedbackRating = rating;
  const stars = document.querySelectorAll('.feedback-star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.style.filter = 'none';
      star.style.opacity = '1';
      star.style.transform = 'scale(1.2)';
    } else {
      star.style.filter = 'grayscale(1)';
      star.style.opacity = '0.4';
      star.style.transform = 'scale(1)';
    }
  });
  const errEl = document.getElementById('feedback-err');
  if (errEl) errEl.style.display = 'none';
}

function updateFeedbackCharCount(el) {
  const cnt = document.getElementById('feedback-char-count');
  if (cnt && el) {
    cnt.innerText = `${el.value.length} / 150 Zeichen`;
    if (el.value.length >= 150) {
      cnt.style.color = 'var(--gold)';
    } else {
      cnt.style.color = 'inherit';
    }
  }
}

function openFeedbackModal() {
  sounds.playClick();
  currentFeedbackRating = 0;
  const formView = document.getElementById('feedback-form-view');
  const succView = document.getElementById('feedback-success-view');
  if (formView) formView.style.display = 'block';
  if (succView) succView.style.display = 'none';

  const commentEl = document.getElementById('feedback-comment');
  if (commentEl) {
    commentEl.value = "";
    updateFeedbackCharCount(commentEl);
  }
  const errEl = document.getElementById('feedback-err');
  if (errEl) errEl.style.display = 'none';
  const stars = document.querySelectorAll('.feedback-star');
  stars.forEach(star => {
    star.style.filter = 'grayscale(1)';
    star.style.opacity = '0.4';
    star.style.transform = 'scale(1)';
  });
  const diag = document.getElementById('feedback-dialog');
  if (diag && typeof diag.showModal === 'function') {
    diag.classList.remove('dialog-zoom-out');
    diag.classList.add('dialog-zoom-in');
    diag.showModal();
  }
}

function closeFeedbackModal() {
  sounds.playClick();
  const diag = document.getElementById('feedback-dialog');
  if (diag) {
    diag.classList.remove('dialog-zoom-in');
    diag.classList.add('dialog-zoom-out');
    setTimeout(() => {
      if (typeof diag.close === 'function') diag.close();
      diag.classList.remove('dialog-zoom-out');
      const formView = document.getElementById('feedback-form-view');
      const succView = document.getElementById('feedback-success-view');
      if (formView) formView.style.display = 'block';
      if (succView) succView.style.display = 'none';
    }, 280);
  }
}

function submitFeedback() {
  if (currentFeedbackRating === 0) {
    const errEl = document.getElementById('feedback-err');
    if (errEl) {
      errEl.innerText = "Bitte wähle eine Sterne-Bewertung aus.";
      errEl.style.display = 'block';
    }
    sounds.playError();
    return;
  }
  
  // Rate limiting protection: 10 minutes cooldown between submissions
  const lastSubmit = parseInt(safeLocalStorage.getItem('last_feedback_time') || '0', 10);
  const now = Date.now();
  if (now - lastSubmit < 10 * 60 * 1000) {
    const errEl = document.getElementById('feedback-err');
    if (errEl) {
      errEl.innerText = "Du hast erst kürzlich ein Feedback gesendet. Vielen Dank!";
      errEl.style.display = 'block';
    }
    sounds.playError();
    return;
  }

  sounds.playSuccess();
  const commentEl = document.getElementById('feedback-comment');
  let comment = commentEl ? commentEl.value.trim() : "";
  
  // Storage & Security Protections: 150 chars max, strip HTML & binary/large payloads
  comment = comment.replace(/<[^>]*>?/gm, ''); // strip HTML tags
  if (comment.length > 150) {
    comment = comment.substring(0, 150);
  }

  const submitBtn = document.getElementById('btn-submit-feedback');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Wird gesendet...";
  }
  
  function finishSubmit() {
    safeLocalStorage.setItem('feedback_submitted', 'true');
    safeLocalStorage.setItem('last_feedback_time', Date.now().toString());
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Bewertung absenden";
    }
    const formView = document.getElementById('feedback-form-view');
    const succView = document.getElementById('feedback-success-view');
    if (formView) formView.style.display = 'none';
    if (succView) succView.style.display = 'block';
  }

  if (typeof initFirebase === 'function') {
    initFirebase();
  }

  if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
    try {
      const db = firebase.database();
      
      function pushData() {
        db.ref('feedback').push({
          rating: currentFeedbackRating,
          comment: comment,
          timestamp: Date.now(),
          userAgent: (navigator.userAgent || '').substring(0, 100)
        }).then(() => {
          finishSubmit();
        }).catch(err => {
          console.error("Firebase feedback failed:", err);
          finishSubmit();
        });
      }

      if (firebase.auth && firebase.auth() && !firebase.auth().currentUser) {
        firebase.auth().signInAnonymously()
          .then(() => {
            pushData();
          })
          .catch(err => {
            console.error("Auth failed for feedback:", err);
            finishSubmit();
          });
      } else {
        pushData();
      }
    } catch(e) {
      console.error(e);
      finishSubmit();
    }
  } else {
    finishSubmit();
  }
}

// Extra Stats Calculations for Winner Screen
function renderExtraStats() {
  const container = document.getElementById('extra-stats-content');
  const section = document.getElementById('extra-stats-section');
  if (!container || !section) return;
  
  let html = "";
  let hasData = false;
  
  // 1. Category master calculation
  let bestCatId = -1;
  let bestPct = -1;
  for (let catId = 1; catId <= 5; catId++) {
    if (typeof statsCategoryAnswers !== 'undefined' && statsCategoryAnswers[catId]) {
      const stats = statsCategoryAnswers[catId];
      const total = stats.c + stats.w;
      if (total > 0) {
        const pct = stats.c / total;
        if (pct > bestPct) {
          bestPct = pct;
          bestCatId = catId;
        }
      }
    }
  }
  
  if (bestCatId !== -1 && bestPct > 0) {
    hasData = true;
    html += `<div style="margin-bottom: 10px;">🌟 <strong>Kategorie-Meister:</strong> Eure stärkste Kategorie war <strong>${categoryNames[bestCatId]}</strong> (${Math.round(bestPct * 100)}% richtige Antworten).</div>`;
  }
  
  // 2. Mistakes analysis (Top missed countries)
  if (gameMode === 'campaign' && typeof countries !== 'undefined') {
    let missedCountries = countries
      .filter(c => {
        return (c.p[1] && !c.correct[1]) || (c.p[2] && !c.correct[2]) || (c.p[3] && !c.correct[3]);
      })
      .map(c => {
        let errors = 0;
        if (c.p[1] && !c.correct[1]) errors++;
        if (c.p[2] && !c.correct[2]) errors++;
        if (c.p[3] && !c.correct[3]) errors++;
        return { name: c.n, flag: c.f, errors: errors };
      })
      .sort((a,b) => b.errors - a.errors);
      
    if (missedCountries.length > 0) {
      hasData = true;
      const top3 = missedCountries.slice(0, 3).map(c => `${c.flag} ${c.name}`).join(', ');
      html += `<div style="margin-bottom: 10px;">⚠️ <strong>Herausfordernde Länder:</strong> Bei diesen Ländern gab es die meisten Fehler: <strong>${top3}</strong>.</div>`;
    }
  }
  
  container.innerHTML = html;
  section.style.display = hasData ? 'block' : 'none';
  
  // Trigger Auto-Feedback if not already done in this session
  if (safeLocalStorage.getItem('feedback_submitted') !== 'true') {
    setTimeout(() => {
      openFeedbackModal();
    }, 1500);
  }
}

// Getter/Setter Interceptor on #mode-screen display to reroute to correct sub-menus
document.addEventListener("DOMContentLoaded", () => {
  // Select a stable daily fact based on the current date seed (changes automatically every day)
  const today = new Date();
  const dateSeed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate();
  const dailyIdx = dateSeed % euFacts.length;
  const textEl = document.getElementById('daily-fact-text');
  if (textEl) {
    textEl.innerText = euFacts[dailyIdx];
    // Force trigger text reveal animation on load
    textEl.classList.remove('fact-text-animate');
    void textEl.offsetWidth; // force reflow
    textEl.classList.add('fact-text-animate');
  }
  
  // Apply reduce-motion configuration from localStorage on load
  if (safeLocalStorage.getItem('reduceMotion') === 'true') {
    document.body.classList.add('reduce-motion');
  }
  
  // Refresh stats
  refreshStartScreenStats();
  
  const modeScreen = document.getElementById('mode-screen');
  if (modeScreen) {
    Object.defineProperty(modeScreen.style, 'display', {
      get: function() { return this._display || 'none'; },
      set: function(val) {
        this._display = val;
        if (val === 'flex') {
          modeScreen.style.display = 'none';
          if (gameMode === 'campaign' || gameMode === 'multiplayer' || gameMode === 'duel') {
            showMultiplayerMenu(true);
          } else if (gameMode === 'timeattack' || gameMode === 'suddendeath' || gameMode === 'flags') {
            showSingleplayerMenu(true);
          } else {
            backToStart();
          }
        }
      },
      configurable: true
    });
  }

  // Remove intro animation classes after they finish, so they don't re-trigger when returning to start screen
  setTimeout(() => {
    const slogan = document.querySelector('.ios-slogan-intro');
    const hero = document.querySelector('.ios-hero-intro');
    const topBar = document.querySelector('.ios-top-bar-animate');
    const staggered = document.querySelectorAll('.ios-entrance-animate');

    if (slogan) slogan.classList.remove('ios-slogan-intro');
    if (hero) hero.classList.remove('ios-hero-intro');
    if (topBar) topBar.classList.remove('ios-top-bar-animate');
    staggered.forEach(el => {
      el.classList.remove('ios-entrance-animate', 'delay-sp', 'delay-mp', 'delay-fact', 'delay-stats', 'delay-feedback', 'delay-roadmap');
    });
  }, 2600);
});
