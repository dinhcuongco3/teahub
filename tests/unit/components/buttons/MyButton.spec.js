import { mount } from "@vue/test-utils"
import MyButton from "@/components/buttons/MyButton.vue"

const defaultProps = {
  badgeContent: '',
  disabled: false,
  inProgress: false,
  inactive: false,
  invertColors: false,
  pill: false,
  submit: false,
  success: false,
}

/**
 *
 */
function createWrapper (props) 
{
  let wrapper = mount(
    MyButton,
    {
		 props: props,
      global: {
        stubs: [
			"FontAwesomeIcon",
        ],
      },
    }
  )
  return wrapper
}

describe('MyButton.vue', () => {
  it('renders the button with default props', () => {
    const wrapper = createWrapper(defaultProps)
    expect(wrapper.find('button').element).toBeTruthy()
  })

  it('renders badge content when provided', () => {
    const wrapper = createWrapper({...defaultProps, badgeContent: '10'})
    expect(wrapper.find('.badge').text()).toBe('10')
  })

  it('handles click event when not disabled', async () => {
    const wrapper = createWrapper(defaultProps)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted("click")).toBeTruthy()
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = createWrapper({...defaultProps, disabled: true})
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows Spinner component when inProgress is true', () => {
    const wrapper = createWrapper({ ...defaultProps, inProgress: true })
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBe(true)
  })

  it('applies the pill class when pill prop is true', () => {
    const wrapper = createWrapper({ ...defaultProps, pill: true })
    expect(wrapper.find('button').classes()).toContain('pill')
  })

  it('applies the invert-colors class when invertColors prop is true', () => {
    const wrapper = createWrapper({ ...defaultProps, invertColors: true })
    expect(wrapper.find('button').classes()).toContain('invert-colors')
  })

  it('sets button type to submit when submit prop is true', () => {
    const wrapper = createWrapper({ ...defaultProps, submit: true })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })
})

