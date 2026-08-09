function advanceFromSPInstructions() {
  try { sounds.playClick(); } catch (e) {}
  const instr = document.getElementById('instr-screen');
  if (instr) instr.style.display = 'none';
  const spInstr = document.getElementById('sp-instr-screen');
  if (spInstr) spInstr.style.display = 'none';

  if (gameMode === 'timeattack') {
    const timeSelect = document.getElementById('time-select-screen');
    if (timeSelect) timeSelect.style.display = 'flex';
  } else if (gameMode === 'flags') {
    if (typeof initFlagsGame === 'function') initFlagsGame();
  } else if (gameMode === 'suddendeath') {
    teams = [{
      name: "Spieler",
      score: 0,
      jokers: { fiftyFifty: 2, class: 0, rescue: 0, swap: 2, revive: 2 },
      tipsLeft: 2
    }];
    activeTeam = 0;
    if (typeof showCategorySelectForCurrentTeam === 'function') {
      showCategorySelectForCurrentTeam();
    } else if (typeof showCategorySelect === 'function') {
      showCategorySelect();
    }
  } else {
    if (typeof showCategorySelect === 'function') showCategorySelect();
  }
}

let timeAttackTeamDuration = 60;
function selectTimeAttackDuration(min) {
  sounds.playClick();
  timeAttackTeamDuration = min * 60;
  document.getElementById('time-select-screen').style.display = 'none';
  document.getElementById('setup-screen').style.display = 'flex';
  configureSetupScreenForSP();
}

function configureSetupScreenForSP() {
  document.getElementById('campaign-settings').style.display = 'none';
  
  const botToggleContainer = document.getElementById('setup-bot-toggle-container');
  if (botToggleContainer) {
    if (gameMode === 'timeattack' || gameMode === 'suddendeath') {
      botToggleContainer.style.display = 'none';
    } else {
      botToggleContainer.style.display = 'block';
    }
  }
  
  // reset bot checkbox
  document.getElementById('setup-enable-bot').checked = false;
  document.getElementById('setup-bot-settings-group').style.display = 'none';
  
  const container = document.getElementById('team-list-container');
  container.innerHTML = "";
  addTeamField();
}

function startSetupGame() {
  if (gameMode === 'campaign') {
    initGame();
  } else {
    initSPMultiplayerSetup();
  }
}

let playedCategories = new Set();

function initSPMultiplayerSetup() {
  sounds.init();
  if (typeof playedSessionQuestions !== 'undefined') playedSessionQuestions.clear();
  const inputs = document.querySelectorAll('.team-name-input');
  const err = document.getElementById('setup-err');
  err.style.display = 'none';
  
  teams = [];
  let namesSet = new Set();
  const maxAllowedTeams = 5;

  for (let i of inputs) {
    let val = i.value.trim();
    if (val === "") continue;
    if (val.length < 2 || namesSet.has(val.toLowerCase())) {
      err.innerText = "Namen prüfen (Mindestens 2 Zeichen, keine Dubletten)!";
      err.style.display = 'block';
      sounds.playError();
      return;
    }
    namesSet.add(val.toLowerCase());
    
    let jokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 0, revive: 0 };
    if (gameMode === 'suddendeath') {
      jokers = { fiftyFifty: 2, class: 0, rescue: 0, swap: 2, revive: 2 };
    }
    
    teams.push({
      name: val,
      score: 0,
      jokers: jokers,
      tipsLeft: 2
    });
  }
  
  if (teams.length < 1) { 
    err.innerText = "Mindestens 1 Team muss teilnehmen!"; 
    err.style.display = 'block'; 
    sounds.playError();
    return; 
  }
  
  let enableBot = document.getElementById('setup-enable-bot').checked;
  if (gameMode === 'timeattack' || gameMode === 'suddendeath') {
    enableBot = false;
  }
  if (enableBot) {
    const botDiff = document.getElementById('setup-bot-difficulty').value;
    let botJokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 0, revive: 0 };
    if (gameMode === 'suddendeath') {
      botJokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 2, revive: 2 };
    }
    teams.push({
      name: "🤖 Bot Klaus",
      score: 0,
      isBot: true,
      difficulty: botDiff,
      simulate: document.getElementById('setup-bot-simulate').checked,
      jokers: botJokers,
      tipsLeft: 2
    });
  }
  
  if (teams.length > maxAllowedTeams) {
    err.innerText = `Maximal ${maxAllowedTeams} Teams sind erlaubt!`;
    err.style.display = 'block';
    sounds.playError();
    if (enableBot) teams.pop();
    return;
  }

  sounds.playSuccess();
  document.getElementById('setup-screen').style.display = 'none';
  
  activeTeam = 0;
  playedCategories = new Set();
  playedVisualQuestions = new Set();
  
  startSPMultiplayerGame();
}

