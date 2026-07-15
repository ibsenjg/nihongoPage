export const theme = {
  colors: {
    blue: "#0754b8",
    blueDark: "#043d86",
    red: "#BC002D",
    redDark: "#8D0022",
    yellow: "#ffcb5c",
    goldText: "#c47a00",
    ink: "#020a14",
    muted: "#5d6877",
    softBlue: "#f4f8ff",
    white: "#ffffff",
    border: "#dce6f5",
  },
  shadow: "0 22px 55px rgba(4, 44, 95, 0.13)",
  radius: "22px",
} as const;

export type AppTheme = typeof theme;
