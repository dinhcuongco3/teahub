import { mount } from '@vue/test-utils';
import Validatable from '@/components/common/Validatable.vue';

describe('Validatable.vue', () => {
  it('renders without an error', () => {
    const wrapper = mount(Validatable, {
      props: {
        error: '',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays error message when error prop is passed', async () => {
    const errorMessage = 'An error occurred';
    const wrapper = mount(Validatable, {
      props: {
        error: errorMessage,
      },
    });
    const errorMessageElement = wrapper.find('.error-message');
    expect(errorMessageElement.text()).toContain(errorMessage);
  });

  it('does not display error message when error prop is an empty string', async () => {
    const wrapper = mount(Validatable, {
      props: {
        error: '',
      },
    });
    const errorMessageElement = wrapper.find('.error-message');
    expect(errorMessageElement.exists()).toBe(false);
  });
});
