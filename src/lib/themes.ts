export type ThemeType =
  | "default" 
  | "naruto" 
  | "bleach" 
  | "onePiece" 
  | "jjk" 
  | "soloLeveling" 
  | "demonSlayer" 
  | "dragonBall";

export type LoadingVariant = "default" | "chakra" | "bankai" | "gear" | "domain" | "hunter" | "dragon" | "slice";

interface ThemeConfig {
  name: string
  className: string
  cardAnimation: string
  chapterListStyle: string
  loadingVariant: LoadingVariant
  accent: {
    primary: string
    secondary: string
    text: string
  }
}

export const themes: Record<ThemeType, ThemeConfig> = {
  default: {
    name: "Default",
    className: "theme-default",
    cardAnimation: "hover:scale-105 transition-transform",
    chapterListStyle: "default-chapters",
    loadingVariant: "default",
    accent: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      text: "hsl(var(--primary-foreground))"
    }
  },
  naruto: {
    name: "Naruto",
    className: "theme-naruto",
    cardAnimation: "hover:animate-chakra-pulse",
    chapterListStyle: "scroll-naruto",
    loadingVariant: "chakra",
    accent: {
      primary: "#FF6B00",
      secondary: "#FFA500",
      text: "#000000"
    }
  },
  bleach: {
    name: "Bleach",
    className: "theme-bleach",
    cardAnimation: "hover:animate-zanpakuto",
    chapterListStyle: "scroll-bleach",
    loadingVariant: "bankai",
    accent: {
      primary: "#000000",
      secondary: "#FFFFFF",
      text: "#FFFFFF"
    }
  },
  onePiece: {
    name: "One Piece",
    className: "theme-one-piece",
    cardAnimation: "hover:animate-gear-bounce",
    chapterListStyle: "scroll-pirate",
    loadingVariant: "gear",
    accent: {
      primary: "#FF0000",
      secondary: "#FFD700",
      text: "#000000"
    }
  },
  jjk: {
    name: "Jujutsu Kaisen",
    className: "theme-jjk",
    cardAnimation: "hover:animate-curse-energy",
    chapterListStyle: "scroll-domain",
    loadingVariant: "domain",
    accent: {
      primary: "#4B0082",
      secondary: "#9370DB",
      text: "#FFFFFF"
    }
  },
  soloLeveling: {
    name: "Solo Leveling",
    className: "theme-solo-leveling",
    cardAnimation: "hover:animate-arise",
    chapterListStyle: "scroll-shadow",
    loadingVariant: "hunter",
    accent: {
      primary: "#800080",
      secondary: "#4B0082",
      text: "#FFFFFF"
    }
  },
  demonSlayer: {
    name: "Demon Slayer",
    className: "theme-demon-slayer",
    cardAnimation: "hover:animate-breath",
    chapterListStyle: "scroll-nichirin",
    loadingVariant: "slice",
    accent: {
      primary: "#FF1493",
      secondary: "#4169E1",
      text: "#FFFFFF"
    }
  },
  dragonBall: {
    name: "Dragon Ball",
    className: "theme-dragon-ball",
    cardAnimation: "hover:animate-power-up",
    chapterListStyle: "scroll-saiyan",
    loadingVariant: "dragon",
    accent: {
      primary: "#FFA500",
      secondary: "#4169E1",
      text: "#000000"
    }
  }
}
