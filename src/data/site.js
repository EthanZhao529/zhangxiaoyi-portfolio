// =========================================================
// 张小艺 作品集 — 全站内容数据（作品为主角）
// 改文案 / 换图 / 调顺序都在这里。图片放 public/images，路径写 /images/pXX.jpg
// =========================================================

// 统一加上部署子路径前缀（dev 下为 "/"，GitHub Pages 项目页下为 "/仓库名/"）
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, "");
export const img = (n) => asset(`images/p${String(n).padStart(2, "0")}.jpg`);

export const profile = {
  name: "张小艺",
  nameEn: "ZHANG XIAOYI",
  role: "视觉设计师",
  roleEn: "Visual Designer",
  tagline: "品牌视觉 · 包装设计 · 广告创意 · 文创设计 —— 让设计有记忆点。",
  email: "505585527@qq.com",
  location: "上海",
  identities: ["视觉设计师", "AI 设计师", "品牌设计师"],
};

// 首屏数字（真实保守值，守真实性铁律）
export const stats = [
  { to: 7, label: "代表项目" },
  { to: 10, suffix: "+", label: "设计奖项" },
  { to: 5, label: "设计方向" },
  { to: 2, label: "段实习" },
];

export const about = {
  intro: [
    "我是一名具有视觉传达与设计硕士背景的设计师，设计方向主要集中在品牌视觉、包装设计、广告创意、文创设计与整合视觉传播。",
    "在本科与研究生阶段，我持续参与品牌升级、文化 IP、包装系统、广告海报与交互体验等类型项目，逐渐形成了从调研分析、概念提炼、视觉转译到最终落地执行的完整设计方法。",
    "我擅长将文化元素、品牌故事与现代视觉语言结合，通过图形、色彩、版式和材料语言建立具有记忆点的视觉系统。",
  ],
  designTools: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Figma", "C4D"],
  aiTools: ["ChatGPT", "Codex", "Vibe Coding", "即梦 AI", "Midjourney", "Figma AI"],
  education: [
    { date: "2025.02 — 2026.06", title: "新南威尔士大学（UNSW）", desc: "设计硕士 · Master of Design" },
    { date: "2020.09 — 2024.07", title: "上海建桥学院", desc: "视觉传达设计 本科" },
  ],
  experience: [
    { date: "2025.06 — 2025.11", title: "香奈儿 CHANEL", desc: "市场部实习生 · 彩妆产品线梳理、竞品分析、行业趋势研究、新品传播执行" },
    { date: "2024.12 — 2025.01", title: "艺雅达（上海）家居装饰工程有限公司", desc: "设计助理 · 软装物料、供应商对接、海报与包装视觉执行" },
  ],
  awards: [
    "第14届全国大学生广告艺术大赛 · 全国一等奖、三等奖、优秀奖（2022）",
    "第14届全国大学生广告艺术大赛 · “爱华仕箱包”企业特别奖 铜奖（2022）",
    "未来设计师·全国高校数字艺术设计大赛 NCDA · 国家级二等奖、三等奖（2023）",
    "中国包装设计创意大赛 · 全国三等奖、优秀奖（2022–2023）",
    "中国国际“互联网+”大学生创新创业大赛 · 上海市金奖、铜奖（2023）",
    "“汇创青春”上海大学生文化创意作品展示 · 上海赛区三等奖（2023）",
  ],
};

