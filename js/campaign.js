let humanLastChosenLvl = 1;

function selectCategory(catNum) {
  sounds.playSuccess();
  activeCategory = catNum;
  
  // Highlight indicator
  const ind = document.getElementById('category-indicator');
  if (ind) {
    ind.style.display = 'block';
    ind.innerText = categoryNames[catNum] || ("Kategorie " + catNum);
  }
  
  const catScreen = document.getElementById('category-screen');
  if (catScreen) catScreen.style.display = 'none';
  
  if (gameMode === 'timeattack') {
    playedCategories.add(catNum);
    spTurnActive = true;
    singlePlayerScore = 0;
    rapidFireIndex = 0;
    currentStreak = 0;
    timeAttackTimeLeft = timeAttackTeamDuration;
    rapidFireQuestions = prepareRapidFireQuestions(activeCategory);
    openRapidFireQuestion();
    startTimeAttackTimer();
  } else if (gameMode === 'suddendeath') {
    playedCategories.add(catNum);
    spTurnActive = true;
    singlePlayerScore = 0;
    rapidFireIndex = 0;
    currentStreak = 0;
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
    rapidFireQuestions = prepareRapidFireQuestions(activeCategory);
    openRapidFireQuestion();
  } else {
    // Default to campaign / setup mode if gameMode is empty or campaign
    gameMode = 'campaign';
    const setupScreen = document.getElementById('setup-screen');
    const campaignSettings = document.getElementById('campaign-settings');
    if (setupScreen) setupScreen.style.display = 'flex';
    if (campaignSettings) campaignSettings.style.display = 'block';
    
    let hadBot = false;
    let botDiff = 'easy';
    let botSimulate = true;
    
    const humanTeams = (teams && teams.length > 0) ? teams.filter(t => {
      if (t.isBot) {
        hadBot = true;
        botDiff = t.difficulty || 'easy';
        botSimulate = (t.simulate !== false);
        return false;
      }
      return true;
    }) : [];
    
    const botEnableEl = document.getElementById('setup-enable-bot');
    if (botEnableEl) botEnableEl.checked = hadBot;
    const botSettingsEl = document.getElementById('setup-bot-settings-group');
    if (botSettingsEl) botSettingsEl.style.display = hadBot ? 'block' : 'none';
    const botDiffEl = document.getElementById('setup-bot-difficulty');
    if (botDiffEl) botDiffEl.value = botDiff;
    const botSimEl = document.getElementById('setup-bot-simulate');
    if (botSimEl) botSimEl.checked = botSimulate;
    
    const container = document.getElementById('team-list-container');
    if (container) {
      container.innerHTML = "";
      if (humanTeams.length > 0) {
        humanTeams.forEach(t => {
          const div = document.createElement('div');
          div.className = "team-input-row";
          div.innerHTML = `<input type="text" class="team-name-input" value="${t.name}" placeholder="Name des Teams..."> 
                           <button class="btn-main btn-danger" style="padding:10px 15px;" onclick="sounds.playClick(); this.parentElement.remove(); document.getElementById('setup-err').style.display='none';" title="Team entfernen">✕</button>`;
          container.appendChild(div);
        });
      } else {
        addTeamField(); 
        addTeamField(); 
      }
    }
  }
}

function addTeamField() {
    const container = document.getElementById('team-list-container');
    if (!container) return;
    const currentCount = container.querySelectorAll('.team-input-row').length + 1;
    const maxLimit = gameMode === 'campaign' ? 15 : 5;
    if (currentCount > maxLimit) {
        const err = document.getElementById('setup-err');
        if (err) {
          err.innerText = `Maximal ${maxLimit} Teams sind erlaubt!`;
          err.style.display = 'block';
        }
        sounds.playError();
        return;
    }
    const div = document.createElement('div');
    div.className = "team-input-row";
    div.innerHTML = `<input type="text" class="team-name-input" value="Team ${currentCount}" placeholder="Name des Teams..."> 
                     <button class="btn-main btn-danger" style="padding:10px 15px;" onclick="sounds.playClick(); this.parentElement.remove(); document.getElementById('setup-err').style.display='none';" title="Team entfernen">✕</button>`;
    container.appendChild(div);
}

