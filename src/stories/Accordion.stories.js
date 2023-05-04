import Accordion from "@/components/accordions/Accordion.vue";
import "@/assets/styles/styles.less"

export default {
  title: "Components/Accordions/Accordion",
  component: Accordion,
  argTypes: {
    hasNested: {
      control: { type: "boolean" },
      description: "Whether the accordion has a nested accordion inside",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { Accordion },
  setup() {
    return { args };
  },
  template: `
    <accordion v-bind="args">
      <template #title>
        This is a sample title
      </template>
      <template #content>
        This is the content for the sample accordion
      </template>
    </accordion>
  `,
});

export const Default = Template.bind({});
Default.args = {
  hasNested: false,
};

export const WithNested = Template.bind({});
WithNested.args = {
  hasNested: true,
};

