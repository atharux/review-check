import type { Meta, StoryObj } from "@storybook/react-vite";
import { FindingCard } from "./FindingCard";
import { RULES } from "../data";

const meta = {
  title: "ReviewCheck/FindingCard",
  component: FindingCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof FindingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmedBlocker: Story = {
  args: { rule: RULES[0], confirmed: true },
};

export const UnconfirmedLikely: Story = {
  args: {
    rule: RULES.find((r) => r.id === "web-wrapper")!,
    confirmed: false,
    gateQuestion: "Is the app's core functionality a wrapped website rather than native screens?",
  },
};

export const Watch: Story = {
  args: { rule: RULES.find((r) => r.id === "permission-priming")!, confirmed: true },
};
