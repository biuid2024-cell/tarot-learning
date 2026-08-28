// ============ 塔罗学习 App 主逻辑（纯前端，无需后端） ============
(function () {
  const $app = document.getElementById("app");
  const SCENARIO_LABELS = { love: "感情", career: "事业", health: "健康", relationship: "人际" };
  let practiceState = null; // 实战抽牌会话的临时状态（不持久化，刷新会重置）
  let flashState = null;    // 记忆闪卡会话的临时状态

  // ---------- 工具函数 ----------
  function getCardById(id) { return window.TAROT_ALL_CARDS.find(c => c.id === id); }
  function esc(str) { const d = document.createElement("div"); d.textContent = str == null ? "" : String(str); return d.innerHTML; }
  function nl2br(str) { return esc(str).replace(/\n/g, "<br/>"); }

  function getScenarioText(card, scenarioKey, orientation) {
    if (card.arcana === "major") {
      const s = card.scenarios[scenarioKey];
      return s ? s[orientation] : "";
    }
    const fn = window.TAROT_SUIT_SCENARIO_TEMPLATES[card.suit][scenarioKey];
    return fn(card._numberCore, orientation === "upright");
  }

  function cardMeaningText(card, orientation) { return card.meaning[orientation]; }
  function cardKeywords(card, orientation) { return card.keywords[orientation]; }

  function myNotesFor(cardId, orientation, scenario) {
    return window.TarotStorage.getNotesForCard(cardId).filter(n =>
      (!orientation || n.orientation === orientation) && (!scenario || n.scenario === scenario)
    );
  }

  function randomOrientation() {
    const p = window.TarotStorage.getSettings().reversedProb;
    return Math.random() < p ? "reversed" : "upright";
  }
  function drawRandomCard(excludeIds) {
    const pool = window.TAROT_ALL_CARDS.filter(c => !excludeIds.includes(c.id));
    const card = pool[Math.floor(Math.random() * pool.length)];
    return { card, orientation: randomOrientation() };
  }

  // ---------- 卡牌视觉组件（真实韦特-史密斯塔罗牌图，assets/cards/*.jpg） ----------
  function cardImagePath(card) { return `assets/cards/${card.id.toLowerCase()}.jpg`; }
  function moonGlyphSVG() {
    return `<svg viewBox="0 0 100 100"><path d="M64 18 A34 34 0 1 0 64 84 A25 25 0 1 1 64 18 Z" fill="currentColor"/></svg>`;
  }
  function gearSVG() {
    return `<svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.6a7.6 7.6 0 000-3.2l1.7-1.3-1.7-2.9-2 .5a7.6 7.6 0 00-2.7-1.6l-.4-2.1h-3.4l-.4 2.1a7.6 7.6 0 00-2.7 1.6l-2-.5-1.7 2.9 1.7 1.3a7.6 7.6 0 000 3.2l-1.7 1.3 1.7 2.9 2-.5a7.6 7.6 0 002.7 1.6l.4 2.1h3.4l.4-2.1a7.6 7.6 0 002.7-1.6l2 .5 1.7-2.9z"/></svg>`;
  }
  function cardFaceHTML(card, orientation, size) {
    const rot = orientation === "reversed" ? "transform:rotate(180deg);" : "";
    return `<div class="tcard tcard-${size || 'md'}">
      <div class="tcard-inner" style="${rot}">
        <img class="tcard-img" src="${cardImagePath(card)}" alt="${esc(card.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="tcard-fallback"><span>${esc(card.name)}</span></div>
      </div>
    </div>`;
  }
  function cardBackHTML(size) {
    return `<div class="tcard tcard-${size || 'md'} tcard-back"><div class="tcard-back-glyph">${moonGlyphSVG()}</div></div>`;
  }

  // ---------- 路由 ----------
  function currentHash() { return (location.hash || "#/learn").slice(2); }
  function nav(path) { location.hash = "#/" + path; }
  function parts() { return currentHash().split("/").filter(Boolean); }

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", render);

  function render() {
    const p = parts();
    const root = p[0] || "learn";
    let html = "", isHero = false;
    if (root === "learn") {
      if (p[1] === "card") html = viewCardDetail(p[2]);
      else if (p[1] === "grid") html = viewLearnGrid();
      else { html = viewLearnHome(); isHero = true; }
    }
    else if (root === "spreads") html = p[1] === "new" ? viewSpreadCreator() : (p[1] ? viewSpreadDetail(p[1]) : viewSpreadsList());
    else if (root === "practice") html = p[1] === "session" ? viewPracticeSession() : viewPracticeStart();
    else if (root === "journal") html = p[1] ? viewJournalDetail(p[1]) : viewJournalList();
    else if (root === "settings") html = viewSettings();
    else { html = viewLearnHome(); isHero = true; }

    const pageClass = isHero ? "page flush" : "page";
    $app.innerHTML = `<div class="page-scroll"><div class="${pageClass}">${html}</div></div>` + navBarHTML(root);
    const scroller = $app.querySelector(".page-scroll");
    if (scroller) scroller.scrollTop = 0;
  }

  function navBarHTML(active) {
    const items = [
      { id: "learn", label: "记忆" },
      { id: "spreads", label: "牌阵" },
      { id: "practice", label: "实战" },
      { id: "journal", label: "日记" }
    ];
    return `<nav class="navbar">${items.map(it =>
      `<a href="#/${it.id}" class="nav-item ${active === it.id ? 'active' : ''}"><span>${it.label}</span><span class="nav-dot"></span></a>`
    ).join("")}</nav>`;
  }
  function headerHTML(title, opts) {
    opts = opts || {};
    return `<header class="topbar">
      ${opts.back ? `<a href="#/${opts.back}" class="topbar-back">‹</a>` : `<span style="width:28px"></span>`}
      <h1>${esc(title)}</h1>
      <a href="#/settings" class="topbar-settings">${gearSVG()}</a>
    </header>`;
  }

  // ---------- 记忆模块入口：没有独立首页，一进来就是学新牌/复习的大卡片交互 ----------
  function defaultLearnMode() {
    return window.TarotSRS.getStats(window.TAROT_ALL_CARDS).dueToday > 0 ? "due" : "new";
  }
  function viewLearnHome() {
    const mode = window._learnMode || defaultLearnMode();
    window._learnMode = mode;
    if (!flashState || flashState.mode !== mode) {
      const queue = window.TarotSRS.buildQueue(window.TAROT_ALL_CARDS, mode);
      flashState = { mode, queue, index: 0, revealed: false, total: queue.length };
    }
    const stats = window.TarotSRS.getStats(window.TAROT_ALL_CARDS);
    const modes = [["due", "到期复习"], ["new", "学新牌"], ["all", "全部练习"]];
    let body;
    if (flashState.queue.length === 0) {
      body = `<div class="hero-hint">这个模式暂时没有待处理的卡片</div>`;
    } else if (flashState.index >= flashState.queue.length) {
      body = `<div class="hero-hint">本轮已完成</div><div class="hero-recap"><div class="recap-meaning">共练习了 ${flashState.total} 张，换个模式或去浏览全部牌面吧</div></div>`;
    } else {
      const item = flashState.queue[flashState.index];
      const card = item.card;
      body = `<div class="hero-card-wrap" data-action="flip-flash">${flashState.revealed ? cardFaceHTML(card, item.orientation, "hero") : cardBackHTML("hero")}</div>
      ${!flashState.revealed ? `<div class="hero-hint">轻触查看</div>` : `
      <div class="hero-recap">
        <div class="recap-name">${esc(card.name)}</div>
        <div class="recap-orient">${item.orientation === 'upright' ? '正位' : '逆位'}</div>
        <div class="recap-meaning">${esc(cardMeaningText(card, item.orientation))}</div>
      </div>
      <div class="hero-rating-row">
        <button class="btn btn-rate r1" data-action="rate-flash" data-rating="1">完全不会</button>
        <button class="btn btn-rate r2" data-action="rate-flash" data-rating="2">有点印象</button>
        <button class="btn btn-rate r3" data-action="rate-flash" data-rating="3">记得</button>
        <button class="btn btn-rate r4" data-action="rate-flash" data-rating="4">非常熟</button>
      </div>`}`;
    }
    return `
    <div class="hero-daily">
      <a href="#/settings" class="hero-settings" onclick="event.stopPropagation()">${gearSVG()}</a>
      <div class="hero-vignette top"></div>
      <div class="hero-vignette bottom"></div>
      <div class="hero-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(stats.studied / stats.total * 100)}%"></div></div>
        <p class="muted">${stats.studied}/${stats.total} 已学习 · 今日待复习 ${stats.dueToday}</p>
      </div>
      <div class="hero-mode-row">${modes.map(([k, l]) => `<button class="chip ${mode === k ? 'active' : ''}" data-action="learn-mode" data-value="${k}">${l}</button>`).join("")}</div>
      ${body}
      <a href="#/learn/grid" class="hero-footer-link">浏览全部牌面 →</a>
    </div>`;
  }

  // ---------- 记忆学习：全部牌面浏览 ----------
  function viewLearnGrid() {
    const filter = window._learnFilter || "all";
    const filters = [["all", "全部"], ["major", "大阿尔卡那"], ["wands", "权杖"], ["cups", "圣杯"], ["swords", "宝剑"], ["pentacles", "星币"]];
    let cards = window.TAROT_ALL_CARDS;
    if (filter === "major") cards = cards.filter(c => c.arcana === "major");
    else if (filter !== "all") cards = cards.filter(c => c.suit === filter);
    return `
    ${headerHTML("全部牌面", { back: "learn" })}
    <div class="filter-row">${filters.map(([k, label]) =>
      `<button class="chip ${filter === k ? 'active' : ''}" data-action="learn-filter" data-value="${k}">${label}</button>`
    ).join("")}</div>
    <div class="grid">
      ${cards.map(c => `<a class="grid-item" href="#/learn/card/${c.id}">
          <div class="grid-thumb">${cardFaceHTML(c, "upright", "xs")}</div>
          <div class="grid-name">${esc(c.name)}</div>
        </a>`).join("")}
    </div>`;
  }

  // ---------- 卡牌详情页 ----------
  function viewCardDetail(cardId) {
    const card = getCardById(cardId);
    if (!card) return `<p>卡牌不存在</p>`;
    const scenario = window._detailScenario || "love";
    const upNotes = myNotesFor(card.id, "upright", null);
    const revNotes = myNotesFor(card.id, "reversed", null);
    return `
    ${headerHTML(card.name, { back: "learn/grid" })}
    <div class="card-detail-face">${cardFaceHTML(card, "upright", "lg")}</div>
    <h2 class="card-title">${esc(card.name)} <span class="muted">${esc(card.nameEn)}</span></h2>
    <div class="orientation-block">
      <h4>正位</h4>
      <div class="keywords">${cardKeywords(card, "upright").map(k => `<span class="kw">${esc(k)}</span>`).join("")}</div>
      <p>${esc(cardMeaningText(card, "upright"))}</p>
      ${myNoteListHTML(upNotes)}
    </div>
    <div class="orientation-block reversed">
      <h4>逆位</h4>
      <div class="keywords">${cardKeywords(card, "reversed").map(k => `<span class="kw">${esc(k)}</span>`).join("")}</div>
      <p>${esc(cardMeaningText(card, "reversed"))}</p>
      ${myNoteListHTML(revNotes)}
    </div>
    ${card.arcana === "minor" ? `
    <div class="logic-block">
      <h4>速记逻辑</h4>
      <p>花色 <b>${window.TAROT_SUITS[card.suit].name}</b>（${window.TAROT_SUITS[card.suit].element}元素）＝ ${window.TAROT_SUITS[card.suit].domain}</p>
      <p>数字 <b>${window.TAROT_NUMBER_META[card.number].label}</b> ＝ ${card._numberCore}</p>
      <p>组合 ＝ 上面两者叠加，不用死记，理解规律就能推出这张牌的含义。</p>
    </div>` : ""}
    <div class="scenario-block">
      <h4>不同场景下的解读</h4>
      <div class="filter-row">${Object.entries(SCENARIO_LABELS).map(([k, label]) =>
        `<button class="chip ${scenario === k ? 'active' : ''}" data-action="detail-scenario" data-card="${card.id}" data-value="${k}">${label}</button>`
      ).join("")}</div>
      <div class="scenario-text">
        <p><b>正位：</b>${esc(getScenarioText(card, scenario, "upright"))}</p>
        <p><b>逆位：</b>${esc(getScenarioText(card, scenario, "reversed"))}</p>
      </div>
      ${myNoteListHTML(myNotesFor(card.id, null, scenario))}
      <button class="btn btn-outline" data-action="open-add-note" data-card="${card.id}" data-scenario="${scenario}">+ 添加我的解读</button>
    </div>
    <div id="note-form-slot"></div>`;
  }
  function myNoteListHTML(notes) {
    if (!notes.length) return "";
    return `<div class="mynotes">${notes.map(n => `
      <div class="mynote-item">
        <span class="mynote-tag">我的解读 · ${n.orientation === 'upright' ? '正位' : '逆位'}${n.scenario ? ' · ' + SCENARIO_LABELS[n.scenario] : ''}</span>
        <p>${nl2br(n.text)}</p>
        <button class="link-btn" data-action="delete-note" data-id="${n.id}">删除</button>
      </div>`).join("")}</div>`;
  }
  function addNoteFormHTML(cardId, scenario) {
    return `<div class="note-form card-panel">
      <h4>添加我的解读 —— ${esc(getCardById(cardId).name)}</h4>
      <label>正逆位</label>
      <select id="note-orientation"><option value="upright">正位</option><option value="reversed">逆位</option></select>
      <label>适用场景</label>
      <select id="note-scenario">
        <option value="">不限</option>
        ${Object.entries(SCENARIO_LABELS).map(([k, l]) => `<option value="${k}" ${k === scenario ? 'selected' : ''}>${l}</option>`).join("")}
      </select>
      <label>内容</label>
      <textarea id="note-text" rows="4" placeholder="写下你自己的解读..."></textarea>
      <div class="form-actions">
        <button class="btn btn-primary" data-action="save-note" data-card="${cardId}">保存</button>
        <button class="btn btn-outline" data-action="close-add-note">取消</button>
      </div>
    </div>`;
  }

  // ---------- 记忆闪卡（已合并进“记忆”模块入口 viewLearnHome，本处不再需要单独页面函数）

  // ---------- 牌阵学习 ----------
  function viewSpreadsList() {
    const spreads = window.TarotStorage.getAllSpreads();
    return `
    ${headerHTML("牌阵学习")}
    <a class="btn btn-outline full-width" href="#/spreads/new">+ 自定义牌阵</a>
    <div class="spread-list">
      ${spreads.map(s => `<a class="spread-card" href="#/spreads/${s.id}">
        <h4>${esc(s.name)} ${s.custom ? '<span class="tag-custom">自定义</span>' : ''}</h4>
        <p class="muted">难度：${esc(s.difficulty || "自定义")} · 场景：${(s.scenarios || ['不限']).join("/")}</p>
        <p>${esc(s.desc || "")}</p>
      </a>`).join("")}
    </div>`;
  }
  function spreadPositionsMapHTML(spread, activeId) {
    return `<div class="spread-map">
      ${spread.positions.map(p => `<button class="spread-dot ${p.id === activeId ? 'active' : ''}" style="left:${p.x}%;top:${p.y}%" data-action="show-position" data-idx="${p.id}">${p.id}</button>`).join("")}
    </div>`;
  }
  function viewSpreadDetail(id) {
    const spread = window.TarotStorage.getAllSpreads().find(s => s.id === id);
    if (!spread) return `<p>牌阵不存在</p>`;
    const activePos = window._activePosition || spread.positions[0].id;
    const pos = spread.positions.find(p => p.id === activePos);
    return `
    ${headerHTML(spread.name, { back: "spreads" })}
    <p class="muted">${esc(spread.desc || "")}</p>
    ${spreadPositionsMapHTML(spread, activePos)}
    <div class="card-panel">
      <h4>位置 ${pos.id}：${esc(pos.label)}</h4>
      <p>${esc(pos.desc)}</p>
    </div>
    <a class="btn btn-primary full-width" href="#/practice">用这个牌阵去实战 →</a>
    ${spread.custom ? `<button class="link-btn" data-action="delete-spread" data-id="${spread.id}">删除这个自定义牌阵</button>` : ""}`;
  }
  function viewSpreadCreator() {
    const draft = window._spreadDraft || { name: "", positions: [{ label: "", desc: "" }, { label: "", desc: "" }, { label: "", desc: "" }] };
    window._spreadDraft = draft;
    return `
    ${headerHTML("新建牌阵", { back: "spreads" })}
    <div class="card-panel">
      <label>牌阵名称</label>
      <input id="spread-name" value="${esc(draft.name)}" placeholder="例如：我的三牌阵" />
      <div id="spread-positions">
        ${draft.positions.map((p, i) => `
          <div class="position-row">
            <label>位置 ${i + 1} 名称</label>
            <input class="pos-label" data-idx="${i}" value="${esc(p.label)}" placeholder="例如：过去" />
            <label>说明</label>
            <textarea class="pos-desc" data-idx="${i}" rows="2" placeholder="这个位置该看什么">${esc(p.desc)}</textarea>
          </div>`).join("")}
      </div>
      <div class="form-actions">
        <button class="btn btn-outline" data-action="add-position">+ 增加位置</button>
        <button class="btn btn-outline" data-action="remove-position">- 减少位置</button>
      </div>
      <button class="btn btn-primary full-width" data-action="save-spread">保存牌阵</button>
    </div>`;
  }
  // 在“增加/减少位置”导致整页重渲染之前，先把当前表单里已经填写的内容同步回草稿，避免丢失
  function syncSpreadDraftFromForm() {
    if (!window._spreadDraft) return;
    const nameInput = document.getElementById("spread-name");
    if (nameInput) window._spreadDraft.name = nameInput.value;
    const labels = Array.from(document.querySelectorAll(".pos-label"));
    const descs = Array.from(document.querySelectorAll(".pos-desc"));
    window._spreadDraft.positions.forEach((p, i) => {
      if (labels[i]) p.label = labels[i].value;
      if (descs[i]) p.desc = descs[i].value;
    });
  }

  // ---------- 实战抽牌 ----------
  function viewPracticeStart() {
    const spreads = window.TarotStorage.getAllSpreads();
    const scenario = window._practiceScenario || "love";
    return `
    ${headerHTML("开始一次解读")}
    <div class="card-panel">
      <h4>你想问什么类型的问题？</h4>
      <div class="filter-row">
        ${Object.entries(SCENARIO_LABELS).map(([k, l]) => `<button class="chip ${scenario === k ? 'active' : ''}" data-action="practice-scenario" data-value="${k}">${l}</button>`).join("")}
        <button class="chip ${scenario === 'other' ? 'active' : ''}" data-action="practice-scenario" data-value="other">不限/其他</button>
      </div>
      <label>具体问题（可选，帮助你聚焦）</label>
      <input id="practice-question" placeholder="例如：我该不该接受这个offer" />
    </div>
    <div class="card-panel">
      <h4>选择牌阵</h4>
      <div class="spread-list">
        ${spreads.map(s => `<button class="spread-card select-spread" data-action="start-practice" data-spread="${s.id}">
          <h4>${esc(s.name)}</h4><p class="muted">${(s.positions.length)}张牌 · ${esc(s.difficulty || "自定义")}</p>
        </button>`).join("")}
      </div>
    </div>`;
  }

  function initPracticeSession(spreadId) {
    const spread = window.TarotStorage.getAllSpreads().find(s => s.id === spreadId);
    const question = (document.getElementById("practice-question") || {}).value || "";
    practiceState = {
      scenario: window._practiceScenario || "love",
      question,
      spread,
      drawn: [],           // {positionId, cardId, orientation}
      step: 0,             // 当前抽到第几张（drawn.length）
      revealedRef: {},      // positionId -> bool 是否已展开参考解读
      myInterp: {},         // positionId -> 用户填写的解读
      summary: ""
    };
    nav("practice/session");
  }

  function viewPracticeSession() {
    if (!practiceState) return viewPracticeStart();
    const { spread, drawn, step } = practiceState;
    const total = spread.positions.length;
    if (step < total) {
      // 抽牌阶段
      return `
      ${headerHTML(spread.name, { back: "practice" })}
      <p class="muted">${practiceState.question ? '问题：' + esc(practiceState.question) : ''}</p>
      <div class="drawn-row">
        ${spread.positions.map((p, i) => {
          const d = drawn.find(x => x.positionId === p.id);
          return `<div class="drawn-slot"><div class="drawn-label">${esc(p.label)}</div>${d ? cardFaceHTML(getCardById(d.cardId), d.orientation, "xs") : cardBackHTML("xs")}</div>`;
        }).join("")}
      </div>
      <div class="card-panel center-text">
        <p>点击下方按钮抽出第 ${step + 1}/${total} 张：<b>${esc(spread.positions[step].label)}</b></p>
        <p class="muted">${esc(spread.positions[step].desc)}</p>
        <button class="btn btn-primary" data-action="draw-card">抽牌</button>
      </div>`;
    }
    // 逐张解读阶段
    const interpIdx = window._practiceInterpIdx || 0;
    if (interpIdx < total) {
      const pos = spread.positions[interpIdx];
      const d = drawn[interpIdx];
      const card = getCardById(d.cardId);
      const revealed = !!practiceState.revealedRef[pos.id];
      return `
      ${headerHTML(spread.name, { back: "practice" })}
      <p class="muted">${pos.id}/${total}：${esc(pos.label)} —— ${esc(pos.desc)}</p>
      <div class="center-text">${cardFaceHTML(card, d.orientation, "md")}</div>
      <h3 class="center-text">${esc(card.name)}（${d.orientation === 'upright' ? '正位' : '逆位'}）</h3>
      <div class="card-panel">
        <label>你的解读（先自己想想看）</label>
        <textarea id="my-interp" rows="3" placeholder="结合这个位置的含义，说说你的理解...">${esc(practiceState.myInterp[pos.id] || "")}</textarea>
      </div>
      ${revealed ? `
      <div class="card-panel scenario-text">
        <h4>参考解读</h4>
        <p>${esc(cardMeaningText(card, d.orientation))}</p>
        <p><b>${SCENARIO_LABELS[practiceState.scenario] || ''}场景：</b>${esc(practiceState.scenario !== 'other' ? getScenarioText(card, practiceState.scenario, d.orientation) : '')}</p>
        ${myNoteListHTML(myNotesFor(card.id, d.orientation, null))}
      </div>` : `<button class="btn btn-outline full-width" data-action="reveal-ref" data-pos="${pos.id}">展开参考解读 ▾</button>`}
      <button class="btn btn-primary full-width" data-action="next-interp" data-pos="${pos.id}">${interpIdx === total - 1 ? '完成，看综合总结 →' : '下一张 →'}</button>`;
    }
    // 综合总结
    return `
    ${headerHTML("本次解读总结", { back: "practice" })}
    <p class="muted">${practiceState.question ? '问题：' + esc(practiceState.question) : ''} · 牌阵：${esc(spread.name)}</p>
    <div class="drawn-row">
      ${spread.positions.map(p => {
        const d = drawn.find(x => x.positionId === p.id);
        const card = getCardById(d.cardId);
        return `<div class="drawn-slot"><div class="drawn-label">${esc(p.label)}</div>${cardFaceHTML(card, d.orientation, "xs")}<div class="drawn-caption">${esc(card.name)}${d.orientation === 'reversed' ? '(逆)' : ''}</div></div>`;
      }).join("")}
    </div>
    <div class="card-panel">
      <label>你的综合解读</label>
      <textarea id="practice-summary" rows="5" placeholder="整合几张牌，写一段总结...">${esc(practiceState.summary)}</textarea>
      <div class="form-actions">
        <button class="btn btn-primary" data-action="save-journal">保存到塔罗日记</button>
        <button class="btn btn-outline" data-action="restart-practice">重新抽一次</button>
      </div>
    </div>`;
  }

  // ---------- 塔罗日记 ----------
  function viewJournalList() {
    const list = window.TarotStorage.getJournal();
    return `
    ${headerHTML("塔罗日记")}
    ${list.length === 0 ? `<p class="muted center-text">还没有记录，去「实战抽牌」做一次解读试试吧。</p>` : ""}
    <div class="journal-list">
      ${list.map(j => `<a class="journal-item" href="#/journal/${j.id}">
        <div class="journal-date">${new Date(j.createdAt).toLocaleDateString()} · ${esc(j.spreadName)} · ${SCENARIO_LABELS[j.scenario] || '不限'}</div>
        <div class="journal-q">${esc(j.question || "（未填写问题）")}</div>
        <div class="journal-cards">${j.drawn.map(d => esc(getCardById(d.cardId).name) + (d.orientation === 'reversed' ? '(逆)' : '')).join(" · ")}</div>
      </a>`).join("")}
    </div>`;
  }
  function viewJournalDetail(id) {
    const j = window.TarotStorage.getJournal().find(x => x.id === id);
    if (!j) return `<p>记录不存在</p>`;
    return `
    ${headerHTML("日记详情", { back: "journal" })}
    <p class="muted">${new Date(j.createdAt).toLocaleString()} · ${esc(j.spreadName)}</p>
    <div class="card-panel"><b>问题：</b>${esc(j.question || "（未填写）")}</div>
    ${j.drawn.map(d => {
      const card = getCardById(d.cardId);
      return `<div class="card-panel">
        <div class="flex-row">${cardFaceHTML(card, d.orientation, "sm")}
          <div class="flex-text"><b>${esc(d.positionLabel)}：${esc(card.name)}（${d.orientation === 'upright' ? '正位' : '逆位'}）</b>
          <p>${esc(d.myInterp || "（未填写）")}</p></div>
        </div>
      </div>`;
    }).join("")}
    <div class="card-panel"><b>综合解读：</b><p>${nl2br(j.summary || "（未填写）")}</p></div>
    <button class="link-btn" data-action="delete-journal" data-id="${j.id}">删除这条记录</button>`;
  }

  // ---------- 设置 ----------
  function viewSettings() {
    const s = window.TarotStorage.getSettings();
    return `
    ${headerHTML("设置", { back: "learn" })}
    <div class="card-panel">
      <h4>记忆参数</h4>
      <div class="setting-row">
        <span class="setting-label">区分正逆位记忆</span>
        <button class="switch ${s.distinguishReversed ? 'on' : ''}" data-action="toggle-distinguish"><span class="switch-knob"></span></button>
      </div>
      <p class="setting-desc">开启后，同一张牌的正位和逆位会被当成两条独立的记忆记录分别追踪熟练度；关闭则只练正位。</p>
      <label>逆位出现概率：<span id="rp-val">${Math.round(s.reversedProb * 100)}%</span></label>
      <input type="range" id="set-reversed-prob" min="0" max="1" step="0.1" value="${s.reversedProb}"/>
      <p class="setting-desc">抽牌、闪卡练习时，卡牌显示为逆位的概率。</p>
    </div>
    <div class="card-panel">
      <h4>数据备份</h4>
      <p class="setting-desc">你在这里学到的进度、写下的解读、每一次抽牌记录，都只保存在这一台设备的这个浏览器里。换手机、清缓存前，记得先导出备份；换到新设备后，用导入把数据找回来。</p>
      <button class="btn btn-outline full-width" data-action="export-data">导出数据备份</button>
      <label class="btn btn-outline full-width" style="text-align:center;display:block;">
        导入数据备份<input type="file" id="import-file" accept="application/json" style="display:none"/>
      </label>
      <button class="btn btn-danger full-width" data-action="reset-data">清空重置所有数据</button>
    </div>
    <div class="card-panel muted" style="font-size:12px">
      塔罗学习 App · 纯前端本地存储 · 数据不会上传到任何服务器
    </div>`;
  }

  // ============ 事件绑定（统一委托） ============
  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    const handlers = {
      "learn-mode": () => { window._learnMode = el.dataset.value; flashState = null; render(); },
      "learn-filter": () => { window._learnFilter = el.dataset.value; render(); },
      "detail-scenario": () => { window._detailScenario = el.dataset.value; render(); },
      "open-add-note": () => {
        document.getElementById("note-form-slot").innerHTML = addNoteFormHTML(el.dataset.card, el.dataset.scenario);
      },
      "close-add-note": () => { document.getElementById("note-form-slot").innerHTML = ""; },
      "save-note": () => {
        const cardId = el.dataset.card;
        const orientation = document.getElementById("note-orientation").value;
        const scenario = document.getElementById("note-scenario").value || null;
        const text = document.getElementById("note-text").value.trim();
        if (!text) return alert("请先填写内容");
        window.TarotStorage.addNote({ cardId, orientation, scenario, text });
        render();
      },
      "toggle-distinguish": () => {
        const cur = window.TarotStorage.getSettings();
        window.TarotStorage.setSettings({ distinguishReversed: !cur.distinguishReversed });
        render();
      },
      "delete-note": () => { window.TarotStorage.deleteNote(el.dataset.id); render(); },
      "flip-flash": () => { flashState.revealed = true; render(); },
      "rate-flash": () => {
        const item = flashState.queue[flashState.index];
        window.TarotSRS.review(item.key, parseInt(el.dataset.rating, 10));
        flashState.index++;
        flashState.revealed = false;
        render();
      },
      "show-position": () => { window._activePosition = parseInt(el.dataset.idx, 10); render(); },
      "delete-spread": () => { if (confirm("确定删除这个自定义牌阵？")) { window.TarotStorage.deleteCustomSpread(el.dataset.id); nav("spreads"); } },
      "add-position": () => { syncSpreadDraftFromForm(); window._spreadDraft.positions.push({ label: "", desc: "" }); render(); },
      "remove-position": () => { syncSpreadDraftFromForm(); if (window._spreadDraft.positions.length > 1) window._spreadDraft.positions.pop(); render(); },
      "save-spread": () => {
        const name = document.getElementById("spread-name").value.trim();
        const labels = Array.from(document.querySelectorAll(".pos-label")).map(i => i.value.trim());
        const descs = Array.from(document.querySelectorAll(".pos-desc")).map(i => i.value.trim());
        if (!name || labels.some(l => !l)) return alert("请填写牌阵名称和每个位置的名称");
        const n = labels.length;
        const positions = labels.map((label, i) => ({ id: i + 1, label, desc: descs[i], x: ((i + 1) / (n + 1)) * 100, y: 50 }));
        window.TarotStorage.addCustomSpread({ name, positions, difficulty: "自定义", scenarios: ["不限"], desc: "自定义牌阵" });
        window._spreadDraft = null;
        nav("spreads");
      },
      "practice-scenario": () => { window._practiceScenario = el.dataset.value; render(); },
      "start-practice": () => { initPracticeSession(el.dataset.spread); },
      "draw-card": () => {
        const pos = practiceState.spread.positions[practiceState.step];
        const excluded = practiceState.drawn.map(d => d.cardId);
        const { card, orientation } = drawRandomCard(excluded);
        practiceState.drawn.push({ positionId: pos.id, cardId: card.id, orientation });
        practiceState.step++;
        render();
      },
      "reveal-ref": () => {
        const ta = document.getElementById("my-interp");
        if (ta) practiceState.myInterp[el.dataset.pos] = ta.value;
        practiceState.revealedRef[el.dataset.pos] = true;
        render();
      },
      "next-interp": () => {
        const ta = document.getElementById("my-interp");
        if (ta) practiceState.myInterp[el.dataset.pos] = ta.value;
        window._practiceInterpIdx = (window._practiceInterpIdx || 0) + 1;
        render();
      },
      "save-journal": () => {
        const summary = document.getElementById("practice-summary").value.trim();
        const { spread, drawn, question, scenario, myInterp } = practiceState;
        window.TarotStorage.addJournalEntry({
          question, scenario, spreadName: spread.name,
          drawn: drawn.map(d => ({ ...d, positionLabel: spread.positions.find(p => p.id === d.positionId).label, myInterp: myInterp[d.positionId] })),
          summary
        });
        practiceState = null; window._practiceInterpIdx = 0;
        nav("journal");
      },
      "restart-practice": () => { practiceState = null; window._practiceInterpIdx = 0; nav("practice"); },
      "delete-journal": () => { if (confirm("确定删除这条日记？")) { window.TarotStorage.deleteJournalEntry(el.dataset.id); nav("journal"); } },
      "export-data": () => {
        const dump = window.TarotStorage.exportAll();
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tarot-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        a.click();
      },
      "reset-data": () => { if (confirm("确定清空所有本地数据？此操作不可恢复。")) { window.TarotStorage.resetAll(); location.reload(); } }
    };
    if (handlers[action]) handlers[action]();
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "set-reversed-prob") {
      window.TarotStorage.setSettings({ reversedProb: parseFloat(e.target.value) });
      document.getElementById("rp-val").textContent = Math.round(e.target.value * 100) + "%";
    }
    if (e.target.id === "import-file") {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          window.TarotStorage.importAll(JSON.parse(reader.result));
          alert("导入成功");
          location.reload();
        } catch (err) { alert("导入失败：" + err.message); }
      };
      reader.readAsText(file);
    }
  });
})();
