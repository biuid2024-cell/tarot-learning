// 小阿尔卡那 56 张：由「花色」×「数字/宫廷」规律推导生成
// 这样设计是为了呼应“不用死记56张，理解规律”的记忆方法——
// 花色 = 生活领域（元素），数字/宫廷 = 该领域所处的阶段/人物角色

window.TAROT_SUITS = {
  wands:      { code: "W", name: "权杖", nameEn: "Wands",     element: "火", domain: "事业、创造、行动与热情", icon: "🪄", color: "#e8603c" },
  cups:       { code: "C", name: "圣杯", nameEn: "Cups",      element: "水", domain: "情感、关系与直觉",     icon: "🍷", color: "#3c7ce8" },
  swords:     { code: "S", name: "宝剑", nameEn: "Swords",    element: "风", domain: "思想、沟通、冲突与真相", icon: "⚔️", color: "#8a8a99" },
  pentacles:  { code: "P", name: "星币", nameEn: "Pentacles", element: "土", domain: "金钱、物质与现实事务",   icon: "🪙", color: "#3c9a5f" }
};

// 数字/宫廷的“核心阶段含义”（正位），逆位在渲染时自动转为“受阻/过度/缺乏”的反向表达
window.TAROT_NUMBER_META = {
  1:  { label: "Ace · 起点", core: "全新的起点与纯粹的能量种子" },
  2:  { label: "2 · 选择", core: "两难的选择或初步建立的平衡关系" },
  3:  { label: "3 · 成长", core: "协作带来的成长与初步成果" },
  4:  { label: "4 · 稳定", core: "阶段性的稳定结构，也可能是停滞" },
  5:  { label: "5 · 冲突", core: "失衡带来的冲突与挑战" },
  6:  { label: "6 · 和谐", core: "给予与接受之间恢复的和谐" },
  7:  { label: "7 · 坚持", core: "需要坚持评估，或陷入内省/幻想" },
  8:  { label: "8 · 推进", core: "加速推进、更熟练地掌握局面" },
  9:  { label: "9 · 将成", core: "接近完成前的疲惫、焦虑或独立" },
  10: { label: "10 · 圆满", core: "一个周期的圆满或过载式的结束" },
  11: { label: "Page · 侍从", core: "学习者心态，机会/消息刚刚萌芽" },
  12: { label: "Knight · 骑士", core: "带着冲劲追逐目标的行动力" },
  13: { label: "Queen · 王后", core: "内在成熟、滋养式地掌握该领域" },
  14: { label: "King · 国王", core: "外在权威、掌控式地领导该领域" }
};

// 每个花色 × 每个场景的语气模板：接收 (numberCore, orientation) 返回一句话
window.TAROT_SUIT_SCENARIO_TEMPLATES = {
  wands: {
    love:   (c, up) => up ? `感情中你更主动、更有热情推动关系，呼应“${c}”。` : `感情中容易急躁冲动或后劲不足，需留意“${c}”背后的失衡。`,
    career: (c, up) => up ? `事业/项目上正对应“${c}”这个阶段，行动力是关键。` : `工作上因缺乏方向或动力过猛，卡在“${c}”反面的问题里。`,
    health: (c, up) => up ? `体能和活力方面呼应“${c}”，适合投入运动/新尝试。` : `容易因用力过猛或缺乏动力，影响“${c}”相关的身体状态。`,
    relationship: (c, up) => up ? `人际中你显得积极主动，带动大家一起行动，对应“${c}”。` : `人际中显得咄咄逼人或缺乏推动力，偏离了“${c}”本该有的样子。`
  },
  cups: {
    love:   (c, up) => up ? `情感层面正处在“${c}”这个阶段，感受和直觉是重点。` : `情感上出现波动或压抑，反映“${c}”背后未被满足的部分。`,
    career: (c, up) => up ? `工作氛围/团队关系上体现出“${c}”，人情味是加分项。` : `工作中情绪影响了判断，或团队关系出现“${c}”反面的问题。`,
    health: (c, up) => up ? `情绪和身心状态呼应“${c}”，心理健康值得关注。` : `压抑的情绪正在影响身体，对应“${c}”未被处理的部分。` ,
    relationship: (c, up) => up ? `人际连接上你重感情、重直觉，正对应“${c}”。` : `人际中情绪化或回避真实感受，偏离了“${c}”应有的状态。`
  },
  swords: {
    love:   (c, up) => up ? `感情中沟通和理性思考很关键，对应“${c}”。` : `感情中言语伤害或冷战，反映“${c}”反面的失衡。`,
    career: (c, up) => up ? `工作上靠清晰的思路和决断对应“${c}”这个阶段。` : `工作中充满争执、信息混乱，偏离了“${c}”该有的清晰。`,
    health: (c, up) => up ? `头脑清醒、决策果断有助于身心状态，对应“${c}”。` : `思虑过多、精神压力大，对应“${c}”反面的消耗。`,
    relationship: (c, up) => up ? `人际中你以理性、坦率著称，对应“${c}”。` : `人际中言语冲突或误解频发，偏离“${c}”该有的沟通质量。`
  },
  pentacles: {
    love:   (c, up) => up ? `感情走向务实稳定的阶段，对应“${c}”。` : `感情因现实压力（金钱/生活琐事）受阻，反映“${c}”的反面。`,
    career: (c, up) => up ? `事业/财务上正处在“${c}”这个稳步推进的阶段。` : `工作/财务上出现停滞或过度焦虑，偏离“${c}”该有的稳健。`,
    health: (c, up) => up ? `身体的基础状态（睡眠/饮食/体力）对应“${c}”，稳扎稳打即可。` : `长期忽视身体基础保养，反映“${c}”反面的隐患。`,
    relationship: (c, up) => up ? `人际中你踏实可靠，是值得信赖的伙伴，对应“${c}”。` : `人际中过于计较利益得失，偏离“${c}”该有的踏实。`
  }
};

window.TAROT_MINOR = (function buildMinor() {
  const cards = [];
  const suitKeys = ["wands", "cups", "swords", "pentacles"];
  const numberNames = { 1: "Ace", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "侍从", 12: "骑士", 13: "王后", 14: "国王" };
  suitKeys.forEach(suitKey => {
    const suit = window.TAROT_SUITS[suitKey];
    for (let n = 1; n <= 14; n++) {
      const meta = window.TAROT_NUMBER_META[n];
      const id = suit.code + String(n).padStart(2, "0");
      const name = `${suit.name}${numberNames[n]}`;
      const nameEn = `${numberNames[n]} of ${suit.nameEn}`;
      cards.push({
        id, name, nameEn, arcana: "minor", suit: suitKey, number: n, icon: suit.icon,
        // meaning/keywords 由通用规律推导；scenarios 由模板函数动态生成（见 app.js 中 getScenarioText）
        meaning: {
          upright: `${suit.domain}方面，正对应「${meta.label}」——${meta.core}。`,
          reversed: `${suit.domain}方面出现受阻或过度的情况，偏离了「${meta.label}」本该有的状态。`
        },
        keywords: {
          upright: [meta.label, suit.name, "顺应"],
          reversed: [meta.label + "(受阻)", suit.name, "失衡"]
        },
        _numberCore: meta.core
      });
    }
  });
  return cards;
})();

window.TAROT_ALL_CARDS = window.TAROT_MAJOR.concat(window.TAROT_MINOR);
