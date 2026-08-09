/**
 * EU Quiz - Version 5.5
 * User Profile, XP/Leveling System, Europapass & Cloud Firestore Sync Manager
 */

const UserProfile = {
  // Profile State
  data: {
    nickname: "EU-Entdecker",
    avatar: "🧑‍🎓",
    xp: 0,
    level: 1,
    stats: {
      gamesPlayed: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      playTimeSeconds: 0,
      countryUsage: {}, // { "Österreich": 15, "Frankreich": 8 }
      modeUsage: {}     // { "campaign": 5, "timeattack": 2 }
    },
    achievements: [],
    streak: {
      count: 0,
      lastPlayDate: "",
      highest: 0
    }
  },

  db: null,
  uid: null,
  sessionStartTime: Date.now(),
  lastFirestoreSaveTime: 0,
  firestoreSaveTimer: null,
  lastSavedDataJSON: "",
  isAuthProcessing: false,

  // Available Avatars (Exclusively 3D Pixar Rendered Characters)
  avatars: [
    { id: "diplomat_male", icon: "assets/avatars/diplomat_male.jpg", name: "Diplomat Max", isImg: true },
    { id: "diplomat_female", icon: "assets/avatars/diplomat_female.jpg", name: "Diplomatin Elena", isImg: true },
    { id: "scholar", icon: "assets/avatars/scholar.jpg", name: "Studentin Sophia", isImg: true },
    { id: "president", icon: "assets/avatars/president.jpg", name: "Präsident Alexander", isImg: true },
    { id: "astronaut", icon: "assets/avatars/astronaut.jpg", name: "Astronautin Clara", isImg: true },
    { id: "judge", icon: "assets/avatars/judge.jpg", name: "Richterin Victoria", isImg: true },
    { id: "explorer", icon: "assets/avatars/explorer.jpg", name: "Entdecker Leo", isImg: true },
    { id: "scientist", icon: "assets/avatars/scientist.jpg", name: "Forscherin Sarah", isImg: true }
  ],

  getAvatarHTML: function(avatarVal, size = '100%') {
    const src = (avatarVal && (avatarVal.startsWith('assets/') || avatarVal.endsWith('.jpg') || avatarVal.endsWith('.png')))
      ? avatarVal
      : 'assets/avatars/diplomat_female.jpg';
    return `<img src="${src}" alt="Avatar" style="width:${size}; height:${size}; object-fit:cover; border-radius:50%; display:block;">`;
  },

  ensureFirebaseApp: function() {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        const config = {
          apiKey: "AIzaSyDa0giAamnQoCyAMHTZdA4OtKuXHzXTOfo",
          authDomain: "eu-quiz-16aa5.firebaseapp.com",
          databaseURL: "https://eu-quiz-16aa5-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "eu-quiz-16aa5",
          storageBucket: "eu-quiz-16aa5.firebasestorage.app",
          messagingSenderId: "979679807669",
          appId: "1:979679807669:web:5c4c0b720256e8d278d6fc",
          measurementId: "G-ENFQPLBZZ8"
        };
        try {
          firebase.initializeApp(config);

          // Activate Firebase App Check (reCAPTCHA v3)
          if (typeof firebase.appCheck === 'function') {
            try {
              const appCheck = firebase.appCheck();
              appCheck.activate(
                new firebase.appCheck.ReCaptchaV3Provider('6LcPyHEtAAAAAJhFyY9v4u5yc_ImYT4wAzmFFXay'),
                true
              );
            } catch (errAppCheck) {
              console.warn("App Check Hinweis:", errAppCheck);
            }
          }
        } catch (e) {
          console.warn("Firebase Init Hinweis:", e);
        }
      }
    }
  },

  /**
   * Initialize User Profile
   */
  init: function() {
    this.loadFromLocal();
    this.renderTopBar();
    this.checkInitialAuthPrompt();

    // Firebase Auth listener
    try {
      this.ensureFirebaseApp();
      if (typeof firebase !== 'undefined' && typeof firebase.auth === 'function') {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.uid = user.uid;
            this.initFirestore();
          } else {
            firebase.auth().signInAnonymously().catch(err => {
              console.warn("Anonyme Anmeldung fehlgeschlagen:", err);
            });
          }
        });
      }
    } catch (err) {
      console.warn("Firebase Auth Initialisierungshinweis:", err);
    }

    // Playtime tracker (updates every 10 seconds - throttled)
    setInterval(() => {
      this.data.stats.playTimeSeconds += 10;
      this.saveToLocal();
    }, 10000);

    // Save to Firestore before window closes
    window.addEventListener('beforeunload', () => {
      this.saveToFirestore();
    });
  },

  /**
   * Initialize Firestore connection
   */
  initFirestore: function() {
    if (typeof firebase !== 'undefined' && firebase.firestore && this.uid) {
      try {
        this.db = firebase.firestore();
        this.db.collection('users').doc(this.uid).get().then(doc => {
          if (doc.exists) {
            const remoteData = doc.data();
            const remoteXP = remoteData.xp || 0;
            // Synchronize cloud data if remote has higher progress
            if (remoteXP >= this.data.xp) {
              this.data = {
                ...this.data,
                ...remoteData,
                stats: {
                  ...this.data.stats,
                  ...(remoteData.stats || {})
                },
                streak: {
                  ...this.data.streak,
                  ...(remoteData.streak || {})
                }
              };
              // Enforce max 15 chars on remote sync
              this.data.nickname = (this.data.nickname || 'EU-Entdecker').substring(0, 15);
              this.saveToLocal();
              this.renderTopBar();
              this.renderEuropapass();
            }
          } else {
            this.saveToFirestore();
          }
        }).catch(err => {
          console.warn("Firestore Lesefehler:", err);
        });
      } catch (e) {
        console.warn("Firestore Connect Hinweis:", e);
      }
    }
  },

  /**
   * Calculate Level from XP
   * Level 1 -> 2 requires 50 XP. Each subsequent level requires 2 XP more than the previous level.
   */
  calculateLevel: function(xp) {
    if (!xp || xp <= 0) return 1;
    let lvl = 1;
    let req = 50;
    let accum = 0;
    while (xp >= accum + req) {
      accum += req;
      lvl++;
      req += 2;
    }
    return lvl;
  },

  /**
   * Calculate XP required for current level and next level
   */
  getMinXPForLevel: function(lvl) {
    if (lvl <= 1) return 0;
    let accum = 0;
    let req = 50;
    for (let l = 1; l < lvl; l++) {
      accum += req;
      req += 2;
    }
    return accum;
  },

  getMaxXPForLevel: function(lvl) {
    let accum = 0;
    let req = 50;
    for (let l = 1; l <= lvl; l++) {
      accum += req;
      req += 2;
    }
    return accum;
  },

  /**
   * Add XP to profile
   */
  addXP: function(amount, reason = "") {
    if (!amount || amount <= 0) return;
    const oldLvl = this.calculateLevel(this.data.xp);
    this.data.xp += amount;
    const newLvl = this.calculateLevel(this.data.xp);
    this.data.level = newLvl;

    this.save();
    this.renderTopBar();

    if (newLvl > oldLvl) {
      this.showXPToast(`🎉 LEVEL UP! Du bist jetzt Level ${newLvl}!`);
      if (typeof sounds !== 'undefined' && sounds.playSuccess) {
        try { sounds.playSuccess(); } catch (e) {}
      }
    } else {
      this.showXPToast(`+${amount} XP ${reason ? '(' + reason + ')' : ''}`);
    }
  },

  /**
   * Update statistics after a game round
   */
  recordGameFinished: function(gameData) {
    if (!gameData) gameData = {};
    if (!this.data.stats) this.data.stats = { gamesPlayed: 0, timePlayedSeconds: 0, modeUsage: {}, countryUsage: {} };

    this.data.stats.gamesPlayed = (this.data.stats.gamesPlayed || 0) + 1;
    this.data.stats.correctAnswers = (this.data.stats.correctAnswers || 0) + (gameData.correct || 0);
    this.data.stats.totalQuestions = (this.data.stats.totalQuestions || 0) + (gameData.total || 0);

    if (gameData.mode) {
      this.data.stats.modeUsage[gameData.mode] = (this.data.stats.modeUsage[gameData.mode] || 0) + 1;
    }

    if (gameData.country) {
      this.data.stats.countryUsage[gameData.country] = (this.data.stats.countryUsage[gameData.country] || 0) + 1;
    }

    // 3 XP per correct answer + 5 XP per finished round
    const xpGain = (gameData.correct || 0) * 3 + 5;
    this.addXP(xpGain, "Spiel beendet");

    // Check & update daily streak (Duolingo-style)
    const todayStr = new Date().toISOString().split('T')[0];
    if (!this.data.streak) {
      this.data.streak = { count: 1, lastPlayDate: "", highest: 1 };
    }

    let lastFlameDate = "";
    if (typeof safeLocalStorage !== 'undefined') {
      lastFlameDate = safeLocalStorage.getItem('flame_streak_shown_date') || "";
    } else {
      try { lastFlameDate = localStorage.getItem('flame_streak_shown_date') || ""; } catch(e){}
    }

    let isFirstGameOfDay = (lastFlameDate !== todayStr);

    if (this.data.streak.lastPlayDate !== todayStr) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (this.data.streak.lastPlayDate === yesterday) {
        this.data.streak.count = (this.data.streak.count || 0) + 1;
      } else {
        this.data.streak.count = 1;
      }
      this.data.streak.lastPlayDate = todayStr;
      this.data.streak.highest = Math.max(this.data.streak.highest || 1, this.data.streak.count);
    }
    if (!this.data.streak.count || this.data.streak.count < 1) this.data.streak.count = 1;

    this.save();

    if (isFirstGameOfDay) {
      if (typeof safeLocalStorage !== 'undefined') {
        safeLocalStorage.setItem('flame_streak_shown_date', todayStr);
      } else {
        try { localStorage.setItem('flame_streak_shown_date', todayStr); } catch(e){}
      }
      setTimeout(() => {
        this.showFlameStreakModal(this.data.streak.count || 1);
      }, 500);
    } else {
      this.checkPromptSaveProgress();
    }
  },

  /**
   * Save to Local Storage and Firestore
   */
  save: function() {
    this.saveToLocal();
    this.saveToFirestore();
  },

  saveToLocal: function() {
    if (typeof safeLocalStorage !== 'undefined') {
      safeLocalStorage.setItem('eu_user_profile', JSON.stringify(this.data));
    } else {
      try { localStorage.setItem('eu_user_profile', JSON.stringify(this.data)); } catch(e){}
    }
  },

  loadFromLocal: function() {
    let raw = null;
    if (typeof safeLocalStorage !== 'undefined') {
      raw = safeLocalStorage.getItem('eu_user_profile');
    } else {
      try { raw = localStorage.getItem('eu_user_profile'); } catch(e){}
    }

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.data = {
          ...this.data,
          ...parsed,
          stats: {
            ...this.data.stats,
            ...(parsed.stats || {})
          }
        };
        this.data.level = this.calculateLevel(this.data.xp);
        if (!this.data.avatar || !this.data.avatar.startsWith('assets/')) {
          this.data.avatar = 'assets/avatars/diplomat_female.jpg';
        }
        // Enforce max 15 chars on local load
        this.data.nickname = (this.data.nickname || 'EU-Entdecker').replace(/<[^>]*>?/gm, '').trim().substring(0, 15);
      } catch (e) {
        console.error("Fehler beim Laden des lokalen Profils:", e);
      }
    }
  },

  /**
   * Safe Throttled & Debounced Firestore Saving to Prevent Overload
   */
  saveToFirestore: function() {
    if (!this.db || !this.uid) return;

    const payload = {
      nickname: (this.data.nickname || 'EU-Entdecker').replace(/<[^>]*>?/gm, '').trim().substring(0, 15),
      avatar: this.data.avatar,
      xp: Number(this.data.xp) || 0,
      level: Number(this.data.level) || 1,
      stats: this.data.stats || {},
      achievements: this.data.achievements || []
    };

    const payloadJSON = JSON.stringify(payload);

    // Skip network request if data has not changed
    if (payloadJSON === this.lastSavedDataJSON) {
      return;
    }

    const now = Date.now();
    const timeSinceLastSave = now - this.lastFirestoreSaveTime;
    const MIN_SAVE_INTERVAL_MS = 5000; // Rate limit: Max 1 write per 5 seconds

    if (timeSinceLastSave < MIN_SAVE_INTERVAL_MS) {
      if (!this.firestoreSaveTimer) {
        const remainingMs = MIN_SAVE_INTERVAL_MS - timeSinceLastSave;
        this.firestoreSaveTimer = setTimeout(() => {
          this.firestoreSaveTimer = null;
          this.saveToFirestore();
        }, remainingMs);
      }
      return;
    }

    this.lastFirestoreSaveTime = now;
    this.lastSavedDataJSON = payloadJSON;

    this.db.collection('users').doc(this.uid).set({
      ...payload,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(err => {
      console.warn("Firestore Speicherhinweis:", err);
    });
  },

  /**
   * Set Avatar
   */
  setAvatar: function(icon) {
    this.data.avatar = icon;
    this.save();
    this.renderTopBar();
    this.renderEuropapass();
  },

  /**
   * Set Nickname (Max 15 characters, XSS sanitized)
   */
  setNickname: function(name) {
    if (!name) return;
    const cleanName = String(name).replace(/<[^>]*>?/gm, '').trim();
    if (!cleanName) return;
    this.data.nickname = cleanName.substring(0, 15);
    this.save();
    this.renderTopBar();
    this.renderEuropapass();
  },

  /**
   * Render Top Bar Badge & XP Progress
   */
  renderTopBar: function() {
    const badgeEl = document.getElementById('user-profile-top-badge');
    if (!badgeEl) return;

    const currentLvl = this.calculateLevel(this.data.xp);
    const minXP = this.getMinXPForLevel(currentLvl);
    const maxXP = this.getMaxXPForLevel(currentLvl);
    const currentLevelProgressXP = this.data.xp - minXP;
    const levelNeededXP = maxXP - minXP;
    const pct = Math.min(100, Math.max(0, Math.floor((currentLevelProgressXP / levelNeededXP) * 100)));

    const avatarHTML = this.getAvatarHTML(this.data.avatar, '38px');

    badgeEl.innerHTML = `
      <div class="user-badge-btn" id="user-badge-inner-btn" title="Persönlichen Europapass öffnen" style="cursor: pointer;">
        <div style="width: 38px; height: 38px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(0,188,212,0.15); border: 1.5px solid var(--accent);">
          ${avatarHTML}
        </div>
        <div class="user-badge-info">
          <span class="user-badge-name">${this.escapeHTML(this.data.nickname)}</span>
          <span class="user-badge-level">Lvl ${currentLvl} • ${this.data.xp} XP</span>
          <div class="user-badge-xp-bar"><div class="user-badge-xp-fill" style="width: ${pct}%;"></div></div>
        </div>
      </div>
    `;

    badgeEl.onclick = (e) => {
      if (e) e.stopPropagation();
      this.openEuropapassModal();
    };
  },

  /**
   * Render Europapass Modal Content
   */
  renderEuropapass: function() {
    const content = document.getElementById('europapass-modal-body');
    if (!content) return;

    const currentLvl = this.calculateLevel(this.data.xp);
    const minXP = this.getMinXPForLevel(currentLvl);
    const maxXP = this.getMaxXPForLevel(currentLvl);
    const progressXP = this.data.xp - minXP;
    const totalReqXP = maxXP - minXP;
    const pct = Math.min(100, Math.max(0, Math.floor((progressXP / totalReqXP) * 100)));

    // Calculate Favorite Country
    let favCountry = "Keines";
    let maxCUsage = 0;
    Object.entries(this.data.stats.countryUsage || {}).forEach(([c, count]) => {
      if (count > maxCUsage) { maxCUsage = count; favCountry = c; }
    });

    // Calculate Favorite Mode
    let favMode = "Keiner";
    let maxMUsage = 0;
    const modeNames = {
      campaign: "Europareise 🗺️",
      singleplayer: "Einzelspieler 🎯",
      multiplayer: "Mehrspieler 👥",
      timeattack: "Zeit-Challenge ⏱️",
      suddendeath: "Sudden Death ⚡",
      duel: "1v1 Duell ⚔️"
    };
    Object.entries(this.data.stats.modeUsage || {}).forEach(([m, count]) => {
      if (count > maxMUsage) { maxMUsage = count; favMode = modeNames[m] || m; }
    });

    // Accuracy
    const totalQ = this.data.stats.totalQuestions || 0;
    const correctQ = this.data.stats.correctAnswers || 0;
    const accuracyPct = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;

    // Playtime formatted
    const totalSecs = this.data.stats.playTimeSeconds || 0;
    const mins = Math.floor(totalSecs / 60);
    const hours = (mins / 60).toFixed(1);
    const playTimeStr = mins < 60 ? `${mins} Min.` : `${hours} Std.`;

    // Avatars HTML (3D Renders & Emojis)
    const avatarGridHTML = this.avatars.map(a => {
      const isSelected = this.data.avatar === a.icon;
      const innerContent = a.isImg 
        ? `<img src="${a.icon}" alt="${a.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`
        : `<span style="font-size: 2.2rem; display:flex; align-items:center; justify-content:center;">${a.icon}</span>`;

      return `
        <button class="avatar-option-btn ${isSelected ? 'active' : ''}" 
                onclick="UserProfile.setAvatar('${a.icon}')" 
                title="${a.name}">
          ${innerContent}
        </button>
      `;
    }).join('');

    // Check Auth Status
    const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    const isAnon = !currentUser || currentUser.isAnonymous;
    const userEmail = currentUser && currentUser.email ? currentUser.email : null;

    const authBannerHTML = isAnon ? `
      <div class="account-status-card anon">
        <div style="font-size: 0.95rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(234, 179, 8, 0.2); border: 1px solid rgba(234, 179, 8, 0.4); padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; color: #eab308; font-weight: 800;">⚡ GAST-MODUS</span>
            <span>Fortschritt sichern</span>
          </span>
          <span style="font-size: 0.8rem; opacity: 0.7;">Geräte-Lokal</span>
        </div>
        <p style="font-size: 0.82rem; opacity: 0.85; margin: 0 0 14px 0; line-height: 1.45;">
          Deine XP (<strong style="color: var(--accent);">${this.data.xp} XP</strong>) & Erfolge sind bisher nur auf diesem Browser gespeichert. Verknüpfe dein Konto, um überall darauf zuzugreifen!
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <button class="google-auth-btn-official" onclick="UserProfile.signInWithGoogle()" style="flex: 1; min-width: 200px; padding: 10px 16px; border-radius: 14px; font-weight: 700;">
            <svg width="20" height="20" viewBox="0 0 24 24" style="margin-right: 10px; flex-shrink: 0;">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Mit Google anmelden</span>
          </button>
          
          <button class="btn-main-sm" onclick="UserProfile.toggleAuthForm('signup')" style="background: linear-gradient(135deg, #3b82f6, #6366f1); border-radius: 14px; padding: 10px 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);">
            <span>✉️ E-Mail & Passwort</span>
          </button>
        </div>
      </div>
    ` : `
      <div class="account-status-card authed">
        <div style="font-size: 0.95rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.4); padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; color: #22c55e; font-weight: 800;">🟢 CLOUD-KONTO AKTIV</span>
          </span>
          <span style="font-size: 0.8rem; opacity: 0.7;">Synchronisiert</span>
        </div>
        <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 12px;">Angemeldet als: <strong style="color: var(--accent);">${this.escapeHTML(userEmail)}</strong></div>
        <button class="btn-main-sm" onclick="UserProfile.signOutUser()" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: var(--error); border-radius: 12px; padding: 8px 16px; font-weight: 700;">Abmelden</button>
      </div>
    `;

    content.innerHTML = `
      <!-- Account Status Banner -->
      ${authBannerHTML}

      <!-- Auth Form Box (Modernized) -->
      <div id="europapass-auth-box" class="europapass-section" style="display: none; background: rgba(255,255,255,0.03); border: 1.5px solid var(--card-border); padding: 22px; border-radius: 20px; margin-top: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.12); backdrop-filter: blur(10px);">
        <div style="display: flex; background: rgba(0,0,0,0.15); padding: 4px; border-radius: 14px; margin-bottom: 18px; border: 1px solid var(--card-border);">
          <button class="auth-tab-btn active" id="auth-tab-signup" onclick="UserProfile.switchAuthTab('signup')" style="flex: 1; padding: 10px; border-radius: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s ease;">✨ Konto erstellen</button>
          <button class="auth-tab-btn" id="auth-tab-login" onclick="UserProfile.switchAuthTab('login')" style="flex: 1; padding: 10px; border-radius: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s ease;">🔑 Anmelden</button>
        </div>

        <div id="auth-form-signup">
          <p style="font-size: 0.88rem; opacity: 0.85; margin-top: 0; margin-bottom: 16px; line-height: 1.45;">Sichere deinen aktuellen Fortschritt (<strong style="color:var(--accent);">${this.data.xp} XP</strong>, Level ${currentLvl}) dauerhaft mit E-Mail & Passwort:</p>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="position: relative;">
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.6; font-size: 1.1rem;">✉️</span>
              <input type="email" id="auth-email-signup" placeholder="Deine E-Mail-Adresse" class="auth-input-field" style="width: 100%; padding: 12px 14px 12px 44px; border-radius: 14px; border: 1.5px solid var(--card-border); background: var(--bg-solid); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.2s ease; box-sizing: border-box;">
            </div>

            <div style="position: relative;">
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.6; font-size: 1.1rem;">🔒</span>
              <input type="password" id="auth-pass-signup" placeholder="Passwort (mind. 6 Zeichen)" class="auth-input-field" style="width: 100%; padding: 12px 14px 12px 44px; border-radius: 14px; border: 1.5px solid var(--card-border); background: var(--bg-solid); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.2s ease; box-sizing: border-box;">
            </div>

            <div id="auth-signup-err" class="auth-err-msg" style="display:none; padding: 10px 14px; border-radius: 12px; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--error); font-size: 0.85rem; font-weight: 600;"></div>
            
            <button class="btn-main" onclick="UserProfile.submitSignUp()" style="width: 100%; margin-top: 6px; padding: 13px; border-radius: 14px; background: linear-gradient(135deg, var(--accent), var(--accent-alt)); border: none; color: #fff; font-weight: 800; font-size: 0.95rem; box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35); cursor: pointer;">
              🚀 Fortschritt jetzt sichern
            </button>
          </div>
        </div>

        <div id="auth-form-login" style="display: none;">
          <p style="font-size: 0.88rem; opacity: 0.85; margin-top: 0; margin-bottom: 16px; line-height: 1.45;">Melde dich an, um deinen Europapass von einem anderen Gerät zu laden:</p>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="position: relative;">
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.6; font-size: 1.1rem;">✉️</span>
              <input type="email" id="auth-email-login" placeholder="Deine E-Mail-Adresse" class="auth-input-field" style="width: 100%; padding: 12px 14px 12px 44px; border-radius: 14px; border: 1.5px solid var(--card-border); background: var(--bg-solid); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.2s ease; box-sizing: border-box;">
            </div>

            <div style="position: relative;">
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); opacity: 0.6; font-size: 1.1rem;">🔑</span>
              <input type="password" id="auth-pass-login" placeholder="Dein Passwort" class="auth-input-field" style="width: 100%; padding: 12px 14px 12px 44px; border-radius: 14px; border: 1.5px solid var(--card-border); background: var(--bg-solid); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.2s ease; box-sizing: border-box;">
            </div>

            <div id="auth-login-err" class="auth-err-msg" style="display:none; padding: 10px 14px; border-radius: 12px; background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--error); font-size: 0.85rem; font-weight: 600;"></div>
            
            <button class="btn-main" onclick="UserProfile.submitSignIn()" style="width: 100%; margin-top: 6px; padding: 13px; border-radius: 14px; background: linear-gradient(135deg, #10b981, #059669); border: none; color: #fff; font-weight: 800; font-size: 0.95rem; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); cursor: pointer;">
              🔓 Anmelden
            </button>
          </div>
        </div>
      </div>

      <!-- Passport Header Card -->
      <div class="europapass-card" style="margin-top: 20px;">
        <div class="passport-header-banner">
          <div class="passport-title">🇪🇺 EUROPAPASS • REISEPASS</div>
          <div class="passport-subtitle">Europäische Union • Quiz Diplomaten-Pass</div>
        </div>

        <div class="passport-main">
          <div class="passport-avatar-box">
            <div style="width: 85px; height: 85px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(0,188,212,0.15); border: 3px solid var(--accent); box-shadow: 0 0 25px rgba(0,188,212,0.35);">
              ${this.getAvatarHTML(this.data.avatar, '85px')}
            </div>
            <span class="passport-level-pill">Level ${currentLvl}</span>
          </div>

          <div class="passport-details">
            <div class="passport-field">
              <label>NAME DES DIPLOMATEN</label>
              <div class="passport-name-edit">
                <input type="text" id="europapass-nickname-input" value="${this.escapeHTML(this.data.nickname)}" maxlength="15" placeholder="Max. 15 Zeichen">
                <button class="btn-main-sm" onclick="UserProfile.saveNicknameFromInput()">Speichern</button>
              </div>
            </div>

            <div class="passport-field" style="margin-top: 10px;">
              <label>ERFAHRUNG (XP & FORTSCHRITT)</label>
              <div class="passport-xp-status">
                <strong>${this.data.xp} XP</strong> <span style="opacity: 0.7;">(Noch ${maxXP - this.data.xp} XP bis Level ${currentLvl + 1})</span>
              </div>
              <div class="passport-xp-bar">
                <div class="passport-xp-fill" style="width: ${pct}%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Avatar Picker -->
      <div class="europapass-section">
        <h3>🎨 Wähle deinen Avatar</h3>
        <div class="avatar-selector-grid">
          ${avatarGridHTML}
        </div>
      </div>

      <!-- Statistics Dashboard Grid -->
      <div class="europapass-section">
        <h3>📊 Deine Quiz-Statistiken</h3>
        <div class="stats-grid">
          <div class="stat-tile" style="border: 1.5px solid rgba(249, 115, 22, 0.5); background: rgba(249, 115, 22, 0.12); box-shadow: 0 4px 14px rgba(249,115,22,0.15);">
            <div class="stat-icon" style="filter: drop-shadow(0 0 10px #f97316);">🔥</div>
            <div class="stat-val" style="color: #f97316; font-weight: 800;">${(this.data.streak && this.data.streak.count) || 0} Tage</div>
            <div class="stat-lbl">Tages-Streak (Rekord: ${(this.data.streak && this.data.streak.highest) || 0})</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">🎮</div>
            <div class="stat-val">${this.data.stats.gamesPlayed || 0}</div>
            <div class="stat-lbl">Gespielte Runden</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">🎯</div>
            <div class="stat-val">${accuracyPct}%</div>
            <div class="stat-lbl">Richtig-Quote (${correctQ}/${totalQ})</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">⏱️</div>
            <div class="stat-val">${playTimeStr}</div>
            <div class="stat-lbl">Gesamte Spielzeit</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">🏆</div>
            <div class="stat-val">${(this.data.achievements || []).length}</div>
            <div class="stat-lbl">Freigeschaltete Erfolge</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">🌍</div>
            <div class="stat-val" style="font-size: 1.1rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${favCountry}</div>
            <div class="stat-lbl">Lieblingsland</div>
          </div>

          <div class="stat-tile">
            <div class="stat-icon">⚡</div>
            <div class="stat-val" style="font-size: 1.1rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${favMode}</div>
            <div class="stat-lbl">Lieblingsmodus</div>
          </div>
        </div>
      </div>
    `;
  },

  showFlameStreakModal: function(count) {
    const modal = document.getElementById('flame-streak-modal');
    if (!modal) return;
    const body = document.getElementById('flame-streak-modal-body');
    if (body) {
      body.innerHTML = `
        <div class="streak-flame-hero">
          <div class="flame-backdrop-glow"></div>
          <div class="flame-sparks-container">
            <span class="spark s1"></span>
            <span class="spark s2"></span>
            <span class="spark s3"></span>
            <span class="spark s4"></span>
            <span class="spark s5"></span>
          </div>
          <div class="flame-svg-wrapper">
            <svg class="flame-svg" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="flameOuterGrad" x1="50" y1="130" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#c2410c"/>
                  <stop offset="35%" stop-color="#ea580c"/>
                  <stop offset="70%" stop-color="#f97316"/>
                  <stop offset="100%" stop-color="#fbbf24"/>
                </linearGradient>
                <linearGradient id="flameInnerGrad" x1="50" y1="110" x2="50" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#ea580c"/>
                  <stop offset="50%" stop-color="#fbbf24"/>
                  <stop offset="100%" stop-color="#ffffff"/>
                </linearGradient>
                <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>

              <!-- Outer Flame Layer -->
              <path class="flame-layer outer" fill="url(#flameOuterGrad)" filter="url(#flameGlow)"
                d="M50 0 C65 25 88 45 88 80 C88 107 71 125 50 125 C29 125 12 107 12 80 C12 45 35 25 50 0 Z" />
              
              <!-- Left Flame Tongue -->
              <path class="flame-layer tongue-left" fill="url(#flameOuterGrad)" opacity="0.9"
                d="M50 15 C60 35 75 50 75 75 C75 95 62 110 45 112 C28 114 22 95 32 70 C38 55 42 30 50 15 Z" />

              <!-- Right Flame Tongue -->
              <path class="flame-layer tongue-right" fill="url(#flameOuterGrad)" opacity="0.9"
                d="M50 10 C68 30 78 52 70 82 C65 102 48 112 48 112 C68 100 70 75 58 55 C50 40 45 25 50 10 Z" />

              <!-- Inner Flame Layer -->
              <path class="flame-layer inner" fill="url(#flameInnerGrad)"
                d="M50 35 C60 52 70 68 70 90 C70 108 61 118 50 118 C39 118 30 108 30 90 C30 68 40 52 50 35 Z" />

              <!-- Hot Core -->
              <path class="flame-layer core" fill="#ffffff"
                d="M50 60 C56 72 62 82 62 96 C62 108 57 114 50 114 C43 114 38 108 38 96 C38 82 44 72 50 60 Z" />
            </svg>
          </div>
        </div>

        <div class="streak-text-reveal">
          <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.3rem; color: #f97316; margin: 0 0 6px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);">
            ${count}-TAGES STREAK!
          </h2>
          <p style="font-size: 0.98rem; font-weight: 700; color: #fdba74; margin: 0 0 14px 0;">
            Du hast dein tägliches EU-Quiz absolviert! 🔥
          </p>
          <p style="font-size: 0.88rem; opacity: 0.9; margin: 0 0 24px 0; line-height: 1.5; color: var(--text-primary);">
            Komm morgen wieder zurück, um deine Flamme weiter brennen zu lassen und deinen persönlichen Tages-Rekord zu brechen!
          </p>
          <button class="btn-main" onclick="UserProfile.closeFlameStreakModal()" style="width: 100%; background: linear-gradient(135deg, #f97316, #ea580c); border-color: #f97316; color: #fff; font-weight: 800; border-radius: 14px; padding: 14px; font-size: 1.05rem; box-shadow: 0 6px 22px rgba(249,115,22,0.45); cursor: pointer;">
            Weiter spielen 🔥
          </button>
        </div>
      `;
    }

    if (typeof sounds !== 'undefined' && sounds.playFanfare) {
      try { sounds.playFanfare(); } catch(e){}
    }

    modal.style.display = 'flex';
    modal.style.zIndex = '99999';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';

    const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');
    if (panel) {
      panel.style.opacity = '1';
      panel.style.visibility = 'visible';
    }

    if (btn && panel) {
      try {
        const btnRect = btn.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        if (panelRect.width > 0 && panelRect.height > 0) {
          const clickX = btnRect.left + (btnRect.width / 2);
          const clickY = btnRect.top + (btnRect.height / 2);
          const relX = clickX - panelRect.left;
          const relY = clickY - panelRect.top;
          if (!isNaN(relX) && !isNaN(relY)) {
            panel.style.transformOrigin = `${relX}px ${relY}px`;
          }
        }
      } catch(e) {}
    }

    modal.classList.remove('cc-overlay-animate-out');
    modal.classList.add('cc-overlay-animate-in');
    if (panel) {
      panel.classList.remove('cc-panel-zoom-out');
      panel.classList.add('cc-panel-zoom-in');
    }
  },

  closeFlameStreakModal: function() {
    if (typeof sounds !== 'undefined' && sounds.playClick) {
      try { sounds.playClick(); } catch(e){}
    }
    const modal = document.getElementById('flame-streak-modal');
    if (!modal) return;
    const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');
    modal.classList.remove('cc-overlay-animate-in');
    modal.classList.add('cc-overlay-animate-out');
    if (panel) {
      panel.classList.remove('cc-panel-zoom-in');
      panel.classList.add('cc-panel-zoom-out');
    }
    setTimeout(() => {
      modal.style.display = 'none';
      this.checkPromptSaveProgress();
    }, 280);
  },

  saveNicknameFromInput: function() {
    const input = document.getElementById('europapass-nickname-input');
    const btn = document.querySelector('.passport-name-edit button');
    if (input && input.value) {
      this.setNickname(input.value);
      if (btn) {
        const origText = btn.innerText;
        btn.innerText = '✓ Gespeichert';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => {
          btn.innerText = origText;
          btn.style.background = '';
        }, 1500);
      }
    }
  },

  openEuropapassModal: function() {
    if (typeof sounds !== 'undefined' && sounds.playClick) {
      try { sounds.playClick(); } catch (e) {}
    }
    try {
      this.renderEuropapass();
    } catch (e) {
      console.warn("Europapass render error:", e);
    }

    const modal = document.getElementById('europapass-modal');
    if (modal) {
      const btn = document.getElementById('user-profile-top-badge') || document.querySelector('.user-badge-btn');
      const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');

      if (btn && panel) {
        const btnRect = btn.getBoundingClientRect();
        modal.style.display = 'flex';
        const panelRect = panel.getBoundingClientRect();

        const clickX = btnRect.left + (btnRect.width / 2);
        const clickY = btnRect.top + (btnRect.height / 2);

        const relX = clickX - panelRect.left;
        const relY = clickY - panelRect.top;

        panel.style.transformOrigin = `${relX}px ${relY}px`;
      } else {
        modal.style.display = 'flex';
      }

      modal.classList.remove('cc-overlay-animate-out');
      modal.classList.add('cc-overlay-animate-in');

      if (panel) {
        panel.classList.remove('cc-panel-zoom-out');
        panel.classList.add('cc-panel-zoom-in');
      }
    }
  },

  closeEuropapassModal: function() {
    if (typeof sounds !== 'undefined' && sounds.playClick) {
      try { sounds.playClick(); } catch (e) {}
    }

    const modal = document.getElementById('europapass-modal');
    if (modal) {
      const btn = document.getElementById('user-profile-top-badge') || document.querySelector('.user-badge-btn');
      const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');

      if (btn && panel) {
        const btnRect = btn.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();

        const clickX = btnRect.left + (btnRect.width / 2);
        const clickY = btnRect.top + (btnRect.height / 2);

        const relX = clickX - panelRect.left;
        const relY = clickY - panelRect.top;

        panel.style.transformOrigin = `${relX}px ${relY}px`;
      }

      modal.classList.remove('cc-overlay-animate-in');
      modal.classList.add('cc-overlay-animate-out');

      if (panel) {
        panel.classList.remove('cc-panel-zoom-in');
        panel.classList.add('cc-panel-zoom-out');
      }

      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('cc-overlay-animate-out');
        if (panel) panel.classList.remove('cc-panel-zoom-out');
      }, 300);
    }
  },

  isAnonymous: function() {
    const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    return !currentUser || currentUser.isAnonymous;
  },

  hasShownSavePromptSession: false,

  checkPromptSaveProgress: function() {
    // Show prompt if user is an anonymous guest (not logged in via Google/Email)
    if (!this.isAnonymous()) return;

    setTimeout(() => {
      this.openSaveProgressModal();
    }, 800);
  },

  checkInitialAuthPrompt: function() {
    // Legacy helper kept empty to avoid auto-blocking post-game prompt on page load
  },

  openSaveProgressModal: function() {
    const modal = document.getElementById('save-progress-modal');
    if (!modal) return;

    const currentLvl = this.calculateLevel(this.data.xp);
    const body = document.getElementById('save-progress-modal-body');
    if (body) {
      body.innerHTML = `
        <div style="font-size: 3.2rem; margin-bottom: 8px;">🏆</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; color: var(--accent); margin: 0 0 8px 0; font-size: 1.6rem; font-weight: 700;">Toll gespielt!</h2>
        <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin: 0 0 12px 0;">
          Sichere deinen Fortschritt jetzt dauerhaft!
        </p>
        <p style="font-size: 0.83rem; opacity: 0.8; margin: 0 0 22px 0; line-height: 1.45;">
          Du hast bereits <strong style="color:var(--accent);">${this.data.xp} XP</strong> (Level ${currentLvl}) gesammelt. Als Gast bleiben deine Daten nur auf diesem Gerät. Erstelle ein Konto oder melde dich mit Google an, um deinen Europapass & deine Erfolge überall zu nutzen!
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px; align-items: center; width: 100%;">
          <button class="google-auth-btn-official" onclick="UserProfile.closeSaveProgressModal(); UserProfile.signInWithGoogle();" style="width: 100%; padding: 12px 18px; border-radius: 14px; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
            <svg width="20" height="20" viewBox="0 0 24 24" style="margin-right: 10px; flex-shrink: 0;">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Mit Google anmelden</span>
          </button>

          <button class="btn-main-sm" onclick="UserProfile.closeSaveProgressModal(); UserProfile.openEuropapassModal(); UserProfile.toggleAuthForm('signup');" style="width: 100%; padding: 12px; border-radius: 14px; font-weight: 600; background: rgba(255,255,255,0.06); border: 1px solid var(--card-border); color: var(--text-primary); display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>🔐 E-Mail & Passwort wählen</span>
          </button>

          <button onclick="UserProfile.closeSaveProgressModal()" style="background: none; border: none; color: var(--text-secondary); font-size: 0.8rem; cursor: pointer; margin-top: 6px; opacity: 0.6; text-decoration: underline;">
            Später (weiter als Gast spielen)
          </button>
        </div>
      `;
    }

    if (typeof sounds !== 'undefined' && sounds.playClick) {
      try { sounds.playClick(); } catch (e) {}
    }

    modal.style.display = 'flex';
    modal.style.zIndex = '99999';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';

    const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');
    if (panel) {
      panel.style.opacity = '1';
      panel.style.visibility = 'visible';
    }

    if (btn && panel) {
      try {
        const btnRect = btn.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        if (panelRect.width > 0 && panelRect.height > 0) {
          const clickX = btnRect.left + (btnRect.width / 2);
          const clickY = btnRect.top + (btnRect.height / 2);
          const relX = clickX - panelRect.left;
          const relY = clickY - panelRect.top;
          if (!isNaN(relX) && !isNaN(relY)) {
            panel.style.transformOrigin = `${relX}px ${relY}px`;
          }
        }
      } catch(e) {}
    }

    modal.classList.remove('cc-overlay-animate-out');
    modal.classList.add('cc-overlay-animate-in');
    if (panel) {
      panel.classList.remove('cc-panel-zoom-out');
      panel.classList.add('cc-panel-zoom-in');
    }
  },

  closeSaveProgressModal: function() {
    if (typeof sounds !== 'undefined' && sounds.playClick) {
      try { sounds.playClick(); } catch (e) {}
    }
    const modal = document.getElementById('save-progress-modal');
    if (modal) {
      modal.classList.remove('cc-overlay-animate-in');
      modal.classList.add('cc-overlay-animate-out');
      const panel = modal.querySelector('.control-center-panel') || modal.querySelector('.europapass-modal-box');
      if (panel) {
        panel.classList.remove('cc-panel-zoom-in');
        panel.classList.add('cc-panel-zoom-out');
      }
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  },

  showLevelUpModal: function(newLvl) {
    if (typeof sounds !== 'undefined' && sounds.playSuccess) sounds.playSuccess();
    if (typeof ConfettiCelebration !== 'undefined') {
      const c = new ConfettiCelebration('celebration-canvas');
      c.start();
      setTimeout(() => c.stop(), 3500);
    }

    const popup = document.createElement('div');
    popup.className = 'level-up-overlay dialog-zoom-in';
    popup.innerHTML = `
      <div class="level-up-card">
        <div style="font-size: 3.5rem; margin-bottom: 10px;">🌟 LEVEL UP! 🌟</div>
        <h2 style="margin: 0; font-size: 2rem; color: var(--accent);">Level ${newLvl} erreicht!</h2>
        <p style="opacity: 0.8; margin: 15px 0 25px;">Glückwunsch! Du bist jetzt ein höherrangiger EU-Diplomat.</p>
        <button class="btn-main" onclick="this.parentElement.parentElement.remove()" style="padding: 12px 30px; font-weight: 700;">Weiter geht's!</button>
      </div>
    `;
    document.body.appendChild(popup);
  },

  showXPToast: function(text) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast-msg';
    toast.innerText = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  },

  toggleAuthForm: function(type = 'signup') {
    const box = document.getElementById('europapass-auth-box');
    if (box) {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
      if (box.style.display === 'block') {
        this.switchAuthTab(type);
      }
    }
  },

  switchAuthTab: function(tab) {
    const signupForm = document.getElementById('auth-form-signup');
    const loginForm = document.getElementById('auth-form-login');
    const signupTabBtn = document.getElementById('auth-tab-signup');
    const loginTabBtn = document.getElementById('auth-tab-login');

    if (tab === 'signup') {
      if (signupForm) signupForm.style.display = 'block';
      if (loginForm) loginForm.style.display = 'none';
      if (signupTabBtn) signupTabBtn.classList.add('active');
      if (loginTabBtn) loginTabBtn.classList.remove('active');
    } else {
      if (signupForm) signupForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
      if (signupTabBtn) signupTabBtn.classList.remove('active');
      if (loginTabBtn) loginTabBtn.classList.add('active');
    }
  },

  submitSignUp: function() {
    const email = (document.getElementById('auth-email-signup') || {}).value;
    const pass = (document.getElementById('auth-pass-signup') || {}).value;
    const errEl = document.getElementById('auth-signup-err');

    if (errEl) errEl.style.display = 'none';

    if (!email || !email.includes('@')) {
      if (errEl) { errEl.innerText = "Bitte gib eine gültige E-Mail-Adresse ein."; errEl.style.display = 'block'; }
      return;
    }
    if (!pass || pass.length < 6) {
      if (errEl) { errEl.innerText = "Das Passwort muss mindestens 6 Zeichen lang sein."; errEl.style.display = 'block'; }
      return;
    }

    if (typeof firebase === 'undefined' || !firebase.auth) {
      if (errEl) { errEl.innerText = "Firebase Auth ist nicht geladen."; errEl.style.display = 'block'; }
      return;
    }

    const currentUser = firebase.auth().currentUser;

    // Account Linking if currently anonymous
    if (currentUser && currentUser.isAnonymous) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, pass);
      currentUser.linkWithCredential(credential).then(userCred => {
        this.showXPToast("🔐 Konto erfolgreich mit E-Mail gesichert!");
        this.saveToFirestore();
        this.renderTopBar();
        this.renderEuropapass();
      }).catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          // If email exists, offer to sign in instead
          if (errEl) { errEl.innerText = "Diese E-Mail-Adresse existiert bereits. Bitte nutze den Reiter 'Anmelden'."; errEl.style.display = 'block'; }
        } else {
          if (errEl) { errEl.innerText = err.message || "Fehler beim Erstellen des Kontos."; errEl.style.display = 'block'; }
        }
      });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(userCred => {
        this.showXPToast("🎉 Konto erfolgreich erstellt!");
        this.uid = userCred.user.uid;
        this.saveToFirestore();
        this.renderTopBar();
        this.renderEuropapass();
      }).catch(err => {
        if (errEl) { errEl.innerText = err.message || "Fehler beim Registrieren."; errEl.style.display = 'block'; }
      });
    }
  },

  submitSignIn: function() {
    const email = (document.getElementById('auth-email-login') || {}).value;
    const pass = (document.getElementById('auth-pass-login') || {}).value;
    const errEl = document.getElementById('auth-login-err');

    if (errEl) errEl.style.display = 'none';

    if (!email || !pass) {
      if (errEl) { errEl.innerText = "Bitte gib E-Mail und Passwort ein."; errEl.style.display = 'block'; }
      return;
    }

    if (typeof firebase === 'undefined' || !firebase.auth) {
      if (errEl) { errEl.innerText = "Firebase Auth nicht geladen."; errEl.style.display = 'block'; }
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, pass).then(userCred => {
      this.showXPToast("👋 Willkommen zurück!");
      this.uid = userCred.user.uid;
      this.initFirestore();
      this.renderTopBar();
      this.renderEuropapass();
    }).catch(err => {
      if (errEl) { errEl.innerText = "E-Mail oder Passwort falsch."; errEl.style.display = 'block'; }
    });
  },

  signInWithGoogle: function() {
    if (typeof firebase === 'undefined' || !firebase.auth) {
      this.showXPToast("Firebase Auth nicht geladen");
      return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    const currentUser = firebase.auth().currentUser;

    const handleSuccess = (userCred) => {
      this.showXPToast("👋 Willkommen zurück!");
      this.uid = userCred.user.uid;
      this.initFirestore();
      this.renderTopBar();
      this.renderEuropapass();
    };

    const handleError = (err) => {
      console.warn("Google Auth Fehler:", err.code, err.message);
      if (err.code === 'auth/popup-blocked') {
        this.showXPToast("⚠️ Popup blockiert! Bitte Popups in Safari erlauben.");
      } else if (err.code === 'auth/operation-not-allowed') {
        this.showXPToast("⚠️ Google Login in Firebase Console nicht aktiviert.");
      } else if (err.code === 'auth/unauthorized-domain') {
        this.showXPToast("⚠️ Domain in Firebase Console nicht autorisiert.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        // User closed popup window manually
      } else {
        this.showXPToast("Google Hinweis: " + (err.message || err.code));
      }
    };

    if (currentUser && currentUser.isAnonymous) {
      currentUser.linkWithPopup(provider).then(userCred => {
        this.showXPToast("🎉 Konto mit Google verknüpft!");
        this.uid = userCred.user.uid;
        this.saveToFirestore();
        this.renderTopBar();
        this.renderEuropapass();
      }).catch(err => {
        if (err.code === 'auth/credential-already-in-use' || err.code === 'auth/account-exists-with-different-credential') {
          firebase.auth().signInWithPopup(provider).then(handleSuccess).catch(handleError);
        } else {
          handleError(err);
        }
      });
    } else {
      firebase.auth().signInWithPopup(provider).then(handleSuccess).catch(handleError);
    }
  },

  signOutUser: function() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().signOut().then(() => {
        this.showXPToast("Abgemeldet");
        firebase.auth().signInAnonymously().then(() => {
          this.renderTopBar();
          this.renderEuropapass();
        });
      });
    }
  },

  escapeHTML: function(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};

// Global bindings for inline HTML event handlers
window.UserProfile = UserProfile;
window.openEuropapassModal = function() {
  UserProfile.openEuropapassModal();
};

// Initialize on load or immediately if DOM is ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  UserProfile.init();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    UserProfile.init();
  });
}
