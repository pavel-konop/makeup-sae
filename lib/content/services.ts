export interface ServiceContent {
  key: string;
  icon: string;
  waText: string;
  title: { id: string; en: string; zh: string };
  desc: { id: string; en: string; zh: string };
}

export const DEFAULT_SERVICES: ServiceContent[] = [
  {
    key: "weddings",
    icon: "Heart",
    waText: "Hi Mitaa! I'm interested in Weddings & Bridal makeup. Could you share more details?",
    title: { id: "Pernikahan & Pengantin", en: "Weddings & Bridal", zh: "婚礼与新娘妆" },
    desc: {
      id: "Tampilan abadi dan bercahaya yang terfoto indah. Dari sesi tunangan hingga hari pernikahan.",
      en: "Timeless, luminous looks that photograph beautifully. From engagement sessions to the big day itself.",
      zh: "永恒、明亮的妆容，在照片中美丽呈现。从订婚拍摄到婚礼当天，全程陪伴。",
    },
  },
  {
    key: "parties",
    icon: "Sparkles",
    waText: "Hi Mitaa! I'm interested in Parties & Birthdays makeup. Could you share more details?",
    title: { id: "Pesta & Ulang Tahun", en: "Parties & Birthdays", zh: "派对与生日" },
    desc: {
      id: "Tampilan glam yang membuatmu selalu siap di depan kamera sepanjang malam.",
      en: "Glam looks that keep you camera-ready all night. Bold, fun, and perfectly suited to the occasion.",
      zh: "璀璨夺目的妆容，让您在整晚都成为镜头焦点。大胆、精彩，完美契合场合。",
    },
  },
  {
    key: "photoshoots",
    icon: "Camera",
    waText: "Hi Mitaa! I'm interested in Photoshoots & Editorial makeup. Could you share more details?",
    title: { id: "Photoshoot & Editorial", en: "Photoshoots & Editorial", zh: "拍摄与时尚大片" },
    desc: {
      id: "Tampilan presisi yang dirancang untuk lensa — dari beauty natural hingga konsep editorial.",
      en: "Precision looks designed for the lens — from clean beauty to high-fashion editorial concepts.",
      zh: "专为镜头设计的精致妆容——从清透美颜到高级时装大片风格。",
    },
  },
  {
    key: "prom",
    icon: "GraduationCap",
    waText: "Hi Mitaa! I'm interested in Prom & Graduation makeup. Could you share more details?",
    title: { id: "Prom & Wisuda", en: "Prom & Graduation", zh: "毕业典礼" },
    desc: {
      id: "Momen spesialmu layak mendapat tampilan yang akan kamu sukai di setiap foto.",
      en: "Your milestone moment deserves a look you'll love in every photo. Fresh, polished, unforgettable.",
      zh: "人生里程碑的重要时刻，值得拥有一个在每张照片中都令您爱不释手的妆容。",
    },
  },
  {
    key: "everyday",
    icon: "Sun",
    waText: "Hi Mitaa! I'm interested in Everyday Glam makeup. Could you share more details?",
    title: { id: "Tampilan Sehari-hari", en: "Everyday Glam", zh: "日常妆容" },
    desc: {
      id: "Peningkatan halus untuk penggunaan sehari-hari atau kapan saja kamu ingin tampil memesona.",
      en: "Subtle enhancements for daily wear or any time you want to feel effortlessly polished.",
      zh: "细腻自然的日常妆，让您随时随地都能轻松散发精致魅力。",
    },
  },
];
