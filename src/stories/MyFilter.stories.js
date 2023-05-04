import MyFilter from "@/components/buttons/filters/MyFilter.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Buttons/Filters/MyFilter",
  component: MyFilter,
  argTypes: {
    inactive: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { MyFilter },
  setup() {
    return { args };
  },
  template: `
    <my-filter v-bind="args">
      <template #default>Filter</template>
    </my-filter>
  `,
});

export const Default = Template.bind({});
Default.args = {
  inactive: false,
};

export const Inactive = Template.bind({});
Inactive.args = {
  inactive: true,
};

