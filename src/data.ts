import type { ContextQuestion, ExampleScreen, Rule } from "./types";

// Starter rule set — 6 illustrative, widely-known App Store rejection reasons,
// written fresh for this open-source demo. NOT the production rule library:
// the paid audit (appreview.atharux.com) runs against 27+ rules built from
// real client rejections, each carrying a verified/stale field so nothing
// stale ships in a client report. This starter set exists to prove the
// engine — screen typing, context gating, honest severity ranking — works,
// not to replace the real thing.

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  { key: "accounts", question: "Does any part of the app require a user account?" },
  { key: "purchases", question: "Does the app sell anything — purchases, subscriptions, or unlocks?" },
  { key: "webWrapped", question: "Is the app's core functionality a wrapped website rather than native screens?" },
  { key: "permissions", question: "Does the app request device permissions (location, camera, contacts, etc.)?" },
];

export const RULES: Rule[] = [
  {
    id: "demo-account",
    ref: "Guideline 2.1 — App Completeness",
    title: "No working demo account for the reviewer",
    trigger: "The app is gated behind sign-in and there's nothing in the review notes to get past it.",
    looksFor: "Reviewers try the credentials in App Review notes exactly once. Expired, wrong, or missing credentials is one of the most common avoidable rejections.",
    fix: "Add a permanent demo account to the review notes and confirm it works the day you submit.",
    severity: "blocker",
    appliesTo: ["signin", "signup", "launch"],
    gatedBy: "accounts",
  },
  {
    id: "launch-crash",
    ref: "Guideline 2.1 — App Completeness",
    title: "Crash or hang on first launch",
    trigger: "Every submission is opened cold, on current hardware and the newest OS.",
    looksFor: "Launch crashes, indefinite spinners, or a blank screen with no error state.",
    fix: "Test a clean install on the latest public OS release right before submitting — not just an upgraded dev device.",
    severity: "blocker",
    appliesTo: ["launch"],
  },
  {
    id: "privacy-link",
    ref: "Guideline 5.1.1 — Data Collection and Storage",
    title: "Privacy policy link is missing or unreachable",
    trigger: "Checked on effectively every submission, not just ones that look privacy-sensitive.",
    looksFor: "A privacy policy URL that resolves publicly, with no login wall, and is actually about this app.",
    fix: "Open the link in a private window before submitting. A 404 or a page behind auth is an near-automatic rejection.",
    severity: "blocker",
    appliesTo: "*",
  },
  {
    id: "web-wrapper",
    ref: "Guideline 4.2 — Minimum Functionality",
    title: "App is a thin wrapper around a website",
    trigger: "Most or all of the app's screens are a webview pointed at an existing site.",
    looksFor: "Whether the app does anything a mobile browser bookmark couldn't already do — native navigation, offline behavior, platform integration.",
    fix: "Add genuinely native functionality, or ship it as a web app instead of an App Store submission.",
    severity: "likely",
    appliesTo: ["main"],
    gatedBy: "webWrapped",
  },
  {
    id: "external-purchase-link",
    ref: "Guideline 3.1.1 — In-App Purchase",
    title: "Digital purchase routed outside Apple's payment system",
    trigger: "The app sells digital content, subscriptions, or unlocks.",
    looksFor: "Any button or link that sends the user to a browser to pay for something usable inside the app.",
    fix: "Digital goods and unlocks go through StoreKit. External payment links are only allowed for a narrow, explicitly listed set of categories — check the current exceptions before assuming yours qualifies.",
    severity: "blocker",
    appliesTo: ["paywall", "purchase"],
    gatedBy: "purchases",
  },
  {
    id: "permission-priming",
    ref: "Guideline 5.1.2 — Data Use and Sharing",
    title: "Permission requested with no explanation first",
    trigger: "The app asks for location, camera, contacts, or similar before the user has a reason to expect it.",
    looksFor: "Whether the system permission prompt is the user's first hint of why it's needed, or whether the app primed them first.",
    fix: "Add a short in-app screen explaining the benefit immediately before the system prompt appears.",
    severity: "watch",
    appliesTo: ["permissions"],
    gatedBy: "permissions",
  },
];

// Synthetic example screenshots — filenames only, no real client material.
// Classification below is what the engine would infer from each filename.
export const EXAMPLE_SCREENS: ExampleScreen[] = [
  { filename: "01-launch-splash.png", type: "launch" },
  { filename: "02-onboarding-welcome.png", type: "onboarding" },
  { filename: "03-signup-email.png", type: "signup" },
  { filename: "04-permissions-location.png", type: "permissions" },
  { filename: "05-paywall-annual.png", type: "paywall" },
  { filename: "06-chat-thread.png", type: "chat" },
  { filename: "07-settings-account.png", type: "settings" },
  { filename: "08-home-dashboard.png", type: "main" },
];

// The keyword table the classifier actually runs — shown in "Under the
// Hood" so the mechanism isn't a black box.
export const CLASSIFIER_KEYWORDS: Record<string, string> = {
  launch: "splash, launch, loading",
  onboarding: "onboarding, welcome, intro",
  signup: "signup, register, create-account",
  signin: "signin, login, log-in",
  permissions: "permission, location, camera, contacts",
  paywall: "paywall, subscribe, upgrade, premium",
  purchase: "purchase, checkout, buy",
  chat: "chat, message, thread, dm",
  settings: "settings, account, profile",
  main: "home, dashboard, main, feed",
};
