import LoadingBar from "@/components/common/loading/LoadingBar.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/Loading/LoadingBar",
  component: LoadingBar,
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    tall: { control: "boolean" },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { LoadingBar },
  setup() {
    return { args };
  },
  template: '<loading-bar v-bind="args" />',
});

export const Small = Template.bind({});
Small.args = {
  size: "small",
  tall: false,
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  tall: false,
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  tall: false,
};

export const Tall = Template.bind({});
Tall.args = {
  size: "medium",
  tall: true,
};