function startSPMultiplayerGame() {
  sounds.setMusicState('question');
  
  if (teams[activeTeam] && teams[activeTeam].isBot && teams[activeTeam].simulate) {
    simulateBotTurnInSP();
  } else {
    if (gameMode === 'flags') {
      spTurnActive = true;
      singlePlayerScore = 0;
      flagQuestionIndex = 0;
      currentStreak = 0;
      flagQuestions = generateVisualQuestionsList();
      openFlagsQuestion();
    } else {
      showCategorySelectForCurrentTeam();
    }
  }
}

function showCategorySelectForCurrentTeam() {
  document.getElementById('category-screen').style.display = 'flex';
  
  const sub = document.querySelector('#category-screen p');
  sub.innerHTML = `Team am Zug: <strong style="color:var(--accent); font-size:1.15rem;">${teams[activeTeam].name}</strong>. Wähle eine der verbleibenden Kategorien:`;
  
  const cards = document.querySelectorAll('#category-screen .category-card');
  cards.forEach((card, idx) => {
    const catNum = idx + 1;
    if (playedCategories.has(catNum)) {
      card.classList.add('card-disabled');
      card.style.pointerEvents = 'none';
      card.style.opacity = '0.2';
    } else {
      card.classList.remove('card-disabled');
      card.style.pointerEvents = (teams[activeTeam] && teams[activeTeam].isBot) ? 'none' : 'auto';
      card.style.opacity = '1';
    }
  });

  if (teams[activeTeam] && teams[activeTeam].isBot) {
    document.getElementById('category-screen').style.pointerEvents = 'none';
    let remaining = [];
    for (let i = 1; i <= 5; i++) {
      if (!playedCategories.has(i)) remaining.push(i);
    }
    if (remaining.length > 0) {
      const picked = remaining[Math.floor(Math.random() * remaining.length)];
      setTimeout(() => {
        selectCategory(picked);
        document.getElementById('category-screen').style.pointerEvents = 'auto';
      }, 2000);
    }
  } else {
    document.getElementById('category-screen').style.pointerEvents = 'auto';
  }
}

function advanceSPMultiplayerTurn() {
  if (activeTeam < teams.length - 1) {
    activeTeam++;
    if (teams[activeTeam].isBot && teams[activeTeam].simulate) {
      simulateBotTurnInSP();
    } else {
      showSPTurnTransitionOverlay();
    }
  } else {
    endSinglePlayerGame();
  }
}

