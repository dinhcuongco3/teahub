import { mount } from "@vue/test-utils"
import AvailabilitySearch from "@/components/forms/AvailabilitySearch.vue"

describe("AvailabilitySearch Component", () => 
{
	let wrapper
	beforeEach(() =>
	{
		// Instantiate the component
		wrapper = mount(
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
	it("Updates payload with query", async () => 
	{
		expect(wrapper.find("div.availability-search-wrapper").exists()).toBeTruthy()
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
})