function initGame() {
    sounds.init(); 
    currentRound = 1;
    activeTeam = 0;
    gameMode = 'campaign';
    if (typeof playedCategories !== 'undefined' && playedCategories.clear) {
      playedCategories.clear();
    }
    
    // Start music on first interaction
    sounds.setMusicState('menu');
    
    // Reset countries played and correct states
    countries.forEach(c => {
        c.p = {1:0, 2:0, 3:0};
        c.correct = {1:0, 2:0, 3:0};
        c.teamCorrect = {1: null, 2: null, 3: null};
    });
    
    const inputs = document.querySelectorAll('.team-name-input');
    const roundsInput = document.getElementById('rounds-input');
    const timerInput = document.getElementById('timer-input');
    
    timerDuration = parseInt(timerInput.value) || 0;
    
    teams = [];
    let namesSet = new Set();
    const err = document.getElementById('setup-err');
    err.style.display = 'none';
    maxRounds = parseInt(roundsInput.value) || 5;

    for(let i of inputs) {
        let val = i.value.trim();
        if(val === "") continue;
        if(val.length < 2 || namesSet.has(val.toLowerCase())) {
            err.innerText = "Namen prüfen (Mindestens 2 Zeichen, keine Dubletten)!";
            err.style.display = 'block';
            sounds.playError();
            return;
        }
        namesSet.add(val.toLowerCase());
        teams.push({
            name: val, 
            score: 0, 
            jokers: { fiftyFifty: 2, class: 2, rescue: 2 },
            tipsLeft: 2
        });
    }
    if(teams.length < 1) { 
      err.innerText = "Mindestens 1 Team muss teilnehmen!"; 
      err.style.display = 'block'; 
      sounds.playError();
      return; 
    }
    
    const enableBot = document.getElementById('setup-enable-bot').checked;
    if (enableBot) {
      const botDiff = document.getElementById('setup-bot-difficulty').value;
      teams.push({
        name: "🤖 Bot Klaus",
        score: 0,
        isBot: true,
        difficulty: botDiff,
        simulate: document.getElementById('setup-bot-simulate').checked,
        jokers: { fiftyFifty: 2, class: 2, rescue: 2 },
        tipsLeft: 2
      });
    }
    
    if(teams.length > 15) {
      err.innerText = "Maximal 15 Teams sind erlaubt!";
      err.style.display = 'block';
      sounds.playError();
      // Remove bot from array if we're hitting error
      if (enableBot) teams.pop();
      return;
    }

    sounds.playSuccess();
    if (typeof trackLifetimeGameStarted === 'function') trackLifetimeGameStarted();
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('end-game-btn').style.display = 'block';
    
    const rc = document.getElementById('round-counter');
    rc.style.display = 'block';
    rc.innerText = `Runde: ${currentRound} / ${maxRounds}`;
    
    document.getElementById('game-dashboard').style.display = 'flex';
    
    renderScoreboard(); 
    renderGrid();
    checkBotTurn();
}

function renderScoreboard() {
  const sb = document.getElementById('scoreboard');
  const sortedIndices = [...teams]
    .map((t, idx) => ({t, idx}))
    .sort((a,b) => b.t.score - a.t.score);
    
  sb.innerHTML = teams.map((t, i) => {
    const rank = sortedIndices.findIndex(item => item.idx === i) + 1;
    const suffix = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `#${rank}`));
    
    return `<div class="team-box ${i === activeTeam ? 'active' : ''}">
      <span class="team-rank-indicator">${suffix}</span>
      <div style="font-size:0.65rem; opacity:0.6; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">TEAM</div>
      <div style="font-weight:800; font-size:1.15rem; margin: 5px 0; color: var(--text-primary); text-overflow: ellipsis; white-space: nowrap; overflow:hidden;">${t.name}</div>
      <div style="color:var(--accent); font-weight:800; font-family:'Space Grotesk', sans-serif; font-size: 1.1rem; letter-spacing: 0.5px;">${Number(t.score.toFixed(1))} PTS</div>
    </div>`;
  }).join('');
}

function renderGrid() {
  const g = document.getElementById('grid');
  g.innerHTML = countries.map((c, i) => {
    const allPlayed = c.p[1] && c.p[2] && c.p[3];
    const allCorrect = c.correct && c.correct[1] && c.correct[2] && c.correct[3];
    const starHTML = allCorrect ? `<div class="silver-star" title="Land komplett richtig beantwortet!"><svg viewBox="0 0 24 24" fill="#cbd5e1" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>` : '';
    const dotsHTML = `
      <div class="level-dots">
        <span class="dot ${c.p[1]?'played':''}" title="Level I"></span>
        <span class="dot ${c.p[2]?'played':''}" title="Level II"></span>
        <span class="dot ${c.p[3]?'played':''}" title="Level III"></span>
      </div>
    `;

    const delay = (i % 9) * 0.04;
    return `<div class="card ${allPlayed?'played-out':''}" style="animation-delay: ${delay.toFixed(2)}s;" onclick="openQ(${i})">
      ${starHTML}
      <span class="card-flag">${c.f}</span>
      <span class="card-name">${c.n}</span>
      ${dotsHTML}
    </div>`;
  }).join('');
}

