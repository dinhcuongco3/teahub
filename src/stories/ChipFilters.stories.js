import ChipFilters from "@/components/buttons/filters/ChipFilters.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Buttons/Filters/ChipFilters",
  component: ChipFilters,
  argTypes: {
    filters: {
      control: "object",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { ChipFilters },
  setup() {
    return { args };
  },
  template: `
    <chip-filters v-bind="args" @clicked-element="clickedElement" @updated-active="updatedActive" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  filters: {
    1: "Filter 1",
    2: "Filter 2",
    3: "Filter 3",
    4: "Filter 4",
  },
};

