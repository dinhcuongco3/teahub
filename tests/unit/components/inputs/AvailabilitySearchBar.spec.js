import { mount } from "@vue/test-utils"
import AvailabilitySearchBar from "@/components/inputs/AvailabilitySearchBar.vue"
import {DateTime} from "luxon"
import {Settings} from "luxon"

describe("AvailabilitySearchBar Component", () => 
{
  let wrapper
  beforeEach(() =>
  {
    // Instantiate the component
    wrapper = mount(
      AvailabilitySearchBar,
      {
        propsData: {},
      }
    )
    // Preset the date for all tests
    let now = DateTime.local(2023, 4, 26).toMillis()
    Settings.now = () => now
    Settings.defaultZoneName = "America/New_York"
  })

  it("renders in general", () => 
  {
    expect(wrapper.find("div.availability-search-bar-wrapper").exists()).toBeTruthy()
    expect(wrapper.find("div.date-container").exists()).toBeTruthy()
    expect(wrapper.find("[data-testid='date-selector-start-label']").exists()).toBeTruthy()
    expect(wrapper.find("[data-testid='date-selector-end-label']").exists()).toBeTruthy()
    expect(wrapper.find("[data-testid='date-selector-start']").exists()).toBeTruthy()
    expect(wrapper.find("[data-testid='date-selector-end']").exists()).toBeTruthy()
  })

  it("renders computed dates", () => 
  {
    expect(wrapper.vm.maxDate).toBeDefined()
    expect(wrapper.vm.minDateEnd).toBeDefined()
    expect(wrapper.vm.today).toBeDefined()

    expect(wrapper.vm.maxDate).toEqual("2024-10-26")
    expect(wrapper.vm.minDateEnd).toEqual("2023-04-26")
    expect(wrapper.vm.today).toEqual("2023-04-26")
  })

  it("renders a loading state", async () => 
  {
    await wrapper.setProps({
      isLoading: true,
    })
    expect(wrapper.find("div.availability-search-bar-wrapper").exists()).toBeTruthy()
    expect(wrapper.find("div.loading").exists()).toBeTruthy()
  })

  it("renders a start time selection", async () => 
  {
    const startDate = wrapper.find("[data-testid='date-selector-start'")
    const endDate = wrapper.find("[data-testid='date-selector-end'")
    expect(startDate.exists()).toBeTruthy()
    expect(endDate.exists()).toBeTruthy()

    await wrapper.setProps({
      end: "2023-12-11",
      start: "2023-11-11",
    })
    await wrapper.vm.$nextTick()
    expect(startDate.exists()).toBeTruthy()
    expect(endDate.exists()).toBeTruthy()
  })

  it("emits the appropriate events", async () => 
  {
    const testDate = "2023-05-01"

    await wrapper.vm.updateStartDate(testDate)
    await wrapper.vm.updateEndDate(testDate)

    expect(wrapper.emitted("updateStartDate")).toBeTruthy()
    expect(wrapper.emitted("updateEndDate")).toBeTruthy()
    expect(wrapper.emitted("updateStartDate")[0]).toEqual([
      testDate,
    ])
    expect(wrapper.emitted("updateEndDate")[0]).toEqual([
      testDate,
    ])
  })

  it("calls updateEndDate when the end date selector emits newDate", () => 
  {
    const endSpy = vi.spyOn(wrapper.vm, "updateEndDate")
    const startSpy = vi.spyOn(wrapper.vm, "updateStartDate")

    wrapper.vm.updateEndDate()
    expect(endSpy).toHaveBeenCalled()
    expect(endSpy).toHaveBeenCalledWith()

    wrapper.vm.updateStartDate()
    expect(startSpy).toHaveBeenCalled()
    expect(startSpy).toHaveBeenCalledWith()
  })
})