function openQ(idx) {
  if (mapSelectionActive) {
    evaluateMapClick(idx);
    return;
  }
  if (countries[idx].p[1] && countries[idx].p[2] && countries[idx].p[3]) return;
  sounds.playClick();
  currentCIdx = idx;
  jokerUsed = false;
  rescueActive = false;
  riskActive = false;

  // Zoom-in card animation tactile feedback
  const cards = document.querySelectorAll('#grid .card');
  const clickedCard = cards[idx];
  if (clickedCard) {
    clickedCard.classList.add('zoom-active');
    setTimeout(() => {
      clickedCard.classList.remove('zoom-active');
    }, 600);
  }

  // Open the dialog after a brief delay for transition to feel smooth
  setTimeout(() => {
    const dialog = document.getElementById('quiz-dialog');
    if (dialog) {
      if (typeof dialog.showModal === 'function') {
        try { dialog.showModal(); } catch (e) { dialog.style.display = 'block'; }
      } else {
        dialog.style.display = 'block';
      }
    }
    const qTitle = document.getElementById('q-title');
    if (qTitle) qTitle.innerText = countries[idx].n;
    
    const turnInfo = document.getElementById('txt-turn-info');
    if (turnInfo) {
      const currentTeamName = (teams && teams[activeTeam]) ? teams[activeTeam].name : "Team 1";
      const catName = categoryNames[activeCategory] || "Kategorie " + activeCategory;
      turnInfo.innerText = "Team am Zug: " + currentTeamName + " • Kategorie: " + catName;
      turnInfo.style.color = 'var(--accent)';
    }
    
    const isBot = teams && teams[activeTeam] && teams[activeTeam].isBot;
    const diffBtns = document.getElementById('diff-buttons');
    if (diffBtns) {
      diffBtns.style.display = 'block';
      diffBtns.style.pointerEvents = isBot ? 'none' : 'auto';
      diffBtns.style.opacity = isBot ? '0.7' : '1';
    }
    const qArea = document.getElementById('q-area');
    if (qArea) qArea.style.display = 'none';
    const txtCancel = document.getElementById('txt-cancel');
    if (txtCancel) txtCancel.style.display = isBot ? 'none' : 'inline-block';
    const timerBarCont = document.getElementById('timer-bar-container');
    if (timerBarCont) timerBarCont.style.display = 'none';
    const classJokerCont = document.getElementById('class-joker-container');
    if (classJokerCont) classJokerCont.style.display = 'none';
    
    for (let i = 1; i <= 3; i++) {
      const btn = document.getElementById(`btn-lvl-${i}`);
      if (btn) {
        btn.disabled = !!(countries[idx] && countries[idx].p && countries[idx].p[i]);
        btn.style.pointerEvents = isBot ? 'none' : 'auto';
        btn.style.borderColor = '';
        btn.style.boxShadow = '';
        btn.style.transform = '';
      }
    }
    
    // Reset risk prompt visibility
    const riskPrompt = document.getElementById('risk-prompt-area');
    if (riskPrompt) riskPrompt.style.display = 'none';
  }, 150);
}

function cancelQuestion() {
  if (typeof clearBotTimeouts === 'function') clearBotTimeouts();
  if (typeof setUiLock === 'function') setUiLock(false);
  stopTimer();
  sounds.playClick();
  document.getElementById('quiz-dialog').close();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function startTimer() {
  if (safeLocalStorage.getItem('disableTimers') === 'true') return;
  if (timerDuration === 0) return;
  timeLeft = timerDuration;
  const bar = document.getElementById('timer-bar');
  const container = document.getElementById('timer-bar-container');
  container.style.display = 'block';
  bar.style.width = '100%';
  bar.style.background = 'linear-gradient(90deg, var(--accent), var(--accent-alt))';
  bar.classList.remove('timer-glow-warning');
  
  let lastTickStep = Math.floor(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    const pct = Math.max(0, (timeLeft / timerDuration) * 100);
    bar.style.width = pct + '%';

    // Premium Ticking: 1s interval normally, 0.5s interval in final 5 seconds
    const intervalVal = (timeLeft <= 5) ? 0.5 : 1.0;
    const currentTickStep = Math.floor(timeLeft / intervalVal);
    if (currentTickStep !== lastTickStep) {
      // Alternate high and low pitch tick-tock sounds
      sounds.playTickTock(currentTickStep % 2 === 0);
      lastTickStep = currentTickStep;
    }

    if (timeLeft <= 5) {
      bar.style.background = 'var(--error)';
      bar.classList.add('timer-glow-warning');
    }
    if (timeLeft <= 0) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopTimer();
      sounds.playBuzzer();
      document.getElementById('joker-arsenal').style.display = 'none';
      closeClassJoker();
      const opts = document.querySelectorAll('#options-container .option');
      opts.forEach((o, i) => {
        o.style.pointerEvents = 'none';
        if (i !== correctAnswer) {
          o.style.opacity = '0.5';
        }
      });
      if (opts[correctAnswer]) {
        opts[correctAnswer].classList.add('correct');
      }
      
      countries[currentCIdx].p[currentLvl] = 1;
      countries[currentCIdx].correct[currentLvl] = 0;
      if (typeof statsCategoryAnswers !== 'undefined' && statsCategoryAnswers[activeCategory]) statsCategoryAnswers[activeCategory].w++;

      const infoEl = document.getElementById('txt-turn-info');
      if (riskActive) {
        const penalty = 3;
        teams[activeTeam].score = teams[activeTeam].score - penalty;
        infoEl.innerText = `⏱ Zeit abgelaufen! ALLES ODER NICHTS VERLOREN! -${penalty} Punkte für ${teams[activeTeam].name}!`;
        infoEl.style.color = 'var(--error)';
      } else {
        infoEl.innerText = '⏱ Zeit abgelaufen! Kein Punkt für ' + teams[activeTeam].name;
        infoEl.style.color = 'var(--error)';
      }
      document.getElementById('next-btn').style.display = 'block';
    }
  }, 100);
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function askRiskQuestion() {
  sounds.playClick();
  document.getElementById('diff-buttons').style.display = 'none';
  document.getElementById('risk-prompt-area').style.display = 'block';
}

