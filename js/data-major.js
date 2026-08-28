// 大阿尔卡那 22 张
window.TAROT_MAJOR = [
  {
    id: "M0", name: "愚者", nameEn: "The Fool", arcana: "major", number: 0, icon: "🃏",
    keywords: { upright: ["新开始", "冒险", "天真", "自由"], reversed: ["冲动", "鲁莽", "脱离现实"] },
    meaning: {
      upright: "站在旅程的起点，带着未知的勇气踏出第一步。相信过程，不必想清楚所有细节。",
      reversed: "行动前缺乏思考，容易因一时冲动而承担不必要的风险，或是害怕开始而停滞不前。"
    },
    scenarios: {
      love: { upright: "关系有全新的开始，或是以轻松、不设防的心态去认识一个人。", reversed: "对感情不负责任，或因害怕投入而不断逃避。" },
      career: { upright: "适合尝试新方向、新项目，先上路比想清楚更重要。", reversed: "裸辞、盲目跳槽或没做功课就冒进，需要多一分谨慎。" },
      health: { upright: "适合尝试新的运动方式，保持轻松心态对身体有益。", reversed: "作息混乱、缺乏规律，身体信号被忽视。" },
      relationship: { upright: "以开放、不预设立场的态度面对他人，容易建立新连接。", reversed: "相处中显得不靠谱，让对方没有安全感。" }
    }
  },
  {
    id: "M1", name: "魔术师", nameEn: "The Magician", arcana: "major", number: 1, icon: "🎩",
    keywords: { upright: ["创造力", "主动", "资源整合", "意志"], reversed: ["才能未发挥", "操纵", "空想"] },
    meaning: {
      upright: "你手上已经有了需要的一切资源和能力，关键是主动出手，把想法变成行动。",
      reversed: "有能力却没用在对的地方，或是用手段操纵局面/他人来达成目的。"
    },
    scenarios: {
      love: { upright: "主动出击会有效果，你的魅力和自信正当其时。", reversed: "用套路或言语哄骗对方，关系缺乏真诚基础。" },
      career: { upright: "适合主导项目、发挥创造力，资源到位，是行动的时机。", reversed: "画大饼却不落地，或空有想法迟迟不启动。" },
      health: { upright: "有意识地调整生活方式会立刻见效，主动管理胜过被动等待。", reversed: "知道该怎么做却总找借口拖延。" },
      relationship: { upright: "你在人际中能起到很好的牵头、协调作用。", reversed: "利用他人达成自己的目的，容易失去信任。" }
    }
  },
  {
    id: "M2", name: "女祭司", nameEn: "The High Priestess", arcana: "major", number: 2, icon: "🌙",
    keywords: { upright: ["直觉", "潜意识", "神秘知识", "内省"], reversed: ["忽视直觉", "信息隐瞒", "表面化"] },
    meaning: {
      upright: "答案不在外部，而在你的直觉和内心深处。先别急着行动，多观察、多感受。",
      reversed: "刻意忽视内心的声音，或是有些真相被隐藏、被回避。"
    },
    scenarios: {
      love: { upright: "相信自己对这段关系的直觉判断，不必事事都要证据。", reversed: "对方（或你自己）有所隐瞒，关系缺乏坦诚。" },
      career: { upright: "多做背景调研和深度思考，不要急于表态或决策。", reversed: "信息不透明，决策依据不足却仓促推进。" },
      health: { upright: "留意身体给你的细微信号，它往往比检查报告更早察觉问题。", reversed: "身体的警示被长期忽略。" },
      relationship: { upright: "你能敏锐察觉他人未说出口的情绪。", reversed: "彼此都在回避真正想说的话。" }
    }
  },
  {
    id: "M3", name: "皇后", nameEn: "The Empress", arcana: "major", number: 3, icon: "🌸",
    keywords: { upright: ["丰盛", "滋养", "创造", "母性"], reversed: ["过度依赖", "停滞", "缺乏关怀"] },
    meaning: {
      upright: "丰饶、滋养与创造力正在展开，适合孕育新事物（想法/关系/项目），享受成果自然生长。",
      reversed: "过度付出导致耗竭，或是创造力/情感被压抑、停滞不前。"
    },
    scenarios: {
      love: { upright: "关系温暖、被滋养的感觉，也可能与怀孕/家庭议题相关。", reversed: "在关系里过度付出而失去自己，或缺乏关怀。" },
      career: { upright: "适合需要创意与耐心培育的项目，成果会自然显现。", reversed: "创意枯竭，或过度包办导致团队缺乏成长空间。" },
      health: { upright: "身体处于滋养、恢复的状态，适合调理与休养。", reversed: "过度劳累、忽视自我照顾。" },
      relationship: { upright: "你在群体中扮演照顾者、给予温暖的角色。", reversed: "关系中付出与索取失衡。" }
    }
  },
  {
    id: "M4", name: "皇帝", nameEn: "The Emperor", arcana: "major", number: 4, icon: "🏛️",
    keywords: { upright: ["权威", "结构", "掌控", "秩序"], reversed: ["专制", "僵化", "失控"] },
    meaning: {
      upright: "用清晰的规则、结构和意志力建立稳固的秩序，是掌控局面、承担责任的时刻。",
      reversed: "过度控制变成专制，或是该有的规则和边界完全缺失导致失控。"
    },
    scenarios: {
      love: { upright: "关系需要更明确的承诺与边界感。", reversed: "一方过度掌控另一方，关系失衡。" },
      career: { upright: "适合建立制度、承担管理责任，用结构化方式推进。", reversed: "管理僵化、一言堂，或组织混乱无人负责。" },
      health: { upright: "建立规律的作息和计划会带来明显改善。", reversed: "过度自律导致压力，或彻底放弃管理。" },
      relationship: { upright: "你在关系中承担起主导和负责的角色。", reversed: "控制欲过强让对方感到压迫。" }
    }
  },
  {
    id: "M5", name: "教皇", nameEn: "The Hierophant", arcana: "major", number: 5, icon: "⛪",
    keywords: { upright: ["传统", "体制", "精神导师", "认同感"], reversed: ["教条", "盲从", "打破常规"] },
    meaning: {
      upright: "遵循既有的规则、传统或寻求导师/体制的指引，会带来归属感与稳定的进展。",
      reversed: "过度墨守成规、盲目服从，或是主动打破陈规、走自己的路。"
    },
    scenarios: {
      love: { upright: "关系走向传统意义上的稳定阶段（如婚姻/共同生活）。", reversed: "被传统观念束缚，或双方价值观不合。" },
      career: { upright: "适合遵循体制内路径，或寻求导师/资深人士指导。", reversed: "被僵化流程拖累，需要打破常规才能突破。" },
      health: { upright: "遵循专业医嘱、规范疗程会有效。", reversed: "盲目相信偏方，或过度依赖单一权威意见。" },
      relationship: { upright: "你重视共同的价值观和归属的群体。", reversed: "因立场/观念差异产生隔阂。" }
    }
  },
  {
    id: "M6", name: "恋人", nameEn: "The Lovers", arcana: "major", number: 6, icon: "💞",
    keywords: { upright: ["关系", "选择", "价值观契合", "连接"], reversed: ["失衡", "错误抉择", "疏离"] },
    meaning: {
      upright: "重要的关系或选择正摆在面前，核心是价值观是否真正契合，做出发自内心的抉择。",
      reversed: "关系失衡或面临一个让你为难、后悔的选择，需重新审视是否真正合拍。"
    },
    scenarios: {
      love: { upright: "关系进入深度连接阶段，或出现重要的感情选择。", reversed: "三角关系、价值观错位，或沟通严重失衡。" },
      career: { upright: "面临一个需要权衡价值观的重要选择（如换工作/合作方）。", reversed: "团队/合作关系不合拍，理念冲突。" },
      health: { upright: "身心达到较好的和谐状态。", reversed: "身心失衡，情绪影响身体状态。" },
      relationship: { upright: "与他人建立深层次的心灵连接。", reversed: "关系中出现明显的价值观分歧。" }
    }
  },
  {
    id: "M7", name: "战车", nameEn: "The Chariot", arcana: "major", number: 7, icon: "🏇",
    keywords: { upright: ["意志力", "胜利", "掌控方向", "推进"], reversed: ["失控", "方向不明", "内耗"] },
    meaning: {
      upright: "凭借强大的意志力和专注，掌控住相互拉扯的力量，坚定地朝目标推进并获得胜利。",
      reversed: "内部力量互相拉扯导致失控，或是方向不清、缺乏推进力。"
    },
    scenarios: {
      love: { upright: "靠坚定的意志克服关系中的阻碍，共同前进。", reversed: "两人各执己见、互不相让，关系陷入拉锯。" },
      career: { upright: "凭意志力和专注力推动项目取得突破性进展。", reversed: "多头指挥、方向混乱，团队内耗严重。" },
      health: { upright: "自律和意志力带来体能/状态的明显提升。", reversed: "身心俱疲，感觉被多方拉扯。" },
      relationship: { upright: "你能坚定地带领团队/群体朝目标前进。", reversed: "人际中充满竞争和角力。" }
    }
  },
  {
    id: "M8", name: "力量", nameEn: "Strength", arcana: "major", number: 8, icon: "🦁",
    keywords: { upright: ["内在勇气", "柔韧", "耐心", "驯服本能"], reversed: ["自我怀疑", "滥用力量", "压抑"] },
    meaning: {
      upright: "真正的力量不是强硬对抗，而是用温柔、耐心和内在勇气去驯服冲动、化解难题。",
      reversed: "缺乏自信、对自己的能力产生怀疑，或是用强硬/压制的方式处理事情反而适得其反。"
    },
    scenarios: {
      love: { upright: "用耐心和包容化解关系中的冲突和野性冲动。", reversed: "用强势/冷战压制对方，问题并未真正解决。" },
      career: { upright: "面对难缠的对手/局面，靠耐心和柔韧的策略取胜。", reversed: "缺乏信心去争取该属于自己的机会。" },
      health: { upright: "以温和、持续的方式调理身体，效果更持久。", reversed: "过度自我苛责，或强行透支身体硬撑。" },
      relationship: { upright: "你能用温和的方式化解他人的敌意或冲动。", reversed: "在关系中感到无力或被对方的强势压制。" }
    }
  },
  {
    id: "M9", name: "隐者", nameEn: "The Hermit", arcana: "major", number: 9, icon: "🏮",
    keywords: { upright: ["内省", "独处", "求索", "智慧"], reversed: ["孤僻", "逃避", "迷失方向"] },
    meaning: {
      upright: "暂时退出喧嚣，独自向内探寻，答案往往在安静的自我反思中浮现。",
      reversed: "过度封闭自己变成孤僻逃避，或是内省过度反而更加迷失。"
    },
    scenarios: {
      love: { upright: "需要一段独处的时间想清楚自己真正想要什么。", reversed: "用回避/冷淡切断和对方的连接。" },
      career: { upright: "适合独立深入研究，不被外界干扰打断思路。", reversed: "过度孤立自己，脱离团队协作。" },
      health: { upright: "适合安静独处、冥想或休养来恢复身心能量。", reversed: "长期自我封闭影响心理健康。" },
      relationship: { upright: "你更倾向于少而深的连接，而非广泛社交。", reversed: "把自己孤立于群体之外，产生疏离感。" }
    }
  },
  {
    id: "M10", name: "命运之轮", nameEn: "Wheel of Fortune", arcana: "major", number: 10, icon: "🎡",
    keywords: { upright: ["周期", "机遇", "命运转折", "变化"], reversed: ["厄运", "抗拒变化", "错失时机"] },
    meaning: {
      upright: "命运的齿轮正在转动，一个新的周期/机遇到来，顺势而为往往比强行控制更有效。",
      reversed: "运气不佳的阶段，或是明明该变化了却一直抗拒、错失转折的时机。"
    },
    scenarios: {
      love: { upright: "关系迎来意料之外的转折点，可能是好的契机。", reversed: "关系陷入不利的循环，感觉运气总是不站在自己这边。" },
      career: { upright: "行业/项目出现周期性机会，抓住window很关键。", reversed: "计划被外部变化打乱，进展受阻。" },
      health: { upright: "身体状态随自然周期波动，顺应节律调整即可。", reversed: "状况反复、迟迟不见好转。" },
      relationship: { upright: "人际关系网因为一次机缘出现积极变化。", reversed: "总感觉在人际中运气不佳、时机不对。" }
    }
  },
  {
    id: "M11", name: "正义", nameEn: "Justice", arcana: "major", number: 11, icon: "⚖️",
    keywords: { upright: ["因果", "公平", "决断", "责任"], reversed: ["不公", "逃避责任", "偏见"] },
    meaning: {
      upright: "一切都会得到公正的对待，是做出理性决断、为自己的选择负责的时刻。",
      reversed: "遭遇不公平的对待，或是在逃避本该承担的责任。"
    },
    scenarios: {
      love: { upright: "关系中的付出与回报趋于平衡、公平对待彼此。", reversed: "关系中出现明显的不公平待遇。" },
      career: { upright: "凭实力和事实说话，正当的努力会得到应有的评价。", reversed: "决策/晋升中出现不公，或自己回避该承担的责任。" },
      health: { upright: "过去的生活习惯正在如实反映到现在的身体状态上。", reversed: "拖延就医或体检，回避面对问题。" },
      relationship: { upright: "你在人际中以公正、讲道理著称。", reversed: "被区别对待或有失偏颇的评判所困扰。" }
    }
  },
  {
    id: "M12", name: "倒吊人", nameEn: "The Hanged Man", arcana: "major", number: 12, icon: "🙃",
    keywords: { upright: ["换角度看", "暂停", "主动牺牲", "顿悟"], reversed: ["拖延", "无谓牺牲", "抗拒暂停"] },
    meaning: {
      upright: "暂停下来，从一个完全不同的角度重新看待问题，牺牲眼前的利益换取更大的领悟。",
      reversed: "一直拖着不做决定，或是做了不值得的牺牲却没有换来任何收获。"
    },
    scenarios: {
      love: { upright: "换个角度理解对方的立场，会有新的领悟。", reversed: "一方一直单方面妥协牺牲，却换不来关系的改善。" },
      career: { upright: "项目卡住时，暂停下来换个思路往往能破局。", reversed: "决策一直悬而未决，拖累了整体进度。" },
      health: { upright: "换一种全新的生活方式/治疗思路可能带来转机。", reversed: "一直硬撑不肯调整方式，情况没有改善。" },
      relationship: { upright: "愿意从对方的视角重新理解一段关系。", reversed: "在关系中做出了不值得的自我牺牲。" }
    }
  },
  {
    id: "M13", name: "死神", nameEn: "Death", arcana: "major", number: 13, icon: "💀",
    keywords: { upright: ["结束", "转化", "蜕变", "释放"], reversed: ["抗拒改变", "停滞腐朽", "拖延告别"] },
    meaning: {
      upright: "一个阶段必然地走向结束，为新的开始让路，这是转化和蜕变，而非单纯的坏事。",
      reversed: "明明该结束的东西一直拖着不放手，导致停滞、腐朽，无法进入下一阶段。"
    },
    scenarios: {
      love: { upright: "一段关系/相处模式走到自然的终点，为新的可能腾出空间。", reversed: "明知这段关系已经无法继续，却迟迟不肯放手。" },
      career: { upright: "旧项目/旧模式该结束了，转型的时机已经成熟。", reversed: "抱着过时的方法或岗位不肯变化，拖累发展。" },
      health: { upright: "需要彻底告别一个不健康的习惯，才能真正好转。", reversed: "明知某个习惯有害却一直无法戒断。" },
      relationship: { upright: "一段人际关系自然淡出，这是健康的过程。", reversed: "无法接受关系的变化，强行维系已经变质的连接。" }
    }
  },
  {
    id: "M14", name: "节制", nameEn: "Temperance", arcana: "major", number: 14, icon: "⚗️",
    keywords: { upright: ["平衡", "调和", "耐心", "融合"], reversed: ["失衡", "过度", "急躁"] },
    meaning: {
      upright: "把不同的甚至对立的元素调和到一起，需要耐心、节制和恰到好处的分寸感。",
      reversed: "各方面严重失衡，或是因为急躁、过度而打破了原本的平衡。"
    },
    scenarios: {
      love: { upright: "两人在磨合中找到彼此都舒适的节奏。", reversed: "一方过度迁就或过度索取，关系失去平衡。" },
      career: { upright: "在多个任务/多方利益间找到恰当的平衡点。", reversed: "工作生活严重失衡，或资源分配极度不合理。" },
      health: { upright: "饮食、作息、运动都保持适度，身体状态稳健。", reversed: "暴饮暴食或过度节制，走向两个极端。" },
      relationship: { upright: "你善于在不同的人和立场之间做调和、当中间人。", reversed: "被夹在中间左右为难，两边都难平衡。" }
    }
  },
  {
    id: "M15", name: "恶魔", nameEn: "The Devil", arcana: "major", number: 15, icon: "😈",
    keywords: { upright: ["束缚", "欲望", "执念", "上瘾"], reversed: ["摆脱束缚", "觉醒", "打破枷锁"] },
    meaning: {
      upright: "被某种欲望、执念或不健康的关系/习惯捆绑，看似身不由己，实际上枷锁常常是自己给的。",
      reversed: "正在或已经意识到束缚并开始挣脱，走向解放和觉醒。"
    },
    scenarios: {
      love: { upright: "陷入一段令人上瘾但不健康的关系（如反复分合、控制欲强）。", reversed: "终于有勇气离开一段消耗自己的关系。" },
      career: { upright: "被高薪或稳定绑住却做着让自己痛苦的工作。", reversed: "开始有意识地摆脱职业倦怠或不健康的工作环境。" },
      health: { upright: "被某种成瘾行为（烟酒/暴食/手机）困住难以自控。", reversed: "开始真正下决心戒断不健康的习惯。" },
      relationship: { upright: "关系中存在一方对另一方的过度控制。", reversed: "正在打破一段令人窒息的控制关系。" }
    }
  },
  {
    id: "M16", name: "塔", nameEn: "The Tower", arcana: "major", number: 16, icon: "🗼",
    keywords: { upright: ["剧变", "崩塌", "突发打击", "觉醒"], reversed: ["逃避必然的崩塌", "延迟的危机", "内在动荡"] },
    meaning: {
      upright: "建立在不稳固基础上的东西突然崩塌，来得又急又猛，但也带来彻底的觉醒和重建的机会。",
      reversed: "危机被暂时压制或拖延，但根本问题没解决，动荡在内部持续发酵。"
    },
    scenarios: {
      love: { upright: "关系里隐藏的问题突然爆发，带来剧烈的冲击。", reversed: "问题被一直压着不谈，矛盾在暗中累积。" },
      career: { upright: "计划被突发状况打乱（如裁员/项目取消），但会带来新方向。", reversed: "危机的信号一直被忽视，风险在积累。" },
      health: { upright: "身体突然发出强烈警告信号，必须立刻正视。", reversed: "隐患被拖着不处理，风险在潜伏。" },
      relationship: { upright: "一次冲突彻底暴露了关系中积压的问题。", reversed: "表面平静，但潜在的裂痕迟早会显现。" }
    }
  },
  {
    id: "M17", name: "星星", nameEn: "The Star", arcana: "major", number: 17, icon: "⭐",
    keywords: { upright: ["希望", "疗愈", "指引", "信念"], reversed: ["迷失方向", "失望", "信心受挫"] },
    meaning: {
      upright: "经历风雨之后迎来平静和希望，内心得到疗愈，有清晰的方向指引着你前行。",
      reversed: "暂时看不到希望，感到迷茫失望，或对未来失去信心。"
    },
    scenarios: {
      love: { upright: "关系走出低谷，重新看到希望和美好的可能。", reversed: "对这段关系的未来感到迷茫和失望。" },
      career: { upright: "经历困难后迎来转机，方向逐渐清晰。", reversed: "感觉努力看不到回报，信心受挫。" },
      health: { upright: "身心正处在稳步恢复、被疗愈的过程中。", reversed: "康复过程比预期缓慢，容易失去耐心。" },
      relationship: { upright: "你能给身边的人带去希望和正向的力量。", reversed: "感觉在人际中孤立无援，看不到支持。" }
    }
  },
  {
    id: "M18", name: "月亮", nameEn: "The Moon", arcana: "major", number: 18, icon: "🌕",
    keywords: { upright: ["潜意识", "幻象", "不确定", "焦虑"], reversed: ["真相浮现", "走出迷雾", "释放恐惧"] },
    meaning: {
      upright: "笼罩在一片不确定和模糊的情绪中，很多东西并非表面所见，直觉里藏着重要信息。",
      reversed: "迷雾逐渐散去，真相开始浮现，或者你终于走出了长期的焦虑和恐惧。"
    },
    scenarios: {
      love: { upright: "对关系感到不安、疑虑，很多信息还不明朗。", reversed: "之前的误会/隐瞒终于说清楚了。" },
      career: { upright: "项目走向不明确，信息不透明，容易焦虑。", reversed: "之前模糊的局势开始变得清晰。" },
      health: { upright: "情绪性的焦虑影响身体（如失眠、肠胃敏感）。", reversed: "长期困扰的心理阴影正在被化解。" },
      relationship: { upright: "人际中充满猜测和不确定的信号。", reversed: "一直悬而未决的关系状态终于有了答案。" }
    }
  },
  {
    id: "M19", name: "太阳", nameEn: "The Sun", arcana: "major", number: 19, icon: "☀️",
    keywords: { upright: ["成功", "活力", "清晰", "喜悦"], reversed: ["短暂受挫", "过度乐观", "光环褪去"] },
    meaning: {
      upright: "阳光普照，事情清晰明朗，充满活力和喜悦，是收获成功与认可的好时机。",
      reversed: "原本顺利的势头暂时受挫，或是过度自信/乐观而忽视了潜在风险。"
    },
    scenarios: {
      love: { upright: "关系充满阳光和喜悦，彼此坦诚而温暖。", reversed: "曾经的甜蜜暂时褪色，需要重新注入活力。" },
      career: { upright: "项目顺利、成果被认可，整体状态非常积极。", reversed: "一时的顺利让人放松警惕，出现小挫折。" },
      health: { upright: "精力充沛，身心状态处于高点。", reversed: "看似健康却忽视了需要注意的小问题。" },
      relationship: { upright: "你的状态感染身边的人，带来积极的氛围。", reversed: "曾经融洽的关系出现暂时的降温。" }
    }
  },
  {
    id: "M20", name: "审判", nameEn: "Judgement", arcana: "major", number: 20, icon: "📯",
    keywords: { upright: ["觉醒", "总结", "重生召唤", "清算"], reversed: ["自我否定", "逃避审视", "错失召唤"] },
    meaning: {
      upright: "对过去的一切做一次全面的总结与审视，一个重生/觉醒的召唤到来，是重新出发的信号。",
      reversed: "过度苛责自己，或是回避对过去的诚实反思，错过了觉醒和转变的契机。"
    },
    scenarios: {
      love: { upright: "对这段关系做出关键性的总结和决定（继续/结束）。", reversed: "一直回避对关系做出真正的评估和决定。" },
      career: { upright: "阶段性的总结和复盘，为下一阶段做好准备。", reversed: "对过去的失败过度自责，迟迟无法向前看。" },
      health: { upright: "一次体检/复盘让你重新审视整体生活方式。", reversed: "回避面对体检结果或身体发出的信号。" },
      relationship: { upright: "过去的误解得到澄清，关系迎来新的阶段。", reversed: "不愿正视人际中一直存在的问题。" }
    }
  },
  {
    id: "M21", name: "世界", nameEn: "The World", arcana: "major", number: 21, icon: "🌍",
    keywords: { upright: ["完成", "圆满", "阶段性成就", "整合"], reversed: ["未完成", "拖延收尾", "缺乏闭环"] },
    meaning: {
      upright: "一个完整的周期圆满达成，所有努力汇聚成成果，是庆祝完成、迎接新周期的时刻。",
      reversed: "事情差一点就能完成却卡在最后一步，或是迟迟无法给一个阶段画上句号。"
    },
    scenarios: {
      love: { upright: "关系达到一个圆满、水到渠成的阶段（如订婚/同居）。", reversed: "关系一直差一步无法真正定下来。" },
      career: { upright: "项目/目标顺利收官，是展示成果、复盘庆祝的时刻。", reversed: "项目卡在最后阶段迟迟无法交付。" },
      health: { upright: "长期坚持的健康计划迎来阶段性的圆满效果。", reversed: "调理了很久却总差一点没能彻底见效。" },
      relationship: { upright: "在群体中获得广泛认可，人际圆满和谐。", reversed: "始终有一段关系没能真正画上句号。" }
    }
  }
];
