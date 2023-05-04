import DateSelector from "@/components/inputs/DateSelector.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Inputs/DateSelector",
  component: DateSelector,
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
    maxDate: {
      control: "date",
      description: "The maximum date allowed for the input",
    },
    minDate: {
      control: "date",
      description: "The minimum date allowed for the input",
    },
    value: {
      control: "date",
      description: "The value of the date input",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { DateSelector },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <date-selector v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
  maxDate: "2023-12-31",
  minDate: "2023-01-01",
  value: "2023-05-04",
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  maxDate: "2023-12-31",
  minDate: "2023-01-01",
  value: "2023-05-04",
};

