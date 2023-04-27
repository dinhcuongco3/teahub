import { mount } from "@vue/test-utils"
import {DateTime} from "luxon"
import {Settings} from "luxon"
import DateSelector from "@/components/inputs/DateSelector.vue"
import MyDate from "@/components/inputs/MyDate.vue"

describe("DateSelector.vue", () => 
{
	let wrapper

	beforeEach(() => 
	{
		wrapper = mount(DateSelector, {
			props: {
				isLoading: false,
				minDate: "2023-04-01",
				maxDate: "2023-05-31",
			},
		})

		// Preset the date for all tests
		let now = DateTime.local(2023, 4, 26).toMillis()
		Settings.now = () => now
		Settings.defaultZoneName = "America/New_York"
	 vi.setSystemTime(now)
	})

	it("renders three MyDate components", () => 
	{
		const myDateComponents = wrapper.findAllComponents(MyDate)
		expect(myDateComponents.length).toBe(3)
	})

	it("updates selected date when a MyDate component emits newValue", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await monthInput.vm.$emit("newValue", "04")
		await dayInput.vm.$emit("newValue", "26")
		await yearInput.vm.$emit("newValue", "2023")

		expect(wrapper.vm.selectedDate).toBe("2023-04-26")
	})

	it("does not emit newDate when any of the inputs are invalid", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})
		const emitSpy = vi.spyOn(wrapper.vm, "$emit")

		await monthInput.vm.$emit("newValue", "13") // Invalid month
		await dayInput.vm.$emit("newValue", "26")
		await yearInput.vm.$emit("newValue", "2023")

		expect(emitSpy).not.toHaveBeenCalled()
	})

	it("shows the correct error message when the date is invalid", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await monthInput.vm.$emit("newValue", "02")
		await dayInput.vm.$emit("newValue", "30") // Invalid day for February
		await yearInput.vm.$emit("newValue", "2023")

		expect(wrapper.vm.displayedError).toBe("Date is invalid")
	})

	it("shows the correct error message when the date is too far in the future", async () => 
	{
		 const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		 const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		 const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		 await monthInput.vm.$emit("newValue", "06")
		 await dayInput.vm.$emit("newValue", "01")
		 await yearInput.vm.$emit("newValue", "2024") // Date beyond maxDate (2023-05-31)

		 expect(wrapper.vm.displayedError).toBe("Too far in the future")
	})

	  it("updates the month value and focuses on the day input", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const spy = vi.spyOn(wrapper.vm, "updateParent")

		await monthInput.vm.$emit("newValue", "05")
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.month).toBe("05")

		await wrapper.vm.updateParent("month", "05")
		expect(wrapper.vm.focusMonth).toBe(false)
		expect(spy).toHaveBeenCalled()
	})

	it("updates the day value and focuses on the year input", async () => 
	{
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const spy = vi.spyOn(wrapper.vm, "updateParent")

		await dayInput.vm.$emit("newValue", "30")
		await wrapper.vm.$nextTick()

		expect(wrapper.vm.day).toBe("30")
		expect(spy).toHaveBeenCalled()
	})

	it("updates the year value without focusing", async () => 
	{
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await yearInput.vm.$emit("newValue", "2023")

		expect(wrapper.vm.year).toBe("2023")
		expect(wrapper.vm.focusYear).toBe(false)
	})

	it("emits a new valid date when all inputs are filled and valid", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await monthInput.vm.$emit("newValue", "05")
		expect(wrapper.emitted("newDate")).toBeTruthy()
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.selectedDate).toEqual("")
		expect(wrapper.vm.isSelectedInvalid).toBe(1)
		expect(wrapper.emitted().newDate[0]).toEqual([
			"",
		])

		await dayInput.vm.$emit("newValue", "12")
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.selectedDate).toEqual("")
		expect(wrapper.vm.isSelectedInvalid).toBe(1)
		expect(wrapper.emitted().newDate[1]).toEqual([
			"",
		])

		await yearInput.vm.$emit("newValue", "2023")
		await wrapper.vm.$nextTick()
		expect(wrapper.vm.selectedDate).toEqual("2023-05-12")
		expect(wrapper.vm.isSelectedInvalid).toBe(0)
		expect(wrapper.emitted().newDate[2]).toEqual([
			"2023-05-12",
		])
	})

	it("emits an empty string when the inputs do not form a valid date", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await monthInput.vm.$emit("newValue", "02")
		await dayInput.vm.$emit("newValue", "30") // Invalid date: February 30th
		await yearInput.vm.$emit("newValue", "2023")

		expect(wrapper.emitted().newDate).toBeTruthy()
		expect(wrapper.vm.selectedDate).toEqual("")
		expect(wrapper.vm.isSelectedInvalid).toBe(1)
		expect(wrapper.emitted().newDate[0]).toEqual([
			"",
		])
	})

	it("emits a \"date in past\" string when the inputs form a past date", async () => 
	{
		const monthInput = wrapper.findComponent({
			ref: "month", 
		})
		const dayInput = wrapper.findComponent({
			ref: "day", 
		})
		const yearInput = wrapper.findComponent({
			ref: "year", 
		})

		await monthInput.vm.$emit("newValue", "02")
		await dayInput.vm.$emit("newValue", "01")
		await yearInput.vm.$emit("newValue", "2023")

		expect(wrapper.emitted().newDate).toBeTruthy()
		expect(wrapper.vm.selectedDate).toEqual("2023-02-01")
		expect(wrapper.vm.isSelectedInvalid).toBe(3)
		expect(wrapper.emitted().newDate[0]).toEqual([
			"",
		])
	})
	it("Watches the value and updates local values accordingly", async () => 
	{
		await wrapper.setProps({
			value: "2023-04-30",
		})
		expect(wrapper.vm.day).toEqual("30")
		expect(wrapper.vm.month).toEqual("04")
		expect(wrapper.vm.year).toEqual("2023")
		await wrapper.vm.$nextTick()

		await wrapper.setProps({
			value: "",
		})
		expect(wrapper.vm.day).toEqual("")
		expect(wrapper.vm.month).toEqual("")
		expect(wrapper.vm.year).toEqual("")
	})
})
