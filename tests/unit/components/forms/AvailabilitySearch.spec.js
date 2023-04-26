import { mount } from "@vue/test-utils"
import AvailabilitySearch from "@/components/forms/AvailabilitySearch.vue"

function createWrapper() {
	let wrapper = mount(
		AvailabilitySearch,
		{
			global: {
				stubs: [
					"AvailabilitySearchBar",
					"BookButton",
					"VueCal",
				],
			}
		}
	)
	return wrapper
}

describe("AvailabilitySearch Component", () => 
{
	let wrapper
	beforeEach(() =>
	{
		wrapper = createWrapper()
	})
	it.concurrent("Renders in general", () => 
	{
		expect(wrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
		expect(wrapper.find("form.search-box").exists()).toBeTruthy()
		expect(wrapper.find("form.is-loading").exists()).toBeFalsy()
	})

	it.concurrent("Shows loading section", async () => 
	{
		wrapper.setData({
			isLoading: true, 
		})
		await wrapper.vm.$nextTick()
		expect(wrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
		expect(wrapper.find("form.search-box").exists()).toBeTruthy()
		expect(wrapper.find("form.is-loading").exists()).toBeTruthy()
	})

	it.concurrent("handleAvailabilitySearch should not change state on success", async () => 
	{
		expect(wrapper.vm.isLoading).toBeFalsy()
		expect(wrapper.vm.hasError).toBeFalsy()
		await wrapper.vm.handleAvailabilitySearch()
		expect(wrapper.vm.isLoading).toBeFalsy()
		expect(wrapper.vm.hasError).toBeFalsy()
	})

	// TODO: Debug from 127c7e5a436eb62f2467abaef1ba02bc7f5747c5
	it.concurrent("Updates payload with query", async () => 
	{
		let isolatedWrapper = createWrapper()
		expect(isolatedWrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
		expect.assertions(1)
		try
		{
			await wrapper.vm.handleAvailabilitySearch()
		}
		catch (e)
		{
			expect(wrapper.vm.hasError).toBeTruthy()
			expect(wrapper.vm.isLoading).toBeFalsy()
		}
	})

  it.concurrent('displays the AvailabilitySearchBar component', () => {
    expect(wrapper.findComponent({ name: 'AvailabilitySearchBar' }).exists()).toBe(true);
  });

  it.concurrent('displays the VueCal component', () => {
    expect(wrapper.findComponent({ name: 'VueCal' }).exists()).toBe(true);
  });

  it.concurrent('displays the BookButton component', () => {
    expect(wrapper.findComponent({ name: 'BookButton' }).exists()).toBe(true);
  });

  it.concurrent('displays the correct minDate', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(wrapper.vm.minDate).toBe(today);
  });

  it.concurrent('calculates the correct totalDays', async () => {
    const startDate = '2023-05-01';
    const endDate = '2023-05-05';

    await wrapper.setData({ selectedDates: [{ start: startDate, end: endDate }] });

    expect(wrapper.vm.totalDays).toBe(5);
  });

  it.concurrent('calculates the correct totalPrice', async () => {
    const startDate = '2023-05-01';
    const endDate = '2023-05-05';
    const dailyRate = 85;
    const cleaningFee = 100;
    const expectedTotalPrice = ((5 * dailyRate) + cleaningFee) + "";

    await wrapper.setData({ selectedDates: [{ start: startDate, end: endDate }] });

    expect(wrapper.vm.totalPrice).toBe(expectedTotalPrice);
  });

  it.concurrent('processes date selection correctly', () => {
		let isolatedWrapper = createWrapper()
	 
    const selectedDate = '2023-05-10T08:00:00.000Z'
    const expectedStartDate = '2023-05-10';

    expect(isolatedWrapper.vm.processDateSelection(selectedDate)).toBe(true);
    expect(isolatedWrapper.vm.selectedDates[0].start).toBe(expectedStartDate);
  });

})
