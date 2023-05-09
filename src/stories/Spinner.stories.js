import Spinner from "@/components/common/loading/Spinner.vue"
import "@/assets/styles/styles.less"

export default {
  title: "Components/Common/Loading/Spinner",
  component: Spinner,
  tags: [
    "autodocs",
  ],
}

const Template = (args) => ({
  components: {
    Spinner, 
  },
  setup () 
  {
    return {
      args, 
    }
  },
  template: "<spinner v-bind=\"args\" />",
})

export const Default = Template.bind({})
Default.args = {}

