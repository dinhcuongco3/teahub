import { mount } from "@vue/test-utils"
import GoogleLogin from "@/components/buttons/login/GoogleLogin.vue"

vi.mock("firebase/auth")

const createWrapper = () => 
{
  return mount(
		GoogleLogin,
		{
			global: {
				stubs: [
					"FontAwesomeIcon",
				],
			},
		}
	)
}

describe("GoogleLogin", () => 
{
  it("renders MyButton component with font-awesome-icon", () => 
  {
    const wrapper = createWrapper()

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    expect(myButtonComponent.exists()).toBeTruthy()

    const iconComponent = myButtonComponent.findComponent({
      name: "FontAwesomeIcon", 
    })
    expect(iconComponent.exists()).toBeTruthy()
  })

  it("calls googleLogin method when button is clicked", async () => 
  {
    const wrapper = createWrapper()
    const spy = vi.spyOn(wrapper.vm, "googleLogin")
    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    await myButtonComponent.trigger("click")

    expect(spy).toHaveBeenCalled()
  })
})
