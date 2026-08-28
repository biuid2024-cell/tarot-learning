// 简化版间隔重复算法（类 Leitner 盒子）：
// box 0..5，box 越大代表越熟练，对应的下次复习间隔越长。
(function () {
  const INTERVAL_DAYS = [0, 1, 3, 7, 15, 30]; // box -> 间隔天数

  function keyOf(cardId, orientation) {
    return cardId + "_" + orientation;
  }

  function allOrientKeys(cardId) {
    const settings = window.TarotStorage.getSettings();
    return settings.distinguishReversed ? [keyOf(cardId, "upright"), keyOf(cardId, "reversed")] : [keyOf(cardId, "upright")];
  }

  const SRS = {
    keyOf,
    allOrientKeys,
    getItem(key) {
      return window.TarotStorage.getSRS()[key] || { box: 0, reviews: 0, due: 0 };
    },
    isDue(key) {
      const item = SRS.getItem(key);
      return !item.reviews || item.due <= Date.now();
    },
    isNew(key) {
      return SRS.getItem(key).reviews === 0;
    },
    review(key, rating) {
      // rating: 1=完全不会 2=有点印象 3=记得 4=非常熟
      const cur = SRS.getItem(key);
      if (rating <= 2) cur.box = Math.max(0, cur.box - 1);
      else cur.box = Math.min(INTERVAL_DAYS.length - 1, cur.box + 1);
      cur.reviews = (cur.reviews || 0) + 1;
      cur.lastReview = Date.now();
      cur.lastRating = rating;
      cur.due = Date.now() + INTERVAL_DAYS[cur.box] * 86400000;
      window.TarotStorage.setSRSItem(key, cur);
      return cur;
    },
    // 统计整体进度：已学习数 / 总数 / 今日待复习数（不含从未学过的新卡）
    getStats(allCards) {
      let studied = 0, dueToday = 0, total = 0, newCount = 0;
      allCards.forEach(card => {
        allOrientKeys(card.id).forEach(key => {
          total++;
          const item = SRS.getItem(key);
          const isNew = item.reviews === 0;
          if (isNew) { newCount++; return; }
          studied++;
          if (SRS.isDue(key)) dueToday++;
        });
      });
      return { studied, total, dueToday, newCount };
    },
    // 生成一批用于闪卡模式的队列：mode = 'new' | 'due' | 'all'
    buildQueue(allCards, mode) {
      const queue = [];
      allCards.forEach(card => {
        allOrientKeys(card.id).forEach(key => {
          const orientation = key.endsWith("_reversed") ? "reversed" : "upright";
          const item = SRS.getItem(key);
          const isNew = item.reviews === 0;
          const isDue = SRS.isDue(key);
          if (mode === "new" && isNew) queue.push({ card, orientation, key });
          else if (mode === "due" && isDue && !isNew) queue.push({ card, orientation, key });
          else if (mode === "all") queue.push({ card, orientation, key });
        });
      });
      // 简单打乱顺序
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
      return queue;
    }
  };

  window.TarotSRS = SRS;
})();
