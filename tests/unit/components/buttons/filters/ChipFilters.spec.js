import { mount } from "@vue/test-utils"
import {MAP_FILTERS} from "mocks/filters.js"
import ChipFilters from "@/components/buttons/filters/ChipFilters.vue"

const createWrapper = (props) => 
{
  return mount(
    ChipFilters,
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

describe("ChipFilters", () => 
{
  it("renders both Filters components", () => 
  {
    const wrapper = createWrapper({
      filters: MAP_FILTERS,
    })

    const filtersComponents = wrapper.findAllComponents({
      name: "Filters", 
    })
    expect(filtersComponents.length).toBe(2)
  })

  it("toggles filter state and emits updated-active event", async () => 
  {
    const FILTERS = {
      1: "foo",
      2: "bar",
    }
    const wrapper = createWrapper({
      filters: FILTERS,
    })
    const spy = vi.spyOn(wrapper.vm, "handleClick")

    // Find the first filter in the inactive filters component
    const initText = wrapper.findAllComponents({
      name:"MyButton",
    })[0].text()

    // Expect the first filter to be moved to the active filters component after clicked
    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    await myButtonComponent.trigger("click")
    expect(spy).toHaveBeenCalled()

    const nextText = wrapper.findAllComponents({
      name:"MyButton",
    })[1].text()
    expect(nextText).toBe(initText)

    // Expect the updated-active event to be emitted with the activated filter
    const emitted = wrapper.emitted("updated-active")
    expect(emitted).toBeTruthy()
    expect(emitted[1]).toEqual([
      [
        {
          active: true,
          id: 2,
          title: "bar",
        },
      ],
    ])

    // Toggle the filter back to inactive
    await wrapper.findAllComponents({
      name:"MyButton",
    })[1].trigger("click")

    // Expect the filter to be moved back to the inactive filters component
    const finalInactiveText = wrapper.findAllComponents({
      name:"MyButton",
    })[0].text()
    expect(finalInactiveText).toBe(initText)
  })
})
