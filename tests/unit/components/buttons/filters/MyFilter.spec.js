import { mount } from "@vue/test-utils"
import MyFilter from "@/components/buttons/filters/MyFilter.vue"

const createWrapper = (props) => 
{
  return mount(MyFilter, {
    props,
    slots: {
      default: "Test Filter", 
    }, 
  })
}

describe("MyFilter", () => 
{
  it("renders MyButton component with the correct slot content", () => 
  {
    const wrapper = createWrapper()

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    expect(myButtonComponent.exists()).toBeTruthy()
    expect(myButtonComponent.text()).toBe("Test Filter")
  })

  it("renders as inactive when the inactive prop is true", () => 
  {
    const wrapper = createWrapper({
      inactive: true, 
    })

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    expect(myButtonComponent.props("inactive")).toBe(true)
    expect(myButtonComponent.props("active")).toBe(false)
  })

  it("renders as active when the inactive prop is false", () => 
  {
    const wrapper = createWrapper({
      inactive: false, 
    })

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    expect(myButtonComponent.props("inactive")).toBe(false)
    expect(myButtonComponent.props("active")).toBe(true)
  })
})
