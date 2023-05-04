import TableOfContents from "@/components/common/TableOfContents.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/TableOfContents",
  component: TableOfContents,
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
  components: { TableOfContents },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <table-of-contents v-bind="args" />
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

