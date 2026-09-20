import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextRow } from "./ContextRow";
import type { ContextAnswer } from "../types";

const meta = {
  title: "ReviewCheck/ContextRow",
  component: ContextRow,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ContextRow>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive({ initial }: { initial: ContextAnswer }) {
  const [answer, setAnswer] = useState<ContextAnswer>(initial);
  return (
    <ContextRow
      question="Does the app sell anything: purchases, subscriptions, or unlocks?"
      answer={answer}
      onAnswer={setAnswer}
    />
  );
}

export const Unanswered: Story = {
  args: { question: "", answer: null, onAnswer: () => {} },
  render: () => <Interactive initial={null} />,
};

export const AnsweredYes: Story = {
  args: { question: "", answer: "yes", onAnswer: () => {} },
  render: () => <Interactive initial="yes" />,
};

export const AnsweredNo: Story = {
  args: { question: "", answer: "no", onAnswer: () => {} },
  render: () => <Interactive initial="no" />,
};
