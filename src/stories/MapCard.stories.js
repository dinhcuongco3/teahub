import MapCard from "@/components/cards/MapCard.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Cards/MapCard",
  component: MapCard,
  argTypes: {
    activity: {
      control: "object",
    },
    shown: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { MapCard },
  setup() {
    return { args };
  },
  template: '<map-card v-bind="args" />',
});

const activityData = {
  id: "1",
  title: "Sample Activity",
  subtitle: "Sample Subtitle",
};

export const Default = Template.bind({});
Default.args = {
  activity: activityData,
  shown: true,
};

// Add more story variations if necessary

