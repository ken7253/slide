import QRCode from "./QRCode.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof QRCode>;

const meta: Meta<typeof QRCode> = {
  component: QRCode,
};

export default meta;

export const Default: Story = {
  args: {
    text: "https://example.com/",
  },
};
