import FlexTable from "@/components/common/FlexTable.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Common/FlexTable",
  component: FlexTable,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  argTypes: {
    category: {
      control: "text",
      description: "Content to be displayed in the category slot",
    },
    content: {
      control: "text",
      description: "Content to be displayed in the content slot",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { FlexTable },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <flex-table v-bind="args">
      <template #category>{{ args.category }}</template>
      <template #content>{{ args.content }}</template>
    </flex-table>
  `,
});

export const Default = Template.bind({});
Default.args = {
  category: "Category",
  content: "Content",
};

