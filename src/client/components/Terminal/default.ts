import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { FontWeight, LogLevel, RendererType } from "xterm";

// Resembles "addons" in ITermProps from rosie.d.ts
export const def_addons = {
  fit: new FitAddon(),
  search: new SearchAddon(),
};

const def_theme = {
  foreground: "#fff",
  background: "#000",
  cursor: "rgba(248,28,229,0.8)",
  cursorAccent: "#000",
  selection: "rgba(248,28,229,0.3)",
  black: "#000000",
  red: "#C51E14",
  green: "#1DC121",
  yellow: "#C7C329",
  blue: "#0A2FC4",
  magenta: "#C839C5",
  cyan: "#20C5C6",
  white: "#C7C7C7",
  brightBlack: "#686868",
  brightRed: "#FD6F6B",
  brightGreen: "#67F86F",
  brightYellow: "#FFFA72",
  brightBlue: "#6A76FB",
  brightMagenta: "#FD7CFC",
  brightCyan: "#68FDFE",
  brightWhite: "#FFFFFF",
};

// Resembles ITerminalOptions, intended to fill in "options" in ITermProps in rosie.d.ts
export const def_options = {
  theme: def_theme,
  scrollback: 1000,
  fontSize: 12,
  fontFamily:
    'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
  fontWeight: "normal" as FontWeight,
  fontWeightBold: "bold" as FontWeight,
  lineHeight: 1,
  letterSpacing: 0,
  cursorStyle: "bar" as "block" | "underline" | "bar",
  cursorBlink: true,
};
