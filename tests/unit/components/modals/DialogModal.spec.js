import { mount } from "@vue/test-utils"
import DialogModal from "@/components/modals/DialogModal.vue"
import MyButton from "components/buttons/MyButton.vue"

const createWrapper = (props) => 
{
  return mount(
    DialogModal,
    {
      props,
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
    }
  )
}

describe("DialogModal", () => 
{
  it("renders dialog-modal and its contents when visible", () => 
  {
    const wrapper = createWrapper({
      visible: true, 
    })

    expect(wrapper.find(".dialog-modal").exists()).toBe(true)
    expect(wrapper.find(".dialog-content").exists()).toBe(true)
    expect(wrapper.find(".dialog-header").exists()).toBe(true)
    expect(wrapper.find(".dialog-body").exists()).toBe(true)
    expect(wrapper.find(".dialog-footer").exists()).toBe(true)
  })

  it("does not render dialog-modal when not visible", () => 
  {
    const wrapper = createWrapper({
      visible: false, 
    })

    expect(wrapper.find(".dialog-modal").exists()).toBe(false)
  })

  it("emits close event when close button is clicked", async () => 
  {
    const wrapper = createWrapper({
      visible: true, 
    })
    wrapper.findComponent(MyButton).trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted("close")).toHaveLength(1)
  })

  it("emits close event when the dialog-overlay is clicked", async () => 
  {
    const wrapper = createWrapper({
      visible: true, 
    })

    await wrapper.find(".dialog-overlay").trigger("click")
    expect(wrapper.emitted("close")).toHaveLength(1)
  })
})

