import { siteConfig } from "./site"; 

// Function to get the language setting and store translations
const getLanguageWords = (): Record<string, string> => {
  let lang = localStorage.getItem("lang");

  // If lang is undefined or not in the allowed list, default to "en"
  if (!lang || !["uz", "en", "ko", "ru"].includes(lang)) {
    lang = "en";
    localStorage.setItem("lang", lang); // Store the default value
  }

  // Get the translations for the selected language
  return siteConfig[lang as keyof typeof siteConfig] || siteConfig.en;
};

// Use this `words` object in your components
export const words = getLanguageWords();
