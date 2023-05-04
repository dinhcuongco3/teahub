import QuestionAccordion from "@/components/accordions/QuestionAccordion.vue";
import "@/assets/styles/styles.less"

export default {
  title: "Components/Accordions/QuestionAccordion",
  component: QuestionAccordion,
  argTypes: {},
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { QuestionAccordion },
  setup() {
    return { args };
  },
  template: `
    <question-accordion v-bind="args">
      <template #title>
        This is a sample question
      </template>
      <template #content>
        This is the content for the sample question
      </template>
    </question-accordion>
  `,
});

export const Default = Template.bind({});
Default.args = {};

