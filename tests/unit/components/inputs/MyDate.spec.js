import { mount } from "@vue/test-utils"
import MyDate from "@/components/inputs/MyDate.vue"

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
})

