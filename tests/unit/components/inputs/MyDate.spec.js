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
    await inputYear.setValue("2023")
    expect(wrapperYear.emitted().newValue).toBeTruthy()
    expect(wrapperYear.emitted().newValue[0]).toEqual([
      "2023",
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
    await inputYear.setValue("2022")
    expect(wrapperYear.emitted().newValue).toBeTruthy()
    expect(wrapperYear.emitted().newValue[0]).toEqual([
      "",
    ])
  })

  // Test for maxlength computed property
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

  // Test for focused watch
  it("emits \"focus\" event and sets focus on the input when focused prop changes to true", async () => 
  {
    const wrapper = mount(MyDate, {
      props: props, 
    })
    const input = wrapper.find("input")

    // Mock focus method to track when it is called
    input.element.focus = vi.fn()

    await wrapper.setProps({
      focused: true, 
    })

    // Check if focus event is emitted
    expect(wrapper.emitted().focus).toBeTruthy()

    // Check if input element's focus method is called
    expect(input.element.focus).toHaveBeenCalled()
  })

  it("Days: Updates localValue when value prop changes", async () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
      },
    })
    // Start off false
    expect(wrapper.vm.isValid).toBe(false)

    // Remains false
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "15", 
    })
    await wrapper.vm.$nextTick()

    // Check if localValue is updated
    expect(wrapper.vm.localValue).toBe("15")
    expect(wrapper.vm.isValid).toBe(true)
  })

  it("Days: Sets validity", async () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isDay: true, 
        value: "", 
      },
    })
    await wrapper.setProps({
      value: "15", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({
      value: "32", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "aa", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)
  })

  it("Months: Sets validity", async () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isMonth: true, 
        value: "", 
      },
    })
    await wrapper.setProps({
      value: "15", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "32", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "02", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({
      value: "12", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({
      value: "aa", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)
  })

  it("Years: Sets validity", async () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
        isYear: true, 
        value: "", 
      },
    })
    await wrapper.setProps({
      value: "15", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "32", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "02", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "2022", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "2023", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({
      value: "3023", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({
      value: "12", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "aa", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({
      value: "", 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isValid).toBe(false)
  })

  test("isNumber allows only valid numeric input", () => 
  {
    const wrapper = mount(
      MyDate,
      {
        props: {
          ...props,
          isDay: true, 
        },
      }
    )
    const input = wrapper.find("[placeholder=\"dd\"]")
    expect(input.exists()).toBeTruthy()

    // Allowed key codes: numbers 0-9
    for (let i = 48; i <= 57; i++) 
    {
      const event = new KeyboardEvent("keypress", {
        which: i,
        keyCode: i, 
      })
      let isNumber = wrapper.vm.isNumber(event)
      expect(isNumber).toBe(true)
    }

    // Disallowed key codes: letters A-Z, a-z, and other symbols
    for (let i = 32; i <= 126; i++) 
    {
      if ((i < 48 || i > 57) && i !== 46) 
      {
        const event = new KeyboardEvent("keypress", {
          which: i,
          keyCode: i, 
        })
        let isNumber = wrapper.vm.isNumber(event)
        expect(isNumber).toBe(false)
      }
    }
  })
  it("is not valid unless type is specified", async () => 
  {
    const wrapper = mount(MyDate, {
      props: {
        ...props,
      }, 
    })

    await wrapper.setProps({
      value: "15", 
    })
    await wrapper.vm.$nextTick()

    // Check if localValue is updated
    expect(wrapper.vm.localValue).toBe("15")
    expect(wrapper.vm.isValid).toBe(false)
  })
})
