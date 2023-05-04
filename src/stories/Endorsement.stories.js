import Endorsement from "@/components/anchors/endorsements/Endorsement.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Anchors/Endorsements/Endorsement",
  component: Endorsement,
  tags: ["autodocs"],
  argTypes: {
    fullname: {
      control: "text",
      description: "Full name of the person",
    },
    href: {
      control: "text",
      description: "Relative link to visit and learn about the person",
    },
    position: {
      control: "text",
      description: "Title or position for the person (if applicable)",
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Endorsement },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `
    <endorsement v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  fullname: "John Doe",
  href: "https://www.example.com",
  position: "CEO",
};

export const NoPosition = Template.bind({});
NoPosition.args = {
  fullname: "Jane Smith",
  href: "https://www.example.com",
};

export const NoHref = Template.bind({});
NoHref.args = {
  fullname: "James Brown",
  position: "CTO",
};

