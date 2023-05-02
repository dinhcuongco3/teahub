import { mount } from "@vue/test-utils"
import CleaningFilters from "@/components/buttons/filters/CleaningFilters.vue"

const createWrapper = (props) => 
{
  return mount(CleaningFilters, {
    props, 
  })
}

describe("CleaningFilters", () => 
{
  it("renders both Filters components", () => 
  {
    const wrapper = createWrapper()

    const filtersComponents = wrapper.findAllComponents({
      name: "Filters", 
    })
    expect(filtersComponents.length).toBe(2)
  })

  it("toggles filter state and emits updated-active event", async () => 
  {
    const wrapper = createWrapper()

    // Find the first filter in the inactive filters component
    const inactiveFilter = wrapper.findComponent({
      name: "Filters", 
    }).find("button")
    await inactiveFilter.trigger("click")

    // Expect the first filter to be moved to the active filters component
    const activeFiltersComponent = wrapper.findAllComponents({
      name: "Filters", 
    })[1]
    const activeFilter = activeFiltersComponent.find("button")
    expect(activeFilter.text()).toBe(inactiveFilter.text())

    // Expect the updated-active event to be emitted with the activated filter
    const emitted = wrapper.emitted("updated-active")
    expect(emitted).toBeTruthy()
    expect(emitted[0]).toEqual([
      [
        {
          active: true,
          id: 0,
          title: emitted[0][0].title, 
        },
      ],
    ])

    // Toggle the filter back to inactive
    await activeFilter.trigger("click")

    // Expect the filter to be moved back to the inactive filters component
    const inactiveFiltersComponent = wrapper.findComponent({
      name: "Filters", 
    })
    expect(inactiveFiltersComponent.find("button").text()).toBe(inactiveFilter.text())
  })
})