function showSPTurnTransitionOverlay() {
  const dialog = document.getElementById('quiz-dialog');
  if (!dialog.open) {
    dialog.showModal();
  }
  
  document.getElementById('q-title').innerText = "Nächste Spielrunde";
  document.getElementById('txt-turn-info').innerText = "Turnier-Überleitung";
  document.getElementById('txt-turn-info').style.color = 'var(--accent)';
  
  document.getElementById('diff-buttons').style.display = 'none';
  document.getElementById('q-area').style.display = 'block';
  
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const standingsHTML = sorted.map((t, idx) => `
    <div style="display:flex; justify-content:space-between; padding:8px 12px; background:rgba(255,255,255,0.02); border:1px solid var(--card-border); border-radius:8px; margin-bottom:6px; font-size:0.85rem;">
      <span><strong>#${idx+1}</strong> ${t.name}</span>
      <span style="color:var(--accent); font-weight:800;">${t.score} PTS</span>
    </div>
  `).join('');

  document.getElementById('q-text').innerHTML = `
    <div style="margin-top: 10px; margin-bottom: 25px; text-align: left;">
      <h4 style="margin-top:0; color:var(--gold); font-family:'Space Grotesk',sans-serif; font-size:1rem; font-weight:700; border-bottom:1px solid var(--card-border); padding-bottom:6px; margin-bottom:12px;">🏆 Zwischenstand</h4>
      ${standingsHTML}
    </div>
    <div style="text-align:center; font-weight:bold; color:var(--text-primary); font-size:1.1rem;">
      Als nächstes am Zug: <strong style="color:var(--accent);">${teams[activeTeam].name}</strong>
    </div>
  `;

  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('txt-cancel').style.display = 'none';
  document.getElementById('class-joker-container').style.display = 'none';
  document.getElementById('risk-container').style.display = 'none';
  document.getElementById('q-explanation').style.display = 'none';
  document.getElementById('timer-bar-container').style.display = 'none';
  document.getElementById('joker-arsenal').style.display = 'none';
  document.getElementById('revive-btn').style.display = 'none';
  
  document.getElementById('options-container').innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <p style="margin-bottom: 25px; font-weight: 700; font-size:1.1rem; color:var(--text-primary);">
        Bereit machen für deine Quizrunde!
      </p>
      <button class="btn-main" style="width: 100%; padding: 15px; font-weight:800;" onclick="startNextTeamTurn()">
        Spielrunde starten
      </button>
    </div>
  `;
}

function startNextTeamTurn() {
  sounds.playClick();
  document.getElementById('quiz-dialog').close();
  
  if (gameMode === 'flags') {
    spTurnActive = true;
    singlePlayerScore = 0;
    flagQuestionIndex = 0;
    currentStreak = 0;
    flagQuestions = generateVisualQuestionsList();
    openFlagsQuestion();
  } else {
    showCategorySelectForCurrentTeam();
  }
}

function prepareRapidFireQuestions(catNum) {
  let list = [];
  countries.forEach(c => {
    const countryName = c.n;
    let countryQuestions = (pool[catNum] && pool[catNum][countryName]) ? pool[catNum][countryName] : null;
    if (!countryQuestions && catNum !== 1) {
      countryQuestions = (pool[1] && pool[1][countryName]) ? pool[1][countryName] : null;
    }
    if (countryQuestions) {
      for (let lvl in countryQuestions) {
        let qObj = countryQuestions[lvl];
        if (Array.isArray(qObj)) {
          qObj.forEach(q => list.push({ ...q, country: countryName, lvl: parseInt(lvl) }));
        } else {
          list.push({ ...qObj, country: countryName, lvl: parseInt(lvl) });
        }
      }
    }
  });
  
  let available = list;
  if (typeof playedSessionQuestions !== 'undefined') {
    available = list.filter(q => !playedSessionQuestions.has(q.q));
    if (available.length === 0) available = list;
  }
  
  // Balanced sequence: interleave Level 1, 2, 3, 1, 2, 3...
  let lvl1 = available.filter(q => q.lvl === 1).sort(() => Math.random() - 0.5);
  let lvl2 = available.filter(q => q.lvl === 2).sort(() => Math.random() - 0.5);
  let lvl3 = available.filter(q => q.lvl === 3).sort(() => Math.random() - 0.5);
  
  let interleaved = [];
  let maxLen = Math.max(lvl1.length, lvl2.length, lvl3.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < lvl1.length) interleaved.push(lvl1[i]);
    if (i < lvl2.length) interleaved.push(lvl2[i]);
    if (i < lvl3.length) interleaved.push(lvl3[i]);
  }
  
  return interleaved;
}

function generateVisualQuestionsList() {
  let list = [];
  
  // 1. Get 7 unique landmark questions
  let remainingLandmarks = visualQuestionsPool.filter(q => !playedVisualQuestions.has(q.q));
  if (remainingLandmarks.length < 7) {
    remainingLandmarks = [...visualQuestionsPool];
  }
  let shuffledLandmarks = remainingLandmarks.sort(() => Math.random() - 0.5);
  let selectedLandmarks = shuffledLandmarks.slice(0, 7).map(q => {
    playedVisualQuestions.add(q.q);
    return shuffleQuestionOptions(q);
  });
  list = list.concat(selectedLandmarks);
  
  // 2. Get 8 unique country flag questions
  let availableFlagKeys = [];
  countries.forEach(c => {
    availableFlagKeys.push({ country: c, isShowFlag: true, key: `flag_${c.n}_true` });
    availableFlagKeys.push({ country: c, isShowFlag: false, key: `flag_${c.n}_false` });
  });
  
  let remainingFlags = availableFlagKeys.filter(f => !playedVisualQuestions.has(f.key));
  if (remainingFlags.length < 8) {
    remainingFlags = availableFlagKeys;
  }
  
  let shuffledFlags = remainingFlags.sort(() => Math.random() - 0.5);
  let selectedFlags = shuffledFlags.slice(0, 8);
  
  selectedFlags.forEach(f => {
    playedVisualQuestions.add(f.key);
    const targetC = f.country;
    const isShowFlag = f.isShowFlag;
    
    let distractors = countries.filter(c => c.n !== targetC.n).sort(() => Math.random() - 0.5).slice(0, 3);
    let options = [targetC, ...distractors].sort(() => Math.random() - 0.5);
    let correctIdx = options.findIndex(o => o.n === targetC.n);
    
    let qObj;
    if (isShowFlag) {
      qObj = {
        q: `Zu welchem EU-Land gehört diese Flagge? ${targetC.f}`,
        o: options.map(o => o.n),
        a: correctIdx,
        exp: `Das gesuchte Land ist ${targetC.n} mit der Flagge ${targetC.f}.`
      };
    } else {
      qObj = {
        q: `Welche Flagge gehört zu ${targetC.n}?`,
        o: options.map(o => o.f),
        a: correctIdx,
        exp: `Die Flagge von ${targetC.n} ist ${targetC.f}.`
      };
    }
    list.push(qObj);
  });
  
  return list.sort(() => Math.random() - 0.5);
}

function generateFlagQuestion() {
  const isShowFlag = Math.random() > 0.5;
  const targetC = countries[Math.floor(Math.random() * countries.length)];
  let distractors = countries.filter(c => c.n !== targetC.n).sort(() => Math.random() - 0.5).slice(0, 3);
  let options = [targetC, ...distractors].sort(() => Math.random() - 0.5);
  let correctIdx = options.findIndex(o => o.n === targetC.n);
  
  if (isShowFlag) {
    return {
      q: `Zu welchem EU-Land gehört diese Flagge? ${targetC.f}`,
      o: options.map(o => o.n),
      a: correctIdx,
      exp: `Das gesuchte Land ist ${targetC.n} mit der Flagge ${targetC.f}.`
    };
  } else {
    return {
      q: `Welche Flagge gehört zu ${targetC.n}?`,
      o: options.map(o => o.f),
      a: correctIdx,
      exp: `Die Flagge von ${targetC.n} ist ${targetC.f}.`
    };
  }
}

function initSinglePlayerGame() {
  sounds.init();
  sounds.setMusicState('question');
  if (typeof playedSessionQuestions !== 'undefined') playedSessionQuestions.clear();
  if (typeof trackLifetimeGameStarted === 'function') trackLifetimeGameStarted();
  
  singlePlayerScore = 0;
  rapidFireIndex = 0;
  currentStreak = 0;
  riskStreak = 0;
  
  for (let i = 1; i <= 5; i++) {
    statsCategoryAnswers[i] = { c: 0, w: 0 };
  }
  
  let spJokers = { fiftyFifty: 0, class: 0, rescue: 0, swap: 0, revive: 0 };
  if (gameMode === 'suddendeath') {
    spJokers = { fiftyFifty: 2, class: 0, rescue: 0, swap: 2, revive: 2 };
  }
  
  teams = [{
    name: "Spieler",
    score: 0,
    jokers: spJokers,
    tipsLeft: 2
  }];
  activeTeam = 0;
  
  rapidFireQuestions = prepareRapidFireQuestions(activeCategory);
  
  document.getElementById('round-counter').style.display = 'none';
  document.getElementById('end-game-btn').style.display = 'none';
  
  if (gameMode === 'timeattack') {
    timeAttackTimeLeft = 60;
    startTimeAttackTimer();
  }
  
  spTurnActive = true;
  openRapidFireQuestion();
}

function startTimeAttackTimer() {
  if (timeAttackTimerInterval) clearInterval(timeAttackTimerInterval);
  
  timeAttackTimerInterval = setInterval(() => {
    timeAttackTimeLeft -= 1;
    
    const bar = document.getElementById('timer-bar');
    if (bar) {
      const pct = Math.max(0, (timeAttackTimeLeft / timeAttackTeamDuration) * 100);
      bar.style.width = pct + '%';
      if (timeAttackTimeLeft <= 10) {
        bar.style.background = 'var(--error)';
        sounds.playTickTock(timeAttackTimeLeft % 2 === 0);
      }
    }
    
    const info = document.getElementById('txt-turn-info');
    if (info) {
      info.innerText = `⏱️ Zeit-Angriff • Zeit: ${timeAttackTimeLeft}s • Punkte: ${singlePlayerScore} • Thema: ${categoryNames[activeCategory]}`;
    }
    
    if (timeAttackTimeLeft <= 0) {
      if (!spTurnActive) return;
      spTurnActive = false;
      clearInterval(timeAttackTimerInterval);
      timeAttackTimerInterval = null;
      sounds.playBuzzer();
      teams[activeTeam].score = singlePlayerScore;
      document.getElementById('quiz-dialog').close();
      advanceSPMultiplayerTurn();
    }
  }, 1000);
}

function openRapidFireQuestion() {
  if (gameMode === 'timeattack' && timeAttackTimeLeft <= 0) {
    spTurnActive = false;
    if (timeAttackTimerInterval) {
      clearInterval(timeAttackTimerInterval);
      timeAttackTimerInterval = null;
    }
    if (teams && teams[activeTeam]) teams[activeTeam].score = singlePlayerScore;
    const dialog = document.getElementById('quiz-dialog');
    if (dialog) {
      try { dialog.close(); } catch(e) { dialog.style.display = 'none'; }
    }
    advanceSPMultiplayerTurn();
    return;
  }
  
  if (!rapidFireQuestions || rapidFireIndex >= rapidFireQuestions.length) {
    rapidFireQuestions = prepareRapidFireQuestions(activeCategory);
    rapidFireIndex = 0;
  }
  
  // Fallback if questions list is empty: try category 1 as fallback pool
  if (!rapidFireQuestions || rapidFireQuestions.length === 0) {
    rapidFireQuestions = prepareRapidFireQuestions(1);
    rapidFireIndex = 0;
  }
  
  const rawQ = (rapidFireQuestions && rapidFireQuestions[rapidFireIndex]) ? rapidFireQuestions[rapidFireIndex] : null;
  if (!rawQ) {
    alert("Hinweis: Es konnten keine Fragen geladen werden.");
    return;
  }
  
  if (typeof playedSessionQuestions !== 'undefined' && rawQ.q) {
    playedSessionQuestions.add(rawQ.q);
  }
  currentQuestionData = shuffleQuestionOptions(rawQ);
  const qData = currentQuestionData;
  correctAnswer = qData.a;
  jokerUsed = false;
  rescueActive = false;
  riskActive = false;
  
  const dialog = document.getElementById('quiz-dialog');
  if (dialog) {
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        try { dialog.showModal(); } catch (e) { dialog.style.display = 'block'; }
      } else {
        dialog.style.display = 'block';
      }
    }
  }
  
  const qTitle = document.getElementById('q-title');
  if (qTitle) qTitle.innerText = `${qData.country || 'EU'} (Level ${qData.lvl || 1})`;
  
  let modeLabel = gameMode === 'timeattack' ? "⏱️ Zeit-Angriff" : "💀 Sudden Death";
  const catName = categoryNames[activeCategory] || ("Kategorie " + activeCategory);
  const turnInfo = document.getElementById('txt-turn-info');
  if (turnInfo) {
    turnInfo.innerText = `${modeLabel} • Punkte: ${singlePlayerScore} • Thema: ${catName}`;
    turnInfo.style.color = 'var(--accent)';
  }
  
  const diffBtns = document.getElementById('diff-buttons');
  if (diffBtns) diffBtns.style.display = 'none';
  const qArea = document.getElementById('q-area');
  if (qArea) qArea.style.display = 'block';
  const qText = document.getElementById('q-text');
  if (qText) qText.innerText = qData.q;

  // Handle Dropdown Hint Menu for Level 2 & 3
  const tipContainer = document.getElementById('q-tip-container');
  if (tipContainer) {
    if (qData.tip && qData.lvl > 1) {
      document.getElementById('q-tip-text').innerText = qData.tip;
      document.getElementById('q-tip-text').style.display = 'none';
      const arrow = document.getElementById('q-tip-arrow');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
      tipOpenedForCurrentQuestion = false;

      const currentTeamObj = (teams && teams[activeTeam]) ? teams[activeTeam] : null;
      if (currentTeamObj) {
        if (currentTeamObj.tipsLeft === undefined) currentTeamObj.tipsLeft = 2;
        const countEl = document.getElementById('q-tip-count');
        if (countEl) countEl.innerText = currentTeamObj.tipsLeft;
      }
      tipContainer.style.display = 'block';
    } else {
      tipContainer.style.display = 'none';
    }
  }

  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('txt-cancel').style.display = 'none';
  document.getElementById('class-joker-container').style.display = 'none';
  document.getElementById('risk-container').style.display = 'none';
  document.getElementById('q-explanation').style.display = 'none';
  document.getElementById('revive-btn').style.display = 'none';
  
  if (gameMode === 'timeattack') {
    const container = document.getElementById('timer-bar-container');
    container.style.display = 'block';
    const bar = document.getElementById('timer-bar');
    bar.style.width = (timeAttackTimeLeft / timeAttackTeamDuration * 100) + '%';
    bar.style.background = 'var(--accent)';
  } else {
    document.getElementById('timer-bar-container').style.display = 'none';
  }
  
  document.getElementById('options-container').innerHTML = qData.o.map((opt, i) =>
    `<div class="option" id="opt-${i}" onclick="checkRapidFire(${i})">
       <span class="option-badge">${String.fromCharCode(65+i)}</span>
       <span>${opt}</span>
     </div>`
  ).join('');
  
  if (!teams || teams.length === 0 || !teams[activeTeam]) {
    teams = [{
      name: "Spieler",
      score: 0,
      jokers: { fiftyFifty: 2, class: 0, rescue: 0, swap: 2, revive: 2 },
      tipsLeft: 2
    }];
    activeTeam = 0;
  } else if (teams[activeTeam] && (!teams[activeTeam].jokers || teams[activeTeam].jokers.swap === undefined)) {
    teams[activeTeam].jokers = { fiftyFifty: 2, class: 0, rescue: 0, swap: 2, revive: 2 };
  }

  const arsenal = document.getElementById('joker-arsenal');
  const team = teams[activeTeam];
  const allow50 = (team.jokers && team.jokers.fiftyFifty > 0);
  const allowSwap = (team.jokers && team.jokers.swap > 0);
  
  if (arsenal) {
    arsenal.style.display = (allow50 || allowSwap) ? 'flex' : 'none';
    arsenal.style.pointerEvents = 'auto';
  }
  
  const j50 = document.getElementById('joker-5050');
  if (j50) {
    j50.style.display = allow50 ? 'inline-flex' : 'none';
    j50.innerText = `50:50 Joker (${team.jokers.fiftyFifty}x)`;
    j50.onclick = use5050Rapid;
    j50.style.pointerEvents = 'auto';
  }
  
  const jclass = document.getElementById('joker-class');
  if (jclass) jclass.style.display = 'none';
  const jrescue = document.getElementById('joker-rescue');
  if (jrescue) jrescue.style.display = 'none';
  
  let jswap = document.getElementById('joker-swap');
  if (!jswap && arsenal) {
    jswap = document.createElement('button');
    jswap.id = 'joker-swap';
    jswap.className = 'btn-main';
    jswap.style.cssText = 'border-color:var(--accent-alt); color:var(--accent-alt); font-size: 0.75rem; padding: 6px 12px; cursor: pointer; pointer-events: auto; margin-left: 6px;';
    jswap.onclick = useSwapJoker;
    arsenal.appendChild(jswap);
  }
  if (jswap) {
    jswap.style.display = allowSwap ? 'inline-flex' : 'none';
    jswap.innerText = `Frage tauschen (${team.jokers.swap}x)`;
    jswap.style.pointerEvents = 'auto';
  }
  speakCurrentQuestion();
  triggerBotRapidPlay();
}

function useSwapJoker() {
  if (teams[activeTeam].jokers.swap <= 0) return;
  sounds.playJoker();
  teams[activeTeam].jokers.swap--;
  rapidFireIndex++;
  openRapidFireQuestion();
}

function use5050Rapid() {
  if (teams[activeTeam].jokers.fiftyFifty <= 0) return;
  sounds.playJoker();
  teams[activeTeam].jokers.fiftyFifty--;
  jokerUsed = true;
  
  let indices = [0,1,2,3].filter(i => i !== correctAnswer).sort(() => Math.random()-0.5);
  [document.getElementById(`opt-${indices[0]}`), document.getElementById(`opt-${indices[1]}`)].forEach(el => {
    if (el) el.classList.add('glitch-out');
  });
  
  document.getElementById('joker-5050').style.display = 'none';
}

function generateVisualQuestion() {
  if (Math.random() > 0.5 && visualQuestionsPool.length > 0) {
    const rawQ = visualQuestionsPool[Math.floor(Math.random() * visualQuestionsPool.length)];
    return shuffleQuestionOptions(rawQ);
  } else {
    return generateFlagQuestion();
  }
}

function initFlagsGame() {
  sounds.init();
  sounds.setMusicState('question');
  if (typeof playedSessionQuestions !== 'undefined') playedSessionQuestions.clear();
  if (typeof trackLifetimeGameStarted === 'function') trackLifetimeGameStarted();
  
  singlePlayerScore = 0;
  flagQuestionIndex = 0;
  currentStreak = 0;
  
  flagQuestions = [];
  for (let i = 0; i < 15; i++) {
    flagQuestions.push(generateVisualQuestion());
  }
  
  teams = [{
    name: "Spieler",
    score: 0,
    jokers: { fiftyFifty: 0, class: 0, rescue: 0, swap: 0, revive: 0 },
    tipsLeft: 2
  }];
  activeTeam = 0;
  
  document.getElementById('round-counter').style.display = 'none';
  document.getElementById('end-game-btn').style.display = 'none';
  
  openFlagsQuestion();
}

function openFlagsQuestion() {
  if (flagQuestionIndex >= 15) {
    if (!spTurnActive) return;
    spTurnActive = false;
    teams[activeTeam].score = singlePlayerScore;
    document.getElementById('quiz-dialog').close();
    advanceSPMultiplayerTurn();
    return;
  }
  
  document.getElementById('revive-btn').style.display = 'none';
  
  currentFlagQuestion = flagQuestions[flagQuestionIndex];
  correctAnswer = currentFlagQuestion.a;
  jokerUsed = false;
  rescueActive = false;
  riskActive = false;
  
  const dialog = document.getElementById('quiz-dialog');
  if (!dialog.open) {
    dialog.showModal();
  }
  
  document.getElementById('q-title').innerText = `Visuelle Runde (Frage ${flagQuestionIndex + 1} / 15)`;
  document.getElementById('txt-turn-info').innerText = `🖼️ Visuelle Runde • Punkte: ${singlePlayerScore}`;
  document.getElementById('txt-turn-info').style.color = 'var(--accent)';
  
  document.getElementById('diff-buttons').style.display = 'none';
  document.getElementById('q-area').style.display = 'block';
  document.getElementById('q-text').innerText = currentFlagQuestion.q;
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('txt-cancel').style.display = 'none';
  document.getElementById('class-joker-container').style.display = 'none';
  document.getElementById('risk-container').style.display = 'none';
  document.getElementById('q-explanation').style.display = 'none';
  document.getElementById('timer-bar-container').style.display = 'none';
  document.getElementById('joker-arsenal').style.display = 'none';
  
  const isEmojiOnly = currentFlagQuestion.o[0].length <= 5;
  document.getElementById('options-container').innerHTML = currentFlagQuestion.o.map((opt, i) =>
    `<div class="option" id="opt-${i}" onclick="checkRapidFire(${i})" style="${isEmojiOnly ? 'justify-content:center; font-size:3.5rem; padding: 15px;' : ''}">
       ${isEmojiOnly ? '' : `<span class="option-badge">${String.fromCharCode(65+i)}</span>`}
       <span>${opt}</span>
     </div>`
  ).join('');
  speakCurrentQuestion();
  triggerBotRapidPlay();
}

function checkRapidFire(idx) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (gameMode === 'timeattack' && timeAttackTimerInterval) {
    clearInterval(timeAttackTimerInterval);
    timeAttackTimerInterval = null;
  }
  const opts = document.querySelectorAll('#options-container .option');
  document.getElementById('joker-arsenal').style.display = 'none';
  document.getElementById('revive-btn').style.display = 'none';
  
  const qData = (gameMode === 'flags') ? currentFlagQuestion : currentQuestionData;
  
  // Explanation Visibility Logic
  if (gameMode === 'flags' || gameMode === 'timeattack') {
    document.getElementById('q-explanation').style.display = 'none';
  } else {
    // Sudden Death
    const explanation = qData.exp || getExplanation(qData.q, qData.o[correctAnswer]);
    const isFallback = explanation.startsWith("Wusstest du schon?");
    if (!isFallback) {
      document.getElementById('q-explanation-text').innerHTML = explanation;
      document.getElementById('q-explanation').style.display = 'block';
    } else {
      document.getElementById('q-explanation').style.display = 'none';
    }
  }
  
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'block';
  nextBtn.onclick = advanceRapidFireQuestion;
  nextBtn.innerHTML = `Nächste Frage <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  
  if (idx === correctAnswer) {
    sounds.playSuccess();
    if (typeof trackLifetimeAnswer === 'function') trackLifetimeAnswer(true);
    opts[idx].classList.add('correct');
    opts.forEach(o => o.style.pointerEvents = 'none');
    
    let pts = 1;
    if (gameMode === 'timeattack') {
      timeAttackTimeLeft = Math.min(timeAttackTeamDuration, timeAttackTimeLeft + 2);
      pts = qData.lvl || 1;
    }
    
    singlePlayerScore += pts;
    currentStreak++;
    
    if (gameMode !== 'flags') {
      statsCategoryAnswers[activeCategory].c++;
    }
    
    checkInGameAchievements(qData);
    
  } else {
    sounds.playError();
    if (typeof trackLifetimeAnswer === 'function') trackLifetimeAnswer(false);
    opts[idx].classList.add('wrong');
    opts[correctAnswer].classList.add('correct');
    opts.forEach(o => o.style.pointerEvents = 'none');
    
    const prevStreak = currentStreak;
    currentStreak = 0;
    
    if (gameMode === 'timeattack') {
      timeAttackTimeLeft = Math.max(0, timeAttackTimeLeft - 5);
    }
    
    if (gameMode !== 'flags') {
      statsCategoryAnswers[activeCategory].w++;
    }
    
    if (gameMode === 'suddendeath') {
      if (teams && teams[activeTeam] && teams[activeTeam].jokers && teams[activeTeam].jokers.revive > 0) {
        const reviveBtn = document.getElementById('revive-btn');
        if (reviveBtn) {
          reviveBtn.style.display = 'block';
          reviveBtn.innerText = `Wiederbeleben ❤️ (${teams[activeTeam].jokers.revive}x verbleibend)`;
          reviveBtn.onclick = function() {
            sounds.playJoker();
            teams[activeTeam].jokers.revive--;
            currentStreak = prevStreak;
            reviveBtn.style.display = 'none';
            advanceRapidFireQuestion();
          };
        }
      }
      nextBtn.innerText = "💀 Sudden Death beendet • Auswerten";
      nextBtn.onclick = function() {
        spTurnActive = false;
        if (teams && teams[activeTeam]) teams[activeTeam].score = singlePlayerScore;
        const dialog = document.getElementById('quiz-dialog');
        if (dialog) {
          try { if (dialog.open) dialog.close(); } catch(e) { dialog.style.display = 'none'; }
        }
        advanceSPMultiplayerTurn();
      };
    }
  }
}

