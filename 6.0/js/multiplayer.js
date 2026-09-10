let duelP1Name = "Spieler 1";
let duelP2Name = "Spieler 2";
let duelP1Score = 0;
let duelP2Score = 0;
let duelP2Type = "human"; // "human" or "bot"
let duelBotDifficulty = "easy"; // "easy", "medium", "hard", "elite"
let duelRoundsMax = 10;
let duelCurrentRound = 0;
let duelCategory = "all";
let duelQuestions = [];
let duelCurrentQuestion = null;
let duelBuzzerActive = false;
let duelBuzzerOwner = 0; // 0 = none, 1 = player 1, 2 = player 2/bot
let duelBuzzerTimeLeft = 8;
let duelBuzzerInterval = null;
let duelMainTimerValue = 15;
let duelMainTimerInterval = null;
let duelBotTimeout = null;
let duelAnsweredPlayers = {}; // Track who answered or failed this round
let duelStealActive = false; // True if one player failed and the other can steal

let duelBuzzerListener = null;
let duelAnswerListener = null;

function duelToggleP2Type() {
  sounds.playClick();
  const type = document.getElementById('duel-p2-type').value;
  duelP2Type = type;
  if (type === 'human') {
    document.getElementById('duel-p2-human-name-group').style.display = 'block';
    document.getElementById('duel-p2-bot-difficulty-group').style.display = 'none';
  } else {
    document.getElementById('duel-p2-human-name-group').style.display = 'none';
    document.getElementById('duel-p2-bot-difficulty-group').style.display = 'block';
  }
}

function duelBackToModeSelect() {
  sounds.playClick();
  document.getElementById('duel-setup-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function duelStartGame() {
  sounds.init();
  if (typeof trackLifetimeGameStarted === 'function') trackLifetimeGameStarted();
  
  if (duelModeType === 'mobile') {
    duelP1Name = (duelMobilePlayers.player1 && duelMobilePlayers.player1.name) || "Spieler 1";
    duelP2Name = (duelMobilePlayers.player2 && duelMobilePlayers.player2.name) || "Spieler 2";
    duelP2Type = 'human';
    
    // Setup Firebase Duel Room Listeners
    if (duelBuzzerListener) duelRoomRef.child('buzzerOwner').off('value', duelBuzzerListener);
    if (duelAnswerListener) duelRoomRef.child('answerSubmitted').off('value', duelAnswerListener);
    
    duelBuzzerListener = duelRoomRef.child('buzzerOwner').on('value', snapshot => {
      const val = snapshot.val();
      if (val) {
        const p1 = duelMobilePlayers.player1;
        const playerNum = (p1 && val === p1.uid) ? 1 : 2;
        
        if (!duelBuzzerActive && !duelStealActive) {
          duelTriggerBuzzer(playerNum);
        } else if (duelStealActive && !duelBuzzerActive) {
          const remainingPlayer = duelAnsweredPlayers[1] ? 2 : 1;
          if (playerNum === remainingPlayer) {
            duelTriggerBuzzer(playerNum);
          }
        }
      }
    });
    
    duelAnswerListener = duelRoomRef.child('answerSubmitted').on('value', snapshot => {
      const submission = snapshot.val();
      if (submission && duelBuzzerActive) {
        const p1 = duelMobilePlayers.player1;
        const p2 = duelMobilePlayers.player2;
        const expectedPlayerId = duelBuzzerOwner === 1 ? (p1 ? p1.uid : '') : (p2 ? p2.uid : '');
        if (submission.playerId === expectedPlayerId) {
          duelSubmitAnswer(submission.index);
        }
      }
    });
    
    duelRoomRef.update({
      state: 'game',
      currentQuestionIndex: 0,
      scores: { player1: 0, player2: 0 }
    });
  } else {
    duelP1Name = document.getElementById('duel-p1-name').value.trim() || "Spieler 1";
    if (duelP2Type === 'human') {
      duelP2Name = document.getElementById('duel-p2-name').value.trim() || "Spieler 2";
      if (duelP1Name.toLowerCase() === duelP2Name.toLowerCase()) {
        const err = document.getElementById('duel-setup-err');
        err.innerText = "Die Namen müssen unterschiedlich sein!";
        err.style.display = 'block';
        sounds.playError();
        return;
      }
    } else {
      duelP2Name = "Bot Klaus 🤖";
      duelBotDifficulty = document.getElementById('duel-bot-difficulty').value;
    }
  }
  
  document.getElementById('duel-setup-err').style.display = 'none';
  sounds.playSuccess();
  document.getElementById('duel-finish-screen').style.display = 'none';
  
  duelRoundsMax = parseInt(document.getElementById('duel-rounds').value) || 10;
  duelCategory = document.getElementById('duel-category').value;
  
  duelQuestions = mpGenerateSessionQuestions(duelRoundsMax, duelCategory);
  
  duelP1Score = 0;
  duelP2Score = 0;
  duelCurrentRound = 0;
  
  document.getElementById('duel-p1-disp-name').innerText = duelP1Name;
  document.getElementById('duel-p2-disp-name').innerText = duelP2Name;
  
  document.getElementById('duel-setup-screen').style.display = 'none';
  document.getElementById('duel-game-screen').style.display = 'flex';
  
  // If touch devices: show side buzzers (only in local mode)
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouch && duelModeType === 'local') {
    document.getElementById('duel-touch-buzzer-1').style.display = 'flex';
    if (duelP2Type === 'human') {
      document.getElementById('duel-touch-buzzer-2').style.display = 'flex';
    } else {
      document.getElementById('duel-touch-buzzer-2').style.display = 'none';
    }
  } else {
    document.getElementById('duel-touch-buzzer-1').style.display = 'none';
    document.getElementById('duel-touch-buzzer-2').style.display = 'none';
  }
  
  duelLoadQuestion();
}

function duelLoadQuestion() {
  if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
  if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
  if (duelBotTimeout) clearTimeout(duelBotTimeout);
  
  duelBuzzerActive = false;
  duelBuzzerOwner = 0;
  duelStealActive = false;
  duelAnsweredPlayers = {};
  
  // Reset UI
  if (duelModeType === 'mobile') {
    document.getElementById('duel-status-banner').innerText = "Warte auf Buzzer am Handy...";
  } else {
    document.getElementById('duel-status-banner').innerText = `Drücke [F] für ${duelP1Name}, [J] für ${duelP2Name}`;
  }
  document.getElementById('duel-status-banner').style.background = 'rgba(255,255,255,0.01)';
  document.getElementById('duel-status-banner').style.color = 'var(--accent)';
  
  const grid = document.getElementById('duel-options-grid');
  grid.style.opacity = '1';
  grid.style.pointerEvents = 'none';
  
  for (let i = 0; i < 4; i++) {
    const optDiv = document.getElementById('duel-opt-' + i);
    if (optDiv) {
      optDiv.classList.remove('correct', 'wrong');
      optDiv.style.background = '';
      optDiv.style.borderColor = '';
    }
  }
  
  document.getElementById('duel-next-btn').style.display = 'none';
  document.getElementById('duel-controls').style.display = 'none';
  document.getElementById('duel-explanation').style.display = 'none';
  
  // Load question data
  const rawQ = duelQuestions[duelCurrentRound];
  duelCurrentQuestion = shuffleQuestionOptions(rawQ);
  
  if (duelModeType === 'mobile') {
    duelRoomRef.update({
      answerSubmitted: null,
      buzzerOwner: null,
      stealPossible: null,
      currentQuestion: {
        categoryName: mpGetCategoryName(rawQ.category),
        q: duelCurrentQuestion.q,
        o: duelCurrentQuestion.o,
        correctOption: duelCurrentQuestion.a,
        buzzerOwner: null,
        stealPossible: false,
        answerStatus: 'buzzing'
      },
      answerStatus: 'buzzing',
      currentQuestionIndex: duelCurrentRound
    });
  }
  
  document.getElementById('duel-round-counter').innerText = `Frage ${duelCurrentRound + 1} von ${duelRoundsMax}`;
  document.getElementById('duel-q-category').innerText = mpGetCategoryName(rawQ.category);
  document.getElementById('duel-question-text').innerHTML = duelCurrentQuestion.q;
  
  for (let i = 0; i < 4; i++) {
    document.getElementById('duel-opt-' + i).querySelector('.opt-text').innerText = duelCurrentQuestion.o[i];
  }
  
  // Update scores
  document.getElementById('duel-p1-disp-score').innerText = duelP1Score + " PTS";
  document.getElementById('duel-p2-disp-score').innerText = duelP2Score + " PTS";
  
  sounds.setMusicState('question');
  
  // Start dynamic timer
  const limitEl = document.getElementById('duel-timer-limit');
  const limitVal = limitEl ? parseInt(limitEl.value) : 15;
  duelMainTimerValue = isNaN(limitVal) ? 15 : limitVal;
  
  const timerCircle = document.getElementById('duel-timer-circle');
  
  if (duelMainTimerValue === 0) {
    timerCircle.innerText = "∞";
    timerCircle.style.color = 'var(--accent)';
    timerCircle.style.borderColor = 'var(--accent)';
  } else {
    timerCircle.innerText = duelMainTimerValue;
    timerCircle.style.color = 'var(--accent)';
    timerCircle.style.borderColor = 'var(--accent)';
    
    if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
    duelMainTimerInterval = setInterval(() => {
      duelMainTimerValue--;
      timerCircle.innerText = duelMainTimerValue;
      if (duelMainTimerValue <= 5) {
        timerCircle.style.color = 'var(--error)';
        timerCircle.style.borderColor = 'var(--error)';
        sounds.playTickTock();
      }
      if (duelMainTimerValue <= 0) {
        clearInterval(duelMainTimerInterval);
        duelRevealAnswer(true); // Timeout
      }
    }, 1000);
  }
  
  // Setup Bot Klaus if enabled and active
  if (duelP2Type === 'bot') {
    duelSetupBotReaction();
  }
}

function duelSetupBotReaction() {
  let reactionMin = 2000;
  let reactionMax = 7000;
  
  if (duelBotDifficulty === 'medium') {
    reactionMin = 1500; reactionMax = 5000;
  } else if (duelBotDifficulty === 'hard') {
    reactionMin = 800; reactionMax = 3000;
  } else if (duelBotDifficulty === 'elite') {
    reactionMin = 300; reactionMax = 1200;
  }
  
  const reactionTime = Math.random() * (reactionMax - reactionMin) + reactionMin;
  duelBotTimeout = setTimeout(() => {
    if (!duelBuzzerActive && !duelAnsweredPlayers[2]) {
      duelTriggerBuzzer(2);
    }
  }, reactionTime);
}

function duelTriggerBuzzer(playerNum) {
  if (duelBuzzerActive) return; // Already buzzed
  if (duelAnsweredPlayers[playerNum]) return; // Already answered
  
  sounds.playClick();
  
  // Stop main timer
  if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
  if (duelBotTimeout) clearTimeout(duelBotTimeout);
  
  duelBuzzerActive = true;
  duelBuzzerOwner = playerNum;
  
  const banner = document.getElementById('duel-status-banner');
  const name = playerNum === 1 ? duelP1Name : duelP2Name;
  banner.innerText = `🚨 ${name} am Zug! 🚨`;
  banner.style.background = playerNum === 1 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)';
  banner.style.color = playerNum === 1 ? '#3b82f6' : '#ef4444';
  
  // Highlight side
  const timerCircle = document.getElementById('duel-timer-circle');
  timerCircle.style.borderColor = playerNum === 1 ? '#3b82f6' : '#ef4444';
  
  // If human: enable click grid (only if local play, as in mobile play the player answers on their phone)
  if (duelModeType === 'local' && (playerNum === 1 || (playerNum === 2 && duelP2Type === 'human'))) {
    const grid = document.getElementById('duel-options-grid');
    grid.style.opacity = '1';
    grid.style.pointerEvents = 'auto';
  }
  
  // Sync to Firebase for Mobile Duel mode
  if (duelModeType === 'mobile') {
    duelRoomRef.update({
      buzzerOwner: playerNum === 1 ? 'player1' : 'player2',
      answerStatus: 'answering',
      'currentQuestion/buzzerOwner': playerNum === 1 ? 'player1' : 'player2',
      'currentQuestion/answerStatus': 'answering'
    });
  }
  
  // Start 10 seconds response timer
  duelBuzzerTimeLeft = 10;
  timerCircle.innerText = duelBuzzerTimeLeft;
  
  duelBuzzerInterval = setInterval(() => {
    duelBuzzerTimeLeft--;
    timerCircle.innerText = duelBuzzerTimeLeft;
    if (duelBuzzerTimeLeft <= 0) {
      clearInterval(duelBuzzerInterval);
      // Timeout equals wrong answer
      duelEvaluateAnswer(false);
    }
  }, 1000);
  
  // If bot buzzed: simulate bot answering
  if (playerNum === 2 && duelP2Type === 'bot') {
    let accuracy = 0.5; // easy
    if (duelBotDifficulty === 'medium') accuracy = 0.75;
    else if (duelBotDifficulty === 'hard') accuracy = 0.9;
    else if (duelBotDifficulty === 'elite') accuracy = 0.98;
    
    const isCorrect = Math.random() < accuracy;
    let botAnsIdx = duelCurrentQuestion.a;
    if (!isCorrect) {
      // Pick random wrong option
      const wrongOptions = [0, 1, 2, 3].filter(idx => idx !== botAnsIdx);
      botAnsIdx = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    }
    
    // Simulate thinking delay for Bot selection
    setTimeout(() => {
      // Highlight Bot's selection
      const optDiv = document.getElementById('duel-opt-' + botAnsIdx);
      optDiv.style.borderColor = '#ef4444';
      optDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      
      setTimeout(() => {
        if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
        duelEvaluateAnswer(isCorrect, botAnsIdx);
      }, 1000);
    }, 1200);
  }
}

