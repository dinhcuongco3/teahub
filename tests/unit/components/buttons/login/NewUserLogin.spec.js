import { mount } from "@vue/test-utils"
import NewUserLogin from "@/components/buttons/login/NewUserLogin.vue"

vi.mock("firebase/auth")
vi.mock("firebase/app", () => 
{
  return {
    __esModule: true,
    default: {
      auth: vi.fn(() => 
      {
        return {
          createUserWithEmailAndPassword: vi.fn(),
        }
      }),
    },
  }
})

const createWrapper = (propsData = {}, data = {}) => 
{
  return mount(NewUserLogin,
    {
      props: propsData,
      global: {
        stubs: [
          "FontAwesomeIcon",
        ],
      },
      data: () => data,
    }
  )
}

describe("NewUserLogin", () => 
{
  it("renders MyButton component", () => 
  {
    const wrapper = createWrapper({
      email: "",
      password: "",
      passwordsMatch: false,
    })

    const myButton = wrapper.findComponent({
      name: "MyButton", 
    })
    expect(myButton.exists()).toBeTruthy()
  })

  it("isDisabled computed property returns expected value", async () => 
  {
    // Passwords do not match
    const wrapper = createWrapper({
      email: "test@gmail.com",
      password: "",
      passwordsMatch: false,
      ready: true,
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()

    // Password too short
    await wrapper.setProps({
      email: "test@gmail.com",
      password: "1a",
      passwordsMatch: true,
      ready: true,
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()
    
    // Needs `ready`
    await wrapper.setProps({
      ready: false,
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()

    // Needs numeric
    await wrapper.setProps({
      ready: true,
      email: "test@example.com",
      passwordsMatch: true,
      password: "asdf asdf", 
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()

    // Email required
    await wrapper.setProps({
      email: "",
      password: "testing1234",
      passwordsMatch: true,
      ready: true,
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()
    // Needs alpha
    await wrapper.setProps({
      ready: true,
      email: "test@example.com",
      passwordsMatch: true,
      password: "123421345", 
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()

    // Needs alpha
    await wrapper.setProps({
      ready: true,
      email: "test@example.com",
      passwordsMatch: true,
      password: "1234Testing", 
    })
    await wrapper.setData({
      registrationError: "i disable",
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()

    // Remove reg error and it should work
    await wrapper.setData({
      registrationError: "",
    })
    expect(wrapper.vm.isDisabled).toBeFalsy()
  })

  it("errors computed property returns expected value", async () => 
  {
    const wrapper = createWrapper({
      email: "test@example.com",
      password: "Testing123",
      passwordsMatch: true,
    })

    expect(wrapper.vm.errors).toEqual("")

    await wrapper.setProps({
      passwordsMatch: false, 
    })
    expect(wrapper.vm.errors).toEqual("Passwords do not match")

    await wrapper.setProps({
      passwordsMatch: true,
      password: "123456789", 
    })
    expect(wrapper.vm.errors).toEqual("Password needs alphabetical character")

    await wrapper.setProps({
      password: "asdfasdfasdf", 
    })
    expect(wrapper.vm.errors).toEqual("Password needs numeric character")
  })

  // You need to mock the Firebase function createUserWithEmailAndPassword to test the registerNewUser method
  it("registerNewUser sets registrationError correctly", () => 
  {
    // Mock the createUserWithEmailAndPassword function here
    // ...

    const wrapper = createWrapper({
      email: "test@example.com",
      password: "Testing123",
      passwordsMatch: true,
      ready: true,
    })

    expect(wrapper.vm.registrationError).toEqual("")

    // Call the registerNewUser method and test the expected behavior
    // ...
  })

  it("displayedError returns empty string when isShowingErrors is false", () => 
  {
    const wrapper = createWrapper({
      email: "test@example.com",
      passwordsMatch: true,
      password: "Test123", 
    }, {
      isShowingErrors: false, 
    })

    expect(wrapper.vm.displayedError).toEqual("")
  })

  it("displayedError returns error when isShowingErrors is true and errors computed property has a value", async () => 
  {
    const wrapper = createWrapper(
      {
        email: "test@example.com",
        password: "asdf asdf",
        passwordsMatch: true, 
      },
      {
        isShowingErrors: true, 
      }
    )

    expect(wrapper.vm.displayedError).toEqual("Password needs numeric character")

    await wrapper.setProps({
      password: "Testing123",
      passwordsMatch: false, 
    })
    expect(wrapper.vm.displayedError).toEqual("Passwords do not match")
  })

  it("displayedError returns empty string when isShowingErrors is true and errors computed property has no value", () => 
  {
    const wrapper = createWrapper(
      {
        email: "test@example.com",
        password: "Testing123",
        passwordsMatch: true, 
      },
      {
        isShowingErrors: true, 
      }
    )

    expect(wrapper.vm.displayedError).toEqual("")
  })

  it("displayedError tells user if password is too short", () => 
  {
    const wrapper = createWrapper(
      {
        email: "test@example.com",
        password: "Tes123",
        passwordsMatch: true, 
      },
      {
        isShowingErrors: true, 
      }
    )

    expect(wrapper.vm.displayedError).toEqual("Password less than 8 characters")
  })

  it("calls handleClick appropriately", () => 
  {
    const wrapper = createWrapper(
      {
        email: "test@example.com",
        password: "Tes123",
        passwordsMatch: true, 
        ready: true,
      }
    )
    const spy = vi.spyOn(wrapper.vm, "handleClick")
    wrapper.findComponent("[data-testid=\"new-user-login-wrapper\"]").trigger("click")
    expect(spy).toHaveBeenCalled()
  })

  it("calls registerNewUser appropriately", () => 
  {
    const wrapper = createWrapper(
      {
        email: "test@example.com",
        password: "Testing123",
        passwordsMatch: true, 
        ready: true,
      }
    )
    const spy = vi.spyOn(wrapper.vm, "registerNewUser")

    expect(wrapper.vm.isDisabled).toBeFalsy()
    wrapper.findComponent({
      name: "MyButton",
    }).trigger("click")
    expect(spy).toHaveBeenCalled()
  })
})

