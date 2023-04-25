import { mount } from "@vue/test-utils"
import BookButton from "@/components/buttons/submissions/BookButton.vue"

describe("BookButton Component", () => 
{
	let wrapper
	beforeEach(() =>
	{
		// Instantiate the component
		wrapper = mount(
			BookButton,
			{
				propsData: {},
			}
		)
	})

	it("renders in general", () => 
	{
		expect(wrapper.find("div.search-execute"))
		expect(wrapper.find("div.execute-text"))
	})

	it("renders a loading state", () => 
	{
		expect(wrapper.find("div.execute-text"))
		wrapper.setProps({
			isLoading: true,
		})
		expect(wrapper.find("div.execute-loading"))
	})
	it("renders back to normal after loading", () => 
	{
		expect(wrapper.find("div.execute-text"))
		wrapper.setProps({
			isLoading: false,
		})
		expect(wrapper.find("div.execute-loading"))
		expect(wrapper.find("div.execute-clickable"))
	})
	it("emits a click", async () => 
	{
		let button = wrapper.findComponent(BookButton)
		await button.trigger("click")
		expect(wrapper.emitted()["click"]).toBeTruthy()
	})
})
