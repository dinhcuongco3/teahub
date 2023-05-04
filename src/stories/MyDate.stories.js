import MyDate from "@/components/inputs/MyDate.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Inputs/MyDate",
  component: MyDate,
  argTypes: {
    isDay: {
      control: {
        type: "boolean",
      },
    },
    isMonth: {
      control: {
        type: "boolean",
      },
    },
    isYear: {
      control: {
        type: "boolean",
      },
    },
    value: {
      control: {
        type: "text",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
  },
};

const Template = (args) => ({
  components: { MyDate },
  setup() {
    return { args };
  },
  template: '<my-date v-bind="args" />',
});

export const Default = Template.bind({});

export const DayInput = Template.bind({});
DayInput.args = {
  isDay: true,
};

export const MonthInput = Template.bind({});
MonthInput.args = {
  isMonth: true,
};

export const YearInput = Template.bind({});
YearInput.args = {
  isYear: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [
  () => ({
    template: `
      <div style="position: relative; height: 50px;">
        <story/>
      </div>
    `,
  }),
];

