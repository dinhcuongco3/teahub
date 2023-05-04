import BookButton from "@/components/buttons/submissions/BookButton.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Buttons/Submissions/BookButton",
  component: BookButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    totalPrice: {
      control: "text",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { BookButton },
  setup() {
    return { args };
  },
  template: '<book-button v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isLoading: false,
  totalPrice: "",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  isLoading: false,
  totalPrice: "",
};

export const Loading = Template.bind({});
Loading.args = {
  disabled: false,
  isLoading: true,
  totalPrice: "",
};

export const WithPrice = Template.bind({});
WithPrice.args = {
  disabled: false,
  isLoading: false,
  totalPrice: "100",
};

