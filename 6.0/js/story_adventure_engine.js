/**
 * Expedition Europa — Adventure Engine (Version 6.0)
 * Handles Dynamic Narrative Scenes, Branching Choices, Mission Tracking,
 * Character Emotes, Clue Logbook, Inventory & Story-Integrated Quizzes.
 * Requires at least 1 correct answer to pass (Mastery Requirement).
 */

const StoryAdventureEngine = {
  activeAdventure: null,
  currentScene: null,
  dialogueIndex: 0,
  isTyping: false,
  typingInterval: null,
  currentFullText: "",
  typingTarget: null,
  stageScore: 0,
  stageErrors: 0,
  correctAnswersCount: 0,

  state: {
    choices: {},
    inventory: [],
    clues: [],
    completedMissions: [],
    boosterUsed: false
  },

  init: function() {
    this.loadAdventureState();
  },

  useKlausBooster: function() {
    if (this.state.boosterUsed) {
      if (typeof StoryMode !== 'undefined') {
        StoryMode.showItemDetailModal("⚡", "Klaus-Scan bereits genutzt", "Booster aufgebraucht", "Pilot Klaus hat seinen Archiv-Scanner in dieser Etappe bereits eingesetzt. Bei der nächsten Reise steht er wieder bereit!", "Booster");
      }
      return;
    }

    const optionsBox = document.getElementById('adv-mission-options');
    if (!optionsBox) {
      if (typeof StoryMode !== 'undefined') {
        StoryMode.showItemDetailModal("⚡", "Klaus-Scan", "Nur in Missionen", "Klaus kann seinen Scanner aktivieren, sobald eine historische Missionsfrage auf dem Bildschirm angezeigt wird!", "Booster");
      }
      return;
    }

    const allBtns = Array.from(optionsBox.querySelectorAll('.story-answer-btn'));
    if (allBtns.length <= 2) return;

    try { if (typeof sounds !== 'undefined') sounds.playSuccess(); } catch(e) {}
    this.state.boosterUsed = true;
    this.saveAdventureState();

    const boosterBtn = document.getElementById('adv-btn-klaus-booster');
    if (boosterBtn) {
      boosterBtn.style.opacity = '0.5';
      boosterBtn.innerHTML = '<span>⚡</span> Scan verbraucht';
    }

    // Identify incorrect buttons to eliminate 2 of them
    const wrongBtns = allBtns.filter(b => !b.onclick.toString().includes('true'));
    const toDisable = wrongBtns.slice(0, 2);
    toDisable.forEach(b => {
      b.style.opacity = '0.25';
      b.style.pointerEvents = 'none';
      b.style.textDecoration = 'line-through';
    });

    if (typeof StoryMode !== 'undefined') {
      StoryMode.showItemDetailModal("⚡", "Klaus-Scan Aktiviert!", "2 falsche Antworten eliminiert", "Bot Klaus hat die Archivdatenbank durchsucht und zwei fehlerhafte Optionen für dich ausgestrichen!", "Booster Erfolgreich");
    }
  },

  loadAdventureState: function() {
    try {
      const raw = safeLocalStorage.getItem('eu_story_adv_state_v6');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state.choices = parsed.choices || {};
        this.state.inventory = parsed.inventory || [];
        this.state.clues = parsed.clues || [];
        this.state.completedMissions = parsed.completedMissions || [];
      }
    } catch (e) {}
  },

  saveAdventureState: function() {
    try {
      safeLocalStorage.setItem('eu_story_adv_state_v6', JSON.stringify(this.state));
    } catch (e) {}
  },

  // --- Start Country Adventure ---
  startAdventure: function(countryName) {
    this.stageScore = 0;
    this.stageErrors = 0;
    this.correctAnswersCount = 0;

    // Always generate fresh adventure directly from StoryQuestionsPool with full curriculum support
    const advData = this.generateFallbackAdventure(countryName);

    this.activeAdventure = advData;
    this.showAdventureScreen();
    this.goToScene(advData.startScene || "auto_arrival");
  },

  showAdventureScreen: function() {
    if (typeof StoryMode !== 'undefined') {
      StoryMode.hideAllStoryScreens();
    }
    document.body.classList.add('story-active');

    const advScreen = document.getElementById('story-adventure-screen');
    if (advScreen) advScreen.style.display = 'flex';
  },

  goToScene: function(sceneId) {
    if (!this.activeAdventure || !this.activeAdventure.scenes[sceneId]) {
      console.warn("Scene not found:", sceneId);
      this.finishAdventure();
      return;
    }

    this.currentScene = this.activeAdventure.scenes[sceneId];
    this.dialogueIndex = 0;
    this.renderCurrentScene();
  },

  renderCurrentScene: function() {
    const scene = this.currentScene;
    if (!scene) return;

    // 1. Scene Header & Title (Zeitreise-Epoche)
    const headerTag = document.getElementById('adv-scene-tag');
    const headerTitle = document.getElementById('adv-scene-title');
    const stData = (typeof StoryMode !== 'undefined' && StoryMode.expeditionRoute) ? StoryMode.expeditionRoute.find(r => r.name === this.activeAdventure.country) : null;
    const yearStr = stData?.year ? `${stData.year} • ` : "";
    if (headerTag) headerTag.innerText = `Zeitreise: ${yearStr}Kapitel ${this.activeAdventure.chapter || 1} • ${this.activeAdventure.flag || '🇪🇺'} ${this.activeAdventure.country}`;
    if (headerTitle) headerTitle.innerText = scene.title || "Expedition";

    // 2. Cinematic Landmark Photo Banner
    const landmarkContainer = document.getElementById('adv-landmark-container');
    const landmarkImg = document.getElementById('adv-landmark-img');
    const landmarkLabel = document.getElementById('adv-landmark-label');

    if (scene.landmarkImage && landmarkContainer && landmarkImg) {
      landmarkImg.src = scene.landmarkImage;
      if (landmarkLabel) landmarkLabel.innerText = scene.landmarkTitle || scene.title;
      landmarkContainer.style.display = 'block';
    } else if (landmarkContainer) {
      landmarkContainer.style.display = 'none';
    }

    // 3. Reset all interactive areas first
    const choicesBox = document.getElementById('adv-choices-container');
    const missionBox = document.getElementById('adv-mission-container');
    const retryBox = document.getElementById('adv-retry-container');
    const continueBtn = document.getElementById('adv-btn-continue');
    const dialogueBox = document.querySelector('.adv-dialogue-box');
    const characterRow = document.querySelector('.adv-character-row');

    if (choicesBox) choicesBox.style.display = 'none';
    if (missionBox) missionBox.style.display = 'none';
    if (retryBox) retryBox.style.display = 'none';

    if (scene.dialogue && scene.dialogue.length > 0) {
      if (dialogueBox) dialogueBox.style.display = 'block';
      if (characterRow) characterRow.style.display = 'flex';
      if (continueBtn) continueBtn.style.display = 'inline-flex';
      this.playDialogueStep();
    } else if (scene.mission) {
      if (dialogueBox) dialogueBox.style.display = 'none';
      if (characterRow) characterRow.style.display = 'none';
      if (continueBtn) continueBtn.style.display = 'none';
      this.renderMissionStep();
    } else if (scene.choices) {
      if (dialogueBox) dialogueBox.style.display = 'none';
      if (characterRow) characterRow.style.display = 'none';
      if (continueBtn) continueBtn.style.display = 'none';
      this.renderChoicesStep();
    }
  },

  playDialogueStep: function() {
    const scene = this.currentScene;
    if (!scene || !scene.dialogue) return;

    if (this.isTyping) {
      this.completeTypingInstantly();
      return;
    }

    if (this.dialogueIndex >= scene.dialogue.length) {
      // Dialogue finished: Show mission or choices
      const continueBtn = document.getElementById('adv-btn-continue');
      if (continueBtn) continueBtn.style.display = 'none';

      if (scene.mission) {
        this.renderMissionStep();
      } else if (scene.choices) {
        this.renderChoicesStep();
      }
      return;
    }

    const dItem = scene.dialogue[this.dialogueIndex];
    const charData = StoryCharacters[dItem.speaker] || {
      name: dItem.speaker || "Co-Pilot",
      avatar: "assets/story/pilot_klaus.jpg",
      role: "Begleiter",
      color: "#06b6d4"
    };

    // Update Avatar & Speaker UI
    const avatarImg = document.getElementById('adv-speaker-avatar');
    const speakerName = document.getElementById('adv-speaker-name');
    const speakerRole = document.getElementById('adv-speaker-role');
    const dialogueText = document.getElementById('adv-dialogue-text');

    if (avatarImg) avatarImg.src = charData.avatar;
    if (speakerName) {
      speakerName.innerText = charData.name;
      speakerName.style.color = charData.color || '#38bdf8';
    }
    if (speakerRole) speakerRole.innerText = charData.role || 'Expedition';

    this.typewriterEffect(dialogueText, dItem.text);
    this.dialogueIndex++;
  },

  typewriterEffect: function(element, fullText) {
    if (!element) return;
    element.innerHTML = "";
    this.isTyping = true;
    this.currentFullText = fullText;
    this.typingTarget = element;

    let idx = 0;
    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      if (idx < fullText.length) {
        element.innerHTML += fullText.charAt(idx);
        idx++;
      } else {
        clearInterval(this.typingInterval);
        this.isTyping = false;
      }
    }, 16);
  },

  completeTypingInstantly: function() {
    clearInterval(this.typingInterval);
    if (this.typingTarget && this.currentFullText) {
      this.typingTarget.innerHTML = this.currentFullText;
    }
    this.isTyping = false;
  },

  renderChoicesStep: function() {
    const scene = this.currentScene;
    if (!scene || !scene.choices) return;

    const choicesBox = document.getElementById('adv-choices-container');
    if (!choicesBox) return;

    choicesBox.innerHTML = "";
    scene.choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'adv-choice-card-btn';
      btn.innerHTML = `<span>${ch.text}</span> <span style="font-size:1.1rem; color:#38bdf8;">➔</span>`;
      btn.onclick = () => {
        try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
        if (ch.choiceId) {
          this.state.choices[ch.choiceId] = true;
          this.saveAdventureState();
        }
        if (ch.action === "completeCountryAdventure") {
          this.finishAdventure();
        } else if (ch.nextScene) {
          this.goToScene(ch.nextScene);
        }
      };
      choicesBox.appendChild(btn);
    });

    choicesBox.style.display = 'flex';
  },

  renderMissionStep: function() {
    const scene = this.currentScene;
    if (!scene || !scene.mission) return;

    // Hide dialogue box and avatar during interactive mission to prevent layout overlap
    const dialogueBox = document.querySelector('.adv-dialogue-box');
    const characterRow = document.querySelector('.adv-character-row');
    const continueBtn = document.getElementById('adv-btn-continue');
    if (dialogueBox) dialogueBox.style.display = 'none';
    if (characterRow) characterRow.style.display = 'none';
    if (continueBtn) continueBtn.style.display = 'none';

    const mission = scene.mission;
    const missionBox = document.getElementById('adv-mission-container');
    const missionTitle = document.getElementById('adv-mission-title');
    const missionDesc = document.getElementById('adv-mission-desc');
    const missionReward = document.getElementById('adv-mission-reward-tag');
    const qText = document.getElementById('adv-mission-q-text');
    const optionsBox = document.getElementById('adv-mission-options');
    const feedbackBox = document.getElementById('adv-mission-feedback');

    const mType = mission.missionType || "quiz";

    let typeBadge = "🎯 Mission";
    if (mType === "flag_radar") typeBadge = "🚩 Flaggen- & Symbol-Radar";
    else if (mType === "slider_estimate") typeBadge = "📊 Schätz-Sensor";
    else if (mType === "true_false") typeBadge = "⚡ Wahr-oder-Falsch Schnellscan";
    else if (mType === "puzzle_sort") typeBadge = "🧩 Relikt-Entschlüsselung";
    else if (mType === "timeline" || mType === "timeline_order" || mType === "ordering") typeBadge = "📅 Chronologische Timeline";
    else if (mType === "code_puzzle") typeBadge = "🔢 Datum- & Code-Knacker";
    else if (mType === "odd_one_out") typeBadge = "🔍 Finde den Schwindler";
    else if (mType === "two_truths_one_lie") typeBadge = "🕵️ Zwei Wahrheiten, eine Lüge";
    else if (mType === "decision_dilemma" || mType === "decision") typeBadge = "⚖️ Historisches Dilemma";
    else if (mType === "classic" || mType === "choice") typeBadge = "📜 Historischer Meilenstein";

    if (missionTitle) missionTitle.innerText = `${typeBadge}: ${mission.title}`;
    if (missionDesc) missionDesc.innerText = mission.desc;
    if (missionReward) missionReward.innerText = `+${mission.rewardXP || 100} XP • ${mission.rewardItem ? mission.rewardItem.icon + ' ' + mission.rewardItem.name : 'Belohnung'}`;
    if (feedbackBox) {
      feedbackBox.className = '';
      feedbackBox.style.display = 'none';
    }

    const q = mission.question || {};
    if (qText) qText.innerText = q.q || q.question || "Welche historische Weichenstellung prägte dieses Land?";

    if (optionsBox) {
      optionsBox.innerHTML = "";
      const correctIndex = (typeof q.correctIndex === 'number') ? q.correctIndex : ((typeof q.a === 'number') ? q.a : 0);
      const lore = q.lore || q.exp || "";

      // -------------------------------------------------------------
      // MODE 1: 📊 SLIDER ESTIMATE CHALLENGE
      // -------------------------------------------------------------
      if (mType === "slider_estimate") {
        const targetVal = typeof mission.targetValue === 'number' ? mission.targetValue : 1957;
        const minVal = mission.minVal || (targetVal - 30);
        const maxVal = mission.maxVal || (targetVal + 30);
        const unit = mission.unit || "";
        const tolerance = (typeof mission.tolerance === 'number') ? mission.tolerance : 3;

        // Start slider at minVal so player MUST actively slide and estimate!
        const initialVal = minVal;

        optionsBox.innerHTML = `
          <div style="width: 100%; display:flex; flex-direction:column; align-items:center; gap: 14px; padding: 10px 0;">
            <div style="font-size: 2.3rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; color: #0284c7;" id="slider-display-val">
              ${initialVal} ${unit}
            </div>
            <input type="range" id="mission-slider-input" min="${minVal}" max="${maxVal}" value="${initialVal}" style="width: 85%; height: 12px; accent-color: #0284c7; cursor: pointer;">
            <div style="display:flex; justify-content: space-between; width: 85%; font-size: 0.85rem; font-weight: 700; opacity: 0.8;">
              <span>${minVal} ${unit}</span>
              <span>${maxVal} ${unit}</span>
            </div>
            <button class="btn-main" id="btn-submit-slider" style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color:#fff; border:none; padding:12px 32px; font-weight:800; border-radius:14px; margin-top:8px; cursor:pointer;">
              Schätzung einloggen ➔
            </button>
          </div>
        `;

        const sInput = document.getElementById('mission-slider-input');
        const sDisplay = document.getElementById('slider-display-val');
        const sBtn = document.getElementById('btn-submit-slider');

        if (sInput && sDisplay) {
          sInput.oninput = () => {
            sDisplay.innerText = `${sInput.value} ${unit}`;
          };
        }

        if (sBtn && sInput) {
          sBtn.onclick = () => {
            sBtn.disabled = true;
            sInput.disabled = true;
            const guessedVal = parseInt(sInput.value, 10);
            const diff = Math.abs(guessedVal - targetVal);
            const isAccurate = diff <= tolerance;

            const feedbackLore = `${lore} (Exakter Wert: <b>${targetVal} ${unit}</b> • Deine Schätzung: <b>${guessedVal} ${unit}</b>)`;
            this.handleMissionAnswer(isAccurate, sBtn, 0, optionsBox, feedbackLore, mission);
          };
        }
      }
      // -------------------------------------------------------------
      // MODE 1: ⚡ TRUE / FALSE (BOOLEAN)
      // -------------------------------------------------------------
      if (mType === "boolean" || mType === "true_false") {
        const correctIndex = q.a !== undefined ? q.a : (mission.correctIndex !== undefined ? mission.correctIndex : 0);
        // Index 0 = Richtig/Wahr, Index 1 = Falsch
        optionsBox.innerHTML = `
          <div style="display: flex; gap: 16px; width: 100%; justify-content: center; flex-wrap: wrap;">
            <button class="story-answer-btn tf-btn" style="flex: 1; min-width: 150px; justify-content: center; font-size: 1.25rem; font-weight:800;" id="tf-btn-true">
              ✅ Richtig
            </button>
            <button class="story-answer-btn tf-btn" style="flex: 1; min-width: 150px; justify-content: center; font-size: 1.25rem; font-weight:800;" id="tf-btn-false">
              ❌ Falsch
            </button>
          </div>
        `;

        const bTrue = document.getElementById('tf-btn-true');
        const bFalse = document.getElementById('tf-btn-false');

        if (bTrue) {
          bTrue.onclick = () => this.handleMissionAnswer(correctIndex === 0, bTrue, correctIndex, optionsBox, lore, mission);
        }
        if (bFalse) {
          bFalse.onclick = () => this.handleMissionAnswer(correctIndex === 1, bFalse, correctIndex, optionsBox, lore, mission);
        }
      }
      // -------------------------------------------------------------
      // MODE 2: 📅 CHRONOLOGICAL TIMELINE ORDERING
      // -------------------------------------------------------------
      else if (mType === "timeline_order" || mType === "ordering" || mType === "timeline") {
        const rawItems = q.items || mission.items || [];
        // Map with original expected order (1, 2, 3, ...)
        const indexedItems = rawItems.map((it, idx) => ({
          id: it.id !== undefined ? it.id : idx,
          order: it.order !== undefined ? it.order : (idx + 1),
          text: it.text || it
        }));

        // Shuffle available items
        const availableItems = [...indexedItems];
        for (let i = availableItems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableItems[i], availableItems[j]] = [availableItems[j], availableItems[i]];
        }

        const selectedItems = [];
        let isSubmitted = false;

        const renderOrderingUI = () => {
          optionsBox.innerHTML = `
            <div class="timeline-ordering-container ${isSubmitted ? 'submitted' : ''}">
              <div style="font-size:0.88rem; color:#38bdf8; font-weight:800; text-transform:uppercase; letter-spacing:0.8px;">
                Deine chronologische Timeline (Früheste zuerst):
              </div>
              <div class="timeline-slots-wrap" id="timeline-slots-area">
                ${selectedItems.length === 0 
                  ? `<div style="color:#94a3b8; font-size:0.9rem; text-align:center; padding:12px; font-style:italic;">Klicke unten auf die Ereignisse in der richtigen historischen Reihenfolge (1. ➔ 2. ➔ 3. ➔ 4.)</div>`
                  : selectedItems.map((it, idx) => `
                    <div class="timeline-slot-row" data-idx="${idx}">
                      <div class="timeline-slot-left">
                        <div class="timeline-slot-num">${idx + 1}</div>
                        <span>${it.text}</span>
                      </div>
                      <div class="timeline-slot-badge">
                        ${!isSubmitted ? `<span style="font-size:0.85rem; color:#f87171; font-weight:700;">✕</span>` : ''}
                      </div>
                    </div>
                  `).join('')
                }
              </div>

              ${(availableItems.length > 0 && !isSubmitted) ? `
                <div style="font-size:0.88rem; color:#94a3b8; font-weight:700;">Verfügbare Ereignisse (Antippen zum Hinzufügen):</div>
                <div class="timeline-available-chips" id="timeline-chips-area">
                  ${availableItems.map((it, idx) => `
                    <button class="timeline-chip" data-chip-idx="${idx}">
                      <span>📅</span> <span>${it.text}</span>
                    </button>
                  `).join('')}
                </div>
              ` : ''}

              <div style="display:flex; gap:12px; margin-top:8px;">
                ${(selectedItems.length > 0 && !isSubmitted) ? `
                  <button class="cockpit-btn" id="btn-timeline-reset" style="padding:10px 18px; font-size:0.9rem;">🔄 Zurücksetzen</button>
                ` : ''}
                <button class="btn-multiselect-submit" id="btn-timeline-submit" ${(selectedItems.length !== rawItems.length || isSubmitted) ? 'disabled' : ''}>
                  <span>Timeline prüfen</span> ➔
                </button>
              </div>
            </div>
          `;

          // Event listeners for chips
          optionsBox.querySelectorAll('.timeline-chip').forEach(btn => {
            btn.onclick = () => {
              if (isSubmitted) return;
              const chipIdx = parseInt(btn.getAttribute('data-chip-idx'), 10);
              const [chosen] = availableItems.splice(chipIdx, 1);
              selectedItems.push(chosen);
              try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
              renderOrderingUI();
            };
          });

          // Event listeners for removing slots
          optionsBox.querySelectorAll('.timeline-slot-row').forEach(row => {
            row.onclick = () => {
              if (isSubmitted) return;
              const rowIdx = parseInt(row.getAttribute('data-idx'), 10);
              const [removed] = selectedItems.splice(rowIdx, 1);
              availableItems.push(removed);
              try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
              renderOrderingUI();
            };
          });

          const resetBtn = document.getElementById('btn-timeline-reset');
          if (resetBtn) {
            resetBtn.onclick = () => {
              if (isSubmitted) return;
              while (selectedItems.length > 0) {
                availableItems.push(selectedItems.pop());
              }
              try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
              renderOrderingUI();
            };
          }

          const submitBtn = document.getElementById('btn-timeline-submit');
          if (submitBtn) {
            submitBtn.onclick = () => {
              if (isSubmitted) return;
              isSubmitted = true;

              // 1. Lock container immediately
              const container = optionsBox.querySelector('.timeline-ordering-container');
              if (container) container.classList.add('submitted');

              submitBtn.disabled = true;
              const rBtn = document.getElementById('btn-timeline-reset');
              if (rBtn) rBtn.style.display = 'none';

              optionsBox.querySelectorAll('.timeline-chip').forEach(btn => {
                btn.disabled = true;
                btn.onclick = null;
                btn.style.opacity = '0.3';
                btn.style.cursor = 'default';
              });

              // 2. Validate order and color-code each slot with clear badge
              let isCorrect = true;
              const slotRows = optionsBox.querySelectorAll('.timeline-slot-row');

              selectedItems.forEach((it, idx) => {
                const row = slotRows[idx];
                if (!row) return;
                row.onclick = null;
                row.style.cursor = 'default';

                const badge = row.querySelector('.timeline-slot-badge');
                const isThisSlotCorrect = (it.order === (idx + 1));

                if (isThisSlotCorrect) {
                  row.classList.add('slot-correct');
                  if (badge) {
                    badge.innerHTML = `<span style="background:rgba(16,185,129,0.2); border:1.5px solid #10b981; color:#34d399; font-weight:800; font-size:0.85rem; padding:4px 10px; border-radius:10px;">✅ Richtig</span>`;
                  }
                } else {
                  isCorrect = false;
                  row.classList.add('slot-wrong');
                  if (badge) {
                    badge.innerHTML = `<span style="background:rgba(239,68,68,0.2); border:1.5px solid #ef4444; color:#f87171; font-weight:800; font-size:0.85rem; padding:4px 10px; border-radius:10px;">❌ Falsch (Gehört auf Pos. ${it.order})</span>`;
                  }
                }
              });

              // 3. If wrong, show correct chronology directly beneath slots
              if (!isCorrect) {
                const sortedCorrectItems = [...indexedItems].sort((a, b) => a.order - b.order);
                const slotsArea = document.getElementById('timeline-slots-area');
                if (slotsArea) {
                  const solutionBox = document.createElement('div');
                  solutionBox.className = 'timeline-solution-box';
                  solutionBox.innerHTML = `
                    <div style="font-weight:800; color:#34d399; display:flex; align-items:center; gap:6px;">
                      <span>💡</span> <span>Richtige chronologische Reihenfolge:</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:#e2e8f0; margin-top:2px;">
                      ${sortedCorrectItems.map((it, idx) => `<div><b style="color:#38bdf8;">${idx + 1}.</b> ${it.text}</div>`).join('')}
                    </div>
                  `;
                  slotsArea.parentNode.insertBefore(solutionBox, slotsArea.nextSibling);
                }
              }

              this.handleMissionAnswer(isCorrect, submitBtn, 0, optionsBox, lore, mission);
            };
          }
        };

        renderOrderingUI();
      }
      // -------------------------------------------------------------
      // MODE 3: ⭐ MULTISELECT / STERNFRAGE (Z. B. DIE 6 GRÜNDERSTAATEN)
      // -------------------------------------------------------------
      else if (mType === "multiselect") {
        const rawItems = q.items || mission.items || [];
        const requiredCount = q.requiredCount || mission.requiredCount || 6;
        const selectedNames = new Set();

        const renderMultiselectUI = () => {
          optionsBox.innerHTML = `
            <div class="multiselect-container">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">Wähle genau ${requiredCount} Staaten:</span>
                <span style="font-size:0.85rem; font-weight:800; color:${selectedNames.size === requiredCount ? '#10b981' : '#f59e0b'};">
                  ${selectedNames.size} / ${requiredCount} ausgewählt
                </span>
              </div>

              <div class="multiselect-grid">
                ${rawItems.map((it) => {
                  const isSel = selectedNames.has(it.name);
                  return `
                    <div class="multiselect-card ${isSel ? 'selected' : ''}" data-name="${it.name}">
                      <div class="country-flag">${it.flag || '🇪🇺'}</div>
                      <div class="country-name">${it.name}</div>
                      <div class="check-circle">${isSel ? '✅' : '⚪'}</div>
                    </div>
                  `;
                }).join('')}
              </div>

              <button class="btn-multiselect-submit" id="btn-multiselect-submit" ${selectedNames.size !== requiredCount ? 'disabled' : ''}>
                <span>Auswahl bestätigen (${selectedNames.size}/${requiredCount})</span> ➔
              </button>
            </div>
          `;

          optionsBox.querySelectorAll('.multiselect-card').forEach(card => {
            card.onclick = () => {
              const name = card.getAttribute('data-name');
              if (selectedNames.has(name)) {
                selectedNames.delete(name);
              } else {
                if (selectedNames.size < requiredCount) {
                  selectedNames.add(name);
                }
              }
              try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
              renderMultiselectUI();
            };
          });

          const submitBtn = document.getElementById('btn-multiselect-submit');
          if (submitBtn) {
            submitBtn.onclick = () => {
              // Check if all selected items are actually correct
              const correctItems = rawItems.filter(it => it.correct);
              const isCorrect = (selectedNames.size === correctItems.length) && correctItems.every(it => selectedNames.has(it.name));
              this.handleMissionAnswer(isCorrect, submitBtn, 0, optionsBox, lore, mission);
            };
          }
        };

        renderMultiselectUI();
      }
      // -------------------------------------------------------------
      // MODE 4: 🕵️ ODD ONE OUT / DER FALSCHE STERN
      // -------------------------------------------------------------
      else if (mType === "odd_one_out") {
        let items = q.items || mission.items;
        if ((!items || items.length === 0) && (q.options || q.o)) {
          const opts = q.options || q.o;
          const correctIdx = q.a !== undefined ? q.a : 0;
          items = opts.map((opt, idx) => ({
            text: opt,
            isOdd: idx === correctIdx
          }));
        }
        items = items || [];
        let isDone = false;

        const subTitle = q.subTitle || "Finde den Schwindler / die Aussage, die nicht passt:";

        optionsBox.innerHTML = `
          <div class="odd-one-out-container">
            <div style="font-size:0.88rem; color:#38bdf8; font-weight:800; text-transform:uppercase; letter-spacing:0.8px;">
              ${subTitle}
            </div>
            <div class="odd-one-out-grid">
              ${items.map((it, idx) => {
                const badge = it.flag 
                  ? `<div class="odd-flag">${it.flag}</div>` 
                  : (it.icon 
                      ? `<div style="font-size:1.8rem; margin-bottom:6px;">${it.icon}</div>` 
                      : `<div style="width:32px; height:32px; border-radius:10px; background:rgba(56,189,248,0.15); color:#38bdf8; display:flex; align-items:center; justify-content:center; font-weight:800; font-family:'Space Grotesk',sans-serif; margin-bottom:8px;">${String.fromCharCode(65 + idx)}</div>`);
                return `
                  <div class="odd-card" data-idx="${idx}">
                    ${badge}
                    <div class="odd-name">${it.text || it.name}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

        optionsBox.querySelectorAll('.odd-card').forEach(card => {
          card.onclick = () => {
            if (isDone) return;
            isDone = true;
            const idx = parseInt(card.getAttribute('data-idx'), 10);
            const chosen = items[idx];
            const isCorrect = !!chosen.isOdd;

            optionsBox.querySelectorAll('.odd-card').forEach((c, cIdx) => {
              c.style.pointerEvents = 'none';
              if (items[cIdx].isOdd) {
                c.classList.add('correct-odd');
              } else if (cIdx === idx && !isCorrect) {
                c.classList.add('wrong-odd');
              }
            });

            this.handleMissionAnswer(isCorrect, card, 0, optionsBox, lore, mission);
          };
        });
      }
      // -------------------------------------------------------------
      // MODE 5: 🖼️ 3 BILDER – 1 VERBINDUNG
      // -------------------------------------------------------------
      else if (mType === "three_images") {
        const images = q.images || mission.images || [];
        const rawOpts = q.options || q.o || [];
        const originalCorrectIdx = q.a !== undefined ? q.a : (mission.correctIndex !== undefined ? mission.correctIndex : 0);

        const indexedOpts = rawOpts.map((text, idx) => ({
          text,
          isCorrect: idx === originalCorrectIdx
        }));
        for (let i = indexedOpts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexedOpts[i], indexedOpts[j]] = [indexedOpts[j], indexedOpts[i]];
        }
        const newCorrectIdx = indexedOpts.findIndex(o => o.isCorrect);

        optionsBox.innerHTML = `
          <div class="three-images-container">
            <div class="three-images-row">
              ${images.map((img, idx) => `
                <div class="three-image-card ${idx < 2 ? 'connected' : ''}">
                  <div class="image-icon">${img.icon || '🖼️'}</div>
                  <div class="image-label">${img.label || ''}</div>
                </div>
              `).join('')}
            </div>
            <div id="three-images-opts" style="display:flex; flex-direction:column; gap:10px;"></div>
          </div>
        `;

        const optsContainer = optionsBox.querySelector('#three-images-opts');
        indexedOpts.forEach((opt, optIdx) => {
          const btn = document.createElement('button');
          btn.className = 'story-answer-btn';
          btn.innerHTML = `<span style="opacity:0.75; font-weight:800; font-family:'Space Grotesk',sans-serif;">${String.fromCharCode(65 + optIdx)}.</span> <span>${opt.text}</span>`;
          btn.onclick = () => this.handleMissionAnswer(opt.isCorrect, btn, newCorrectIdx, optionsBox, lore, mission);
          optsContainer.appendChild(btn);
        });
      }
      // -------------------------------------------------------------
      // MODE 6: 🚪 4 TÜREN
      // -------------------------------------------------------------
      else if (mType === "four_doors") {
        const doors = q.doors || mission.doors || [];
        let isDone = false;

        optionsBox.innerHTML = `
          <div class="four-doors-container">
            ${doors.map((d, idx) => `
              <div class="door-card" data-idx="${idx}">
                <div class="door-icon">🚪</div>
                <div class="door-title">${d.flag || ''} ${d.title || d.name}</div>
              </div>
            `).join('')}
          </div>
        `;

        optionsBox.querySelectorAll('.door-card').forEach(card => {
          card.onclick = () => {
            if (isDone) return;
            isDone = true;
            const idx = parseInt(card.getAttribute('data-idx'), 10);
            const isCorrect = !!doors[idx].correct;

            optionsBox.querySelectorAll('.door-card').forEach((c, cIdx) => {
              c.style.pointerEvents = 'none';
              const dIcon = c.querySelector('.door-icon');
              if (doors[cIdx].correct) {
                c.classList.add('door-correct');
                if (dIcon) dIcon.innerText = '🏛️';
              } else if (cIdx === idx && !isCorrect) {
                c.classList.add('door-wrong');
                if (dIcon) dIcon.innerText = '❌';
              }
            });

            this.handleMissionAnswer(isCorrect, card, 0, optionsBox, lore, mission);
          };
        });
      }
      // -------------------------------------------------------------
      // MODE 7: 🔢 CODE-PUZZLE (Z. B. 09 / 05 / 1950)
      // -------------------------------------------------------------
      else if (mType === "code_puzzle") {
        const codeBlocks = q.code || ["09", "05", "1950"];
        const rawOpts = q.options || q.o || [];
        const originalCorrectIdx = q.a !== undefined ? q.a : 0;

        const indexedOpts = rawOpts.map((text, idx) => ({
          text,
          isCorrect: idx === originalCorrectIdx
        }));
        for (let i = indexedOpts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexedOpts[i], indexedOpts[j]] = [indexedOpts[j], indexedOpts[i]];
        }
        const newCorrectIdx = indexedOpts.findIndex(o => o.isCorrect);

        optionsBox.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:14px; width:100%;">
            <div class="code-puzzle-display">
              ${codeBlocks.map((blk, idx) => `
                <div class="code-block">${blk}</div>
                ${idx < codeBlocks.length - 1 ? `<div class="code-sep">/</div>` : ''}
              `).join('')}
            </div>
            <div id="code-puzzle-opts" style="display:flex; flex-direction:column; gap:10px;"></div>
          </div>
        `;

        const optsContainer = optionsBox.querySelector('#code-puzzle-opts');
        indexedOpts.forEach((opt, optIdx) => {
          const btn = document.createElement('button');
          btn.className = 'story-answer-btn';
          btn.innerHTML = `<span style="opacity:0.75; font-weight:800; font-family:'Space Grotesk',sans-serif;">${String.fromCharCode(65 + optIdx)}.</span> <span>${opt.text}</span>`;
          btn.onclick = () => this.handleMissionAnswer(opt.isCorrect, btn, newCorrectIdx, optionsBox, lore, mission);
          optsContainer.appendChild(btn);
        });
      }
      // -------------------------------------------------------------
      // MODE 8: 🤥 2 WAHRHEITEN, 1 LÜGE
      // -------------------------------------------------------------
      else if (mType === "two_truths_one_lie") {
        const items = q.items || mission.items || [];
        let isDone = false;

        optionsBox.innerHTML = `
          <div class="two-truths-container">
            <div style="font-size:0.88rem; color:#f87171; font-weight:800; text-transform:uppercase; letter-spacing:0.8px;">
              Finde die LÜGE (welche Aussage ist falsch?):
            </div>
            ${items.map((it, idx) => `
              <div class="truth-card" data-idx="${idx}">
                <span style="font-family:'Space Grotesk',sans-serif; font-weight:800; color:#38bdf8; min-width:24px;">${String.fromCharCode(65 + idx)}.</span>
                <span style="flex:1;">${it.text}</span>
              </div>
            `).join('')}
          </div>
        `;

        optionsBox.querySelectorAll('.truth-card').forEach(card => {
          card.onclick = () => {
            if (isDone) return;
            isDone = true;
            const idx = parseInt(card.getAttribute('data-idx'), 10);
            const isCorrect = !!items[idx].isLie;

            optionsBox.querySelectorAll('.truth-card').forEach((c, cIdx) => {
              c.style.pointerEvents = 'none';
              if (items[cIdx].isLie) {
                c.classList.add('lie-unmasked');
                c.innerHTML += `<span style="margin-left:auto; font-weight:800; color:#34d399;">🤥 Die Lüge!</span>`;
              } else if (cIdx === idx && !isCorrect) {
                c.classList.add('truth-was-true');
                c.innerHTML += `<span style="margin-left:auto; font-weight:800; color:#f87171;">✅ War wahr!</span>`;
              }
            });

            this.handleMissionAnswer(isCorrect, card, 0, optionsBox, lore, mission);
          };
        });
      }
      // -------------------------------------------------------------
      // MODE 9: 🗺️ KARTEN-INTERAKTION / TARGET TAP
      // -------------------------------------------------------------
      else if (mType === "map_target") {
        const rawCountries = (q.options && q.options.length > 0) ? q.options : ((q.o && q.o.length > 0) ? q.o : ((q.items && q.items.length > 0) ? q.items : []));
        const countries = rawCountries.length > 0 ? rawCountries : ["Belgien", "Deutschland", "Luxemburg", "Frankreich", "Niederlande"];
        const correctIdx = (typeof q.a === 'number') ? q.a : (typeof q.correctIndex === 'number' ? q.correctIndex : 0);
        const target = q.target || q.targetCountry || countries[correctIdx] || "Luxemburg";
        let isDone = false;

        const flagMap = {
          "Belgien": "🇧🇪", "Deutschland": "🇩🇪", "Luxemburg": "🇱🇺", "Frankreich": "🇫🇷", "Niederlande": "🇳🇱",
          "Italien": "🇮🇹", "Österreich": "🇦🇹", "Ungarn": "🇭🇺", "Spanien": "🇪🇸", "Portugal": "🇵🇹",
          "Dänemark": "🇩🇰", "Irland": "🇮🇪", "Griechenland": "🇬🇷", "Polen": "🇵🇱", "Tschechien": "🇨🇿",
          "Slowakei": "🇸🇰", "Slowenien": "🇸🇮", "Finnland": "🇫🇮", "Schweden": "🇸🇪", "Estland": "🇪🇪",
          "Lettland": "🇱🇻", "Litauen": "🇱🇹", "Malta": "🇲🇹", "Zypern": "🇨🇾", "Bulgarien": "🇧🇬",
          "Rumänien": "🇷🇴", "Kroatien": "🇭🇷",
          "Luxemburg-Stadt": "🏰", "Brüssel": "🏢", "Straßburg": "🏛️", "Amsterdam": "🚲"
        };

        const targetHeader = q.targetCountry 
          ? `Tippe auf das richtige Land: <b>${q.targetCountry}</b>` 
          : `Wähle die richtige Antwort:`;

        optionsBox.innerHTML = `
          <div class="map-target-container">
            <div style="font-size:0.92rem; color:#38bdf8; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px;">
              ${targetHeader}
            </div>
            <div class="map-target-grid">
              ${countries.map((cName) => {
                return `
                  <div class="map-country-tile" data-name="${cName}">
                    <span style="font-size:2.2rem;">${flagMap[cName] || '📍'}</span>
                    <span style="font-weight:700; font-size:0.95rem; color:#f8fafc;">${cName}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;

        optionsBox.querySelectorAll('.map-country-tile').forEach(tile => {
          tile.onclick = () => {
            if (isDone) return;
            isDone = true;
            const chosen = tile.getAttribute('data-name');
            const isCorrect = (chosen === target);

            optionsBox.querySelectorAll('.map-country-tile').forEach(t => {
              t.style.pointerEvents = 'none';
              if (t.getAttribute('data-name') === target) {
                t.classList.add('map-correct');
              } else if (t.getAttribute('data-name') === chosen && !isCorrect) {
                t.classList.add('map-wrong');
              }
            });

            this.handleMissionAnswer(isCorrect, tile, 0, optionsBox, lore, mission);
          };
        });
      }
      // -------------------------------------------------------------
      // MODE 10: 🎲 MULTIPLE CHOICE WITH DYNAMIC OPTION SHUFFLING
      // -------------------------------------------------------------
      else {
        const rawOpts = q.options || q.o || [];
        const originalCorrectIdx = q.a !== undefined ? q.a : (mission.correctIndex !== undefined ? mission.correctIndex : 0);

        // Map options with their correctness
        const indexedOpts = rawOpts.map((text, idx) => ({
          text,
          isCorrect: idx === originalCorrectIdx
        }));

        // Dynamically shuffle options so correct answer isn't always in position A!
        for (let i = indexedOpts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexedOpts[i], indexedOpts[j]] = [indexedOpts[j], indexedOpts[i]];
        }

        const newCorrectIdx = indexedOpts.findIndex(o => o.isCorrect);

        indexedOpts.forEach((opt, optIdx) => {
          const btn = document.createElement('button');
          btn.className = 'story-answer-btn';
          btn.innerHTML = `<span style="opacity:0.75; font-weight:800; font-family:'Space Grotesk',sans-serif;">${String.fromCharCode(65 + optIdx)}.</span> <span>${opt.text}</span>`;
          btn.onclick = () => this.handleMissionAnswer(opt.isCorrect, btn, newCorrectIdx, optionsBox, lore, mission);
          optionsBox.appendChild(btn);
        });
      }
    }

    if (missionBox) missionBox.style.display = 'flex';
  },

  handleMissionAnswer: function(isCorrect, clickedBtn, correctIdx, optionsBox, loreText, mission) {
    const allBtns = optionsBox.querySelectorAll('.story-answer-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedbackBox = document.getElementById('adv-mission-feedback');

    if (isCorrect) {
      try { if (typeof sounds !== 'undefined') sounds.playSuccess(); } catch(e) {}
      clickedBtn.classList.add('answer-correct');
      this.stageScore += 100;
      this.correctAnswersCount++;

      // Add Reward XP & Item
      if (mission.rewardXP && typeof UserProfile !== 'undefined' && typeof UserProfile.addXP === 'function') {
        UserProfile.addXP(mission.rewardXP, `Mission: ${mission.title}`);
      }
      if (mission.rewardItem && !this.state.inventory.some(i => i.id === mission.rewardItem.id)) {
        this.state.inventory.push(mission.rewardItem);
      }
      if (mission.clue && !this.state.clues.includes(mission.clue)) {
        this.state.clues.push(mission.clue);
      }
      this.saveAdventureState();

      if (feedbackBox) {
        feedbackBox.className = 'adv-mission-feedback-banner correct';
        const nextAction = mission.onSuccessScene 
          ? `StoryAdventureEngine.goToScene('${mission.onSuccessScene}')` 
          : `StoryAdventureEngine.finishAdventure()`;
        
        feedbackBox.innerHTML = `
          <div style="font-size: 1rem; font-weight: 800; margin-bottom: 6px; color: #059669;">Richtig gelöst • Mission erfüllt</div>
          <div style="font-weight: 500; font-size: 0.92rem; line-height: 1.5; margin-bottom: 12px;">${loreText || ''}</div>
          <div style="display:flex; justify-content: flex-end;">
            <button class="adv-dialogue-next-btn" onclick="${nextAction}" style="padding: 8px 20px; font-size: 0.95rem;">
              <span>Weiter</span> ➔
            </button>
          </div>
        `;
        feedbackBox.style.display = 'block';
        setTimeout(() => { try { feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch(e) {} }, 40);
      }
    } else {
      try { if (typeof sounds !== 'undefined') sounds.playError(); } catch(e) {}
      clickedBtn.classList.add('answer-wrong');
      this.stageErrors++;

      if (allBtns[correctIdx]) {
        allBtns[correctIdx].classList.add('answer-correct');
      }

      if (feedbackBox) {
        feedbackBox.className = 'adv-mission-feedback-banner wrong';
        const nextAction = mission.onFailScene 
          ? `StoryAdventureEngine.goToScene('${mission.onFailScene}')` 
          : (mission.onSuccessScene ? `StoryAdventureEngine.goToScene('${mission.onSuccessScene}')` : `StoryAdventureEngine.finishAdventure()`);

        feedbackBox.innerHTML = `
          <div style="font-size: 1rem; font-weight: 800; margin-bottom: 6px; color: #dc2626;">Nicht ganz • Richtige Lösung hervorgehoben</div>
          <div style="font-weight: 500; font-size: 0.92rem; line-height: 1.5; margin-bottom: 12px;">${loreText || ''}</div>
          <div style="display:flex; justify-content: flex-end;">
            <button class="adv-dialogue-next-btn" onclick="${nextAction}" style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 8px 20px; font-size: 0.95rem;">
              <span>Verstanden & Weiter</span> ➔
            </button>
          </div>
        `;
        feedbackBox.style.display = 'block';
        setTimeout(() => { try { feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch(e) {} }, 40);
      }
    }
  },

  finishAdventure: function() {
    // Mastery Rule: If 0 correct answers, player MUST repeat the country mission!
    if (this.correctAnswersCount === 0) {
      this.showRetryModal();
      return;
    }

    const advScreen = document.getElementById('story-adventure-screen');
    if (advScreen) advScreen.style.display = 'none';

    if (typeof StoryMode !== 'undefined' && this.activeAdventure) {
      StoryMode.state.activeCountry = this.activeAdventure.country;
      StoryMode.state.stageErrors = this.stageErrors;
      StoryMode.state.stageScore = this.stageScore;
      StoryMode.finishCountryMission();
    }
  },

  showRetryModal: function() {
    try { if (typeof sounds !== 'undefined') sounds.playError(); } catch(e) {}
    const missionBox = document.getElementById('adv-mission-container');
    const choicesBox = document.getElementById('adv-choices-container');
    const retryBox = document.getElementById('adv-retry-container');

    if (missionBox) missionBox.style.display = 'none';
    if (choicesBox) choicesBox.style.display = 'none';

    if (retryBox) {
      retryBox.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 8px;">🔄</div>
        <h3 style="font-family:'Space Grotesk',sans-serif; font-size:1.4rem; margin:0 0 8px 0; color:#f87171;">Mission nicht bestanden</h3>
        <p style="font-size:0.92rem; color:#cbd5e1; line-height:1.5; margin-bottom:20px;">
          Du benötigst mindestens <b>1 richtige Antwort</b>, um das Visum zu erhalten und zur nächsten Station weiterzureisen. Lass uns die Station noch einmal gemeinsam angehen!
        </p>
        <button class="btn-story-launch-mission" onclick="StoryAdventureEngine.restartCurrentAdventure()">
          <span>Station wiederholen 🔄</span>
        </button>
      `;
      retryBox.style.display = 'flex';
    }
  },

  restartCurrentAdventure: function() {
    try { if (typeof sounds !== 'undefined') sounds.playClick(); } catch(e) {}
    if (this.activeAdventure) {
      this.startAdventure(this.activeAdventure.country);
    }
  },

  // Auto-generate rich fallback adventure for countries that haven't written manual custom scenes yet
  generateFallbackAdventure: function(countryName) {
    const q1 = StoryMode.getCountryQuestion(countryName, 1);
    const q2 = StoryMode.getCountryQuestion(countryName, 2);
    const q3 = StoryMode.getCountryQuestion(countryName, 3);
    const relic = StoryMode.relicsDatabase[countryName] || { name: "Antikes Artefakt", icon: "🏛️", desc: "Historisches Relikt" };

    const flag = StoryMode.expeditionRoute.find(s => s.name === countryName)?.flag || "🇪🇺";
    const chapter = StoryMode.expeditionRoute.find(s => s.name === countryName)?.chapter || 1;

    const landmarkMap = {
      "Belgien": "assets/landmarks/belgium.jpg",
      "Ungarn": "assets/landmarks/hungary.jpg",
      "Deutschland": "assets/landmarks/germany.jpg",
      "Frankreich": "assets/landmarks/france.jpg",
      "Österreich": "assets/landmarks/austria.jpg",
      "Italien": "assets/landmarks/italy.jpg",
      "Spanien": "assets/landmarks/spain.jpg",
      "Dänemark": "assets/landmarks/denmark.jpg",
      "Schweden": "assets/landmarks/sweden.jpg",
      "Polen": "assets/landmarks/poland.jpg",
      "Luxemburg": "assets/landmarks/luxembourg.jpg",
      "Niederlande": "assets/landmarks/netherlands.jpg",
      "Finnland": "assets/landmarks/finland.jpg",
      "Griechenland": "assets/landmarks/greece.jpg",
      "Portugal": "assets/landmarks/portugal.jpg",
      "Irland": "assets/landmarks/ireland.jpg",
      "Slowakei": "assets/landmarks/slovakia.jpg",
      "Tschechien": "assets/landmarks/czechia.jpg",
      "Slowenien": "assets/landmarks/slovenia.jpg",
      "Kroatien": "assets/landmarks/croatia.jpg",
      "Malta": "assets/landmarks/malta.jpg",
      "Europaparlament": "assets/landmarks/eu_parliament.jpg"
    };
    const landmarkImgPath = landmarkMap[countryName] || "assets/landmarks/austria.jpg";

    // Check if country has 1 curated flagship question or 3 stages
    const poolObj = (typeof StoryQuestionsPool !== 'undefined' && StoryQuestionsPool) ? StoryQuestionsPool : (typeof window !== 'undefined' ? window.StoryQuestionsPool : null);
    const countryQuestions = (poolObj && poolObj[countryName]) ? poolObj[countryName] : [];
    const isSingleMission = countryQuestions.length === 1;

    // Dynamically assign mission types based on the question definitions
    const mType1 = q1.type || "choice";
    const mType2 = q2.type || "choice";
    const mType3 = q3.type || "choice";

    return {
      country: countryName,
      flag: flag,
      chapter: chapter,
      title: `Expedition ${countryName}: Europabildung & Relikt-Bergung`,
      startScene: "auto_arrival",
      scenes: {
        "auto_arrival": {
          id: "auto_arrival",
          title: `Station ${countryName} • Expedition Europa`,
          landmarkImage: landmarkImgPath,
          landmarkTitle: `${flag} Sehenswürdigkeiten & Kulturerbe in ${countryName}`,
          dialogue: [
            {
              speaker: "klaus",
              text: `Landeanflug auf ${flag} ${countryName}! Hier liegt das Relikt '${relic.name}' (${relic.icon || '🏆'}). ${relic.desc || ''}`
            },
            {
              speaker: "klaus",
              text: isSingleMission 
                ? (q1.storyContext || `Löse die historische Herausforderung von ${countryName}, um das Relikt zu bergen und den nächsten Stern zu entzünden!`)
                : `Um das Visum für unseren Schengen-Reisepass zu stempeln, müssen wir spannende Herausforderungen zu Geschichte, Kultur und Werten lösen!`
            }
          ],
          choices: [
            { text: isSingleMission ? `„Mission in ${countryName} starten!“` : `„Erste Challenge in ${countryName} starten!“`, nextScene: "auto_stage_1" }
          ]
        },
        "auto_stage_1": {
          id: "auto_stage_1",
          title: q1.title || `Etappe 1: Wissen & Geschichte von ${countryName}`,
          mission: {
            id: `m_${countryName}_1`,
            missionType: mType1,
            title: q1.title || `Etappe 1: Herausforderung`,
            desc: q1.storyContext || `Finde heraus, was ${countryName} in der europäischen Geschichte und Gegenwart auszeichnet:`,
            rewardXP: isSingleMission ? 150 : 100,
            rewardItem: q1.relicReward 
              ? { id: `relic_${countryName}_1`, name: `${q1.relicReward.icon || '🏆'} ${q1.relicReward.name}`, icon: q1.relicReward.icon || '🏆', desc: q1.relicReward.desc } 
              : (isSingleMission ? { id: `relic_${countryName}`, name: `${relic.icon} ${relic.name}`, icon: relic.icon, desc: relic.desc } : null),
            question: q1,
            onSuccessScene: isSingleMission ? "auto_conclusion_success" : "auto_q1_success",
            onFailScene: isSingleMission ? "auto_conclusion_eval" : "auto_q1_fail"
          }
        },
        "auto_q1_success": {
          id: "auto_q1_success",
          title: "Erste Challenge gemeistert!",
          dialogue: [
            { speaker: "klaus", text: "Volltreffer, Pilot! Kultur und Vielfalt machen unser Europa erst so bunt und spannend!" }
          ],
          choices: [
            { text: "„Weiter zu Etappe 2 ➔“", nextScene: "auto_stage_2" }
          ]
        },
        "auto_q1_fail": {
          id: "auto_q1_fail",
          title: "Klaus hilft aus!",
          dialogue: [
            { speaker: "klaus", text: "Kein Problem, Pilot! Aus kleinen Fehlern lernt man am meisten. Auf geht's zur zweiten Challenge!" }
          ],
          choices: [
            { text: "„Weiter zur 2. Challenge: Jetzt voll durchstarten!“", nextScene: "auto_stage_2" }
          ]
        },
        "auto_stage_2": {
          id: "auto_stage_2",
          title: q2.title || `Etappe 2: Meilensteine & Verträge von ${countryName}`,
          dialogue: [
            { speaker: "klaus", text: "Achtung, jetzt folgt die zweite Prüfung! Zeige dein Wissen über die europäischen Meilensteine!" }
          ],
          mission: {
            id: `m_${countryName}_2`,
            missionType: mType2,
            title: q2.title || `Etappe 2: Meilensteine`,
            desc: q2.storyContext || "Löse die historische Aufgabe für diese Etappe:",
            rewardXP: 120,
            rewardItem: q2.relicReward 
              ? { id: `relic_${countryName}_2`, name: `${q2.relicReward.icon || '🏆'} ${q2.relicReward.name}`, icon: q2.relicReward.icon || '🏆', desc: q2.relicReward.desc } 
              : null,
            question: q2,
            onSuccessScene: "auto_q2_success",
            onFailScene: "auto_q2_fail"
          }
        },
        "auto_q2_success": {
          id: "auto_q2_success",
          title: "Zweite Challenge gemeistert!",
          dialogue: [
            { speaker: "klaus", text: "Genial gelöst! Hohe Präzision bringt uns direkt vor die Schatzkammer!" }
          ],
          choices: [
            { text: "„Zur Finalen Bergung: Relikt-Tresor öffnen ➔“", nextScene: "auto_stage_3" }
          ]
        },
        "auto_q2_fail": {
          id: "auto_q2_fail",
          title: "Fokus auf das Relikt!",
          dialogue: [
            { speaker: "klaus", text: "Jetzt zählt's! Holen wir im Finale die volle Punktzahl und sichern das Relikt!" }
          ],
          choices: [
            { text: "„Zum Relikt-Finale!“", nextScene: "auto_stage_3" }
          ]
        },
        "auto_stage_3": {
          id: "auto_stage_3",
          title: q3.title || `Etappe 3: Bergung des Relikts '${relic.name}'`,
          dialogue: [
            { speaker: "klaus", text: `Das finale Siegel! Löse diese Herausforderung, um das Relikt '${relic.name}' zu bergen!` }
          ],
          mission: {
            id: `m_${countryName}_3`,
            missionType: mType3,
            title: q3.title || `Kultur, Innovation & Einheit: ${relic.name}`,
            desc: q3.storyContext || "Finaler Test zur Freischaltung des Kulturguts für das europäische Erbe.",
            rewardXP: 150,
            rewardItem: q3.relicReward 
              ? { id: `relic_${countryName}`, name: `${q3.relicReward.icon || relic.icon} ${q3.relicReward.name}`, icon: q3.relicReward.icon || relic.icon, desc: q3.relicReward.desc || relic.desc } 
              : { id: `relic_${countryName}`, name: `${relic.icon} ${relic.name}`, icon: relic.icon, desc: relic.desc },
            clue: `Hinweis: ${countryName} hat sein Relikt '${relic.name}' für die Einheit und Vielfalt Europas übergeben.`,
            question: q3,
            onSuccessScene: "auto_conclusion_success",
            onFailScene: "auto_conclusion_eval"
          }
        },
        "auto_conclusion_success": {
          id: "auto_conclusion_success",
          title: "Relikt geborgen!",
          dialogue: [
            { speaker: "klaus", text: `Glückwunsch, Pilot! Das Relikt '${relic.name}' ist sicher geborgen, unser europäischer Pass wird gestempelt und wir haben ein weiteres Stück gelebte Europabildung gemeistert!` }
          ],
          choices: [
            { text: "„Mission abschließen & Visum stempeln ➔“", action: "completeCountryAdventure" }
          ]
        },
        "auto_conclusion_eval": {
          id: "auto_conclusion_eval",
          title: "Auswertung der Expedition",
          dialogue: [
            { speaker: "klaus", text: "Die letzte Prüfung ist vorbei. Lass uns prüfen, ob wir das Visum und das Relikt erhalten!" }
          ],
          choices: [
            { text: "„Ergebnis auswerten ➔“", action: "completeCountryAdventure" }
          ]
        }
      }
    };
  }
};

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => {
    StoryAdventureEngine.init();
  });
}
