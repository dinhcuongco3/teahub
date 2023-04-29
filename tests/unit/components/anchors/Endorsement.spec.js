import { mount } from "@vue/test-utils"
import Endorsement from "@/components/anchors/endorsements/Endorsement.vue"

const createWrapper = (props) => 
{
  return mount(Endorsement, {
    props,
  })
}

describe("Endorsement.vue", () => 
{
  test("renders formattedText correctly without position and href", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
    })
    expect(wrapper.text()).toContain("John Doe")
  })

  test("renders formattedText correctly with position", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
      position: "CEO",
    })
    expect(wrapper.text()).toContain("CEO - John Doe")
  })

  test("renders a link when href is provided", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
      href: "https://www.example.com",
    })
    const link = wrapper.find("a")
    expect(link.exists()).toBe(true)
    expect(link.attributes("href")).toBe("https://www.example.com")
    expect(link.attributes("target")).toBe("_blank")
    expect(link.text()).toBe("John Doe")
  })

  test("renders a span when href is not provided", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
    })
    const span = wrapper.find("span")
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe("John Doe")
  })

  test("applies the \"linked\" class when href is provided", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
      href: "https://www.example.com",
    })
    const link = wrapper.find("a")
    expect(link.classes()).toContain("linked")
  })

  test("applies the \"not-linked\" class when href is not provided", () => 
  {
    const wrapper = createWrapper({
      fullname: "John Doe",
    })
    const span = wrapper.find("span")
    expect(span.classes()).toContain("not-linked")
  })
})
