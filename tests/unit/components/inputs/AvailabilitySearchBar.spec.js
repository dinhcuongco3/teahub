import { mount } from "@vue/test-utils"
import AvailabilitySearchBar from "@/components/inputs/AvailabilitySearchBar"

describe("AvailabilitySearchBar Component", () => 
{
	let wrapper
	beforeEach(() =>
	{
		// Instantiate the component
		wrapper = mount(
			AvailabilitySearchBar,
			{
				propsData: {},
			}
		)
	})

	it("renders in general", () => 
	{
		expect(wrapper.find("div.availability-search-bar-wrapper").exists()).toBeTruthy()
		// date-container in reference to not loading state
		expect(wrapper.find("div.date-container").exists()).toBeTruthy()
	})
	it("renders a loading state", async () => 
	{
		await wrapper.setProps({
			isLoading: true,
		})
		expect(wrapper.find("div.availability-search-bar-wrapper").exists()).toBeTruthy()
		expect(wrapper.find("div.loading").exists()).toBeTruthy()
	})
})
