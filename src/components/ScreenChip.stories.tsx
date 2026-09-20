import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenChip } from "./ScreenChip";

const meta = {
  title: "ReviewCheck/ScreenChip",
  component: ScreenChip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ScreenChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paywall: Story = {
  args: { filename: "05-paywall-annual.png", type: "paywall" },
};

export const Permissions: Story = {
  args: { filename: "04-permissions-location.png", type: "permissions" },
};

export const Main: Story = {
  args: { filename: "08-home-dashboard.png", type: "main" },
};
