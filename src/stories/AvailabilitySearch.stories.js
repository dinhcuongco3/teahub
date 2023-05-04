import AvailabilitySearch from "@/components/forms/AvailabilitySearch.vue";
import "@/assets/styles/styles.less"

export default {
  title: "Components/Forms/AvailabilitySearch",
  component: AvailabilitySearch,
  argTypes: {},
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { AvailabilitySearch },
  setup() {
    return { args };
  },
  template: `
    <availability-search v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {};

