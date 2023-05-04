import AvailabilitySearchBar from "@/components/inputs/AvailabilitySearchBar.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Inputs/AvailabilitySearchBar",
  component: AvailabilitySearchBar,
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
    start: {
      control: "text",
      description: "Selected start date for the calendar",
    },
    end: {
      control: "text",
      description: "Selected end date for the calendar",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { AvailabilitySearchBar },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <availability-search-bar v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  start: "2023-05-10",
  end: "2023-05-20",
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  start: "2023-05-10",
  end: "2023-05-20",
};

