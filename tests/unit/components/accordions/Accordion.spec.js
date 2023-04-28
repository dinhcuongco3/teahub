
import { mount } from "@vue/test-utils"
import Accordion from "@/components/accordions/Accordion.vue"

describe("Accordion.vue", () => 
{
  test("handleClick toggles selected state", async () => 
  {
    const wrapper = mount(Accordion, {
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
      slots: {
        title: "Accordion Title",
        content: "Accordion Content",
      },
    })

    const mainBar = wrapper.find(".main-bar")
    const contentSection = wrapper.find(".accordion-content-section")

    expect(contentSection.classes().includes("collapsed")).toBeTruthy()
    expect(contentSection.classes().includes("expanded")).toBeFalsy()

    await wrapper.find(".main-bar").trigger("click")
    expect(contentSection.classes().includes("expanded")).toBeTruthy()
    expect(contentSection.classes().includes("collapsed")).toBeFalsy()

    // Clicking the same accordion twice does not close it
    await wrapper.find(".main-bar").trigger("click")
    expect(contentSection.classes().includes("expanded")).toBeTruthy()
    expect(contentSection.classes().includes("collapsed")).toBeFalsy()
  })

  test("hasNested prop adds appropriate classes", async () => 
  {
    const wrapper = mount(
      Accordion,
      {
        global: {
          stubs: [
            "FontAwesomeIcon",
          ],
        },
        propsData: {
          hasNested: true, 
        },
        slots: {
          title: "Nested Accordion Title",
          content: "Nested Accordion Content",
        },
      }
    )

    const mainBar = wrapper.find(".main-bar")
    const titleSection = wrapper.find(".title-section")

    expect(mainBar.classes()).toContain("has-nested")
    expect(titleSection.classes()).toContain("bigger")
  })

  test("renders title and content slots correctly", async () => 
  {
    const wrapper = mount(
      Accordion,
      {
        global: {
          stubs: [
            "FontAwesomeIcon",
          ],
        },
        slots: {
          title: "Custom Title",
          content: "Custom Content",
        },
      }
    )

    expect(wrapper.text()).toContain("Custom Title")
    expect(wrapper.text()).toContain("Custom Content")
  })
})
