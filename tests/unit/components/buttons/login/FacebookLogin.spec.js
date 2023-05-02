import { mount } from "@vue/test-utils"
import FacebookLogin from "@/components/buttons/login/FacebookLogin.vue"

const createWrapper = () => 
{
  return mount(
    FacebookLogin,
    {
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
    }
  )
}

describe("FacebookLogin", () => 
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

  it("calls facebookLogin method when button is clicked", async () => 
  {
    const wrapper = createWrapper()
    const facebookLoginMock = vi.spyOn(wrapper.vm, "facebookLogin")

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    await myButtonComponent.trigger("click")

    expect(facebookLoginMock).toHaveBeenCalled()
  })
})