function duelSubmitAnswer(ansIdx, isBotCall = false) {
  if (!duelBuzzerActive) return;
  if (duelBuzzerOwner === 2 && duelP2Type === 'bot' && !isBotCall) return; // Bot handles its own submissions
  if (!duelCurrentQuestion) return;
  
  if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
  
  if (ansIdx === -1) {
    duelPassSteal();
    return;
  }
  
  const isCorrect = (ansIdx === duelCurrentQuestion.a);
  
  // Highlight player's selection
  const optDiv = document.getElementById('duel-opt-' + ansIdx);
  const color = duelBuzzerOwner === 1 ? '#3b82f6' : '#ef4444';
  optDiv.style.borderColor = color;
  optDiv.style.background = duelBuzzerOwner === 1 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  
  setTimeout(() => {
    duelEvaluateAnswer(isCorrect, ansIdx);
  }, 500);
}

function duelEvaluateAnswer(isCorrect, ansIdx) {
  duelAnsweredPlayers[duelBuzzerOwner] = true;
  
  const playerName = duelBuzzerOwner === 1 ? duelP1Name : duelP2Name;
  const isBuzzerTimeout = (ansIdx === undefined);
  
  if (isCorrect) {
    sounds.playSuccess();
    if (duelBuzzerOwner === 1) {
      duelP1Score += 10;
    } else {
      duelP2Score += 10;
    }
    if (duelModeType === 'mobile') {
      duelRoomRef.child('scores').set({
        player1: duelP1Score,
        player2: duelP2Score
      });
    }
    duelRevealAnswer(false);
  } else {
    sounds.playError();
    if (duelBuzzerOwner === 1) {
      duelP1Score -= 5;
    } else {
      duelP2Score -= 5;
    }
    if (duelModeType === 'mobile') {
      duelRoomRef.child('scores').set({
        player1: duelP1Score,
        player2: duelP2Score
      });
    }
    
    // Update score displays instantly
    document.getElementById('duel-p1-disp-score').innerText = duelP1Score + " PTS";
    document.getElementById('duel-p2-disp-score').innerText = duelP2Score + " PTS";
    
    // Check if other player can steal
    const otherPlayer = duelBuzzerOwner === 1 ? 2 : 1;
    if (!duelAnsweredPlayers[otherPlayer]) {
      // Steal state - directly owned by otherPlayer!
      duelBuzzerOwner = otherPlayer;
      duelStealActive = true;
      duelBuzzerActive = true;
      
      const grid = document.getElementById('duel-options-grid');
      grid.style.opacity = '1';
      grid.style.pointerEvents = 'auto';
      
      const otherName = otherPlayer === 1 ? duelP1Name : duelP2Name;
      
      // Show skip/pass button (only on host if local, otherwise only on the smartphone)
      document.getElementById('duel-controls').style.display = 'flex';
      if (duelModeType === 'local' && !(otherPlayer === 2 && duelP2Type === 'bot')) {
        document.getElementById('duel-pass-btn').style.display = 'block';
      } else {
        document.getElementById('duel-pass-btn').style.display = 'none';
      }
      document.getElementById('duel-next-btn').style.display = 'none';
      
      if (duelModeType === 'mobile') {
        const otherPlayerId = otherPlayer === 1 ? 'player1' : 'player2';
        const timeoutMsg = isBuzzerTimeout ? `⏳ Zeit abgelaufen! ${otherName} kann am Handy abstauben!` : `❌ Falsch! ${otherName} kann am Handy abstauben!`;
        document.getElementById('duel-status-banner').innerText = timeoutMsg;
        
        duelRoomRef.update({
          buzzerOwner: otherPlayerId,
          answerSubmitted: null,
          stealPossible: true,
          allowedPlayerId: otherPlayerId,
          answerStatus: 'steal',
          'currentQuestion/buzzerOwner': otherPlayerId,
          'currentQuestion/stealPossible': true,
          'currentQuestion/allowedPlayerId': otherPlayerId,
          'currentQuestion/answerStatus': 'steal'
        });
      } else {
        const timeoutMsg = isBuzzerTimeout ? `⏳ Zeit abgelaufen für ${playerName}! ${otherName} kann abstauben!` : `❌ Falsch! ${otherName} kann abstauben!`;
        document.getElementById('duel-status-banner').innerText = timeoutMsg;
      }
      
      document.getElementById('duel-status-banner').style.background = 'rgba(251, 191, 36, 0.1)';
      document.getElementById('duel-status-banner').style.color = 'var(--gold)';
      
      // Start remaining response time of 15 seconds for steal answer
      duelMainTimerValue = 15;
      const timerCircle = document.getElementById('duel-timer-circle');
      timerCircle.innerText = duelMainTimerValue;
      timerCircle.style.borderColor = 'var(--gold)';
      timerCircle.style.color = 'var(--gold)';
      
      if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
      duelMainTimerInterval = setInterval(() => {
        duelMainTimerValue--;
        timerCircle.innerText = duelMainTimerValue;
        if (duelMainTimerValue <= 0) {
          clearInterval(duelMainTimerInterval);
          // Steal timeout -> nobody steals, reveal correct answer
          duelRevealAnswer(true); 
        }
      }, 1000);
      
      if (otherPlayer === 2 && duelP2Type === 'bot') {
        // Bot steals / decides automatically after delay
        const delay = 1500 + Math.random() * 2000;
        duelBotTimeout = setTimeout(() => {
          if (!duelStealActive) return;
          const botDiff = document.getElementById('duel-bot-difficulty').value || 'easy';
          const passChance = botDiff === 'easy' ? 0.35 : (botDiff === 'medium' ? 0.2 : 0.05);
          if (Math.random() < passChance) {
            duelPassSteal(true);
          } else {
            let accuracy = 0.5;
            if (botDiff === 'medium') accuracy = 0.75;
            else if (botDiff === 'hard') accuracy = 0.9;
            else if (botDiff === 'elite') accuracy = 0.98;
            
            const botCorrect = Math.random() < accuracy;
            let ansIdx = duelCurrentQuestion.a;
            if (!botCorrect) {
              const wrongs = [0, 1, 2, 3].filter(idx => idx !== duelCurrentQuestion.a);
              ansIdx = wrongs[Math.floor(Math.random() * wrongs.length)];
            }
            duelBuzzerOwner = 2;
            duelBuzzerActive = true;
            duelSubmitAnswer(ansIdx, true);
          }
        }, delay);
      }
    } else {
      // Both got it wrong / timed out
      if (isBuzzerTimeout) {
        duelRevealAnswer(true); // show Timeout
      } else {
        duelRevealAnswer(false);
      }
    }
  }
}

function duelRevealAnswer(isTimeout) {
  if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
  if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
  if (duelBotTimeout) clearTimeout(duelBotTimeout);
  
  duelBuzzerActive = false;
  duelStealActive = false;
  
  const correctIdx = duelCurrentQuestion.a;
  const correctText = duelCurrentQuestion.o[correctIdx];
  const explanation = mpGetExplanation(duelCurrentQuestion, correctText);
  
  // Highlight correct and wrong options
  for (let i = 0; i < 4; i++) {
    const optDiv = document.getElementById('duel-opt-' + i);
    if (optDiv) {
      if (i === correctIdx) {
        optDiv.classList.add('correct');
      } else {
        optDiv.classList.add('wrong');
      }
      optDiv.style.background = '';
      optDiv.style.borderColor = '';
    }
  }
  
  const banner = document.getElementById('duel-status-banner');
  if (isTimeout) {
    banner.innerText = `⏳ Zeit abgelaufen! Die richtige Antwort ist ${correctText}`;
    banner.style.background = 'rgba(255, 255, 255, 0.05)';
    banner.style.color = 'var(--text-secondary)';
    sounds.playError();
  } else {
    banner.innerText = `Richtige Antwort: ${correctText}`;
    banner.style.background = 'rgba(16, 185, 129, 0.1)';
    banner.style.color = 'var(--success)';
  }
  
  // Show explanation
  const explEl = document.getElementById('duel-explanation');
  if (explanation && !explanation.startsWith("Wusstest du schon?")) {
    explEl.innerHTML = explanation;
    explEl.style.display = 'block';
  } else {
    explEl.style.display = 'none';
  }
  
  // Disable option clicks
  const grid = document.getElementById('duel-options-grid');
  grid.style.opacity = '1';
  grid.style.pointerEvents = 'none';
  
  // Update scores
  document.getElementById('duel-p1-disp-score').innerText = duelP1Score + " PTS";
  document.getElementById('duel-p2-disp-score').innerText = duelP2Score + " PTS";
  
  // Show Next Button
  document.getElementById('duel-next-btn').style.display = 'inline-block';
  document.getElementById('duel-pass-btn').style.display = 'none';
  document.getElementById('duel-controls').style.display = 'flex';
  
  if (duelModeType === 'mobile') {
    duelRoomRef.update({
      answerStatus: 'revealed',
      'currentQuestion/answerStatus': 'revealed',
      'currentQuestion/correctOption': correctIdx,
      'currentQuestion/isTimeout': isTimeout
    });
  }
  
  sounds.setMusicState('lobby');
}

function duelPassSteal(isBotCall = false) {
  if (!duelStealActive) return;
  if (duelBuzzerOwner === 2 && duelP2Type === 'bot' && !isBotCall) return; // Block human pass during bot steal
  sounds.playClick();
  
  if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
  if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
  if (duelBotTimeout) clearTimeout(duelBotTimeout);
  
  duelStealActive = false;
  duelBuzzerActive = false;
  
  document.getElementById('duel-status-banner').innerText = "Ausgelassen! Keine Minuspunkte.";
  document.getElementById('duel-status-banner').style.background = 'rgba(255,255,255,0.01)';
  document.getElementById('duel-status-banner').style.color = 'var(--text-primary)';
  
  if (duelModeType === 'mobile' && duelRoomRef) {
    duelRoomRef.update({
      stealPossible: false,
      allowedPlayerId: null,
      answerStatus: 'passed',
      answerSubmitted: { playerId: 'system', index: -1 },
      'currentQuestion/stealPossible': false,
      'currentQuestion/allowedPlayerId': null,
      'currentQuestion/answerStatus': 'passed',
      'currentQuestion/answerSubmitted': { playerId: 'system', index: -1 }
    });
  }
  
  duelRevealAnswer(false);
}

function duelNextQuestion() {
  duelCurrentRound++;
  if (duelCurrentRound >= duelRoundsMax) {
    duelFinishGame();
  } else {
    duelLoadQuestion();
  }
}

function duelFinishGame() {
  if (duelBuzzerInterval) clearInterval(duelBuzzerInterval);
  if (duelMainTimerInterval) clearInterval(duelMainTimerInterval);
  if (duelBotTimeout) clearTimeout(duelBotTimeout);
  
  if (duelModeType === 'mobile') {
    duelRoomRef.update({
      state: 'finished'
    });
    if (duelBuzzerListener) duelRoomRef.child('buzzerOwner').off('value', duelBuzzerListener);
    if (duelAnswerListener) duelRoomRef.child('answerSubmitted').off('value', duelAnswerListener);
    duelBuzzerListener = null;
    duelAnswerListener = null;
  }
  
  sounds.playFanfare();
  sounds.setMusicState('victory');
  
  // Hide game screen, show finish screen
  document.getElementById('duel-game-screen').style.display = 'none';
  document.getElementById('duel-finish-screen').style.display = 'flex';
  
  document.getElementById('duel-fin-p1-name').innerText = duelP1Name;
  document.getElementById('duel-fin-p1-score').innerText = duelP1Score + " PTS";
  
  document.getElementById('duel-fin-p2-name').innerText = duelP2Name;
  document.getElementById('duel-fin-p2-score').innerText = duelP2Score + " PTS";
  
  let winText = "";
  if (duelP1Score > duelP2Score) {
    winText = `🏆 ${duelP1Name} gewinnt das Duell! 🏆`;
    confetti.start();
  } else if (duelP2Score > duelP1Score) {
    winText = `🏆 ${duelP2Name} gewinnt das Duell! 🏆`;
    confetti.start();
  } else {
    winText = "🤝 Unentschieden! Ein ausgeglichenes Duell! 🤝";
  }
  document.getElementById('duel-winner-title').innerText = winText;
}

function duelRestartGame() {
  confetti.stop();
  duelStartGame();
}

