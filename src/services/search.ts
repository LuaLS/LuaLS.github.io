export type searchItem = {
  text: string;
  href: string;
};

/** Additional search terms that are added to the search */
export const searchTerms: searchItem[] = [
  { text: "Privacy", href: "/privacy/" },
  { text: "Home", href: "/" },
  { text: "Install", href: "/#install" },
  {
    text: "GitHub Repository",
    href: "https://github.com/LuaLS/LuaLS.github.io",
  },
  {
    text: "Sponsor ❤️",
    href: "https://github.com/LuaLS/lua-language-server/issues/484",
  },
  {
    text: "Report Issue",
    href: "https://github.com/LuaLS/LuaLS.github.io/issues/",
  },
  {
    text: "Contribute to Wiki",
    href: "https://github.com/LuaLS/LuaLS.github.io/blob/main/docs/CONTRIBUTING.md",
  },
];