function loadQuestion(lvl, isRisk = false) {
  sounds.playClick();
  currentLvl = lvl;
  if (teams[activeTeam] && !teams[activeTeam].isBot) {
    humanLastChosenLvl = lvl;
  }
  riskActive = (lvl === 3) && isRisk;
  document.getElementById('risk-prompt-area').style.display = 'none';
  const countryName = countries[currentCIdx].n;

  // Retrieve question data which may be a single object or an array of objects
  let qData = (pool[activeCategory] && pool[activeCategory][countryName]) ? pool[activeCategory][countryName][lvl] : null;
  if (qData) {
    // If multiple questions are defined as an array, pick one at random
    if (Array.isArray(qData)) {
      const randomIdx = Math.floor(Math.random() * qData.length);
      qData = qData[randomIdx];
    }
    // Single question object case
    let shuffledQData = shuffleQuestionOptions(qData);
    correctAnswer = shuffledQData.a;
    setupQuestionUI(shuffledQData, lvl);
    return;
  }
  // Fallback to default pool[1] if specific category data missing
  const fallbackData = (pool[1] && pool[1][countryName]) ? pool[1][countryName][lvl] : null;
  if (fallbackData) {
    if (Array.isArray(fallbackData)) {
      const randomIdx = Math.floor(Math.random() * fallbackData.length);
      qData = fallbackData[randomIdx];
    } else {
      qData = fallbackData;
    }
    let shuffledFallback = shuffleQuestionOptions(qData);
    correctAnswer = shuffledFallback.a;
    setupQuestionUI(shuffledFallback, lvl);
    return;
  }
  alert(`Fehler: Keine Fragen für ${countryName} Level ${lvl}!`);
  document.getElementById('quiz-dialog').close();
}

function startMapClickingMode(questionText) {
  sounds.playClick();
  document.getElementById('quiz-dialog').close();
  document.getElementById('geo-banner-text').innerText = questionText;
  document.getElementById('geo-banner').style.display = 'block';
}

function setupGeoMapQuestionUI(countryName, lvl) {
  document.getElementById('diff-buttons').style.display = 'none';
  document.getElementById('txt-cancel').style.display = 'none';
  document.getElementById('q-area').style.display = 'block';
  
  const questionText = geoQuestions[countryName] || `Finde ${countryName} auf der Karte!`;
  document.getElementById('q-text').innerText = questionText;
  
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'none';
  nextBtn.onclick = closeQ;
  nextBtn.innerHTML = `Ergebnis sichern <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  
  document.getElementById('class-joker-container').style.display = 'none';
  document.getElementById('joker-arsenal').style.display = 'none';
  document.getElementById('q-explanation').style.display = 'none';
  
  const tipContainer = document.getElementById('q-tip-container');
  if (tipContainer) tipContainer.style.display = 'none';
  
  const riskContainer = document.getElementById('risk-container');
  if (lvl === 3 && riskActive) {
    riskContainer.style.display = 'flex';
    document.getElementById('risk-status-text').innerHTML = `💥 ALLES ODER NICTS AKTIV! (+6 / -3 Punkte)`;
    riskContainer.style.background = 'rgba(244, 63, 94, 0.12)';
    riskContainer.style.borderColor = 'rgba(244, 63, 94, 0.6)';
  } else {
    riskContainer.style.display = 'none';
  }

  document.getElementById('options-container').innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <p style="margin-bottom: 20px; font-weight: 700; color: var(--accent); font-family:'Space Grotesk',sans-serif;">
        Geografie-Frage! Du musst das richtige Land direkt auf der Karte anklicken!
      </p>
      <button class="btn-main" style="width: 100%; padding: 15px; font-weight:800;" onclick="startMapClickingMode('${questionText.replace(/'/g, "\\'")}')">
        Karte anzeigen & Land anklicken
      </button>
    </div>
  `;
}

