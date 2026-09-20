export type Severity = "blocker" | "likely" | "watch";

export type ScreenType =
  | "launch" | "onboarding" | "signup" | "signin" | "permissions"
  | "paywall" | "purchase" | "settings" | "chat" | "main" | "other";

export interface ContextQuestion {
  key: string;
  question: string;
}

export type ContextAnswer = "yes" | "no" | null;

export interface Rule {
  id: string;
  ref: string;
  title: string;
  trigger: string;
  looksFor: string;
  fix: string;
  severity: Severity;
  appliesTo: ScreenType[] | "*";
  gatedBy?: string;
}

export interface ExampleScreen {
  filename: string;
  type: ScreenType;
}

export interface Finding {
  rule: Rule;
  screen: ExampleScreen | null;
  confirmed: boolean;
  score: number;
}
