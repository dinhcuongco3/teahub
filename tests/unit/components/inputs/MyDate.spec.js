import { mount } from "@vue/test-utils"
import MyDate from "@/components/inputs/MyDate.vue"
import LoadingBar from "@/components/common/loading/LoadingBar.vue"

describe("MyDate.vue", () => 
{
  const props = {
    focused: false,
    isLoading: false,
    isDay: false,
    isMonth: false,
    isYear: false,
    value: "",
  }

  it("renders input with the correct placeholder and maxlength", () => 
  {
    const wrapperDay = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
      }, 
    })
    const inputDay = wrapperDay.find("input")
    expect(inputDay.attributes("placeholder")).toBe("dd")
    expect(inputDay.attributes("maxlength")).toBe("2")

    const wrapperMonth = mount(MyDate, {
      props: {
        ...props,
        isMonth: true, 
      }, 
    })
    const inputMonth = wrapperMonth.find("input")
    expect(inputMonth.attributes("placeholder")).toBe("mm")
    expect(inputMonth.attributes("maxlength")).toBe("2")

    const wrapperYear = mount(MyDate, {
      props: {
        ...props,
        isYear: true, 
      }, 
    })
    const inputYear = wrapperYear.find("input")
    expect(inputYear.attributes("placeholder")).toBe("yyyy")
    expect(inputYear.attributes("maxlength")).toBe("4")
  })

  it("emits a valid value when the input is valid", async () => 
  {
    const wrapperDay = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
      }, 
    })
    const inputDay = wrapperDay.find("input")
    await inputDay.setValue("15")
    expect(wrapperDay.emitted().newValue).toBeTruthy()
    expect(wrapperDay.emitted().newValue[0]).toEqual([
      "15",
    ])

    const wrapperMonth = mount(MyDate, {
      props: {
        ...props,
        isMonth: true, 
      }, 
    })
    const inputMonth = wrapperMonth.find("input")
    await inputMonth.setValue("07")
    expect(wrapperMonth.emitted().newValue).toBeTruthy()
    expect(wrapperMonth.emitted().newValue[0]).toEqual([
      "07",
    ])

    const wrapperYear = mount(MyDate, {
      props: {
        ...props,
        isYear: true, 
      }, 
    })
    const inputYear = wrapperYear.find("input")
    await inputYear.setValue("2022")
    expect(wrapperYear.emitted().newValue).toBeTruthy()
    expect(wrapperYear.emitted().newValue[0]).toEqual([
      "2022",
    ])
  })

  it("emits an empty string when the input is invalid", async () => 
  {
    const wrapperDay = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
      }, 
    })
    const inputDay = wrapperDay.find("input")
    await inputDay.setValue("32")
    expect(wrapperDay.emitted().newValue).toBeTruthy()
    expect(wrapperDay.emitted().newValue[0]).toEqual([
      "",
    ])

    const wrapperMonth = mount(MyDate, {
      props: {
        ...props,
        isMonth: true, 
      }, 
    })
    const inputMonth = wrapperMonth.find("input")
    await inputMonth.setValue("13")
    expect(wrapperMonth.emitted().newValue).toBeTruthy()
    expect(wrapperMonth.emitted().newValue[0]).toEqual([
      "",
    ])

    const wrapperYear = mount(MyDate, {
      props: {
        ...props,
        isYear: true, 
      }, 
    })
    const inputYear = wrapperYear.find("input")
    await inputYear.setValue("2024")
    expect(wrapperYear.emitted().newValue).toBeTruthy()
    expect(wrapperYear.emitted().newValue[0]).toEqual([
      "",
    ])
  })

  // Test for maxlength computed property (lines 59-60)
  it("returns maxlength 2 when placeholder is not \"yyyy\"", () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
      }, 
    })
    expect(wrapper.vm.maxlength).toBe(2)
  })

  // Test for isLoading prop (line 86)
  it("renders LoadingBar when isLoading is true", () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isLoading: true, 
      }, 
    })
    expect(wrapper.findComponent(LoadingBar).exists()).toBe(true)
  })

  // Test for focused watch (lines 112, 118-119)
  it("emits \"focus\" event and sets focus on the input when focused prop changes to true", async () => 
  {
    const wrapper = mount(MyDate, {
      props: props, 
    })
    const input = wrapper.find("input")

    // Mock focus method to track when it's called
    input.element.focus = vi.fn()

    // Set focused prop to true
    await wrapper.setProps({
      focused: true, 
    })

    // Check if focus event is emitted
    expect(wrapper.emitted().focus).toBeTruthy()

    // Check if input element's focus method is called
    expect(input.element.focus).toHaveBeenCalled()
  })

  // Test for value watch (lines 120-130)
  it("updates localValue when value prop changes", async () => 
  {
    const wrapper = mount(MyDate, {
      props: props, 
    })

    // Set value prop to '15'
    await wrapper.setProps({
      value: "15", 
    })

    // Check if localValue is updated
    expect(wrapper.vm.localValue).toBe("15")
  })
})