function evaluateMapClick(idx) {
  mapSelectionActive = false;
  document.getElementById('geo-banner').style.display = 'none';

  const targetCountryName = mapTargetCountry;
  const clickedCountryName = countries[idx].n;
  const clickedCountryFlag = countries[idx].f;
  
  let pts = 0;
  let feedbackText = "";
  let feedbackColor = "var(--error)";
  let isCorrect = false;
  
  if (clickedCountryName === targetCountryName) {
    pts = currentLvl;
    if (riskActive) pts = 6;
    feedbackText = `Richtig! Du hast ${targetCountryName} gefunden!`;
    feedbackColor = "var(--success)";
    isCorrect = true;
    sounds.playSuccess();
  } else if (countryNeighbors[targetCountryName] && countryNeighbors[targetCountryName].includes(clickedCountryName)) {
    if (riskActive) {
      pts = 0;
      feedbackText = `Knapp daneben! ${clickedCountryName} ist ein Nachbarland, aber ALLES ODER NICHTS war aktiv!`;
      feedbackColor = "var(--error)";
    } else {
      pts = 1;
      feedbackText = `Knapp daneben! ${clickedCountryName} ist ein direktes Nachbarland.`;
      feedbackColor = "var(--gold)";
    }
    sounds.playError();
  } else {
    pts = 0;
    feedbackText = `Falsch! Das ist nicht ${targetCountryName}.`;
    feedbackColor = "var(--error)";
    sounds.playError();
  }

  if (isCorrect) {
    teams[activeTeam].score += pts;
    countries[currentCIdx].p[currentLvl] = 1;
    countries[currentCIdx].correct[currentLvl] = 1;
    
    const wasMasteredBefore = countries[currentCIdx].correct[1] && countries[currentCIdx].correct[2] && countries[currentCIdx].correct[3];
    const isMasteredNow = countries[currentCIdx].correct[1] && countries[currentCIdx].correct[2] && countries[currentCIdx].correct[3];
    if (isMasteredNow && !wasMasteredBefore) {
      justMasteredCIdx = currentCIdx;
    }
  } else {
    if (riskActive) {
      const penalty = 3;
      teams[activeTeam].score = teams[activeTeam].score - penalty;
      feedbackText += ` -${penalty} Punkte für ${teams[activeTeam].name}!`;
    }
    countries[currentCIdx].p[currentLvl] = 1;
    countries[currentCIdx].correct[currentLvl] = 0;
  }

  const dialog = document.getElementById('quiz-dialog');
  dialog.showModal();
  
  document.getElementById('q-title').innerText = targetCountryName;
  document.getElementById('txt-turn-info').innerText = `Karten-Auswertung: ${teams[activeTeam].name}`;
  document.getElementById('txt-turn-info').style.color = feedbackColor;
  
  document.getElementById('options-container').innerHTML = `
    <div style="padding: 20px; border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); text-align: center; animation: fadeIn 0.4s ease;">
      <div style="font-size: 3.5rem; margin-bottom: 15px;">${clickedCountryFlag}</div>
      <div style="font-weight: 800; font-size: 1.4rem; font-family:'Space Grotesk',sans-serif;">Auswahl: ${clickedCountryName}</div>
      <div style="font-size: 1.15rem; margin-top: 15px; color: ${feedbackColor}; font-weight: 700; line-height: 1.4;">${feedbackText}</div>
      <div style="margin-top: 15px; font-weight: 800; color: var(--accent); font-size: 1.1rem;">Gewonnene Punkte: ${pts} PTS</div>
    </div>
  `;

  const explanation = getExplanation(geoQuestions[targetCountryName] || "", targetCountryName);
  const isFallback = explanation.startsWith("Wusstest du schon?");
  
  if (!isFallback) {
    document.getElementById('q-explanation-text').innerHTML = explanation;
    document.getElementById('q-explanation').style.display = 'block';
  } else {
    document.getElementById('q-explanation').style.display = 'none';
  }

  const nextBtn = document.getElementById('next-btn');
  nextBtn.onclick = closeQ;
  nextBtn.innerHTML = `Ergebnis sichern <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  nextBtn.style.display = 'block';
}

function setupQuestionUI(qData, lvl) {
  document.getElementById('diff-buttons').style.display = 'none';
  document.getElementById('txt-cancel').style.display = 'none';
  document.getElementById('q-area').style.display = 'block';
  document.getElementById('q-text').innerText = qData.q;

  // Handle Dropdown Hint Menu for Level 2 & 3
  const tipContainer = document.getElementById('q-tip-container');
  if (tipContainer) {
    if (qData.tip && lvl > 1) {
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
  
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'none';
  nextBtn.onclick = closeQ;
  nextBtn.innerHTML = `Ergebnis sichern <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  
  document.getElementById('class-joker-container').style.display = 'none';
  document.getElementById('q-explanation').style.display = 'none';
  document.getElementById('revive-btn').style.display = 'none';
  rescueActive = false;
  sounds.setMusicState('question');
  
  currentQuestionData = qData;

  // Joker Arsenal permission logic
  let allow50 = false;
  let allowClass = false;
  let allowRescue = false;
  
  if (lvl === 2) {
    allow50 = true;
    allowRescue = true;
  } else if (lvl === 3) {
    if (riskActive) {
      allow50 = true;
    } else {
      allow50 = true;
      allowClass = true;
      allowRescue = true;
    }
  }

  const team = (teams && teams[activeTeam]) ? teams[activeTeam] : { name: "Team 1", jokers: { fiftyFifty: 0, class: 0, rescue: 0 } };
  const jokers = (team && team.jokers) ? team.jokers : { fiftyFifty: 0, class: 0, rescue: 0 };
  const arsenal = document.getElementById('joker-arsenal');
  const anyJoker = (allow50 && jokers.fiftyFifty > 0) || 
                   (allowClass && jokers.class > 0) || 
                   (allowRescue && jokers.rescue > 0);
  if (arsenal) arsenal.style.display = anyJoker ? 'flex' : 'none';
  
  const j50 = document.getElementById('joker-5050');
  if (j50) {
    j50.style.display = (allow50 && jokers.fiftyFifty > 0) ? 'inline-flex' : 'none';
    j50.innerText = `50:50 Joker (${jokers.fiftyFifty || 0}x) (-1pt)`;
  }
  
  const jcl = document.getElementById('joker-class');
  if (jcl) {
    jcl.style.display = (allowClass && jokers.class > 0) ? 'inline-flex' : 'none';
    jcl.innerText = `Klassen-Umfrage (${jokers.class || 0}x) (-1pt)`;
  }
  
  const jre = document.getElementById('joker-rescue');
  if (jre) {
    jre.style.display = (allowRescue && jokers.rescue > 0) ? 'inline-flex' : 'none';
    jre.innerText = `Retter-Joker (${jokers.rescue || 0}x) (-1pt)`;
  }

  const jswap = document.getElementById('joker-swap');
  if (jswap) {
    jswap.style.display = 'none';
  }

  // Alles oder Nichts visual indicator (Level III only)
  const riskContainer = document.getElementById('risk-container');
  if (lvl === 3 && riskActive) {
    riskContainer.style.display = 'flex';
    document.getElementById('risk-status-text').innerHTML = `💥 ALLES ODER NICHTS AKTIV! (+6 / -3 Punkte)`;
    riskContainer.style.background = 'rgba(244, 63, 94, 0.12)';
    riskContainer.style.borderColor = 'rgba(244, 63, 94, 0.6)';
  } else {
    riskContainer.style.display = 'none';
  }

  document.getElementById('options-container').innerHTML = qData.o.map((opt, i) =>
    `<div class="option" id="opt-${i}" onclick="check(${i})">
       <span class="option-badge">${String.fromCharCode(65+i)}</span>
       <span>${opt}</span>
     </div>`
  ).join('');

  startTimer();
  speakCurrentQuestion();
}

