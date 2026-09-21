import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Translation; dir: "ltr" | "rtl" };

const defaultCtx: Ctx = {
  lang: "en",
  setLang: () => {},
  t: translations.en as unknown as Translation,
  dir: "ltr",
};

const LangCtx = createContext<Ctx>(defaultCtx);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = translations[lang] as unknown as Translation;
  const dir = translations[lang].dir as "ltr" | "rtl";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  return <LangCtx.Provider value={{ lang, setLang, t, dir }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  return ctx || defaultCtx;
}

export const WHATSAPP_URL = "https://wa.me/6393741504?text=I%20want%20to%20join%20Madrasa%20course";
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VaAeDDHAInPexC2Aji0l";
export const INSTAGRAM_URL =
  "https://www.instagram.com/madrasaegulamaanemustafa?stkn=MWQyZDcxZWlqYnFpOA==&utm_source=ig_contact_invite";
export const FACEBOOK_URL = "https://www.facebook.com/share/19Q4b5gukV/";
export const YOUTUBE_URL = "https://youtube.com/@madarsaegulaamanemustafa?si=ga6T97C9ZOGdcVhm";
