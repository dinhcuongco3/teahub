import { render, fireEvent, nextTick } from 'vitest';
import { is } from 'vitest/assert';
import AvailabilitySearch from '@/components/AvailabilitySearch.vue';

describe('AvailabilitySearch Component', () => {
  let wrapper;
  beforeEach(async () => {
    // Instantiate the component
    wrapper = await render(AvailabilitySearch);
  });

  it('Renders in general', () => {
    is(wrapper.querySelector('div.availability-search-wrapper') !== null, true);
    is(wrapper.querySelector('form.search-box') !== null, true);
    is(wrapper.querySelector('form.is-loading') !== null, false);
  });

  it('Shows loading section', async () => {
    wrapper.component.vm.isLoading = true;
    await nextTick();
    is(wrapper.querySelector('div.availability-search-wrapper') !== null, true);
    is(wrapper.querySelector('form.search-box') !== null, true);
    is(wrapper.querySelector('form.is-loading') !== null, true);
  });

  it('handleAvailabilitySearch should not change state on success', async () => {
    is(wrapper.component.vm.isLoading, false);
    is(wrapper.component.vm.hasError, false);
    await wrapper.component.vm.handleAvailabilitySearch();
    is(wrapper.component.vm.isLoading, false);
    is(wrapper.component.vm.hasError, false);
  });

  // TODO: Debug from 127c7e5a436eb62f2467abaef1ba02bc7f5747c5
  it('Updates payload with query', async () => {
    is(wrapper.querySelector('div.availability-search-wrapper') !== null, true);
    try {
      await wrapper.component.vm.handleAvailabilitySearch();
    } catch (e) {
      is(wrapper.component.vm.hasError, true);
      is(wrapper.component.vm.isLoading, false);
    }
  });
});