function duelCloseGame() {
  if (typeof clearBotTimeouts === 'function') clearBotTimeouts();
  if (typeof setUiLock === 'function') setUiLock(false);
  confetti.stop();
  sounds.setMusicState('menu');
  
  if (duelRoomRef) {
    if (duelBuzzerListener) duelRoomRef.child('buzzerOwner').off('value', duelBuzzerListener);
    if (duelAnswerListener) duelRoomRef.child('answerSubmitted').off('value', duelAnswerListener);
    duelBuzzerListener = null;
    duelAnswerListener = null;
    duelRoomRef.child('players').off();
    duelRoomRef.off();
    duelRoomRef.remove();
    duelRoomRef = null;
  }
  
  document.getElementById('duel-finish-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

// ==========================================
// REAL-TIME MULTIPLAYER SYSTEM (FIREBASE)
// ==========================================
let mpDatabase = null;
let mpRoomCode = null;
let mpPlayerId = null;
let mpIsHost = false;
let mpRoomRef = null;
let mpIsDuelRoom = false;
let mpClientCanBuzz = true;
let mpTimerInterval = null;
let mpQuestionList = [];
let mpActiveQuestion = null;
let mpActiveTimerDuration = 30;
let mpTimerStart = 0;
let mpCurrentQuestionIndex = 0;
let mpBotTimeout = null;

function initFirebase() {
  if (mpDatabase) return true;
  let configStr = safeLocalStorage.getItem('mp_firebase_config');
  let config = null;
  
  if (configStr) {
    try {
      config = JSON.parse(configStr);
    } catch (e) {
      console.warn("Ungültige Firebase-Konfiguration im safeLocalStorage. Nutze Standard...");
    }
  }
  
  if (!config || !config.apiKey) {
    config = {
      apiKey: "AIzaSyDa0giAamnQoCyAMHTZdA4OtKuXHzXTOfo",
      authDomain: "eu-quiz-16aa5.firebaseapp.com",
      databaseURL: "https://eu-quiz-16aa5-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "eu-quiz-16aa5",
      storageBucket: "eu-quiz-16aa5.firebasestorage.app",
      messagingSenderId: "979679807669",
      appId: "1:979679807669:web:5c4c0b720256e8d278d6fc",
      measurementId: "G-ENFQPLBZZ8"
    };
  }
  
  try {
    if (typeof firebase === 'undefined') {
      throw new Error("Firebase SDK ist nicht geladen.");
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    mpDatabase = firebase.database();
    
    // Auto-Anonymous Sign In
    if (typeof firebase.auth === 'function') {
      if (!firebase.auth().currentUser) {
        firebase.auth().signInAnonymously()
          .then(cred => {
            console.log("Anonym angemeldet als Host/Client:", cred.user.uid);
          })
          .catch(err => {
            console.error("Fehler bei anonymem Login:", err);
          });
      }
    } else {
      console.warn("Firebase Auth SDK ist nicht geladen.");
    }
    
    return true;
  } catch (e) {
    console.error("Firebase Init Error:", e);
    return false;
  }
}

// Helper to wait for Firebase Auth state or perform anonymous login
function mpGetAuthUser() {
  if (typeof firebase === 'undefined' || typeof firebase.auth !== 'function') {
    return Promise.reject(new Error("Firebase Auth SDK ist nicht geladen. Bitte Internetverbindung prüfen."));
  }
  
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user) {
      resolve(user);
      return;
    }
    
    let isSettled = false;
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      if (isSettled) return;
      isSettled = true;
      unsubscribe();
      if (u) {
        resolve(u);
      } else {
        firebase.auth().signInAnonymously()
          .then(cred => resolve(cred.user))
          .catch(err => {
            console.error("Fehler bei signInAnonymously:", err);
            reject(err);
          });
      }
    }, err => {
      if (isSettled) return;
      isSettled = true;
      unsubscribe();
      console.error("Fehler in onAuthStateChanged:", err);
      reject(err);
    });
    
    // Safety timeout: If auth takes more than 8 seconds, reject to avoid hanging indefinitely
    setTimeout(() => {
      if (isSettled) return;
      isSettled = true;
      unsubscribe();
      reject(new Error("Zeitüberschreitung bei der Firebase-Authentifizierung (Timeout). Bitte Seite neu laden."));
    }, 8000);
  });
}

