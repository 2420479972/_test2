import { createAppSlice } from "../../createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "zh-CN";

interface LocaleState {
  language: Language;
}

const initialState: LocaleState = {
  language: "zh-CN",
};

export const localeSlice = createAppSlice({
  name: "locale",
  initialState,
  reducers: (create) => ({
    setLanguage: create.reducer((state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    }),
  }),
  selectors: {
    selectLanguage: (locale) => locale.language,
    selectIsEn: (locale) => locale.language === "en",
  },
});

export const { setLanguage } = localeSlice.actions;
export const { selectLanguage, selectIsEn } = localeSlice.selectors;