function use5050() {
  if (teams[activeTeam].jokers.fiftyFifty <= 0) return;
  sounds.playJoker();
  jokerUsed = true;
  teams[activeTeam].jokers.fiftyFifty--;
  teams[activeTeam].score--;
  let indices = [0,1,2,3].filter(i => i !== correctAnswer).sort(() => Math.random()-0.5);
  [document.getElementById(`opt-${indices[0]}`), document.getElementById(`opt-${indices[1]}`)].forEach(el => {
    if (el) el.classList.add('glitch-out');
  });
  
  const btn = document.getElementById('joker-5050');
  btn.innerText = `50:50 Joker (${teams[activeTeam].jokers.fiftyFifty}x) (-1pt)`;
  btn.style.display = 'none';
}

function useClassJoker() {
  if (teams[activeTeam].jokers.class <= 0) return;
  sounds.playJoker();
  jokerUsed = true;
  teams[activeTeam].jokers.class--;
  teams[activeTeam].score--;
  
  const btn = document.getElementById('joker-class');
  btn.innerText = `Klassen-Umfrage (${teams[activeTeam].jokers.class}x) (-1pt)`;
  btn.style.display = 'none';
  
  const probCorrect = currentLvl === 1 ? 0.85 : (currentLvl === 2 ? 0.65 : 0.35);
  const remaining = 1 - probCorrect;
  let wrongShares = [];
  let total = remaining;
  for (let i = 0; i < 2; i++) { const s = Math.random() * total * 0.6; wrongShares.push(s); total -= s; }
  wrongShares.push(total);
  wrongShares.sort(() => Math.random() - 0.5);
  let pcts = [0,0,0,0];
  let wi = 0;
  for (let i = 0; i < 4; i++) pcts[i] = (i === correctAnswer) ? probCorrect : wrongShares[wi++];
  const labels = ['A','B','C','D'];
  const colors = ['var(--accent)','var(--accent-alt)','var(--gold)','var(--success)'];
  document.getElementById('class-chart-bars').innerHTML = pcts.map((p, i) => `
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-weight:800;font-family:'Space Grotesk',sans-serif;color:${colors[i]};width:18px;">${labels[i]}</span>
      <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:8px;overflow:hidden;height:22px;">
        <div style="width:0%;height:100%;background:${colors[i]};border-radius:8px;transition:width 0.8s cubic-bezier(0.4,0,0.2,1);opacity:0.8;" id="bar-fill-${i}"></div>
      </div>
      <span style="font-weight:700;font-size:0.85rem;width:35px;text-align:right;" id="bar-label-${i}">0%</span>
    </div>`).join('');
  document.getElementById('class-joker-container').style.display = 'block';
  setTimeout(() => {
    pcts.forEach((p, i) => {
      const f = document.getElementById(`bar-fill-${i}`);
      const l = document.getElementById(`bar-label-${i}`);
      if (f) f.style.width = Math.round(p*100)+'%';
      if (l) l.innerText = Math.round(p*100)+'%';
    });
  }, 80);
}