// Helpers for secure room operations (Kahoot-style with 6-digit codes and collision prevention)
function mpSecureCreateRoom(roomType, additionalFields = {}) {
  return mpGetAuthUser().then(user => {
    const hostId = user.uid;
    let attempts = 0;
    
    function attempt() {
      attempts++;
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const roomRef = mpDatabase.ref('rooms/' + code);
      
      const payload = Object.assign({
        roomType: roomType,
        state: 'lobby',
        hostId: hostId,
        players: {
          [hostId]: {
            name: "Host/Beamer",
            score: 0
          }
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP
      }, additionalFields);
      
      return roomRef.set(payload)
        .then(() => {
          return { code, ref: roomRef };
        })
        .catch(err => {
          if (err.code === 'PERMISSION_DENIED' && attempts < 5) {
            console.warn(`Mögliche Raumcode-Kollision bei ${code}. Versuch ${attempts}/5...`);
            return attempt();
          } else {
            throw err;
          }
        });
    }
    
    return attempt();
  });
}

function mpMapPlayers(playersObj) {
  if (!playersObj) return {};
  const uids = Object.keys(playersObj).filter(k => k !== 'player1' && k !== 'player2' && playersObj[k].name !== "Host/Beamer").sort();
  const mapped = Object.assign({}, playersObj);
  if (uids[0]) mapped.player1 = Object.assign({ uid: uids[0] }, playersObj[uids[0]]);
  if (uids[1]) mapped.player2 = Object.assign({ uid: uids[1] }, playersObj[uids[1]]);
  return mapped;
}

let mpIsMatchmaking = false;

function mpStartMatchmaking() {
  if (!initFirebase()) {
    alert("Firebase konnte nicht initialisiert werden.");
    return;
  }
  
  let name = prompt("Gib deinen Namen für das Online-Duell ein:", "Spieler");
  if (!name || name.trim().length < 2) {
    if (name) alert("Bitte einen Namen mit mindestens 2 Zeichen eingeben.");
    return;
  }
  name = name.trim();
  
  sounds.playClick();
  mpIsMatchmaking = true;
  
  // Show waiting screen
  document.getElementById('mp-role-screen').style.display = 'none';
  document.getElementById('mp-player-lobby-name').innerText = name;
  document.getElementById('mp-player-lobby-code').innerText = "SUCHE...";
  document.getElementById('mp-player-lobby-screen').style.display = 'flex';
  
  const waitingRef = mpDatabase.ref('matchmaking/waiting');
  
  waitingRef.once('value', snapshot => {
    const data = snapshot.val();
    if (data && data.roomId) {
      // 1. Join existing room as Client
      const roomId = data.roomId;
      
      // Remove from matchmaking waiting queue
      waitingRef.remove();
      
      const roomRef = mpDatabase.ref('rooms/' + roomId);
      const pid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      mpPlayerId = pid;
      mpRoomCode = roomId;
      mpIsHost = false;
      mpRoomRef = roomRef;
      
      roomRef.child('players/' + pid).set({
        name: name,
        score: 0,
        answer: null,
        answerTime: 0,
        lastCorrect: false
      }).then(() => {
        roomRef.child('players/' + pid).onDisconnect().remove();
        document.getElementById('mp-player-lobby-code').innerText = roomId;
        mpStartRoomListener(name);
      });
      
    } else {
      // 2. Create new room as Host
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      mpRoomCode = code;
      mpIsHost = true;
      mpPlayerId = 'host_player';
      mpCurrentQuestionIndex = 0;
      
      mpRoomRef = mpDatabase.ref('rooms/' + code);
      mpQuestionList = mpGenerateSessionQuestions(10); // 10 questions for quick match
      
      mpRoomRef.set({
        state: 'lobby',
        hostId: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        settings: {
          questionCount: mpQuestionList.length,
          timeLimit: 20,
          category: 'all'
        },
        currentQuestionIndex: -1
      }).then(() => {
        // Register in matchmaking queue
        waitingRef.set({ roomId: code });
        
        // Disconnect behavior
        mpRoomRef.onDisconnect().remove();
        waitingRef.onDisconnect().remove();
        
        // Also register host as a player in this room
        mpRoomRef.child('players/host_player').set({
          name: name,
          score: 0,
          answer: null,
          answerTime: 0,
          lastCorrect: false
        }).then(() => {
          mpRoomRef.child('players/host_player').onDisconnect().remove();
          document.getElementById('mp-player-lobby-code').innerText = code;
          mpStartRoomListener(name);
        });
        
        // Host starts game automatically when another player joins
        mpRoomRef.child('players').on('value', snapshot => {
          const players = snapshot.val() || {};
          let pcount = 0;
          for (let pid in players) {
            pcount++;
          }
          if (pcount === 2) {
            mpRoomRef.child('players').off('value');
            waitingRef.remove();
            mpHostStartMatchGame();
          }
        });
      });
    }
  });
}

function mpHostStartMatchGame() {
  sounds.playSuccess();
  if (!mpRoomRef) return;
  
  mpActiveTimerDuration = 20;
  
  mpRoomRef.update({
    currentQuestionIndex: 0,
    settings: {
      questionCount: mpQuestionList.length,
      timeLimit: 20,
      category: 'all'
    }
  });
  
  mpHostLoadQuestion(0);
}

function mpBackToModeSelect() {
  sounds.playClick();
  document.getElementById('mp-role-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function mpShowConfigModal() {
  sounds.playClick();
  const config = safeLocalStorage.getItem('mp_firebase_config') || "";
  document.getElementById('mp-config-input').value = config;
  document.getElementById('mp-config-status').style.display = 'none';
  document.getElementById('mp-config-modal').style.display = 'flex';
}

function mpCloseConfigModal() {
  sounds.playClick();
  document.getElementById('mp-config-modal').style.display = 'none';
}

function mpSaveConfig() {
  sounds.playClick();
  const input = document.getElementById('mp-config-input').value.trim();
  const status = document.getElementById('mp-config-status');
  status.style.display = 'block';
  
  if (input === "") {
    safeLocalStorage.removeItem('mp_firebase_config');
    status.innerText = "Konfiguration gelöscht.";
    status.style.color = "var(--text-secondary)";
    setTimeout(mpCloseConfigModal, 1000);
    return;
  }
  
  try {
    const config = JSON.parse(input);
    if (!config.databaseURL || !config.apiKey || !config.projectId) {
      throw new Error("Fehlende Pflichtfelder (apiKey, databaseURL, projectId).");
    }
    safeLocalStorage.setItem('mp_firebase_config', JSON.stringify(config, null, 2));
    status.innerText = "Erfolgreich gespeichert! Firebase initialisiert.";
    status.style.color = "var(--success)";
    mpDatabase = null; // Force re-init on next call
    initFirebase();
    setTimeout(mpCloseConfigModal, 1000);
  } catch (e) {
    status.innerText = "Ungültiges JSON oder fehlende Felder: " + e.message;
    status.style.color = "var(--error)";
    sounds.playError();
  }
}

function mpHostToggleBot() {
  if (!mpRoomRef) return;
  sounds.playClick();
  const diff = document.getElementById('mp-host-bot-difficulty').value;
  if (diff === 'none') {
    mpRoomRef.child('players/bot_klaus').remove();
  } else {
    let diffLabel = "Einfach";
    if (diff === 'medium') diffLabel = "Mittel";
    else if (diff === 'hard') diffLabel = "Schwer";
    else if (diff === 'elite') diffLabel = "Elite";
    
    mpRoomRef.child('players/bot_klaus').set({
      name: "🤖 Bot Klaus (" + diffLabel + ")",
      score: 0,
      answer: null,
      answerTime: 0,
      lastCorrect: false
    });
  }
}

// Host Actions
function mpInitHost() {
  sounds.playClick();
  if (!initFirebase()) {
    mpShowConfigModal();
    const status = document.getElementById('mp-config-status');
    status.style.display = 'block';
    status.innerText = "Bitte zuerst Firebase konfigurieren!";
    status.style.color = "var(--error)";
    return;
  }
  
  // Show loading state
  document.getElementById('mp-host-code-display').innerText = "Lade...";
  document.getElementById('mp-role-screen').style.display = 'none';
  document.getElementById('mp-host-lobby-screen').style.display = 'flex';
  document.getElementById('mp-host-qrcode').innerHTML = "";
  
  // Generate a random pool of 15 questions
  mpQuestionList = mpGenerateSessionQuestions(15);
  
  mpSecureCreateRoom('standard', {
    settings: {
      questionCount: mpQuestionList.length,
      timeLimit: 30
    },
    currentQuestionIndex: -1
  }).then(({ code, ref }) => {
    mpRoomCode = code;
    mpIsHost = true;
    mpPlayerId = null;
    mpCurrentQuestionIndex = 0;
    mpRoomRef = ref;
    
    document.getElementById('mp-host-code-display').innerText = code;
    
    // Generate QR Code!
    const joinUrl = window.location.origin + window.location.pathname + "?room=" + code;
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=00bcd4&data=" + encodeURIComponent(joinUrl);
    document.getElementById('mp-host-qrcode').innerHTML = `<img src="${qrUrl}" alt="QR Code" style="border: 4px solid #fff; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 150px; height: 150px;">`;
    
    // Automatically remove room if host disconnects
    mpRoomRef.onDisconnect().remove();
    
    // Set dropdown defaults in lobby UI
    document.getElementById('mp-host-setting-qcount').value = "15";
    document.getElementById('mp-host-setting-timelimit').value = "30";
    document.getElementById('mp-host-setting-category').value = "all";
    
    // Listen for joined players
    mpRoomRef.child('players').on('value', snapshot => {
      const players = snapshot.val() || {};
      const plist = document.getElementById('mp-host-players-list');
      plist.innerHTML = "";
      
      let pcount = 0;
      for (let pid in players) {
        if (players[pid].name === "Host/Beamer") continue;
        pcount++;
        const p = players[pid];
        const pcard = document.createElement('div');
        pcard.className = 'mp-player-card';
        pcard.innerText = p.name;
        plist.appendChild(pcard);
      }
      
      document.getElementById('mp-host-player-count').innerText = pcount;
      document.getElementById('mp-host-start-btn').disabled = (pcount < 1);
    }, err => {
      console.error("Host: Fehler beim Lesen der Spielerliste:", err);
    });
  }).catch(err => {
    console.error("Fehler beim Hosten:", err);
    alert("Fehler beim Erstellen des Raums: " + err.message);
    mpHostCancel();
  });
}

function mpHostCancel() {
  sounds.playClick();
  if (mpRoomRef) {
    mpRoomRef.child('players').off();
    mpRoomRef.off();
    mpRoomRef.remove();
  }
  const botSelect = document.getElementById('mp-host-bot-difficulty');
  if (botSelect) botSelect.value = 'none';
  mpIsMatchmaking = false;
  document.getElementById('mp-host-lobby-screen').style.display = 'none';
  document.getElementById('mp-role-screen').style.display = 'flex';
}

function mpHostStartGame() {
  sounds.playSuccess();
  if (typeof trackLifetimeGameStarted === 'function') trackLifetimeGameStarted();
  if (!mpRoomRef) return;
  
  // Read current settings from select fields
  const qCount = parseInt(document.getElementById('mp-host-setting-qcount').value) || 15;
  const timeLimit = parseInt(document.getElementById('mp-host-setting-timelimit').value) || 30;
  const cat = document.getElementById('mp-host-setting-category').value || "all";
  
  mpQuestionList = mpGenerateSessionQuestions(qCount, cat);
  mpActiveTimerDuration = timeLimit;
  
  mpRoomRef.update({
    currentQuestionIndex: 0,
    settings: {
      questionCount: mpQuestionList.length,
      timeLimit: timeLimit,
      category: cat
    }
  });
  
  mpHostLoadQuestion(0);
}

function mpHostLoadQuestion(index) {
  if (index >= mpQuestionList.length) {
    mpHostFinishGame();
    return;
  }
  
  mpCurrentQuestionIndex = index;
  const rawQ = mpQuestionList[index];
  const qData = shuffleQuestionOptions(rawQ);
  mpActiveQuestion = qData;
  
  // Read time limit from settings dropdown
  const timeLimit = mpIsMatchmaking ? 20 : (parseInt(document.getElementById('mp-host-setting-timelimit').value) || 30);
  mpActiveTimerDuration = timeLimit;
  mpTimerStart = Date.now();
  
  // 1. Fetch players once to prepare atomic updates for all of them
  mpRoomRef.child('players').once('value', snapshot => {
    const players = snapshot.val() || {};
    const updates = {
      state: 'question',
      currentQuestionIndex: index,
      timerStart: mpTimerStart,
      currentQuestion: {
        q: qData.q,
        o: qData.o,
        a: qData.a,
        categoryName: mpGetCategoryName(rawQ.category)
      }
    };
    
    for (let pid in players) {
      if (players[pid].name === "Host/Beamer") continue;
      updates[`players/${pid}/answer`] = null;
      updates[`players/${pid}/answerTime`] = 0;
    }
    
    // 2. Perform the atomic update
    mpRoomRef.update(updates).then(() => {
      // Setup host UI
      document.getElementById('mp-host-qindex').innerText = index + 1;
      document.getElementById('mp-host-total-q').innerText = mpQuestionList.length;
      document.getElementById('mp-host-qcategory').innerText = mpGetCategoryName(rawQ.category);
      document.getElementById('mp-host-question-text').innerHTML = qData.q;
      
      for (let i = 0; i < 4; i++) {
        const optDiv = document.getElementById('mp-host-opt-' + i);
        if (optDiv) {
          optDiv.querySelector('.opt-text').innerText = qData.o[i];
          optDiv.classList.remove('correct', 'wrong');
          optDiv.style.background = '';
          optDiv.style.borderColor = '';
        }
      }
      
      document.getElementById('mp-host-lobby-screen').style.display = 'none';
      document.getElementById('mp-host-reveal-screen').style.display = 'none';
      document.getElementById('mp-host-leaderboard-screen').style.display = 'none';
      document.getElementById('mp-host-game-screen').style.display = 'flex';
      
      sounds.setMusicState('question');
      
      if (mpBotTimeout) clearTimeout(mpBotTimeout);
      if (players.bot_klaus) {
        const botDiff = document.getElementById('mp-host-bot-difficulty') ? document.getElementById('mp-host-bot-difficulty').value : 'medium';
        if (botDiff !== 'none') {
          let accuracy = 0.75;
          let rxMin = 4000;
          let rxMax = 9000;
          
          if (botDiff === 'easy') {
            accuracy = 0.5; rxMin = 6000; rxMax = 12000;
          } else if (botDiff === 'hard') {
            accuracy = 0.9; rxMin = 3000; rxMax = 7000;
          } else if (botDiff === 'elite') {
            accuracy = 0.98; rxMin = 2000; rxMax = 5000;
          }
          
          const rxTime = Math.random() * (rxMax - rxMin) + rxMin;
          mpBotTimeout = setTimeout(() => {
            const isCorrect = Math.random() < accuracy;
            let botAnsIdx = qData.a;
            if (!isCorrect) {
              const wrong = [0, 1, 2, 3].filter(idx => idx !== botAnsIdx);
              botAnsIdx = wrong[Math.floor(Math.random() * wrong.length)];
            }
            mpRoomRef.child('players/bot_klaus').update({
              answer: botAnsIdx,
              answerTime: Date.now()
            });
          }, rxTime);
        }
      }
      
      let timeLeft = mpActiveTimerDuration;
      const timerCircle = document.getElementById('mp-host-timer-circle');
      timerCircle.innerText = timeLeft;
      timerCircle.style.borderColor = 'var(--accent)';
      timerCircle.style.color = 'var(--accent)';
      
      if (mpTimerInterval) clearInterval(mpTimerInterval);
      
      // 3. Now listen for answers (since they are guaranteed to be reset atomically with state: 'question')
      mpRoomRef.child('players').on('value', snapshot => {
        const playersVal = snapshot.val() || {};
        let total = 0;
        let answered = 0;
        
        let scoreboardHTML = "";
        const pArr = [];
        for (let pid in playersVal) {
          if (playersVal[pid].name === "Host/Beamer") continue;
          pArr.push({ id: pid, ...playersVal[pid] });
        }
        pArr.sort((a, b) => (b.score || 0) - (a.score || 0));
        
        pArr.forEach((p, idx) => {
          total++;
          const hasAnswered = p.answer !== null && p.answer !== undefined;
          if (hasAnswered) answered++;
          
          scoreboardHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:rgba(255,255,255,0.03); border:1px solid var(--card-border); border-radius:8px; font-size:0.85rem; margin-bottom: 6px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:800; opacity:0.6;">#${idx+1}</span>
                <span style="font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px;">${p.name}</span>
                <span style="font-size:0.75rem;" title="${hasAnswered ? 'Antwort abgegeben' : 'Wartet auf Antwort'}">
                  ${hasAnswered ? '✅' : '⏳'}
                </span>
              </div>
              <span style="color:var(--accent); font-weight:800; font-family:'Space Grotesk',sans-serif;">${p.score || 0} PTS</span>
            </div>
          `;
        });
        
        const liveSb = document.getElementById('mp-host-live-scoreboard');
        if (liveSb) liveSb.innerHTML = scoreboardHTML;
        
        document.getElementById('mp-host-answers-count').innerText = answered;
        document.getElementById('mp-host-total-players').innerText = total;
        
        if (total > 0 && answered === total) {
          mpHostRevealAnswer();
        }
      });
      
      mpTimerInterval = setInterval(() => {
        timeLeft--;
        timerCircle.innerText = timeLeft;
        
        if (timeLeft <= 5) {
          timerCircle.style.color = 'var(--error)';
          timerCircle.style.borderColor = 'var(--error)';
          if (typeof sounds.playTimerTick === 'function') {
            sounds.playTimerTick();
          } else {
            sounds.playTickTock();
          }
        }
        
        if (timeLeft <= 0) {
          mpHostRevealAnswer();
        }
      }, 1000);
    });
  });
}

function mpHostSkipQuestion() {
  sounds.playClick();
  mpHostRevealAnswer();
}

function mpHostRevealAnswer() {
  if (mpTimerInterval) clearInterval(mpTimerInterval);
  if (mpBotTimeout) clearTimeout(mpBotTimeout);
  mpRoomRef.child('players').off('value'); 
  
  sounds.setMusicState('lobby');
  
  const correctIdx = mpActiveQuestion.a;
  const correctText = mpActiveQuestion.o[correctIdx];
  const explanation = mpGetExplanation(mpActiveQuestion, correctText);
  
  for (let i = 0; i < 4; i++) {
    const optDiv = document.getElementById('mp-host-opt-' + i);
    if (optDiv) {
      if (i === correctIdx) {
        optDiv.classList.add('correct');
      } else {
        optDiv.classList.add('wrong');
      }
      optDiv.style.background = '';
      optDiv.style.borderColor = '';
    }
  }
  
  // Calculate points
  mpRoomRef.child('players').once('value', snapshot => {
    const players = snapshot.val() || {};
    const updates = {};
    const stats = [0, 0, 0, 0];
    
    let playCorrectSound = false;
    
    for (let pid in players) {
      if (players[pid].name === "Host/Beamer") continue;
      const p = players[pid];
      const isCorrect = (p.answer === correctIdx);
      let pointsGained = 0;
      
      if (p.answer !== null && p.answer >= 0 && p.answer < 4) {
        stats[p.answer]++;
      }
      
      if (isCorrect) {
        playCorrectSound = true;
        const basePoints = 500;
        const answerTime = p.answerTime || (mpTimerStart + mpActiveTimerDuration * 1000);
        const elapsed = Math.max(0, answerTime - mpTimerStart);
        const durationMs = mpActiveTimerDuration * 1000;
        const ratio = Math.max(0, 1 - elapsed / durationMs);
        const speedBonus = Math.floor(ratio * 500);
        pointsGained = basePoints + speedBonus;
      }
      
      updates[`players/${pid}/score`] = (p.score || 0) + pointsGained;
      updates[`players/${pid}/lastCorrect`] = isCorrect;
      updates[`players/${pid}/lastPointsGained`] = pointsGained;
    }
    
    mpRoomRef.update(updates);
    mpRoomRef.update({ state: 'reveal' });
    
    if (playCorrectSound) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
    
    const totalAnswers = stats.reduce((a, b) => a + b, 0) || 1;
    for (let i = 0; i < 4; i++) {
      const percent = Math.max(5, Math.floor((stats[i] / totalAnswers) * 100));
      document.getElementById('mp-stats-bar-' + i).style.height = percent + '%';
    }
  });
  
  document.getElementById('mp-host-reveal-question').innerHTML = mpActiveQuestion.q;
  document.getElementById('mp-host-reveal-correct-text').innerText = correctText;
  
  const explEl = document.getElementById('mp-host-reveal-explanation');
  if (explanation && !explanation.startsWith("Wusstest du schon?")) {
    explEl.innerHTML = explanation;
    explEl.style.display = 'block';
  } else {
    explEl.innerHTML = "";
    explEl.style.display = 'none';
  }
  
  document.getElementById('mp-host-game-screen').style.display = 'none';
  document.getElementById('mp-host-reveal-screen').style.display = 'flex';
}

function mpHostShowLeaderboard() {
  sounds.playClick();
  
  mpRoomRef.update({ state: 'leaderboard' });
  
  mpRoomRef.child('players').once('value', snapshot => {
    const players = snapshot.val() || {};
    const plist = [];
    for (let pid in players) {
      if (players[pid].name === "Host/Beamer") continue;
      plist.push({ id: pid, name: players[pid].name, score: players[pid].score || 0 });
    }
    
    plist.sort((a, b) => b.score - a.score);
    
    const lboard = document.getElementById('mp-host-leaderboard-list');
    lboard.innerHTML = "";
    
    plist.slice(0, 5).forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'mp-leaderboard-row' + (idx === 0 ? ' podium-1' : '');
      row.innerHTML = `
        <div class="mp-leaderboard-rank">#${idx + 1}</div>
        <div class="mp-leaderboard-name">${p.name}</div>
        <div class="mp-leaderboard-score">${p.score} pts</div>
      `;
      lboard.appendChild(row);
    });
    
    const isLast = (mpCurrentQuestionIndex === mpQuestionList.length - 1);
    const nextBtn = document.getElementById('mp-host-next-btn');
    if (isLast) {
      nextBtn.innerText = "Podium / Siegerehrung";
      nextBtn.style.borderColor = 'var(--gold)';
      nextBtn.style.color = 'var(--gold)';
    } else {
      nextBtn.innerText = "Nächste Frage";
      nextBtn.style.borderColor = 'var(--success)';
      nextBtn.style.color = 'var(--success)';
    }
  });
  
  document.getElementById('mp-host-reveal-screen').style.display = 'none';
  document.getElementById('mp-host-leaderboard-screen').style.display = 'flex';
}

function mpHostNextQuestion() {
  sounds.playClick();
  mpHostLoadQuestion(mpCurrentQuestionIndex + 1);
}

function mpHostFinishGame() {
  if (mpTimerInterval) clearInterval(mpTimerInterval);
  
  mpRoomRef.update({ state: 'finished' });
  
  mpRoomRef.child('players').once('value', snapshot => {
    const players = snapshot.val() || {};
    const plist = [];
    for (let pid in players) {
      if (players[pid].name === "Host/Beamer") continue;
      plist.push({ name: players[pid].name, score: players[pid].score || 0 });
    }
    
    plist.sort((a, b) => b.score - a.score);
    
    const podiumArea = document.getElementById('mp-host-podium');
    podiumArea.innerHTML = "";
    
    const order = [1, 0, 2]; // Render 2nd place (index 1), then 1st place (index 0), then 3rd place (index 2)
    podiumArea.innerHTML = order.map(pos => {
      const p = plist[pos];
      if (!p) return '';
      const cls = pos === 0 ? 'p-1' : (pos === 1 ? 'p-2' : 'p-3');
      const crown = pos === 0 ? '<div class="crown-icon">👑</div>' : '';
      return `<div class="podium-step ${cls}">
        ${crown}
        <div class="podium-name" title="${p.name}">${p.name}</div>
        <div class="step-bar">${pos + 1}</div>
        <div style="margin-top:10px;font-weight:bold;font-size:1.1rem;font-family:'Space Grotesk',sans-serif;">${p.score} PTS</div>
      </div>`;
    }).join('');
    
    setTimeout(() => document.querySelectorAll('#mp-host-podium .podium-step').forEach(el => el.classList.add('animate')), 100);
    
    const otherRanks = document.getElementById('mp-host-other-ranks');
    otherRanks.innerHTML = "";
    
    if (plist.length > 3) {
      plist.slice(3).forEach((p, idx) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.padding = '8px 15px';
        row.style.background = 'rgba(255,255,255,0.02)';
        row.style.border = '1px solid var(--card-border)';
        row.style.borderRadius = '8px';
        row.style.marginBottom = '6px';
        row.innerHTML = `
          <span><b>#${idx + 4}</b> ${p.name}</span>
          <span style="color:var(--accent);">${p.score} pts</span>
        `;
        otherRanks.appendChild(row);
      });
    }
  });
  
  document.getElementById('mp-host-game-screen').style.display = 'none';
  document.getElementById('mp-host-reveal-screen').style.display = 'none';
  document.getElementById('mp-host-leaderboard-screen').style.display = 'none';
  document.getElementById('mp-host-finish-screen').style.display = 'flex';
}

function mpHostCloseGame() {
  sounds.playClick();
  if (mpRoomRef) {
    mpRoomRef.off();
    mpRoomRef.remove();
  }
  document.getElementById('mp-host-finish-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

// Player Actions
let mpJoinSource = 'role'; // 'role' or 'start' to track back navigation

function mpShowJoinScreen() {
  sounds.playClick();
  if (!initFirebase()) {
    mpShowConfigModal();
    const status = document.getElementById('mp-config-status');
    status.style.display = 'block';
    status.innerText = "Bitte zuerst Firebase konfigurieren!";
    status.style.color = "var(--error)";
    return;
  }
  
  document.getElementById('mp-join-code').value = "";
  document.getElementById('mp-join-name').value = "";
  document.getElementById('mp-join-err').style.display = 'none';
  
  mpJoinSource = 'role';
  document.getElementById('mp-role-screen').style.display = 'none';
  document.getElementById('mp-player-join-screen').style.display = 'flex';
}

function mpShowJoinScreenDirect(source = 'start') {
  sounds.playClick();
  if (!initFirebase()) {
    mpShowConfigModal();
    const status = document.getElementById('mp-config-status');
    status.style.display = 'block';
    status.innerText = "Bitte zuerst Firebase konfigurieren!";
    status.style.color = "var(--error)";
    return;
  }
  
  document.getElementById('mp-join-code').value = "";
  document.getElementById('mp-join-name').value = "";
  document.getElementById('mp-join-err').style.display = 'none';
  
  mpJoinSource = source;
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'none';
  const drs = document.getElementById('duel-role-screen');
  if (drs) drs.style.display = 'none';
  document.getElementById('mp-player-join-screen').style.display = 'flex';
}

function mpPlayerCancelJoin() {
  sounds.playClick();
  document.getElementById('mp-player-join-screen').style.display = 'none';
  if (mpJoinSource === 'mode') {
    document.getElementById('mode-screen').style.display = 'flex';
  } else if (mpJoinSource === 'duel_menu') {
    document.getElementById('duel-role-screen').style.display = 'flex';
  } else if (mpJoinSource === 'start') {
    document.getElementById('start-screen').style.display = 'flex';
  } else {
    document.getElementById('mp-role-screen').style.display = 'flex';
  }
}

function backToModeSelectFromDuel() {
  sounds.playClick();
  document.getElementById('duel-role-screen').style.display = 'none';
  document.getElementById('mode-screen').style.display = 'flex';
}

function mpPlayerJoin() {
  sounds.playClick();
  const code = document.getElementById('mp-join-code').value.trim();
  const name = document.getElementById('mp-join-name').value.trim();
  const err = document.getElementById('mp-join-err');
  
  if (code.length < 4 || code.length > 6 || isNaN(code)) {
    err.innerText = "Bitte einen gültigen Raumcode (4-6 Stellen) eingeben.";
    err.style.display = 'block';
    sounds.playError();
    return;
  }
  
  if (name.length < 2) {
    err.innerText = "Bitte einen Spitznamen mit mindestens 2 Zeichen eingeben.";
    err.style.display = 'block';
    sounds.playError();
    return;
  }
  
  err.style.display = 'none';
  
  if (!initFirebase()) {
    err.innerText = "Firebase konnte nicht initialisiert werden.";
    err.style.display = 'block';
    sounds.playError();
    return;
  }
  
  // Make sure they are signed in anonymously
  mpGetAuthUser().then(user => {
    const playerId = user.uid;
    const roomRef = mpDatabase.ref('rooms/' + code);
    const playerRef = roomRef.child('players/' + playerId);
    
    // 1. Write the player slot first (this puts us in the players list, granting us read permission under rules)
    return playerRef.set({
      name: name,
      score: 0,
      answer: null,
      answerTime: 0,
      lastCorrect: false
    }).then(() => {
      // 2. Now read the room (which we now have permission to read)
      return roomRef.once('value').then(snapshot => {
        const room = snapshot.val();
        
        // 3. Verify if the room actually exists and has a host (if hostId is missing, it was a wrong code!)
        if (!snapshot.exists() || !room || !room.hostId) {
          playerRef.remove(); // Clean up the phantom room
          throw new Error("ROOM_NOT_FOUND");
        }
        
        // 4. Verify game state
        if (room.state !== 'lobby') {
          playerRef.remove();
          throw new Error("GAME_ALREADY_STARTED");
        }
        
        // 5. Check for duplicate name
        const playersMap = room.players || {};
        let nameExists = false;
        for (let pid in playersMap) {
          if (pid !== playerId && playersMap[pid].name && playersMap[pid].name.toLowerCase() === name.toLowerCase()) {
            nameExists = true;
            break;
          }
        }
        if (nameExists) {
          playerRef.remove();
          throw new Error("DUPLICATE_NAME");
        }
        
        // Successfully joined!
        mpPlayerId = playerId;
        mpRoomCode = code;
        mpIsHost = false;
        mpRoomRef = roomRef;
        
        playerRef.onDisconnect().remove();
        
        document.getElementById('mp-player-lobby-name').innerText = name;
        document.getElementById('mp-player-lobby-code').innerText = code;
        document.getElementById('mp-player-join-screen').style.display = 'none';
        document.getElementById('mp-player-lobby-screen').style.display = 'flex';
        sounds.playSuccess();
        
        if (room.roomType === 'duel') {
          mpIsDuelRoom = true;
          mpStartDuelRoomListener(name);
        } else {
          mpIsDuelRoom = false;
          mpStartRoomListener(name);
        }
      });
    });
  }).catch(error => {
    console.error("Fehler beim Beitreten:", error);
    if (error.message === "ROOM_NOT_FOUND") {
      err.innerText = "Dieser Raum existiert nicht. Bitte Code überprüfen.";
    } else if (error.message === "GAME_ALREADY_STARTED") {
      err.innerText = "Das Spiel in diesem Raum läuft bereits.";
    } else if (error.message === "DUPLICATE_NAME") {
      err.innerText = "Dieser Name ist in diesem Raum bereits vergeben.";
    } else {
      err.innerText = "Beitritt verweigert. Code falsch, Raum voll oder Verbindungsproblem.";
    }
    err.style.display = 'block';
    sounds.playError();
  });
}

function mpStartRoomListener(name) {
  if (!mpRoomRef || !mpPlayerId) return;
  mpRoomRef.on('value', snap => {
    if (!snap.exists()) {
      alert("Der Raum wurde vom Host geschlossen.");
      mpPlayerResetAll();
      return;
    }
    
    const r = snap.val();
    const p = (r.players && r.players[mpPlayerId]) ? r.players[mpPlayerId] : null;
    
    if (!p) {
      alert("Verbindung zum Raum verloren.");
      mpPlayerResetAll();
      return;
    }
    
    if (r.state === 'lobby') {
      document.getElementById('mp-player-question-container').style.display = 'none';
    } else if (r.state === 'question') {
      document.getElementById('mp-player-lobby-screen').style.display = 'none';
      document.getElementById('mp-player-reveal-screen').style.display = 'none';
      
      document.getElementById('mp-player-game-name').innerText = p.name;
      document.getElementById('mp-player-game-score').innerText = (p.score || 0) + " Punkte";
      document.getElementById('mp-player-game-code').innerText = mpRoomCode;
      
      if (r.currentQuestion) {
        document.getElementById('mp-player-question-container').style.display = 'block';
        document.getElementById('mp-player-question-category').innerText = r.currentQuestion.categoryName || "In Vielfalt geeint";
        document.getElementById('mp-player-question-text').innerHTML = r.currentQuestion.q;
        
        if (r.currentQuestion.o) {
          for (let i = 0; i < 4; i++) {
            const textEl = document.getElementById('mp-opt-text-' + i);
            if (textEl && r.currentQuestion.o[i]) {
              textEl.innerText = r.currentQuestion.o[i];
            }
          }
        }
      } else {
        document.getElementById('mp-player-question-container').style.display = 'none';
      }
      
      if (p.answer !== null && p.answer !== undefined) {
        document.getElementById('mp-controller-buttons').style.display = 'none';
        document.getElementById('mp-controller-wait-text').innerText = "Antwort gesendet! Warte auf andere Spieler...";
        document.getElementById('mp-controller-wait').style.display = 'flex';
      } else {
        document.getElementById('mp-controller-wait').style.display = 'none';
        document.getElementById('mp-controller-buttons').style.display = 'grid';
      }
      
      document.getElementById('mp-player-game-screen').style.display = 'flex';
    } else if (r.state === 'reveal') {
      document.getElementById('mp-player-question-container').style.display = 'none';
      const isCorrect = p.lastCorrect;
      const pts = p.lastPointsGained || 0;
      
      const box = document.getElementById('mp-player-reveal-box');
      const icon = document.getElementById('mp-player-reveal-icon');
      const status = document.getElementById('mp-player-reveal-status');
      const points = document.getElementById('mp-player-reveal-points');
      const total = document.getElementById('mp-player-reveal-total');
      
      if (isCorrect) {
        box.style.background = 'rgba(16, 185, 129, 0.1)';
        box.style.borderColor = 'var(--success)';
        icon.innerText = "🎉";
        status.innerText = "RICHTIG!";
        status.style.color = "var(--success)";
        points.innerText = `+${pts} Punkte`;
        points.style.display = 'block';
      } else {
        box.style.background = 'rgba(244, 63, 94, 0.1)';
        box.style.borderColor = 'var(--error)';
        icon.innerText = "❌";
        status.innerText = "FALSCH";
        status.style.color = "var(--error)";
        points.style.display = 'none';
      }
      
      total.innerText = p.score || 0;
      
      document.getElementById('mp-player-game-screen').style.display = 'none';
      document.getElementById('mp-player-reveal-screen').style.display = 'flex';
    } else if (r.state === 'leaderboard') {
      document.getElementById('mp-player-question-container').style.display = 'none';
      document.getElementById('mp-player-game-screen').style.display = 'none';
      document.getElementById('mp-player-reveal-screen').style.display = 'none';
      
      document.getElementById('mp-controller-wait-text').innerText = "Schau auf den Beamer für den Zwischenstand...";
      document.getElementById('mp-controller-wait').style.display = 'flex';
      document.getElementById('mp-controller-buttons').style.display = 'none';
      document.getElementById('mp-player-game-screen').style.display = 'flex';
    } else if (r.state === 'finished') {
      document.getElementById('mp-player-question-container').style.display = 'none';
      alert("Das Spiel ist vorbei!");
      mpPlayerResetAll();
    }
  }, err => {
    console.warn("Raum-Listener abgebrochen:", err);
    alert("Das Spiel wurde geschlossen.");
    mpPlayerResetAll();
  });
}

function mpPlayerSubmitAnswer(index) {
  sounds.playClick();
  if (!mpRoomRef || !mpPlayerId) return;
  
  document.getElementById('mp-controller-buttons').style.display = 'none';
  
  if (mpIsDuelRoom) {
    document.getElementById('mp-player-duel-status').innerText = "Antwort gesendet! Warte...";
    document.getElementById('mp-player-duel-buzzer-container').style.display = 'flex';
    document.getElementById('mp-player-duel-buzzer-btn').disabled = true;
    document.getElementById('mp-player-duel-buzzer-btn').style.opacity = '0.3';
    
    mpRoomRef.update({
      answerSubmitted: {
        playerId: mpPlayerId,
        index: index
      }
    }).catch(err => {
      console.error("Antwort Sende-Fehler:", err);
      alert("Fehler beim Senden der Antwort: " + err.message);
    });
  } else {
    document.getElementById('mp-controller-wait-text').innerText = "Antwort gesendet! Warte auf andere Spieler...";
    document.getElementById('mp-controller-wait').style.display = 'flex';
    
    const pRef = mpRoomRef.child('players/' + mpPlayerId);
    pRef.update({
      answer: index,
      answerTime: Date.now()
    });
  }
}

function mpPlayerSubmitPass() {
  sounds.playClick();
  if (!mpRoomRef || !mpPlayerId) return;
  
  document.getElementById('mp-controller-buttons').style.display = 'none';
  const passContainer = document.getElementById('mp-controller-pass-container');
  if (passContainer) passContainer.style.display = 'none';
  
  document.getElementById('mp-player-duel-status').innerText = "Auslassen gesendet! Warte...";
  document.getElementById('mp-player-duel-buzzer-container').style.display = 'flex';
  document.getElementById('mp-player-duel-buzzer-btn').disabled = true;
  document.getElementById('mp-player-duel-buzzer-btn').style.opacity = '0.3';
  
  mpRoomRef.update({
    answerSubmitted: {
      playerId: mpPlayerId,
      index: -1
    }
  }).catch(err => {
    console.error("Pass Sende-Fehler:", err);
    alert("Fehler beim Überspringen der Frage: " + err.message);
  });
}

function mpPlayerResetAll() {
  if (mpRoomRef) {
    mpRoomRef.off();
  }
  mpRoomCode = null;
  mpPlayerId = null;
  mpRoomRef = null;
  
  document.getElementById('mp-player-lobby-screen').style.display = 'none';
  document.getElementById('mp-player-game-screen').style.display = 'none';
  document.getElementById('mp-player-reveal-screen').style.display = 'none';
  document.getElementById('mp-player-join-screen').style.display = 'none';
  document.getElementById('mp-player-duel-buzzer-container').style.display = 'none';
  
  document.getElementById('mode-screen').style.display = 'flex';
}

// Helpers
function mpGetCategoryName(catId) {
  const cats = {
    1: "Geschichte & Verträge",
    2: "Geografie & Städte",
    3: "Institutionen & Politik",
    4: "Kultur & Symbole",
    5: "Wirtschaft & Euro"
  };
  return cats[catId] || "Allgemein";
}

function mpGenerateSessionQuestions(count, categoryFilter = 'all') {
  const list = [];
  const seenTexts = new Set();
  for (let catId in pool) {
    if (categoryFilter !== 'all' && catId.toString() !== categoryFilter.toString()) continue;
    const category = pool[catId];
    for (let country in category) {
      const diffs = category[country];
      for (let diffId in diffs) {
        const item = diffs[diffId];
        if (Array.isArray(item)) {
          item.forEach(q => {
            if (!seenTexts.has(q.q)) {
              seenTexts.add(q.q);
              list.push({ ...q, category: parseInt(catId), country: country });
            }
          });
        } else if (item && item.q) {
          if (!seenTexts.has(item.q)) {
            seenTexts.add(item.q);
            list.push({ ...item, category: parseInt(catId), country: country });
          }
        }
      }
    }
  }
  
  list.sort(() => Math.random() - 0.5);
  return list.slice(0, count);
}

function mpGetExplanation(qData, correctAnswerText) {
  if (qData.exp) return qData.exp;
  const qText = qData.q;
  if (typeof getExplanation === 'function') {
    return getExplanation(qText, correctAnswerText);
  }
  return `Die richtige Antwort lautet: <strong>${correctAnswerText}</strong>.`;
}

// --- NEW ACCESSIBILITY, HANDBOOK, AUDIO AND MULTIPLAYER LOGIC ---

// Accessibility Globals
let accessibilityTTSActive = false;
let accessibilityTextSize = 'normal';
let accessibilityContrastActive = false;
let speechUtterance = null;

function openAccessibilityPanel() {
  sounds.playClick();
  const modal = document.getElementById('accessibility-modal');
  if (modal) {
    const btn = document.getElementById('accessibility-toggle-btn');
    const panel = modal.querySelector('.control-center-panel');
    if (btn && panel) {
      const btnRect = btn.getBoundingClientRect();
      
      // Temporarily display flex to measure the panel's client coordinates accurately
      modal.style.display = 'flex';
      const panelRect = panel.getBoundingClientRect();
      
      // Calculate coordinates of the button relative to the panel
      const clickX = btnRect.left + (btnRect.width / 2);
      const clickY = btnRect.top + (btnRect.height / 2);
      
      const relX = clickX - panelRect.left;
      const relY = clickY - panelRect.top;
      
      panel.style.transformOrigin = `${relX}px ${relY}px`;
    }
    
    modal.classList.remove('cc-overlay-animate-out');
    modal.classList.add('cc-overlay-animate-in');
    modal.style.display = 'flex';
    
    if (panel) {
      panel.classList.remove('cc-panel-zoom-out');
      panel.classList.add('cc-panel-zoom-in');
    }
  }
  
  document.getElementById('access-tts-toggle').checked = accessibilityTTSActive;
  document.getElementById('access-contrast-toggle').checked = accessibilityContrastActive;
  document.getElementById('access-text-size').value = accessibilityTextSize;
  
  // Sync Theme Toggle
  const themeToggle = document.getElementById('access-theme-toggle');
  if (themeToggle) themeToggle.checked = document.body.classList.contains('dark-mode');
  
  // Sync Music Toggle
  const modalBtn = document.getElementById('modal-music-btn');
  if (modalBtn) {
    if (sounds.musicMuted) {
      modalBtn.innerText = "Musik stumm";
      modalBtn.style.background = "rgba(244,63,94,0.1)";
      modalBtn.style.borderColor = "rgba(244,63,94,0.3)";
      modalBtn.style.color = "var(--error)";
    } else {
      modalBtn.innerText = "Musik an";
      modalBtn.style.background = "rgba(16,185,129,0.1)";
      modalBtn.style.borderColor = "rgba(16,185,129,0.3)";
      modalBtn.style.color = "var(--success)";
    }
  }

  // Sync Motion Toggle
  const motionToggle = document.getElementById('access-motion-toggle');
  if (motionToggle) motionToggle.checked = safeLocalStorage.getItem('reduceMotion') === 'true';

  // Sync Timer Toggle
  const timerToggle = document.getElementById('access-timer-toggle');
  if (timerToggle) timerToggle.checked = safeLocalStorage.getItem('disableTimers') === 'true';
}

function toggleAccessibilityMotion() {
  sounds.playClick();
  const active = document.getElementById('access-motion-toggle').checked;
  safeLocalStorage.setItem('reduceMotion', active ? 'true' : 'false');
  if (active) {
    document.body.classList.add('reduce-motion');
  } else {
    document.body.classList.remove('reduce-motion');
  }
}

function toggleAccessibilityTimer() {
  sounds.playClick();
  const active = document.getElementById('access-timer-toggle').checked;
  safeLocalStorage.setItem('disableTimers', active ? 'true' : 'false');
}

function closeAccessibilityPanel() {
  sounds.playClick();
  const modal = document.getElementById('accessibility-modal');
  if (modal) {
    modal.classList.remove('cc-overlay-animate-in');
    modal.classList.add('cc-overlay-animate-out');
    
    const panel = modal.querySelector('.control-center-panel');
    if (panel) {
      panel.classList.remove('cc-panel-zoom-in');
      panel.classList.add('cc-panel-zoom-out');
    }
    
    setTimeout(() => {
      modal.style.display = 'none';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }, 300);
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

function toggleAccessibilityTTS() {
  accessibilityTTSActive = document.getElementById('access-tts-toggle').checked;
  sounds.playClick();
  if (accessibilityTTSActive) {
    speakText("Vorlesefunktion aktiviert.");
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

function changeAccessibilityTextSize() {
  const size = document.getElementById('access-text-size').value;
  accessibilityTextSize = size;
  sounds.playClick();
  
  document.body.classList.remove('access-text-large', 'access-text-xlarge');
  if (size === 'large') {
    document.body.classList.add('access-text-large');
  } else if (size === 'xlarge') {
    document.body.classList.add('access-text-xlarge');
  }
}

function toggleAccessibilityContrast() {
  accessibilityContrastActive = document.getElementById('access-contrast-toggle').checked;
  sounds.playClick();
  if (accessibilityContrastActive) {
    document.body.classList.add('accessibility-high-contrast');
  } else {
    document.body.classList.remove('accessibility-high-contrast');
  }
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  if (!accessibilityTTSActive) return;
  speechUtterance = new SpeechSynthesisUtterance(text);
  speechUtterance.lang = 'de-DE';
  window.speechSynthesis.speak(speechUtterance);
}

function speakCurrentQuestion() {
  if (!accessibilityTTSActive) return;
  const qData = (gameMode === 'flags') ? currentFlagQuestion : currentQuestionData;
  if (!qData) return;
  let optionsText = "";
  if (qData.o && qData.o.length === 4) {
    optionsText = ". Antwort A: " + qData.o[0] + 
                  ". Antwort B: " + qData.o[1] + 
                  ". Antwort C: " + qData.o[2] + 
                  ". Antwort D: " + qData.o[3];
  }
  speakText(qData.q + optionsText);
}

// Keyboard Navigation Listener
document.addEventListener('keydown', function(e) {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
  
  // Duel Mode Key Listener
  const duelScreen = document.getElementById('duel-game-screen');
  if (duelScreen && duelScreen.style.display !== 'none') {
    const key = e.key.toLowerCase();
    
    // Buzzers
    if (!duelBuzzerActive && !duelStealActive) {
      if (key === 'f') {
        duelTriggerBuzzer(1);
        return;
      }
      if (key === 'j' && duelP2Type === 'human') {
        duelTriggerBuzzer(2);
        return;
      }
    } else if (duelBuzzerActive) {
      // Submitting Answers (shared keys 1-4 for whoever buzzed first)
      if (key === '1') { duelSubmitAnswer(0); return; }
      if (key === '2') { duelSubmitAnswer(1); return; }
      if (key === '3') { duelSubmitAnswer(2); return; }
      if (key === '4') { duelSubmitAnswer(3); return; }
      if (duelModeType === 'local' && duelStealActive && (key === 's' || key === 'p' || key === ' ' || key === 'escape')) {
        duelPassSteal();
        return;
      }
    }
    
    // Stealing during steal state
    if (duelStealActive && !duelBuzzerActive) {
      const remainingPlayer = duelAnsweredPlayers[1] ? 2 : 1;
      if (remainingPlayer === 1 && key === 'f') {
        duelTriggerBuzzer(1);
        return;
      }
      if (remainingPlayer === 2 && key === 'j' && duelP2Type === 'human') {
        duelTriggerBuzzer(2);
        return;
      }
    }
    
    // Next question key
    if (key === 'enter') {
      const nextBtn = document.getElementById('duel-next-btn');
      if (nextBtn && nextBtn.style.display !== 'none') {
        nextBtn.click();
        return;
      }
    }
  }

  const dialog = document.getElementById('quiz-dialog');
  if (dialog && dialog.open) {
    if (e.key === '1') triggerOptionClick(0);
    else if (e.key === '2') triggerOptionClick(1);
    else if (e.key === '3') triggerOptionClick(2);
    else if (e.key === '4') triggerOptionClick(3);
    else if (e.key === 'Enter') {
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
        nextBtn.click();
      }
    }
  }
});

function triggerOptionClick(index) {
  const opt = document.getElementById('opt-' + index);
  if (opt) opt.click();
}

// EU-Handbuch Database and UI
const handbookData = {
  "Belgien": { capital: "Brüssel", year: 1951, pop: "11,7 Mio.", info: "Gründungsmitglied der EGKS. Brüssel beherbergt die Hauptsitze der EU-Kommission und des Rates." },
  "Bulgarien": { capital: "Sofia", year: 2007, pop: "6,4 Mio.", info: "Liegt am Schwarzen Meer. Bulgarien engagiert sich aktiv in der EU-Westbalkanpolitik." },
  "Dänemark": { capital: "Kopenhagen", year: 1973, pop: "5,9 Mio.", info: "Nutzt Opt-outs (Vorbehalte), z.B. beim Euro, und behielt die Dänische Krone als Währung." },
  "Deutschland": { capital: "Berlin", year: 1951, pop: "84,4 Mio.", info: "Bevölkerungsreichstes EU-Land. Stellt mit 96 Abgeordneten die größte Delegation im EU-Parlament." },
  "Estland": { capital: "Tallinn", year: 2004, pop: "1,3 Mio.", info: "Weltweiter Vorreiter im Bereich E-Government. Führte 2011 als erstes baltisches Land den Euro ein." },
  "Finnland": { capital: "Helsinki", year: 1995, pop: "5,5 Mio.", info: "Einziges nordisches EU-Mitglied, das sofort den Euro einführte. Bekannt für sein exzellentes Bildungssystem." },
  "Frankreich": { capital: "Paris", year: 1951, pop: "68,1 Mio.", info: "Gründungsmitglied und treibende Kraft. Straßburg ist der offizielle Hauptsitz des EU-Parlaments." },
  "Griechenland": { capital: "Athen", year: 1981, pop: "10,4 Mio.", info: "Wiege der Demokratie. Der Beitritt sollte die junge Demokratie nach der Militärdiktatur stabilisieren." },
  "Irland": { capital: "Dublin", year: 1973, pop: "5,2 Mio.", info: "Entwickelte sich nach dem Beitritt vom Agrarstaat zum High-Tech-Zentrum der EU." },
  "Italien": { capital: "Rom", year: 1951, pop: "58,9 Mio.", info: "Gründungsmitglied. Hier wurden 1957 die Römischen Verträge unterzeichnet, das Fundament der EWG." },
  "Kroatien": { capital: "Zagreb", year: 2013, pop: "3,8 Mio.", info: "Jüngster EU-Mitgliedstaat. Trat am 1. Januar 2023 zeitgleich der Eurozone und dem Schengen-Raum bei." },
  "Lettland": { capital: "Riga", year: 2004, pop: "1,8 Mio.", info: "Zentrum des Baltikums. Riga besitzt ein UNESCO-geschütztes Jugendstil-Viertel. Euro-Einführung 2014." },
  "Litauen": { capital: "Vilnius", year: 2004, pop: "2,8 Mio.", info: "Liegt am geografischen Mittelpunkt Europas (errechnet 1989). Führte 2015 den Euro ein." },
  "Luxemburg": { capital: "Luxemburg", year: 1951, pop: "660.000", info: "Gründungsmitglied. Sitz des EuGH. Eines der drei offiziellen Arbeitszentren der EU." },
  "Malta": { capital: "Valletta", year: 2004, pop: "530.000", info: "Flächen- und bevölkerungsmäßig kleinster EU-Mitgliedstaat. Liegt strategisch günstig im Mittelmeer." },
  "Niederlande": { capital: "Amsterdam", year: 1951, pop: "17,8 Mio.", info: "Gründungsmitglied. Den Haag beherbergt wichtige Organe und Agenturen (z.B. Europol)." },
  "Österreich": { capital: "Wien", year: 1995, pop: "9,1 Mio.", info: "Trat nach dem Ende des Kalten Krieges bei. Wichtiges Brückenland zu den mittel- und osteuropäischen Staaten." },
  "Polen": { capital: "Warschau", year: 2004, pop: "36,7 Mio.", info: "Flächenmäßig größtes Land der Ostererweiterung 2004. Die Oder-Neiße-Grenze trennt es von Deutschland." },
  "Portugal": { capital: "Lissabon", year: 1986, pop: "10,4 Mio.", info: "Trat zeitgleich mit Spanien bei. Der Vertrag von Lissabon (2007) reformierte die Funktionsweise der EU." },
  "Rumänien": { capital: "Rumänien", year: 2007, pop: "19,0 Mio.", info: "Trat 2007 bei. Die Donau mündet hier im UNESCO-Weltnaturerbe Donaudelta ins Schwarze Meer." },
  "Schweden": { capital: "Stockholm", year: 1995, pop: "10,5 Mio.", info: "Drittgrößtes EU-Land nach Fläche. Behielt die Schwedische Krone nach einem Währungsreferendum." },
  "Slowakei": { capital: "Bratislava", year: 2004, pop: "5,4 Mio.", info: "Bratislava liegt direkt an den Grenzen zu Österreich und Ungarn. Führte 2009 den Euro ein." },
  "Slowenien": { capital: "Ljubljana", year: 2004, pop: "2,1 Mio.", info: "Erster Staat des ehemaligen Jugoslawiens in der EU. Führte 2007 als erstes der neuen Länder den Euro ein." },
  "Spanien": { capital: "Madrid", year: 1986, pop: "48,0 Mio.", info: "Trat 1986 bei. Bedeutender Akteur im Mittelmeerraum und Bindeglied zu Lateinamerika." },
  "Tschechien": { capital: "Prag", year: 2004, pop: "10,8 Mio.", info: "Böhmen und Mähren bilden ein reiches Industrie- und Kulturzentrum. Prag besitzt eine der ältesten Brücken." },
  "Ungarn": { capital: "Budapest", year: 2004, pop: "9,6 Mio.", info: "Trat 2004 bei. Budapest wird durch die Donau in die historischen Stadtteile Buda und Pest geteilt." },
  "Zypern": { capital: "Nikosia", year: 2004, pop: "920.000", info: "Inselstaat im östlichen Mittelmeer. Völkerrechtlich gehört die ganze Insel zur EU, der Norden ist geteilt." }
};

function showHandbook() {
  sounds.playClick();
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('handbook-modal').style.display = 'flex';
  document.getElementById('handbook-search').value = "";
  renderHandbookGrid();
  document.getElementById('handbook-detail-card').innerHTML = `
    <div style="text-align:center; padding:30px 10px; color:var(--text-secondary);">
      <span style="font-size:3rem;">🇪🇺</span>
      <p style="font-weight:700; margin-top:10px;">Wähle ein Land aus, um den Steckbrief anzuzeigen.</p>
    </div>
  `;
}

function closeHandbook() {
  sounds.playClick();
  document.getElementById('handbook-modal').style.display = 'none';
  document.getElementById('start-screen').style.display = 'flex';
}

function renderHandbookGrid() {
  const container = document.getElementById('handbook-grid-container');
  if (!container) return;
  const searchVal = document.getElementById('handbook-search').value.toLowerCase().trim();
  container.innerHTML = "";
  countries.forEach((c, idx) => {
    if (searchVal && c.n.toLowerCase().indexOf(searchVal) === -1) return;
    const isUnlocked = c.p[1] || c.p[2] || c.p[3];
    const card = document.createElement('div');
    card.className = 'handbook-card' + (isUnlocked ? '' : ' locked');
    card.onclick = function() {
      if (isUnlocked) {
        showHandbookDetails(c.n);
      } else {
        sounds.playError();
        alert(c.n + " ist noch gesperrt. Spiele dieses Land in der Kampagne frei!");
      }
    };
    card.innerHTML = `
      <div style="font-size: 2.2rem; margin-bottom: 5px;">${c.f}</div>
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${c.n}</div>
      <div style="font-size: 0.7rem; color: ${isUnlocked ? 'var(--success)' : 'var(--text-secondary)'}; margin-top: 5px; font-weight:700;">
        ${isUnlocked ? '🔓 Frei' : '🔒 Gesperrt'}
      </div>
    `;
    container.appendChild(card);
  });
}

function filterHandbook() {
  renderHandbookGrid();
}

function showHandbookDetails(countryName) {
  sounds.playClick();
  const data = handbookData[countryName];
  const countryObj = countries.find(c => c.n === countryName);
  if (!data || !countryObj) return;
  const detailCard = document.getElementById('handbook-detail-card');
  detailCard.innerHTML = `
    <div style="text-align:center; border-bottom:1px solid var(--card-border); padding-bottom:15px; margin-bottom:15px;">
      <span style="font-size:3.5rem; display:block; margin-bottom:5px;">${countryObj.f}</span>
      <h3 style="font-family:'Space Grotesk',sans-serif; color:var(--accent); font-size:1.6rem; font-weight:800; margin:0;">${countryName}</h3>
    </div>
    <div style="display:flex; flex-direction:column; gap:12px; font-size:0.9rem;">
      <div>
        <strong style="color:var(--gold);">🏛️ Hauptstadt:</strong>
        <span style="color:var(--text-primary); margin-left:5px;">${data.capital}</span>
      </div>
      <div>
        <strong style="color:var(--gold);">📅 EU-Beitritt:</strong>
        <span style="color:var(--text-primary); margin-left:5px;">${data.year}</span>
      </div>
      <div>
        <strong style="color:var(--gold);">👥 Einwohner:</strong>
        <span style="color:var(--text-primary); margin-left:5px;">${data.pop}</span>
      </div>
      <div style="margin-top:10px; border-top:1px dashed var(--card-border); padding-top:12px;">
        <strong style="color:var(--accent); display:block; margin-bottom:6px;">💡 Didaktischer Steckbrief:</strong>
        <p style="margin:0; font-size:0.85rem; line-height:1.5; color:var(--text-primary);">${data.info}</p>
      </div>
    </div>
  `;
}

// Category Stats Visualisation
function renderCategoryStats() {
  const container = document.getElementById('category-stats-bars');
  if (!container) return;
  container.innerHTML = "";
  let hasData = false;
  for (let catId = 1; catId <= 5; catId++) {
    const stats = statsCategoryAnswers[catId];
    const total = stats.c + stats.w;
    if (total > 0) {
      hasData = true;
      const pct = Math.round((stats.c / total) * 100);
      const name = categoryNames[catId];
      const barHTML = `
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
            <span>${name}</span>
            <span>${stats.c} / ${total} richtig (${pct}%)</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-alt)); border-radius: 4px;"></div>
          </div>
        </div>
      `;
      container.innerHTML += barHTML;
    }
  }
  const section = document.getElementById('category-stats-section');
  if (section) section.style.display = hasData ? 'block' : 'none';
}

// --- Version 5.0 Bot Integration for all offline modes ---
let botPlayTimeouts = [];
let visualBotStreak = 0;

function clearBotTimeouts() {
  botPlayTimeouts.forEach(t => clearTimeout(t));
  botPlayTimeouts = [];
}

function toggleSetupBotSettings() {
  const checked = document.getElementById('setup-enable-bot').checked;
  document.getElementById('setup-bot-settings-group').style.display = checked ? 'block' : 'none';
  sounds.playClick();
}

function checkBotTurn() {
  clearBotTimeouts();
  if (gameMode === 'campaign' && teams[activeTeam] && teams[activeTeam].isBot) {
    if (typeof setUiLock === 'function') setUiLock(true);
    
    let playable = [];
    countries.forEach((c, idx) => {
      if (!c.p[1] || !c.p[2] || !c.p[3]) {
        playable.push(idx);
      }
    });
    
    if (playable.length === 0) {
      endGame();
      return;
    }
    
    const chosenCIdx = playable[Math.floor(Math.random() * playable.length)];
    const country = countries[chosenCIdx];
    
    // Choose randomly from remaining unplayed levels
    let unplayedLvls = [];
    if (!country.p[1]) unplayedLvls.push(1);
    if (!country.p[2]) unplayedLvls.push(2);
    if (!country.p[3]) unplayedLvls.push(3);
    
    // Choose level dynamically based on humanLastChosenLvl using randomized weights
    let preferredLvls = [1, 2, 3];
    const rVal = Math.random();
    if (typeof humanLastChosenLvl !== 'undefined') {
      if (humanLastChosenLvl === 1) {
        if (rVal < 0.5) preferredLvls = [2, 1, 3];
        else if (rVal < 0.8) preferredLvls = [1, 2, 3];
        else preferredLvls = [3, 2, 1];
      } else if (humanLastChosenLvl === 2) {
        if (rVal < 0.4) preferredLvls = [2, 3, 1];
        else if (rVal < 0.7) preferredLvls = [3, 2, 1];
        else preferredLvls = [1, 2, 3];
      } else if (humanLastChosenLvl === 3) {
        if (rVal < 0.5) preferredLvls = [3, 2, 1];
        else if (rVal < 0.8) preferredLvls = [2, 3, 1];
        else preferredLvls = [1, 2, 3];
      }
    }
    
    let chosenLvl = unplayedLvls[0] || 1;
    for (let pref of preferredLvls) {
      if (unplayedLvls.includes(pref)) {
        chosenLvl = pref;
        break;
      }
    }
    
    if (teams[activeTeam].simulate) {
      // Simulating campaign turn!
      const botDiff = teams[activeTeam].difficulty || 'easy';
      let accuracy = 0.5;
      if (botDiff === 'medium') accuracy = 0.75;
      else if (botDiff === 'hard') accuracy = 0.9;
      else if (botDiff === 'elite') accuracy = 0.98;
      
      const playRisk = (chosenLvl === 3) && (botDiff === 'hard' || botDiff === 'elite') && Math.random() > 0.4;
      
      const cards = document.querySelectorAll('#grid .card');
      const clickedCard = cards[chosenCIdx];
      if (clickedCard) {
        clickedCard.classList.add('zoom-active');
        clickedCard.style.boxShadow = '0 0 25px var(--accent)';
        clickedCard.style.transform = 'scale(1.05)';
      }
      
      const lvlStr = chosenLvl === 1 ? 'I' : (chosenLvl === 2 ? 'II' : 'III');
      const riskStr = playRisk ? ' (Risiko)' : '';
      document.getElementById('txt-turn-info').innerText = `🤖 Bot Klaus wählt ${country.n} (Level ${lvlStr}${riskStr})...`;
      
      botPlayTimeouts.push(setTimeout(() => {
        const isCorrect = Math.random() < accuracy;
        
        country.p[chosenLvl] = 1;
        
        if (isCorrect) {
          country.correct[chosenLvl] = 1;
          const pts = playRisk ? 6 : chosenLvl;
          teams[activeTeam].score += pts;
          sounds.playSuccess();
        } else {
          country.correct[chosenLvl] = 0;
          if (playRisk) {
            teams[activeTeam].score -= 3;
          }
          sounds.playError();
        }
        
        const isMasteredNow = country.correct[1] && country.correct[2] && country.correct[3];
        if (isMasteredNow) {
          justMasteredCIdx = chosenCIdx;
        }
        
        if (clickedCard) {
          clickedCard.classList.remove('zoom-active');
          clickedCard.style.boxShadow = '';
          clickedCard.style.transform = '';
        }
        
        botPlayTimeouts.push(setTimeout(() => {
          if (typeof setUiLock === 'function') setUiLock(false);
          if (typeof closeQ === 'function') closeQ();
        }, 1000));
        
      }, 1500));
      
      return;
    }
    
    document.getElementById('txt-turn-info').innerText = `🤖 Bot Klaus überlegt seinen Spielzug...`;
    
    botPlayTimeouts.push(setTimeout(() => {
      openQ(chosenCIdx);
      
      botPlayTimeouts.push(setTimeout(() => {
        // Highlight chosen level button visually
        const btn = document.getElementById(`btn-lvl-${chosenLvl}`);
        if (btn) {
          btn.style.borderColor = 'var(--accent)';
          btn.style.boxShadow = '0 0 15px var(--accent)';
          btn.style.transform = 'scale(1.05)';
        }
        
        botPlayTimeouts.push(setTimeout(() => {
          if (chosenLvl === 3) {
            const botDiff = teams[activeTeam].difficulty || 'easy';
            const playRisk = (botDiff === 'hard' || botDiff === 'elite') && Math.random() > 0.4;
            loadQuestion(3, playRisk);
          } else {
            loadQuestion(chosenLvl);
          }
          
          botPlayTimeouts.push(setTimeout(() => {
            const botDiff = teams[activeTeam].difficulty || 'easy';
            let accuracy = 0.5;
            if (botDiff === 'medium') accuracy = 0.75;
            else if (botDiff === 'hard') accuracy = 0.9;
            else if (botDiff === 'elite') accuracy = 0.98;
            
            const isCorrect = Math.random() < accuracy;
            let ansIdx = correctAnswer;
            if (!isCorrect) {
              const wrongs = [0, 1, 2, 3].filter(idx => idx !== correctAnswer);
              ansIdx = wrongs[Math.floor(Math.random() * wrongs.length)];
            }
            
            const optBtns = document.querySelectorAll('#options-container .option');
            if (optBtns[ansIdx]) {
              optBtns[ansIdx].click();
            }
            
            botPlayTimeouts.push(setTimeout(() => {
              closeQ();
              if (typeof setUiLock === 'function') setUiLock(false);
            }, 3500));
            
          }, 3000));
          
        }, 1200));
        
      }, 2000));
      
    }, 2000));
  } else {
    if (typeof setUiLock === 'function') setUiLock(false);
  }
}

function triggerBotRapidPlay() {
  clearBotTimeouts();
  if (teams[activeTeam] && teams[activeTeam].isBot && spTurnActive) {
    if (typeof setUiLock === 'function') setUiLock(true);
    
    const curIndex = (gameMode === 'flags') ? (typeof flagQuestionIndex !== 'undefined' ? flagQuestionIndex : 0) : (typeof rapidFireIndex !== 'undefined' ? rapidFireIndex : 0);
    if (curIndex === 0) {
      visualBotStreak = 0;
    }
    
    botPlayTimeouts.push(setTimeout(() => {
      if (!spTurnActive) return;
      
      const botDiff = teams[activeTeam].difficulty || 'easy';
      let accuracy = 0.5;
      if (botDiff === 'medium') accuracy = 0.75;
      else if (botDiff === 'hard') accuracy = 0.9;
      else if (botDiff === 'elite') accuracy = 0.98;
      
      let isCorrect = Math.random() < accuracy;
      if (visualBotStreak >= 5) {
        isCorrect = false;
      }
      
      if (isCorrect) {
        visualBotStreak++;
      } else {
        visualBotStreak = 0;
      }
      
      let ansIdx = correctAnswer;
      if (!isCorrect) {
        const wrongs = [0, 1, 2, 3].filter(idx => idx !== correctAnswer);
        ansIdx = wrongs[Math.floor(Math.random() * wrongs.length)];
      }
      
      checkRapidFire(ansIdx);
      
      botPlayTimeouts.push(setTimeout(() => {
        if (!spTurnActive) return;
        
        // If Sudden Death and wrong and revive button is visible, click it to revive!
        const reviveBtn = document.getElementById('revive-btn');
        if (gameMode === 'suddendeath' && reviveBtn && reviveBtn.style.display === 'block') {
          reviveBtn.click();
          return;
        }
        
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn && nextBtn.style.display !== 'none') {
          nextBtn.click();
        }
      }, 1500));
      
    }, 2500));
  } else {
    if (typeof setUiLock === 'function') setUiLock(false);
  }
}

// --- Version 5.0 Mobile Duel helper functions ---
function duelToggleModeType() {
  sounds.playClick();
  const mode = document.getElementById('duel-mode-type').value;
  duelModeType = mode;
  const startBtn = document.querySelector('#duel-setup-screen button[onclick="duelStartGame()"]');
  
  if (mode === 'local') {
    document.getElementById('duel-keyboard-settings-group').style.display = 'block';
    document.getElementById('duel-mobile-lobby-section').style.display = 'none';
    startBtn.disabled = false;
    startBtn.innerText = "Duell starten";
    if (duelRoomRef) {
      duelRoomRef.child('players').off();
      duelRoomRef.off();
      duelRoomRef.remove();
      duelRoomRef = null;
    }
  } else {
    document.getElementById('duel-keyboard-settings-group').style.display = 'none';
    document.getElementById('duel-mobile-lobby-section').style.display = 'block';
    startBtn.disabled = true;
    startBtn.innerText = "Warte auf Spieler...";
    duelInitMobileRoom();
  }
}

function duelInitMobileRoom() {
  if (!initFirebase()) {
    mpShowConfigModal();
    const status = document.getElementById('mp-config-status');
    status.style.display = 'block';
    status.innerText = "Bitte zuerst Firebase konfigurieren!";
    status.style.color = "var(--error)";
    document.getElementById('duel-mode-type').value = 'local';
    duelToggleModeType();
    return;
  }
  
  document.getElementById('duel-mobile-code-display').innerText = "Lade...";
  document.getElementById('duel-mobile-players-status').innerText = "Warte auf Spieler (0/2)...";
  document.getElementById('duel-mobile-players-names').innerHTML = "";
  document.getElementById('duel-mobile-qrcode').innerHTML = "";
  
  mpSecureCreateRoom('duel', {
    currentQuestion: null,
    buzzerOwner: null,
    stealPossible: false,
    answerStatus: 'idle',
    answerSubmitted: null,
    scores: { player1: 0, player2: 0 }
  }).then(({ code, ref }) => {
    duelMobileRoomCode = code;
    duelMobileIsHost = true;
    duelMobilePlayerId = null;
    duelMobilePlayers = {};
    duelRoomRef = ref;
    
    document.getElementById('duel-mobile-code-display').innerText = code;
    
    // Generate QR Code!
    const joinUrl = window.location.origin + window.location.pathname + "?room=" + code;
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=00bcd4&data=" + encodeURIComponent(joinUrl);
    document.getElementById('duel-mobile-qrcode').innerHTML = `<img src="${qrUrl}" alt="QR Code" style="border: 4px solid #fff; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 150px; height: 150px;">`;
    
    duelRoomRef.onDisconnect().remove();
    
    duelRoomRef.child('players').on('value', snapshot => {
      const rawPlayers = snapshot.val() || {};
      const players = mpMapPlayers(rawPlayers);
      duelMobilePlayers = players;
      
      const namesDiv = document.getElementById('duel-mobile-players-names');
      namesDiv.innerHTML = "";
      
      let pcount = 0;
      const namesList = [];
      if (players.player1) {
        pcount++;
        namesList.push(`<span style="color:var(--accent);">🎮 ${players.player1.name}</span>`);
      }
      if (players.player2) {
        pcount++;
        namesList.push(`<span style="color:var(--accent-alt);">🎮 ${players.player2.name}</span>`);
      }
      namesDiv.innerHTML = namesList.join(" vs ");
      
      document.getElementById('duel-mobile-players-status').innerText = `Warte auf Spieler (${pcount}/2)...`;
      
      const startBtn = document.querySelector('#duel-setup-screen button[onclick="duelStartGame()"]');
      if (pcount === 2) {
        startBtn.disabled = false;
        startBtn.innerText = "Duell starten";
        sounds.playSuccess();
      } else {
        startBtn.disabled = true;
        startBtn.innerText = "Warte auf Spieler...";
      }
    }, err => {
      console.error("Duel Host: Fehler beim Lesen der Spielerliste:", err);
    });
  }).catch(err => {
    console.error("Fehler beim Hosten des Duells:", err);
    alert("Fehler beim Erstellen des Duells: " + err.message);
    document.getElementById('duel-mode-type').value = 'local';
    duelToggleModeType();
  });
}

function mpStartDuelRoomListener(name) {
  if (!mpRoomRef || !mpPlayerId) return;
  
  mpRoomRef.on('value', snap => {
    if (!snap.exists()) {
      alert("Das Duell wurde geschlossen.");
      mpPlayerResetAll();
      return;
    }
    
    const r = snap.val();
    r.players = mpMapPlayers(r.players || {});
    const players = r.players;
    const p = players[mpPlayerId];
    
    if (!p) {
      alert("Verbindung zum Duell verloren.");
      mpPlayerResetAll();
      return;
    }
    
    document.getElementById('mp-player-game-name').innerText = p.name;
    const scoresObj = r.scores || { player1: 0, player2: 0 };
    const isPlayer1 = players.player1 && (players.player1.uid === mpPlayerId);
    const myScore = isPlayer1 ? (scoresObj.player1 || 0) : (scoresObj.player2 || 0);
    document.getElementById('mp-player-game-score').innerText = myScore + " Punkte";
    document.getElementById('mp-player-game-code').innerText = mpRoomCode;
    
    if (r.state === 'lobby') {
      document.getElementById('mp-player-lobby-screen').style.display = 'flex';
      document.getElementById('mp-player-game-screen').style.display = 'none';
    } else if (r.state === 'game') {
      document.getElementById('mp-player-lobby-screen').style.display = 'none';
      document.getElementById('mp-player-game-screen').style.display = 'flex';
      
      if (r.currentQuestion) {
        mpClientCanBuzz = false;
        document.getElementById('mp-player-question-container').style.display = 'block';
        document.getElementById('mp-player-question-category').innerText = r.currentQuestion.categoryName || "In Vielfalt geeint";
        document.getElementById('mp-player-question-text').innerHTML = r.currentQuestion.q;
        
        document.getElementById('mp-controller-wait').style.display = 'none';
        document.getElementById('mp-controller-buttons').style.display = 'none';
        
        const statusEl = document.getElementById('mp-player-duel-status');
        const buzzerBtn = document.getElementById('mp-player-duel-buzzer-btn');
        const container = document.getElementById('mp-player-duel-buzzer-container');
        
        container.style.display = 'flex';
        
        const passContainer = document.getElementById('mp-controller-pass-container');
        if (passContainer) passContainer.style.display = 'none';
        
        if (r.answerStatus === 'buzzing') {
          mpClientCanBuzz = true;
          statusEl.innerText = "Buzzer bereit!";
          statusEl.style.color = "var(--accent)";
          buzzerBtn.disabled = false;
          buzzerBtn.style.opacity = '1';
          buzzerBtn.style.transform = 'none';
        } else if (r.answerStatus === 'steal') {
          const canSteal = r.players[r.allowedPlayerId] && (r.players[r.allowedPlayerId].uid === mpPlayerId);
          if (canSteal) {
            statusEl.innerText = "ABSTAUBEN! Wähle eine Antwort:";
            statusEl.style.color = "var(--gold)";
            container.style.display = 'none';
            
            const btnGrid = document.getElementById('mp-controller-buttons');
            btnGrid.style.display = 'grid';
            
            if (passContainer) passContainer.style.display = 'flex';
            
            for (let i = 0; i < 4; i++) {
              const textEl = document.getElementById('mp-opt-text-' + i);
              if (textEl && r.currentQuestion && r.currentQuestion.o && r.currentQuestion.o[i]) {
                textEl.innerText = r.currentQuestion.o[i];
              }
            }
          } else {
            statusEl.innerText = "Gegner staubt ab! Warte...";
            statusEl.style.color = "var(--error)";
            buzzerBtn.disabled = true;
            buzzerBtn.style.opacity = '0.3';
          }
        } else if (r.answerStatus === 'answering') {
          const isCurrentPlayerBuzzed = r.players[r.buzzerOwner] && (r.players[r.buzzerOwner].uid === mpPlayerId);
          if (isCurrentPlayerBuzzed) {
            statusEl.innerText = "DEINE CHANCE! Wähle eine Antwort:";
            statusEl.style.color = "var(--success)";
            container.style.display = 'none';
            
            const btnGrid = document.getElementById('mp-controller-buttons');
            btnGrid.style.display = 'grid';
            
            for (let i = 0; i < 4; i++) {
              const textEl = document.getElementById('mp-opt-text-' + i);
              if (textEl && r.currentQuestion && r.currentQuestion.o && r.currentQuestion.o[i]) {
                textEl.innerText = r.currentQuestion.o[i];
              }
            }
          } else {
            statusEl.innerText = "Gegner hat gebuzzert! Warte...";
            statusEl.style.color = "var(--error)";
            buzzerBtn.disabled = true;
            buzzerBtn.style.opacity = '0.3';
          }
        } else if (r.answerStatus === 'revealed' || r.answerStatus === 'passed') {
          container.style.display = 'none';
          document.getElementById('mp-controller-wait').style.display = 'flex';
          const waitTxt = document.getElementById('mp-controller-wait-text');
          
          const isPass = (r.answerStatus === 'passed') || (r.answerSubmitted && r.answerSubmitted.index === -1);
          const isCorrect = r.answerSubmitted && r.answerSubmitted.index === r.currentQuestion.correctOption;
          const p1 = r.players.player1;
          const p2 = r.players.player2;
          const winnerName = (p1 && r.buzzerOwner === 'player1') ? p1.name : ((p2 && r.buzzerOwner === 'player2') ? p2.name : "");
          const isTimeout = r.currentQuestion && r.currentQuestion.isTimeout;
          const isCurrentPlayerBuzzed = r.players[r.buzzerOwner] && (r.players[r.buzzerOwner].uid === mpPlayerId);
          
          if (isPass) {
            waitTxt.innerText = "Frage ausgelassen! Keine Minuspunkte.";
            waitTxt.style.color = "var(--accent)";
          } else if (isTimeout) {
            if (isCurrentPlayerBuzzed) {
              waitTxt.innerText = "⏳ Zeit abgelaufen! Punkte abgezogen. 😢";
              waitTxt.style.color = "var(--error)";
            } else if (r.buzzerOwner) {
              waitTxt.innerText = `⏳ Zeit abgelaufen für ${winnerName}!`;
              waitTxt.style.color = "var(--error)";
            } else {
              waitTxt.innerText = "⏳ Zeit abgelaufen! Niemand hat gebuzzert.";
              waitTxt.style.color = "var(--text-secondary)";
            }
          } else if (isCurrentPlayerBuzzed) {
            waitTxt.innerText = isCorrect ? "Richtig! Gut gemacht! 👍" : "Falsch! Punkte abgezogen. 😢";
            waitTxt.style.color = isCorrect ? "var(--success)" : "var(--error)";
          } else {
            waitTxt.innerText = isCorrect ? `${winnerName} hat richtig geantwortet!` : `${winnerName} lag falsch!`;
            waitTxt.style.color = "var(--text-primary)";
          }
        }
      } else {
        document.getElementById('mp-player-question-container').style.display = 'none';
        document.getElementById('mp-player-duel-buzzer-container').style.display = 'none';
        document.getElementById('mp-controller-wait').style.display = 'flex';
        document.getElementById('mp-controller-wait-text').innerText = "Warte auf die nächste Frage...";
      }
    } else if (r.state === 'finished') {
      document.getElementById('mp-player-question-container').style.display = 'none';
      document.getElementById('mp-player-duel-buzzer-container').style.display = 'none';
      document.getElementById('mp-controller-wait').style.display = 'flex';
      
      const p1 = r.players.player1;
      const p2 = r.players.player2;
      const finalScores = r.scores || { player1: 0, player2: 0 };
      const s1 = finalScores.player1 || 0;
      const s2 = finalScores.player2 || 0;
      let winText = "";
      if (s1 > s2) {
        winText = `Duell beendet! ${p1 ? p1.name : "Spieler 1"} gewinnt! 🏆`;
      } else if (s2 > s1) {
        winText = `Duell beendet! ${p2 ? p2.name : "Spieler 2"} gewinnt! 🏆`;
      } else {
        winText = "Duell beendet! Unentschieden! 🤝";
      }
      document.getElementById('mp-controller-wait-text').innerText = winText;
    }
  }, err => {
    console.warn("Duell-Listener abgebrochen:", err);
    alert("Das Duell wurde geschlossen.");
    mpPlayerResetAll();
  });
}

function mpPlayerDuelBuzz() {
  sounds.playClick();
  if (!mpRoomRef || !mpPlayerId) return;
  if (!mpClientCanBuzz) return;
  
  mpRoomRef.child('buzzerOwner').transaction(currentOwner => {
    if (currentOwner === null) {
      return mpPlayerId;
    }
    return currentOwner;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error("Buzzer Transaction Fehler:", error);
      alert("Fehler beim Buzzern: " + error.message);
    } else if (committed) {
      mpRoomRef.update({
        answerStatus: 'answering'
      }).catch(err => {
        console.error("Status Update Fehler nach Buzzer:", err);
        alert("Fehler beim Aktualisieren des Spielstatus: " + err.message);
      });
    }
  });
}

