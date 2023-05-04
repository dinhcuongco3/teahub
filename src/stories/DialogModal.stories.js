import DialogModal from "@/components/modals/DialogModal.vue";
import "@/assets/styles/styles.less";

export default {
  title: "Components/Modals/DialogModal",
  component: DialogModal,
  argTypes: {
    backgroundColor: { control: "color" },
    bodyColor: { control: "color" },
    buttonColor: { control: "color" },
    closeButtonLabel: { control: "text" },
    footerColor: { control: "color" },
    headerColor: { control: "color" },
    visible: { control: "boolean" },
  },
  tags: ["autodocs"],
};

const Template = (args) => ({
  components: { DialogModal },
  setup() {
    return { args };
  },
  template: `
    <dialog-modal v-bind="args">
      <template #title>
        Sample Title
      </template>
      <template #body>
        This is a sample dialog modal content.
      </template>
    </dialog-modal>
  `,
});

export const Default = Template.bind({});
Default.args = {
  backgroundColor: "#FFFFFF",
  bodyColor: "#FFFFFF",
  buttonColor: "#FFFFFF",
  closeButtonLabel: "Close",
  footerColor: "#2196F3",
  headerColor: "#2196F3",
  visible: true,
};

// Add more story variations if necessary

