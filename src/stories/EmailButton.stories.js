import EmailButton from "@/components/buttons/EmailButton.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Buttons/EmailButton",
  component: EmailButton,
  argTypes: {
    email: {
      control: "text",
    },
    inactive: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { EmailButton },
  setup() {
    return { args };
  },
  template: '<email-button v-bind="args">Send Email</email-button>',
});

export const Default = Template.bind({});
Default.args = {
  email: "foo@bar.com",
  inactive: false,
};

// Add more story variations if necessary

