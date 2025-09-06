export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user?: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export enum BackgroundType {
  SOLID_COLOR = "SOLID_COLOR",
  LINEAR_GRADIENT = "LINEAR_GRADIENT",
  RADIAL_GRADIENT = "RADIAL_GRADIENT",
}

export enum CustomColors {
  ROYAL_BLUE = "#4169E1",
  CORAL = "#FF7F50",
  SUNSET_ORANGE = "#FF5E13",
  TURQUOISE = "#40E0D0",
  MAUVE = "#E0B0FF",
  GOLDEN_YELLOW = "#FFD700",
  TEAL = "#008080",
  LAVENDER = "#B57EDC",
  BLUSH_PINK = "#FFB6C1",
  EMERALD_GREEN = "#50C878",
}

export interface BackgroundInfo {
  type: BackgroundType
  primaryColor?: CustomColors
  secondaryColor?: CustomColors
  patternKey?: string
  gradientAngle?: number
}

export interface JournalTheme {
  displayName: string
  description: string
  key: string
}

export interface Journal {
  id: string
  title: string
  content: string
  date: string
  modifiedTimestamp: string
  theme: JournalTheme
  backgroundInfo: BackgroundInfo
}

export interface GenerateJournalRequest {
  userInput: string
  theme: JournalTheme
}
