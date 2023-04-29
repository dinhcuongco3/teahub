import { mount } from "@vue/test-utils"
import QuestionAccordion from "@/components/accordions/QuestionAccordion.vue"
import Accordion from "@/components/accordions/Accordion.vue"

const createWrapper = (slots) => 
{
  return mount(QuestionAccordion, {
    components: {
      Accordion,
    },
    slots,
    global: {
      stubs: [
        "FontAwesomeIcon",
      ],
    },

  })
}

describe("QuestionAccordion.vue", () => 
{
  test("renders title slot correctly", () => 
  {
    const wrapper = createWrapper({
      title: "Sample Title",
      content: "Sample Content",
    })
    expect(wrapper.text()).toContain("Sample Title")
  })

  test("renders content slot correctly", () => 
  {
    const wrapper = createWrapper({
      title: "Sample Title",
      content: "Sample Content",
    })
    expect(wrapper.text()).toContain("Sample Content")
  })

  test("has Accordion component", () => 
  {
    const wrapper = createWrapper({
      title: "Sample Title",
      content: "Sample Content",
    })
    expect(wrapper.findComponent(Accordion).exists()).toBe(true)
  })

  test("applies the \"accordion-section\" class to the Accordion component", () => 
  {
    const wrapper = createWrapper({
      title: "Sample Title",
      content: "Sample Content",
    })
    expect(wrapper.findComponent(Accordion).classes()).toContain("accordion-section")
  })

  test("passes the \"has-nested\" prop to the Accordion component", () => 
  {
    const wrapper = createWrapper({
      title: "Sample Title",
      content: "Sample Content",
    })
    expect(wrapper.findComponent(Accordion).props("hasNested")).toBe(true)
  })
})

