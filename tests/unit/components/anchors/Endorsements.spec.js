import { mount } from "@vue/test-utils"
import Endorsements from "@/components/anchors/endorsements/Endorsements.vue"
import Endorsement from "@/components/anchors/endorsements/Endorsement.vue"

const createWrapper = (props) => 
{
  return mount(Endorsements, {
    props,
    global: {
      components: {
        Endorsement,
      },
    },
  })
}

describe("Endorsements.vue", () => 
{
  const endorsers = [
    // TODO: Provide lookups for endorsement types
    // 1 is currently citizen
    // 2 is currently Person of Interest
    {
      id: 1,
      fullname: "John Doe",
      position: "CEO",
      href: "https://example.com/john",
      endorsementType: 2, 
    },
    {
      id: 2,
      fullname: "Jane Smith",
      position: "CFO",
      href: "https://example.com/jane",
      endorsementType: 1, 
    },
  ]

  test("renders all endorsers", async () => 
  {
    const wrapper = createWrapper({
      endorsers, 
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    const endorsementItems = wrapper.findAllComponents(Endorsement)
    expect(endorsementItems).toHaveLength(endorsers.length)
  })

  test("passes correct props to Endorsement components", async () => 
  {
    const wrapper = createWrapper({
      endorsers, 
    })
    await wrapper.vm.$nextTick()
    const endorsementItems = wrapper.findAllComponents(Endorsement)
    const sentProps = {
      fullname: endorsers[0].fullname,
      href: endorsers[0].href,
      position: endorsers[0].position,
    }
    expect(endorsementItems[0].props()).toEqual(sentProps)
  })

  test("renders Engaged Citizens section", async () => 
  {
    const wrapper = createWrapper({
      endorsers, 
    })
    await wrapper.vm.$nextTick()
    const citizensSection = wrapper.find({
      ref: "citizens", 
    })
    expect(citizensSection.exists()).toBe(true)
  })

  test("renders Engaged Citizens endorsers", async () => 
  {
    const wrapper = createWrapper({
      endorsers, 
    })
    await wrapper.vm.$nextTick()
    const citizensSection = wrapper.find({
      ref: "citizens", 
    })
    const citizenEndorsers = citizensSection.findAllComponents(Endorsement)
    expect(citizenEndorsers).toHaveLength(1)
  })

  test("passes correct props to Engaged Citizens Endorsement components", async () => 
  {
    const wrapper = createWrapper({
      endorsers, 
    })
    await wrapper.vm.$nextTick()
    const citizens = wrapper.vm.citizens
    expect(citizens).toEqual([
      endorsers[1],
    ])
  })
})

