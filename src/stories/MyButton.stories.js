import MyButton from "@/components/buttons/MyButton.vue";
import "@/assets/styles/styles.less"

export default {
  title: "Components/Buttons/MyButton",
  component: MyButton,
  argTypes: {
    active: { control: "boolean" },
    badgeContent: { control: "text" },
    disabled: { control: "boolean" },
    inProgress: { control: "boolean" },
    inactive: { control: "boolean" },
    invertColors: { control: "boolean" },
    pill: { control: "boolean" },
    submit: { control: "boolean" },
    success: { control: "boolean" },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<my-button v-bind="args"><template #default>My Button</template></my-button>',
});

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = { active: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const InProgress = Template.bind({});
InProgress.args = { inProgress: true };

export const Inactive = Template.bind({});
Inactive.args = { inactive: true };

export const InvertColors = Template.bind({});
InvertColors.args = { invertColors: true };

export const Pill = Template.bind({});
Pill.args = { pill: true };

export const Submit = Template.bind({});
Submit.args = { submit: true };

export const Success = Template.bind({});
Success.args = { success: true };

