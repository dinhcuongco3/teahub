import Copyright from "@/components/common/Copyright.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/Copyright",
  component: Copyright,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

const Template = (args) => ({
  components: { Copyright },
  setup() {
    return { args };
  },
  template: `
    <copyright v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {};

