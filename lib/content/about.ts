export interface AboutContent {
  portraitUrl: string;
  portraitPublicId: string;
  bio: { id: string; en: string; zh: string };
  philosophy: { id: string; en: string; zh: string };
}

export const DEFAULT_ABOUT: AboutContent = {
  portraitUrl: "",
  portraitPublicId: "",
  bio: { id: "", en: "", zh: "" },
  philosophy: {
    id: "Saya percaya setiap wajah memiliki kecantikannya sendiri. Tugasku hanya membiarkannya bersinar.",
    en: "I believe every face has its own beauty. My job is just to let it shine.",
    zh: "我相信每张脸都有其独特的美。我的工作，只是让这份美绽放光芒。",
  },
};