function closeClassJoker() {
  document.getElementById('class-joker-container').style.display = 'none';
}

function useRescueJoker() {
  if (teams[activeTeam].jokers.rescue <= 0) return;
  sounds.playRescue();
  jokerUsed = true;
  teams[activeTeam].jokers.rescue--;
  teams[activeTeam].score--;
  rescueActive = true;
  
  const btn = document.getElementById('joker-rescue');
  btn.innerText = `Retter-Joker (${teams[activeTeam].jokers.rescue}x) (-1pt)`;
  btn.style.display = 'none';
  
  const infoEl = document.getElementById('txt-turn-info');
  const orig = infoEl.innerText;
  infoEl.innerText = '🛡 Retter-Joker aktiv! Du hast eine zweite Chance!';
  infoEl.style.color = 'var(--accent-alt)';
  setTimeout(() => { infoEl.innerText = orig; infoEl.style.color = 'var(--accent)'; }, 2500);
}

function spawnMasteryParticles(el) {
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'mastery-particle';
    p.style.left = '50%';
    p.style.top = '50%';
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 85 + 35;
    const tx = Math.sin(angle) * distance;
    const ty = Math.cos(angle) * distance - 25;
    p.style.setProperty('--tx', `${tx}px`);
    p.style.setProperty('--ty', `${ty}px`);
    p.style.background = Math.random() > 0.45 ? 'var(--gold)' : 'var(--accent)';
    p.style.boxShadow = `0 0 6px ${p.style.background}`;
    el.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function showCampaignExplanation() {
  if (currentQuestionData) {
    const explanation = currentQuestionData.exp || getExplanation(currentQuestionData.q, currentQuestionData.o[correctAnswer]);
    const isFallback = explanation.startsWith("Wusstest du schon?");
    if (!isFallback) {
      document.getElementById('q-explanation-text').innerHTML = explanation;
      document.getElementById('q-explanation').style.display = 'block';
    } else {
      document.getElementById('q-explanation').style.display = 'none';
    }
  }
}

function check(idx) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  const opts = document.querySelectorAll('#options-container .option');
  
  // Collapse class opinion chart automatically when option is selected
  closeClassJoker();
  
  // Hide joker arsenal immediately so jokers cannot be used after answering
  document.getElementById('joker-arsenal').style.display = 'none';

  if (idx === correctAnswer) {
    stopTimer();
    opts.forEach(o => o.style.pointerEvents = 'none');
    sounds.playSuccess();
    if (typeof trackLifetimeAnswer === 'function') trackLifetimeAnswer(true);
    opts[idx].classList.add('correct');
    if (typeof statsCategoryAnswers !== 'undefined' && statsCategoryAnswers[activeCategory]) statsCategoryAnswers[activeCategory].c++;
    
    // Mastery checks
    const wasMasteredBefore = countries[currentCIdx].correct[1] && countries[currentCIdx].correct[2] && countries[currentCIdx].correct[3];
    countries[currentCIdx].p[currentLvl] = 1;
    countries[currentCIdx].correct[currentLvl] = 1;
    countries[currentCIdx].teamCorrect[currentLvl] = activeTeam;
    const isMasteredNow = countries[currentCIdx].correct[1] && countries[currentCIdx].correct[2] && countries[currentCIdx].correct[3];
    if (isMasteredNow && !wasMasteredBefore) {
      justMasteredCIdx = currentCIdx;
    }

    let pts = currentLvl;
    if (riskActive) pts = 6; // Number of points
    
    let completedBySameTeam = false;
    if (isMasteredNow && !wasMasteredBefore) {
      if (countries[currentCIdx].teamCorrect[1] === activeTeam &&
          countries[currentCIdx].teamCorrect[2] === activeTeam &&
          countries[currentCIdx].teamCorrect[3] === activeTeam) {
        pts = pts * 2; // double points!
        completedBySameTeam = true;
      }
    }
    
    teams[activeTeam].score += pts;
    
    if (riskActive) {
      document.getElementById('txt-turn-info').innerText = `🏆 ALLES ODER NICHTS GEWONNEN! +6 Punkte für ${teams[activeTeam].name}!`;
      document.getElementById('txt-turn-info').style.color = 'var(--gold)';
    } else if (completedBySameTeam) {
      document.getElementById('txt-turn-info').innerText = `⭐ LAND REIN VOM TEAM GEMEISTERT! Doppelte Punkte (+${pts} PTS) für ${teams[activeTeam].name}!`;
      document.getElementById('txt-turn-info').style.color = 'var(--gold)';
    }
    
    rescueActive = false;
    showCampaignExplanation();
    const isBot = teams[activeTeam] && teams[activeTeam].isBot;
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.style.display = isBot ? 'none' : 'block';
      nextBtn.style.pointerEvents = isBot ? 'none' : 'auto';
    }
  } else {
    if (rescueActive) {
      rescueActive = false;
      sounds.playError();
      opts[idx].classList.add('wrong');
      opts[idx].style.pointerEvents = 'none';
      jokerUsed = true;
      const infoEl = document.getElementById('txt-turn-info');
      infoEl.innerText = '❌ Falsch! Retter-Joker aktiv – rate nochmal!';
      infoEl.style.color = 'var(--error)';
    } else {
      if (typeof statsCategoryAnswers !== 'undefined' && statsCategoryAnswers[activeCategory]) statsCategoryAnswers[activeCategory].w++;
      stopTimer();
      opts.forEach(o => o.style.pointerEvents = 'none');
      sounds.playError();
      if (typeof trackLifetimeAnswer === 'function') trackLifetimeAnswer(false);
      opts[idx].classList.add('wrong');
      opts[correctAnswer].classList.add('correct');
      
      countries[currentCIdx].p[currentLvl] = 1;
      countries[currentCIdx].correct[currentLvl] = 0;
      countries[currentCIdx].teamCorrect[currentLvl] = null;

      if (riskActive) {
        const penalty = 3; // Alles oder Nichts penalty
        teams[activeTeam].score = teams[activeTeam].score - penalty;
        document.getElementById('txt-turn-info').innerText = `💸 ALLES ODER NICHTS VERLOREN! -${penalty} Punkte für ${teams[activeTeam].name}!`;
        document.getElementById('txt-turn-info').style.color = 'var(--error)';
      }
      showCampaignExplanation();
      const isBot = teams[activeTeam] && teams[activeTeam].isBot;
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn) {
        nextBtn.style.display = isBot ? 'none' : 'block';
        nextBtn.style.pointerEvents = isBot ? 'none' : 'auto';
      }
    }
  }
}

