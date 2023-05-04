import AmenitiesSection from "@/components/accordions/AmenitiesSection.vue";
import "@/assets/styles/styles.less"

export default {
  title: "Components/Accordions/AmenitiesSection",
  component: AmenitiesSection,
  argTypes: {
    amenities: {
      control: "array",
      description: "Different kind of amenities; E.g. washer, dryer, tea kettle",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { AmenitiesSection },
  setup() {
    return { args };
  },
  template: `
    <amenities-section v-bind="args">
      <template #title>
        Sample Amenities
      </template>
    </amenities-section>
  `,
});

const sampleAmenities = [
  {
    id: 1,
    title: "Washer",
    brand: "Whirlpool",
    model: "WFW6620HW",
    year: "2020",
  },
  {
    id: 2,
    title: "Dryer",
    brand: "LG",
    model: "DLEX3700W",
    year: "2021",
  },
];

export const Default = Template.bind({});
Default.args = {
  amenities: sampleAmenities,
};

