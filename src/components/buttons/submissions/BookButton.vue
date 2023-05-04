Button to book a stay
<template>
  <MyButton
    class="search-execute"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <span
        v-if="isLoading"
        class="execute-text execute-loading"
        key="loading"
      >
        {{ bookingText }}
      </span>
      <span
        v-else
        class="execute-text execute-clickable"
        key="booking"
      >
        {{ bookingText }}
      </span>
    </transition>
  </MyButton>
</template>

<script>
import MyButton from "@/components/buttons/MyButton.vue"

export default {
  name: "BookButton",
  components: 
  {
    MyButton,
  },
  props:
  {
    /** Whether the button is disabled or not */
    disabled: Boolean,

    /** Whether we are in loading state or not */
    isLoading: Boolean,

    /** The total price of the booked stay */
    totalPrice: {
      default: "",
      required: false,
      type: String,
    },
  },
  computed: {
    bookingText ()
    {
      if (this.isLoading) 
      {
        return "Loading"
      }
      if (!this.totalPrice) 
      {
        return "Book"
      }
      return `Book - $${this.totalPrice}`
    },
  },
}
</script>
