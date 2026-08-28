// 本地存储层：所有用户数据都存在浏览器 localStorage 里，不依赖任何后端。
// 每个使用这个页面的人，数据都是各自独立、保存在自己的设备/浏览器上。
(function () {
  const KEYS = {
    srs: "tarot_srs_v1",
    notes: "tarot_mynotes_v1",
    journal: "tarot_journal_v1",
    customSpreads: "tarot_custom_spreads_v1",
    settings: "tarot_settings_v1"
  };

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("读取本地数据失败", key, e);
      return fallback;
    }
  }
  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  const Storage = {
    // ---- SRS 记忆状态 ----
    getSRS() { return readJSON(KEYS.srs, {}); },
    setSRSItem(cardOrientKey, item) {
      const all = Storage.getSRS();
      all[cardOrientKey] = item;
      writeJSON(KEYS.srs, all);
    },

    // ---- 我的解读 ----
    getNotes() { return readJSON(KEYS.notes, []); },
    addNote(note) {
      const all = Storage.getNotes();
      const rec = Object.assign({ id: uid(), createdAt: Date.now() }, note);
      all.unshift(rec);
      writeJSON(KEYS.notes, all);
      return rec;
    },
    deleteNote(id) {
      const all = Storage.getNotes().filter(n => n.id !== id);
      writeJSON(KEYS.notes, all);
    },
    getNotesForCard(cardId) {
      return Storage.getNotes().filter(n => n.cardId === cardId);
    },

    // ---- 塔罗日记 ----
    getJournal() { return readJSON(KEYS.journal, []); },
    addJournalEntry(entry) {
      const all = Storage.getJournal();
      const rec = Object.assign({ id: uid(), createdAt: Date.now() }, entry);
      all.unshift(rec);
      writeJSON(KEYS.journal, all);
      return rec;
    },
    deleteJournalEntry(id) {
      const all = Storage.getJournal().filter(j => j.id !== id);
      writeJSON(KEYS.journal, all);
    },
    updateJournalEntry(id, patch) {
      const all = Storage.getJournal();
      const idx = all.findIndex(j => j.id === id);
      if (idx === -1) return null;
      all[idx] = Object.assign({}, all[idx], patch);
      writeJSON(KEYS.journal, all);
      return all[idx];
    },

    // ---- 自定义牌阵 ----
    getCustomSpreads() { return readJSON(KEYS.customSpreads, []); },
    addCustomSpread(spread) {
      const all = Storage.getCustomSpreads();
      const rec = Object.assign({ id: "custom_" + uid(), custom: true }, spread);
      all.unshift(rec);
      writeJSON(KEYS.customSpreads, all);
      return rec;
    },
    deleteCustomSpread(id) {
      const all = Storage.getCustomSpreads().filter(s => s.id !== id);
      writeJSON(KEYS.customSpreads, all);
    },
    getAllSpreads() {
      return window.TAROT_BUILTIN_SPREADS.concat(Storage.getCustomSpreads());
    },

    // ---- 设置 ----
    getSettings() {
      return Object.assign({ distinguishReversed: true, reversedProb: 0.5 }, readJSON(KEYS.settings, {}));
    },
    setSettings(patch) {
      const cur = Storage.getSettings();
      writeJSON(KEYS.settings, Object.assign(cur, patch));
    },

    // ---- 导入 / 导出 / 重置 ----
    exportAll() {
      const dump = {};
      Object.entries(KEYS).forEach(([k, storageKey]) => {
        dump[k] = readJSON(storageKey, k === "settings" ? {} : (k === "srs" ? {} : []));
      });
      dump._exportedAt = new Date().toISOString();
      dump._app = "tarot-learning";
      return dump;
    },
    importAll(dump) {
      if (!dump || typeof dump !== "object") throw new Error("数据格式不对");
      Object.entries(KEYS).forEach(([k, storageKey]) => {
        if (dump[k] !== undefined) writeJSON(storageKey, dump[k]);
      });
    },
    resetAll() {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }
  };

  window.TarotStorage = Storage;
})();
