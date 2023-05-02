import { mount } from "@vue/test-utils"
import FacebookLogin from "@/components/buttons/login/FacebookLogin.vue"

vi.mock("firebase/auth")

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

  it("will not login if already loggin-in", async () => 
  {
    const wrapper = createWrapper()
    // Clicking button will set isLogginIn state
    wrapper.findComponent({
      name: "MyButton",
    }).trigger("click")

    let success = await wrapper.vm.facebookLogin()
    expect(success).toBe(false)
  })

  it("will login if not logging-in", async () => 
  {
    const wrapper = createWrapper()
    const spy = vi.spyOn(wrapper.vm, "facebookLogin")
    await wrapper.setData({
      isLoggingIn: false,
    })

    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    myButtonComponent.trigger("click")

    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.isLoggingIn).toBe(true)
  })

  it("calls facebookLogin method when button is clicked", async () => 
  {
    const wrapper = createWrapper()
    const spy = vi.spyOn(wrapper.vm, "facebookLogin")
    const myButtonComponent = wrapper.findComponent({
      name: "MyButton", 
    })
    await myButtonComponent.trigger("click")

    expect(spy).toHaveBeenCalled()
  })
})