function hasPlayableQuestions() {
  return countries.some(c => !c.p[1] || !c.p[2] || !c.p[3]);
}

function closeQ() {
  if (typeof clearBotTimeouts === 'function') clearBotTimeouts();
  if (typeof setUiLock === 'function') setUiLock(false);
  stopTimer();
  sounds.setMusicState('menu');
  sounds.playClick();
  document.getElementById('quiz-dialog').close();
  document.getElementById('txt-turn-info').style.color = 'var(--accent)';
  
  if (!hasPlayableQuestions()) { endGame(); return; }
  
  if (activeTeam === teams.length - 1) {
    if (currentRound >= maxRounds) { endGame(); return; }
    currentRound++;
    document.getElementById('round-counter').innerText = `Runde: ${currentRound} / ${maxRounds}`;
    activeTeam = 0;
  } else {
    activeTeam++;
  }
  
  renderScoreboard();
  renderGrid();

  // If a country was mastered completely in this step, trigger particle rain!
  if (justMasteredCIdx !== null) {
    const cards = document.querySelectorAll('#grid .card');
    if (cards[justMasteredCIdx]) {
      // Trigger particles burst
      spawnMasteryParticles(cards[justMasteredCIdx]);
      // Play a little success chime
      sounds.playSuccess();
    }
    justMasteredCIdx = null;
  }
  checkBotTurn();
}
