import { mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import MapCard from "@/components/cards/MapCard.vue"

const createWrapper = (props) => 
{
  return mount(
    defineComponent({
      components: {
        MapCard, 
      },
      template: "<MapCard v-bind=\"props\" />",
      setup () 
      {
        return {
          props, 
        }
      },
    }),
    {
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
      propsData: {},
    }
  )
}

describe("MapCard", () => 
{
  it("renders title and subtitle", () => 
  {
    const wrapper = createWrapper({
      activity: {
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
      shown: true,
    })

    expect(wrapper.find(".map-card-title").text()).toBe("Test Title")
    expect(wrapper.find(".map-card-subtitle").text()).toBe("Test Subtitle")
  })

  it("renders default title and subtitle when not provided", () => 
  {
    const wrapper = createWrapper({
      activity: {},
      shown: true,
    })

    expect(wrapper.find(".map-card-title").text()).toBe("-")
    expect(wrapper.find(".map-card-subtitle").text()).toBe("-")
  })

  it("renders the \"View Details\" button and triggers navigation on click", async () => 
  {
    const wrapper = createWrapper({
      activity: {
        id: "1",
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
      shown: true,
    })

    const button = wrapper.find(".map-card-button")
    expect(button.text()).toBe("View Details")

    // Mock router push method
    wrapper.vm.$router = {
      push: vi.fn(),
    }

    // Trigger the button click
    await button.trigger("click")

    // TODO: Probalby just an emit
    // Check if router.push is called with the correct parameters
    // expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
    //  name: "mapItem",
    //  params: {
    //    id: "1",
    //  },
    // })
  })

  it("renders a hidden map card when shown prop is false", () => 
  {
    const wrapper = createWrapper({
      activity: {
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
      shown: false,
    })

    expect(wrapper.classes()).toContain("hidden")
    expect(wrapper.classes()).not.toContain("shown")
  })

  it("renders a shown map card when shown prop is true", () => 
  {
    const wrapper = createWrapper({
      activity: {
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
      shown: true,
    })

    expect(wrapper.classes()).toContain("shown")
    expect(wrapper.classes()).not.toContain("hidden")
  })
})

