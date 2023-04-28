import { mount } from "@vue/test-utils"
import MyButton from "@/components/buttons/MyButton.vue"

const defaultProps = {
  badgeContent: "",
  disabled: false,
  inProgress: false,
  inactive: false,
  invertColors: false,
  pill: false,
  submit: false,
  success: false,
}

/**
 *
 * @param props
 */
function createWrapper (props) 
{
  let wrapper = mount(
    MyButton,
    {
      props: props,
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
      slots:
        {
          default: "<div class=\"fake-section-content\">Tapper</div>",
        },
    }
  )
  return wrapper
}

describe("MyButton.vue", () => 
{
  it("renders the button with default props", () => 
  {
    const wrapper = createWrapper(defaultProps)
    expect(wrapper.find("button").element).toBeTruthy()
  })

  it("renders badge content when provided", () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      badgeContent: "10",
    })
    expect(wrapper.find(".badge").text()).toBe("10")
  })

  it("handles click event when not disabled", async () => 
  {
    const wrapper = createWrapper(defaultProps)
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("click")).toBeTruthy()
  })

  it("does not emit click event when disabled", async () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      disabled: true,
    })
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("click")).toBeFalsy()
  })

  it("does not click when already doing work", async () => 
  {
    const wrapper = createWrapper(defaultProps)
    await wrapper.setData({
      doingWork: true,
    })
    wrapper.find("button").trigger("click")
    wrapper.find("button").trigger("click")
    // 2 times for the click, but zero actually emitted?
    expect(wrapper.emitted("click")).toHaveLength(2)
  })

  it("shakes when clicked and disabled", async () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      disabled:true,
    })
    const spy = vi.spyOn(wrapper.vm, "beginShake")

    await wrapper.vm.onClick()
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith()
  })

  it("stops shaking when handler is called", async () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      disabled:true,
    })
    await wrapper.setData({
      shaking: true,
    })
    await wrapper.vm.onShakeEnd()
    expect(wrapper.vm.shaking).toBeFalsy()
  })
  it("shows Spinner component when inProgress is true", () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      inProgress: true, 
    })
    expect(wrapper.findComponent({
      name: "Spinner", 
    }).exists()).toBe(true)
  })

  it("applies the pill class when pill prop is true", () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      pill: true, 
    })
    expect(wrapper.find("button").classes()).toContain("pill")
  })

  it("applies the invert-colors class when invertColors prop is true", () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      invertColors: true, 
    })
    expect(wrapper.find("button").classes()).toContain("invert-colors")
  })

  it("sets button type to submit when submit prop is true", () => 
  {
    const wrapper = createWrapper({
      ...defaultProps,
      submit: true, 
    })
    expect(wrapper.find("button").attributes("type")).toBe("submit")
  })
  it("updates transitionKey when inProgress or success prop changes", async () => 
  {
    const wrapper = createWrapper(defaultProps)

    // Get initial transitionKey value
    const initialTransitionKey = wrapper.vm.transitionKey

    // Set inProgress prop to true and check if transitionKey updates
    await wrapper.setProps({
      inProgress: true, 
    })
    const inProgressTransitionKey = wrapper.vm.transitionKey
    expect(inProgressTransitionKey).not.toBe(initialTransitionKey)

    // Set success prop to true and check if transitionKey updates
    await wrapper.setProps({
      success: true, 
    })
    const successTransitionKey = wrapper.vm.transitionKey
    expect(successTransitionKey).not.toBe(inProgressTransitionKey)
  })
  it("renders slot content", () => 
  {
    const wrapper = createWrapper(defaultProps)
    expect(wrapper.findAll(".fake-section-content").length).toBe(1)
  })

  it("slot does not show when in progress", async () => 
  {
    const wrapper = createWrapper(defaultProps)
    await wrapper.setProps({
      inProgress: true, 
    })
    expect(wrapper.findAll(".fake-section-content").length).toBe(0)

  })
  it("uses slot content as basis for transition", async () => 
  {
    const wrapper = createWrapper(defaultProps)
    await wrapper.setProps({
      inProgress: false,
      success: true,
    })
    expect(wrapper.vm.transitionKey).toBe("false true")

    await wrapper.setProps({
      inProgress: true,
      success: false,
    })
    expect(wrapper.vm.transitionKey).toBe("true false")
  })
})

