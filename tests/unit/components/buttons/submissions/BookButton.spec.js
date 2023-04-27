import { mount } from "@vue/test-utils"
import BookButton from "@/components/buttons/submissions/BookButton.vue"

describe("BookButton Component", () => 
{
  let wrapper
  beforeEach(() =>
  {
    // Instantiate the component
    wrapper = mount(
      BookButton,
      {
        global: {
          stubs: [
            "FontAwesomeIcon",
          ],
        },
        propsData: {},
      }
    )
  })

  it("renders in general", () => 
  {
    expect(wrapper.find("button.search-execute").exists()).toBeTruthy()
    expect(wrapper.find("span.execute-text").exists()).toBeTruthy()
  })

  it("renders a loading state", async () => 
  {
    expect(wrapper.find("span.execute-loading").exists()).toBeFalsy()
    wrapper.setProps({
      isLoading: true,
    })
    await wrapper.vm.$nextTick()

    const button = wrapper.find("span.execute-loading")
    expect(button.exists()).toBeTruthy()
    expect(wrapper.vm.bookingText).toEqual("Loading")
    expect(button.text()).toEqual("Loading")
  })

  it("renders back to normal after loading", async () => 
  {
    wrapper.setProps({
      isLoading: false,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("span.execute-loading").exists()).toBeFalsy()
    expect(wrapper.find("span.execute-clickable").exists()).toBeTruthy()

    const button = wrapper.find("span.execute-text")
    expect(button.exists()).toBeTruthy()
    expect(wrapper.vm.bookingText).toEqual("Book")
    expect(button.text()).toContain("Book")
  })

  it("renders the asking price", async () => 
  {
    wrapper.setProps({
      totalPrice: "444",
    })
    await wrapper.vm.$nextTick()

    const button = wrapper.find("span.execute-text")
    expect(button.exists()).toBeTruthy()
    expect(wrapper.vm.bookingText).toEqual("Book - $444")
    expect(button.text()).toEqual("Book - $444")
  })

  it("emits a click", async () => 
  {
    let button = wrapper.findComponent(BookButton)
    await button.trigger("click")
    expect(wrapper.emitted()["click"]).toBeTruthy()
  })
})
