import SideMenu from "@/components/menus/SideMenu.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Menus/SideMenu",
  component: SideMenu,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  argTypes: {
    contents: {
      control: "array",
      description: "All the content to be indexed",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { SideMenu },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <side-menu v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  contents: [
    { id: 1, href: "#section1", formatted: "Section 1" },
    { id: 2, href: "#section2", formatted: "Section 2" },
    { id: 3, href: "#section3", formatted: "Section 3" },
  ],
};

