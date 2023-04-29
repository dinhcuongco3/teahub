import { mount } from 'vitest/vue'
import SideMenu from 'path/to/SideMenu.vue'

const createWrapper = (props) => {
  return mount(SideMenu, { props })
}

describe('SideMenu', () => {
  const contents = [
    { id: 1, href: '/example1', formatted: 'Example 1' },
    { id: 2, href: '/example2', formatted: 'Example 2' },
  ]

  it('renders sidebar and contents', () => {
    const wrapper = createWrapper({ contents })

    expect(wrapper.find('.sidebar').exists()).toBe(true)
    expect(wrapper.findAll('.sidebar-nav li').length).toBe(contents.length)
  })

  it('toggles isCollapsed when the sidebar-header is clicked', async () => {
    const wrapper = createWrapper({ contents })

    expect(wrapper.vm.isCollapsed).toBe(true)

    await wrapper.find('.sidebar-header').trigger('click')
    expect(wrapper.vm.isCollapsed).toBe(false)

    await wrapper.find('.sidebar-header').trigger('click')
    expect(wrapper.vm.isCollapsed).toBe(true)
  })

  it('toggles isCollapsed when a content link is clicked', async () => {
    const wrapper = createWrapper({ contents })

    expect(wrapper.vm.isCollapsed).toBe(true)

    await wrapper.findAll('.sidebar-nav a')[0].trigger('click')
    expect(wrapper.vm.isCollapsed).toBe(false)
  })
})

