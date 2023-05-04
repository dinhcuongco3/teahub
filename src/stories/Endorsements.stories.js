import Endorsements from "@/components/anchors/endorsements/Endorsements.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Anchors/Endorsements",
  component: Endorsements,
  tags: ["autodocs"],
  argTypes: {
    endorsers: {
      control: "array",
      description: "List of endorsers",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Endorsements },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <endorsements v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  endorsers: [
    {
      id: 1,
      endorsementType: 1,
      fullname: "John Doe",
    },
    {
      id: 2,
      endorsementType: 2,
      fullname: "Jane Smith",
      position: "CEO",
      href: "https://www.example.com",
    },
    {
      id: 3,
      endorsementType: 2,
      fullname: "James Brown",
      position: "CTO",
      href: "https://www.example.com",
    },
  ],
};

