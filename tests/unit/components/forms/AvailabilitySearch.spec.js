import { mount } from "@vue/test-utils"
import {DateTime} from "luxon"
import {Settings} from "luxon"
import AvailabilitySearch from "@/components/forms/AvailabilitySearch.vue"

/**
 * NOTE: vuecal dates in form of "2023-05-10T08:00:00.000Z"
 */

/**
 *
 */
function createWrapper () 
{
  let wrapper = mount(
    AvailabilitySearch,
    {
      global: {
        stubs: [
          "FontAwesomeIcon",
          "VueCal",
        ],
      },
    }
  )
  return wrapper
}

describe("AvailabilitySearch Component", () => 
{
  let wrapper
  beforeEach(() =>
  {
    // Preset the date for all tests
    let now = DateTime.local(2023, 4, 26)
    let rezoned = now.setZone("America/Los_Angeles").toMillis()
    Settings.now = () => rezoned
    Settings.defaultZoneName = "America/Los_Angeles"
    vi.setSystemTime(rezoned)

    wrapper = createWrapper()
  })
  it.concurrent("Renders in general", () => 
  {
    expect(wrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
    expect(wrapper.find("form.search-box").exists()).toBeTruthy()
    expect(wrapper.find("form.is-loading").exists()).toBeFalsy()
  })

  it.concurrent("Shows loading section", async () => 
  {
    wrapper.setData({
      isLoading: true, 
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
    expect(wrapper.find("form.search-box").exists()).toBeTruthy()
    expect(wrapper.find("form.is-loading").exists()).toBeTruthy()
  })

  it.concurrent("processBookingRequeset should not change state on success", async () => 
  {
    expect(wrapper.vm.isLoading).toBeFalsy()
    expect(wrapper.vm.hasError).toBeFalsy()
    await wrapper.vm.processBookingRequeset()
    expect(wrapper.vm.isLoading).toBeFalsy()
    expect(wrapper.vm.hasError).toBeFalsy()
  })

  it.concurrent("displays the AvailabilitySearchBar component", () => 
  {
    expect(wrapper.findComponent({
      name: "AvailabilitySearchBar", 
    }).exists()).toBe(true)
  })

  it.concurrent("displays the VueCal component", () => 
  {
    expect(wrapper.findComponent({
      name: "VueCal", 
    }).exists()).toBe(true)
  })

  it.concurrent("displays the BookButton component", () => 
  {
    expect(wrapper.findComponent({
      name: "BookButton", 
    }).exists()).toBe(true)
  })

  it.concurrent("displays the correct minDate", () => 
  {
    expect(wrapper.vm.minDate).toBe("2023-04-26")
  })

  it.concurrent("calculates the correct totalDays", async () => 
  {
    const startDate = "2023-05-01"
    const endDate = "2023-05-05"

    await wrapper.setData({
      selectedDates: [
        {
          start: startDate,
          end: endDate, 
        },
      ], 
    })

    expect(wrapper.vm.totalDays).toBe(5)
  })

  it.concurrent("calculates the correct totalPrice", async () => 
  {
    const startDate = "2023-05-01"
    const endDate = "2023-05-05"
    const dailyRate = 85
    const cleaningFee = 100
    const expectedTotalPrice = ((5 * dailyRate) + cleaningFee) + ""

    await wrapper.setData({
      selectedDates: [
        {
          start: startDate,
          end: endDate, 
        },
      ], 
    })

    expect(wrapper.vm.totalPrice).toBe(expectedTotalPrice)
  })

  it.concurrent("processes date selection correctly", () => 
  {
    let isolatedWrapper = createWrapper()
   
    const selectedDate = "2023-05-10T08:00:00.000Z"
    const expectedStartDate = "2023-05-10"

    expect(isolatedWrapper.vm.processDateSelection(selectedDate)).toBe(true)
    expect(isolatedWrapper.vm.selectedDates[0].start).toBe(expectedStartDate)
  })

  it.concurrent("informs if date is invalid", () => 
  {
    let isolatedWrapper = createWrapper()
    expect(wrapper.vm.minDate).toBe("2023-04-26")
   
    const selectedDate = "2023-05-10T08:00:00.000Z"
    const expectedStartDate = "2023-05-10"

    expect(isolatedWrapper.vm.processDateSelection(selectedDate)).toBe(true)
    expect(isolatedWrapper.vm.selectedDates[0].start).toBe(expectedStartDate)
  })

  it.concurrent("renders child components", () => 
  {
    const wrapper = createWrapper()

    const availabilitySearchBar = wrapper.findComponent({
      name: "AvailabilitySearchBar", 
    })
    expect(availabilitySearchBar.exists()).toBeTruthy()

    const bookButton = wrapper.findComponent({
      name: "BookButton", 
    })
    expect(bookButton.exists()).toBeTruthy()

    const vueCal = wrapper.findComponent({
      name: "VueCal", 
    })
    expect(vueCal.exists()).toBeTruthy()
  })

  it.concurrent("isBookingEnabled computed property returns expected value", async () => 
  {
    const wrapper = createWrapper()
    const selectedDates = wrapper.vm.selectedDates

    expect(wrapper.vm.isBookingEnabled).toBeFalsy()

    selectedDates[0].start = "2023-05-10"
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isBookingEnabled).toBeFalsy()

    selectedDates[0].end = "2023-05-15"
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isBookingEnabled).toBeTruthy()
  })

  it.concurrent("processBookingRequeset sets isLoading state correctly", async () => 
  {
    const wrapper = createWrapper()

    expect(wrapper.vm.isLoading).toBeFalsy()

    wrapper.vm.processBookingRequeset()
    expect(wrapper.vm.isLoading).toBeTruthy()

    // Wait for the handleAvailabilitySearch method to finish execution
    await new Promise((resolve) => setTimeout(resolve, 2500))

    expect(wrapper.vm.isLoading).toBeFalsy()
  })

  // TODO
  it.concurrent("Does error handling", () => 
  {
    const wrapper = createWrapper()
    let success = wrapper.vm.processDateSelection("2023-02-02")
    expect(success).toBe(false)
  })

  it.concurrent("does not allow date selections out of bounds", () => 
  {
    const wrapper = createWrapper()
    let success = wrapper.vm.processDateSelection("2023-02-02")
    expect(success).toBe(false)
  })

  it.concurrent("updates the start date when selected before", () => 
  {
    const wrapper = createWrapper()
    let success = wrapper.vm.processDateSelection("2023-05-02")
    expect(success).toBe(true)
    expect(wrapper.vm.selectedDates[0].start).toBe("2023-05-01")
  })

  it.concurrent("reclicking the start date clears current selection", () => 
  {
    const wrapper = createWrapper()
    wrapper.vm.processDateSelection("2023-05-02")
    wrapper.vm.processDateSelection("2023-05-02")
    expect(wrapper.vm.selectedDates[0].start).toBe("")
  })

  it.concurrent("clicking before the start date sets the start date", () => 
  {
    const wrapper = createWrapper()
    wrapper.vm.processDateSelection("2023-05-03T08:00:00.000Z")
    wrapper.vm.processDateSelection("2023-05-02T08:00:00.000Z")
    expect(wrapper.vm.selectedDates[0].start).toBe("2023-05-02")
    expect(wrapper.vm.selectedDates[0].end).toBe("2023-05-03")
  })

  it.concurrent("handles updateEndDate events", async () => 
  {
    const wrapper = createWrapper()
    const searchBar = wrapper.findComponent({
      name: "AvailabilitySearchBar",
    })
    await searchBar.vm.$emit("updateEndDate", "2023-05-02T08:00:00.000Z")
    expect(wrapper.vm.selectedDates[0].end).toBe("2023-05-02T08:00:00.000Z")
  })

  it.concurrent("handles updateStartDate events", async () => 
  {
    const wrapper = createWrapper()
    const searchBar = wrapper.findComponent({
      name: "AvailabilitySearchBar",
    })
    await searchBar.vm.$emit("updateStartDate", "2023-05-03T08:00:00.000Z")
    expect(wrapper.vm.selectedDates[0].start).toBe("2023-05-03T08:00:00.000Z")
  })

  it.concurrent("listens to vuecal events", async () => 
  {
    const wrapper = createWrapper()
    const searchBar = wrapper.findComponent({
      name: "VueCal",
    })
    await searchBar.vm.$emit("cell-click", "2023-05-03T08:00:00.000Z")
    expect(wrapper.vm.selectedDates[0].start).toBe("2023-05-03")
  })

  it.concurrent("listens to the BookButton events", async () => 
  {
    const wrapper = createWrapper()
    const spy1 = vi.spyOn(wrapper.vm, "handleAvailabilitySearch")
    const spy2 = vi.spyOn(wrapper.vm, "processBookingRequeset")

    // Disabled
    wrapper.findComponent({
      name: "BookButton", 
    }).trigger("click")
    expect(spy1).toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    // Enable button
    const searchBar = wrapper.findComponent({
      name: "AvailabilitySearchBar",
    })
    await searchBar.vm.$emit("updateStartDate", "2023-05-03T08:00:00.000Z")
    await searchBar.vm.$emit("updateEndDate", "2023-05-04T08:00:00.000Z")

    wrapper.findComponent({
      name: "BookButton", 
    }).trigger("click")
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  })
})
