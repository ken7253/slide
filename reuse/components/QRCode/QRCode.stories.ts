import QRCode from "./QRCode.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof QRCode>;

const meta: Meta<typeof QRCode> = {
  component: QRCode,
};

export default meta;

export const Default: Story = {
  args: {
    text: "https://example.com?foo=1&bar=buzz",
  },
};

export const PassThroughParams: Story = {
  args: {
    text: "https://example.com?foo=1&bar=buzz",
    removeParams: false,
  },
};

export const LongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};