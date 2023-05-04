import Validatable from "@/components/common/Validatable.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/Validatable",
  component: Validatable,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  argTypes: {
    error: {
      control: "text",
      description: "Error message to display",
    },
    defaultSlotContent: {
      control: "text",
      description: "Content to be displayed in the default slot",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Validatable },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <validatable v-bind="args">
      {{ args.defaultSlotContent }}
    </validatable>
  `,
});

export const Default = Template.bind({});
Default.args = {
  error: "",
  defaultSlotContent: "Some content",
};

export const WithError = Template.bind({});
WithError.args = {
  error: "Error message",
  defaultSlotContent: "Some content",
};