// ===== 作品（主角）=====
export const projects = [
  {
    no: "01", accent: "#4fd99a",
    title: "城市寻宝家", en: "Urban Treasure Hunters",
    cat: "信息可视化 · 广告 / Information & Advertising",
    meta: ["2023", "概念 · 信息设计 · 落地", "🏆 上海市优秀毕业设计"],
    background: "城市里藏着许多被忽视的「药食同源」植物——苣荬菜、蒲公英、荠菜、马齿苋、决明子、蕨菜……人们每天路过却视而不见。项目希望唤醒都市人对身边绿植的感知，重塑人与城市自然环境的连接。",
    concept: "以「寻宝」为线索，把植物当作城市里待发掘的宝藏。通过详实的植物志梳理、直观的数据可视化与创新的视觉演绎，系统呈现它们的生态价值与实用功能，并延展出文创与落地物料。",
    cover: 5,
    images: [5, 6, 7, 8, 9, 10, 11],
  },
  {
    no: "02", accent: "#5aa0e6",
    title: "碧海鲜踪", en: "Bi Hai Xian Zong",
    cat: "海鲜品牌全案 · 品牌 / Branding & Packaging",
    meta: ["品牌视觉 + 包装", "🏆 中国包装创意设计大赛三等奖 · NCDA 上海二等奖"],
    background: "为海鲜品牌「碧海鲜踪」打造一套从标志、辅助图形到包装的完整视觉系统，传递「鲜活、优质」的品牌理念。",
    concept: "标志以中国传统祥云与海浪做字体设计，笔锋融合毛笔与现代形式，点一抹中国红，配口号「一口尝尽海味，一口尝尽新鲜」。辅助图形提取虾、蟹、鱼、海螺、扇贝、鱿鱼等剪影，灵活组合成纹样系统，贯穿海报与包装。",
    cover: 23,
    images: [23, 13, 14, 15, 16, 17, 18, 24, 25, 26, 27, 28],
  },
  {
    no: "03", accent: "#d2a566",
    title: "诗意糕点", en: "Poetic Pastries",
    cat: "中式糕点品牌 · 包装 / Brand & Packaging",
    meta: ["2023", "品牌 + 包装", "🏆 NCDA 全国总决赛二等奖"],
    background: "在电子屏幕与碎片化信息占据生活的当下，「诗意糕点」想让中式糕点回归日常，成为像奶茶一样的「社交新货币」。",
    concept: "以「赤诚之心，复兴传统风味」为愿景，以糕点为载体、古诗为媒介。包装提取篆文与东方美学——「篆文作封，食一味诗行；一纸酥香，赴千年文字之约」。",
    cover: 19,
    images: [19, 20, 21],
  },
  {
    no: "04", accent: "#cdb377",
    title: "文创设计", en: "Cultural Creative",
    cat: "文创 · 陶艺 · 字体 / Cultural Creative",
    meta: ["2023", "传统文化的当代转译"],
    cover: 30,
    lead: "把传统文化转译成当代可触、可陈列、可馈赠的产品语言。本系列收录两个文创项目。",
    subWorks: [
      { sub: "陶艺十二生肖", subEn: "Pottery · Twelve Zodiac Signs", desc: "以十二生肖为完整创作主线的体系化陶瓷文创设计，覆盖概念草图、实体陶瓷器皿、配套包装与生肖创意字体全链路。工艺上提取动物特征塑形，施一层白釉入窑高温烧制成透明釉器物。", images: [30, 31, 32, 33, 34, 35] },
      { sub: "河南博物院青铜器", subEn: "Henan Museum · Bronze Ware", award: "🏆 中国好创意（第十六届）三等奖", desc: "以河南博物院馆藏青铜器为视觉核心，围绕鼎、尊、壶、剑等器物分类整理与图形再设计；提取器型轮廓、纹样与历史质感，以线描、浮雕感图形与深绿色调营造沉稳典雅，把文物元素转译为现代文创。", images: [36, 37] },
    ],
  },
  {
    no: "05", accent: "#ff6a5e",
    title: "广告 · 海报", en: "Advertising & Poster",
    cat: "广告 · 插画海报 / Advertising & Illustration",
    meta: ["2022", "全国大学生广告艺术大赛获奖系列"],
    cover: 39,
    lead: "第14届全国大学生广告艺术大赛获奖系列。本系列收录两组广告海报。",
    subWorks: [
      { sub: "爱华仕 OIWAS", subEn: "OIWAS Luggage Poster", award: "🏆 全国总评审一等奖 · 企业特别奖铜奖", desc: "围绕箱包「耐磨、抗压、大容量」与「5cm 扩展层、扩容 30%」卖点。一组用大体量动物压在行李箱上的夸张场景制造视觉反差，黑白影像突出材质对比；另一组以直尺与箱把手具象化加宽结构。", images: [39] },
      { sub: "纤茶 Xiancha", subEn: "BAZAAR × Xiancha", award: "🏆 上海市省赛全场大奖", desc: "为 BAZAAR 联名纤茶打造的国风插画海报系列。民国旗袍女子插画搭配玉米、杭白菊、桑叶区分产品，传统纹样边框烘托复古东方美学，融合「零卡轻负担」理念。", images: [40] },
    ],
  },
];

export const capabilities = [
  { no: "01", title: "品牌视觉系统", en: "Brand Identity", desc: "从标志、色彩、字体到辅助图形，搭建有记忆点的完整品牌视觉系统。" },
  { no: "02", title: "包装设计", en: "Packaging", desc: "中式糕点、海鲜、文创等品类包装，从概念草图到落地样机全链路。" },
  { no: "03", title: "广告创意", en: "Advertising", desc: "围绕核心卖点的系列海报与传播创意，多次斩获全国大学生广告艺术大赛奖项。" },
  { no: "04", title: "文创 / IP 设计", en: "Cultural & Creative", desc: "把传统文化转译成可陈列、可馈赠的现代文创产品，赋予老符号当代生命力。" },
  { no: "05", title: "整合视觉传播", en: "Integrated Communication", desc: "从调研分析、概念提炼到视觉转译与落地执行的完整设计方法。" },
  { no: "06", title: "AI 辅助设计", en: "AI-assisted Design", desc: "熟练运用 ChatGPT / Midjourney / 即梦 / Figma AI 等工具提效创作与提案。" },
];
