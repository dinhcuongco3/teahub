import AppSection from "@/components/common/AppSection.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/AppSection",
  component: AppSection,
  tags: ["autodocs"],
  argTypes: {
    centered: {
      control: "boolean",
      description: "Whether justified center",
    },
    isCollapsed: {
      control: "boolean",
      description: "Whether the section is showing in a collapsed state or not",
    },
    isShowing: {
      control: "boolean",
      description: "Whether the section is showing at all or not",
    },
    styles: {
      control: "text",
      description: "String of styles to be applied to main wrapper",
    },
  },
};

const Template = (args) => ({
  components: { AppSection },
  setup() {
    return { args };
  },
  template: `
    <app-section v-bind="args">
      <p>This is the content inside the AppSection.</p>
    </app-section>
  `,
});

export const Default = Template.bind({});
Default.args = {
  centered: false,
  isCollapsed: false,
  isShowing: true,
  styles: "",
};

