import { mount } from "@vue/test-utils"
import AmenitiesSection from "@/components/accordions/AmenitiesSection.vue"
import Accordion from "@/components/accordions/Accordion.vue"
import FlexTable from "@/components/common/FlexTable.vue"

const createWrapper = (propsData) => 
{
  return mount(AmenitiesSection, {
    propsData,
    components: {
      Accordion,
      FlexTable,
    },
    slots: {
      title: "Amenities",
    },
    global: {
      stubs: [
        "FontAwesomeIcon",
      ],
    },
  })
}

describe("AmenitiesSection.vue", () => 
{
  test("renders title slot correctly", () => 
  {
    const wrapper = createWrapper({
      amenities: [], 
    })
    expect(wrapper.text()).toContain("Amenities")
  })

  test("renders Accordion components for each amenity", () => 
  {
    const amenities = [
      {
        id: 1,
        title: "Washer", 
      },
      {
        id: 2,
        title: "Dryer", 
      },
    ]
    const wrapper = createWrapper({
      amenities, 
    })

    // Add one for the top level accordion
    expect(wrapper.findAllComponents(Accordion)).toHaveLength(amenities.length + 1)
  })

  test("formatTitle properly formats detail title", () => 
  {
    const wrapper = createWrapper({
      amenities: [], 
    })
    expect(wrapper.vm.formatTitle("test_title")).toBe("Test title")
  })

  test("getDetails returns correct details excluding predefined fields", () => 
  {
    const wrapper = createWrapper({
      amenities: [], 
    })
    const amenity = {
      id: 1,
      title: "Washer",
      year: 2020,
      model: "Model X",
      brand: "Brand Y",
      custom_field: "Custom Value",
    }
    expect(wrapper.vm.getDetails(amenity)).toEqual([
      "custom_field",
    ])
  })

  test("sortedAmenities returns empty array if no amenities provied", () => 
  {
    const amenities = null
    const wrapper = createWrapper({
      amenities, 
    })
    expect(wrapper.vm.sortedAmenities).toEqual([])
  })
	
  test("sortedAmenities sorts amenities even when title not found", async () => 
  {
    const amenities = [
      {
        id: 2,
      },
      {
        id: 1,
        title: "Dryer", 
      },
      {
        id: 3,
      },
    ]
    const wrapper = createWrapper({
      amenities, 
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.sortedAmenities).toEqual([
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 1,
        title: "Dryer", 
      },
    ])
  })
  test("sortedAmenities sorts amenities by title", async () => 
  {
    const amenities = [
      {
        id: 2,
        title: "Washer", 
      },
      {
        id: 1,
        title: "Dryer", 
      },
    ]
    const wrapper = createWrapper({
      amenities, 
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.sortedAmenities).toEqual([
      {
        id: 1,
        title: "Dryer", 
      },
      {
        id: 2,
        title: "Washer", 
      },
    ])
  })
})

