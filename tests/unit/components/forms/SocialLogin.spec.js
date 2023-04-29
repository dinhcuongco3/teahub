import { mount } from "@vue/test-utils"
import SocialLogin from "@/components/forms/SocialLogin.vue"
import FacebookLogin from "@/components/buttons/login/FacebookLogin.vue"
import GoogleLogin from "@/components/buttons/login/GoogleLogin.vue"

const createWrapper = () => 
{
  return mount(
    SocialLogin,
    {
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
    }
  )
}

describe("SocialLogin", () => 
{
  it("renders GoogleLogin component", () => 
  {
    const wrapper = createWrapper()

    expect(wrapper.findComponent(GoogleLogin).exists()).toBe(true)
  })

  it("renders FacebookLogin component", () => 
  {
    const wrapper = createWrapper()

    expect(wrapper.findComponent(FacebookLogin).exists()).toBe(true)
  })
})

