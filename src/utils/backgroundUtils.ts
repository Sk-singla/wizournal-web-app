import type React from "react"
import { type BackgroundInfo, BackgroundType, CustomColors } from "../types"

export const generateBackgroundStyle = (backgroundInfo: BackgroundInfo): React.CSSProperties => {
  const { type, primaryColor, secondaryColor, gradientAngle } = backgroundInfo || {}

  // Helper to get hex value from enum
  const getColorHex = (color?: CustomColors) => {
    if (!color) return undefined
    // If color is a key, get value; if already hex, return as is
  return CustomColors[(color as unknown) as keyof typeof CustomColors] || color
  }

  switch (type) {
    case BackgroundType.SOLID_COLOR:
      return {
        background: getColorHex(primaryColor) || CustomColors.ROYAL_BLUE,
      }

    case BackgroundType.LINEAR_GRADIENT:
      const angle = gradientAngle || 45
      const primary = getColorHex(primaryColor) || CustomColors.ROYAL_BLUE
      const secondary = getColorHex(secondaryColor) || CustomColors.TURQUOISE
      return {
        background: `linear-gradient(${angle}deg, ${primary}, ${secondary})`,
      }

    case BackgroundType.RADIAL_GRADIENT:
      const primaryRadial = getColorHex(primaryColor) || CustomColors.ROYAL_BLUE
      const secondaryRadial = getColorHex(secondaryColor) || CustomColors.TURQUOISE
      return {
        background: `radial-gradient(circle, ${primaryRadial}, ${secondaryRadial})`,
      }

    default:
      return {
        background: CustomColors.ROYAL_BLUE,
      }
  }
}

export const getThemePresets = () => [
  {
    displayName: "Harry Potter",
    description: "Magical wizarding world adventure",
    key: "HarryPotter",
  },
  {
    displayName: "Fantasy Adventure",
    description: "Epic quests and mythical creatures",
    key: "FantasyAdventure",
  },
  {
    displayName: "Sci-Fi Saga",
    description: "Futuristic space adventures",
    key: "SciFiSaga",
  },
  {
    displayName: "Noir Mystery",
    description: "Dark and eerie suspense",
    key: "NoirMystery",
  },
  {
    displayName: "Everyday Life",
    description: "Real-world personal stories",
    key: "EverydayLife",
  },
]