function advanceRapidFireQuestion() {
  if (gameMode === 'timeattack') {
    startTimeAttackTimer();
  }
  if (gameMode === 'flags') {
    flagQuestionIndex++;
    openFlagsQuestion();
  } else {
    rapidFireIndex++;
    openRapidFireQuestion();
  }
}

function endSinglePlayerGame() {
  if (timeAttackTimerInterval) {
    clearInterval(timeAttackTimerInterval);
    timeAttackTimerInterval = null;
  }
  
  sounds.playFanfare();
  sounds.setMusicState('victory');
  
  document.getElementById('quiz-dialog').close();
  document.getElementById('game-dashboard').style.display = 'none';
  document.getElementById('end-game-btn').style.display = 'none';
  document.getElementById('winner-screen').style.display = 'flex';
  if (typeof renderCategoryStats === 'function') renderCategoryStats();
  
  if (typeof UserProfile !== 'undefined' && typeof UserProfile.recordGameFinished === 'function') {
    UserProfile.recordGameFinished({
      correct: singlePlayerScore || 0,
      total: Math.max(1, singlePlayerScore || 1),
      mode: gameMode || 'suddendeath',
      durationMinutes: 3
    });
  }
  
  let modeText = "";
  if (gameMode === 'timeattack') modeText = "⏱️ Gegen die Zeit";
  else if (gameMode === 'suddendeath') modeText = "💀 Sudden Death";
  else if (gameMode === 'flags') modeText = "🖼️ Visuelle Runde";
  
  if (teams.length > 1) {
    document.getElementById('win-heading').innerText = "TURNIER BEENDET";
    document.getElementById('win-subheading').innerHTML = `Modus: <strong>${modeText}</strong><br>Hier sind die Platzierungen:`;
  } else {
    document.getElementById('win-heading').innerText = "SPIEL BEENDET";
    document.getElementById('win-subheading').innerHTML = `Modus: <strong>${modeText}</strong>`;
  }
  
  const sorted = [...teams];
  if (teams.length === 1) {
    sorted[0].score = singlePlayerScore;
  }
  sorted.sort((a, b) => b.score - a.score);
  
  const podium = document.getElementById('podium-area');
  const otherRanks = document.getElementById('other-ranks');
  const maxScore = sorted[0].score;
  const winners = sorted.filter(t => t.score === maxScore);
  
  podium.style.display = 'flex';
  if (teams.length > 1) {
    otherRanks.style.display = 'flex';
  } else {
    otherRanks.style.display = 'none';
  }
  
  let spStats = document.getElementById('single-player-stats-container');
  if (spStats) {
    spStats.style.display = 'none';
  }
  
  if (winners.length > 1) {
    document.getElementById('win-heading').innerText = "UNENTSCHIEDEN!";
    const winnerNames = winners.map(w => w.name).join(" & ");
    document.getElementById('win-subheading').innerHTML = `Hervorragende Leistung! Die gemeinsamen Champions sind: <strong>${winnerNames}</strong><br>Modus: <strong>${modeText}</strong>`;
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
  
  if (teams.length > 1) {
    // Add to session highscores
    sessionHighscores.push({
      round: sessionHighscores.length + 1,
      winner: sorted[0].name,
      score: sorted[0].score,
      category: gameMode === 'flags' ? '🖼️ Visuelle Runde' : (categoryNames[activeCategory] || 'Mischung')
    });
    
    // Update the winner screen hall of fame list view
    const medals = ['🥇','🥈','🥉','🏅'];
    const hofList = document.getElementById('hall-of-fame-list');
    if (hofList) {
      hofList.innerHTML = sessionHighscores.map((g, i) => `
        <div style="padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(251,191,36,0.15);border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.2rem;">${medals[Math.min(i, 3)]}</span>
            <div>
              <div style="font-weight:800;font-family:'Space Grotesk',sans-serif;font-size:0.95rem;">Runde ${g.round}: ${g.winner}</div>
              <div style="opacity:0.6;font-size:0.78rem;">Modus/Kategorie: ${g.category}</div>
            </div>
          </div>
          <span style="font-weight:800;color:var(--gold);font-size:1rem;font-family:'Space Grotesk',sans-serif;">${Number(g.score.toFixed(1))} PTS</span>
        </div>`).join('');
    }
  }
  
  saveAchievements();
  confetti.start();
}

function simulateBotTurnInSP() {
  if (gameMode === 'flags') {
    const botScore = simulateBotSPRound();
    teams[activeTeam].score = botScore;
    advanceSPMultiplayerTurn();
  } else {
    let remaining = [];
    for (let i = 1; i <= 5; i++) {
      if (!playedCategories.has(i)) remaining.push(i);
    }
    if (remaining.length > 0) {
      const picked = remaining[Math.floor(Math.random() * remaining.length)];
      playedCategories.add(picked);
      activeCategory = picked;
      
      const botScore = simulateBotSPRound();
      teams[activeTeam].score = botScore;
      advanceSPMultiplayerTurn();
    } else {
      advanceSPMultiplayerTurn();
    }
  }
}

function simulateBotSPRound() {
  const botDiff = teams[activeTeam].difficulty || 'easy';
  let accuracy = 0.5;
  if (botDiff === 'medium') accuracy = 0.75;
  else if (botDiff === 'hard') accuracy = 0.9;
  else if (botDiff === 'elite') accuracy = 0.98;
  
  let score = 0;
  let botCorrectStreak = 0;
  
  if (gameMode === 'timeattack') {
    let timeLeft = 30; 
    let limit = 100;
    while (timeLeft > 0 && limit > 0) {
      limit--;
      let respTime = 3.0;
      if (botDiff === 'medium') respTime = 2.5;
      else if (botDiff === 'hard') respTime = 2.0;
      else if (botDiff === 'elite') respTime = 1.2;
      
      timeLeft -= respTime;
      if (timeLeft <= 0) break;
      
      let isCorrect = Math.random() < accuracy;
      if (botCorrectStreak >= 5) {
        isCorrect = false;
      }
      
      if (isCorrect) {
        score++;
        botCorrectStreak++;
        timeLeft = Math.min(30, timeLeft + 2);
      } else {
        botCorrectStreak = 0;
        timeLeft = Math.max(0, timeLeft - 5);
      }
    }
  } else if (gameMode === 'suddendeath') {
    let revives = 2;
    let limit = 100;
    while (limit > 0) {
      limit--;
      const isCorrect = Math.random() < accuracy;
      if (isCorrect) {
        score++;
      } else {
        if (revives > 0) {
          revives--;
        } else {
          break;
        }
      }
    }
  } else if (gameMode === 'flags') {
    for (let i = 0; i < 10; i++) {
      if (Math.random() < accuracy) {
        score++;
      }
    }
  }
  
  return score;
}
