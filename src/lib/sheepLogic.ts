export interface SheepPersonality {
  type: string;
  title: string;
  description: string;
  catchphrase: string;
  color: string;
  secondaryColor: string;
  accessories: string[];
  emoji: string;
  // Optional rich AI fields
  strengths?: string[];
  hidden_trait?: string;
  eid_advice?: string;
  compatibility?: string;
}

const TRAIT_MAP: Record<string, SheepPersonality> = {
  "دحيح": {
    type: "خروف الدحيح",
    title: "الدحيح",
    description: "تحب التحليل والتفكير العميق... لكن فجأة تختفي وقت القهوة ☕",
    catchphrase: "المعرفة نور... والنوم ضرورة",
    color: "#6C63FF",
    secondaryColor: "#A5A0FF",
    accessories: ["glasses", "book"],
    emoji: "🧠",
  },
  "عنيد": {
    type: "خروف العنيد",
    title: "العنيد",
    description: "ما يغيّر رأيه حتى لو الدنيا انقلبت... إرادة حديدية 💪",
    catchphrase: "أنا على حق... دائماً",
    color: "#E74C3C",
    secondaryColor: "#FF7675",
    accessories: ["headband", "medal"],
    emoji: "😤",
  },
  "راعي نوم": {
    type: "خروف النوم",
    title: "النعسان",
    description: "يحب النوم أكثر من أي شيء... حتى العيدية ما تقاوم النعاس 😴",
    catchphrase: "خمس دقايق بس...",
    color: "#74B9FF",
    secondaryColor: "#A3D8FF",
    accessories: ["sleepMask", "pillow"],
    emoji: "😴",
  },
  "فزعة": {
    type: "خروف الفزعة",
    title: "الفزّاع",
    description: "أول واحد يجي وقت الحاجة... قلبه أبيض وروحه حلوة 🤝",
    catchphrase: "قول بس وأنا جاي!",
    color: "#00B894",
    secondaryColor: "#55EFC4",
    accessories: ["cape", "star"],
    emoji: "🦸",
  },
  "قيادي": {
    type: "خروف القائد",
    title: "القائد",
    description: "يقود القطيع بثقة... وأحياناً يضيع بس ما يعترف 😎",
    catchphrase: "اتبعوني... أعرف الطريق (أظن)",
    color: "#FDCB6E",
    secondaryColor: "#FFEAA7",
    accessories: ["crown", "tie"],
    emoji: "👑",
  },
  "هادي": {
    type: "خروف الهدوء",
    title: "الهادي",
    description: "هادي وساكت... بس يفاجئك بردود أفعال غير متوقعة 🧘",
    catchphrase: "السكوت حكمة... والأكل متعة",
    color: "#A29BFE",
    secondaryColor: "#DFE6E9",
    accessories: ["flower", "teacup"],
    emoji: "🧘",
  },
  "اجتماعي": {
    type: "خروف السوشيال",
    title: "الاجتماعي",
    description: "يعرف الكل والكل يعرفه... أسطورة التجمعات 🎉",
    catchphrase: "وين الحفلة؟!",
    color: "#E17055",
    secondaryColor: "#FAB1A0",
    accessories: ["headphones", "phone"],
    emoji: "🎉",
  },
  "رايق": {
    type: "خروف الرايق",
    title: "الرايق",
    description: "ماشي حاله بالبركة... لا يستعجل ولا ينفعل 🌴",
    catchphrase: "كل شي بوقته حلو",
    color: "#00CEC9",
    secondaryColor: "#81ECEC",
    accessories: ["sunglasses", "drink"],
    emoji: "😎",
  },
};

const COMBO_MAP: Record<string, SheepPersonality> = {
  "دحيح+رايق": {
    type: "الخروف الفيلسوف",
    title: "الفيلسوف",
    description: "يفكر بعمق الكون وهو ماسك كوب شاي... فيلسوف بالفطرة 🤔",
    catchphrase: "الحياة قصيرة... بس الشاي لازم يكون حار",
    color: "#6C5CE7",
    secondaryColor: "#A29BFE",
    accessories: ["glasses", "teacup", "book"],
    emoji: "🤔",
  },
  "قيادي+اجتماعي": {
    type: "خروف القائد الاجتماعي",
    title: "القائد الكاريزمي",
    description: "يقود ويحفّز ويحمّس الكل... CEO القطيع 💼",
    catchphrase: "يلّا يا شباب... ورايا!",
    color: "#FDCB6E",
    secondaryColor: "#FAB1A0",
    accessories: ["crown", "phone", "tie"],
    emoji: "🏆",
  },
  "عنيد+قيادي": {
    type: "خروف الجنرال",
    title: "الجنرال",
    description: "ما ينثني ولا ينحني... قائد بالفطرة والعناد 🎖️",
    catchphrase: "القرار قرار... ولا أحد يناقش",
    color: "#D63031",
    secondaryColor: "#FDCB6E",
    accessories: ["medal", "crown", "headband"],
    emoji: "🎖️",
  },
  "هادي+راعي نوم": {
    type: "خروف الزن",
    title: "معلّم الزن",
    description: "وصل لمرحلة السلام الداخلي... أو بس نايم مو واضح 🧘‍♂️",
    catchphrase: "أووووم... أقصد... باااا",
    color: "#A29BFE",
    secondaryColor: "#74B9FF",
    accessories: ["flower", "sleepMask"],
    emoji: "🧘‍♂️",
  },
  "فزعة+اجتماعي": {
    type: "خروف البطل الشعبي",
    title: "البطل الشعبي",
    description: "محبوب الجماهير والفزعة الأولى... نجم كل تجمع 🌟",
    catchphrase: "حاضرين يا أهل الخير!",
    color: "#00B894",
    secondaryColor: "#FAB1A0",
    accessories: ["cape", "phone", "star"],
    emoji: "🌟",
  },
  "دحيح+عنيد": {
    type: "خروف العالِم المجنون",
    title: "العالِم المجنون",
    description: "ذكي ومصمم على رأيه... خطير على الكون 🔬",
    catchphrase: "حساباتي صحيحة... ثقوا فيني",
    color: "#6C63FF",
    secondaryColor: "#FF7675",
    accessories: ["glasses", "medal", "book"],
    emoji: "🔬",
  },
};

export function getSheepPersonality(name: string, traits: string[]): SheepPersonality {
  // Check combos first
  if (traits.length >= 2) {
    for (const [key, value] of Object.entries(COMBO_MAP)) {
      const comboTraits = key.split("+");
      if (comboTraits.every((t) => traits.includes(t))) {
        return { ...value, type: `خروف ${name} - ${value.title}` };
      }
    }
  }

  // Single trait
  const primary = traits[0];
  const base = TRAIT_MAP[primary] || TRAIT_MAP["رايق"];
  return { ...base, type: `خروف ${name} - ${base.title}` };
}

export const ALL_TRAITS = Object.keys(TRAIT_MAP);
