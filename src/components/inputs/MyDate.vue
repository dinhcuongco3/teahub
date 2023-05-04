<template>
  <div class="my-date-wrapper">
    <input
      v-model="localValue"
      v-if="!isLoading"
      autocomplete="new-password"
      class="search-query"
      :placeholder="placeholder"
      :maxlength="maxlength"
      ref="myDate"
      type="tel"
      @input="updateParent()"
      @keypress="isNumber($event)"
    >
    <LoadingBar
      v-else
      class="search-query loading"
      size="small"
    />
  </div>
</template>

<script>
import LoadingBar from "@/components/common/loading/LoadingBar.vue"

export default {
  name: "MyDate",
  components:
  {
    LoadingBar,
  },
  data: function()
  {
    return {
      localValue: "",
    }
  },
  props:
  {
    focused: Boolean,
    isDay: Boolean,
    isLoading: Boolean,
    isMonth: Boolean,
    isYear: Boolean,
    value:
    {
      default: "",
      required: false,
      type: String,
    },
  },
  computed:
  {
    /** */
    isValid ()
    {
      if (!this.localValue)
      {
        return false
      }
      let num = parseInt(this.localValue)
      if (!num || num !== parseInt(this.localValue)) 
      {
        return false
      }

      if (this.isDay)
      {
        if (this.localValue === 0 || this.localValue > 31)
        {
          return false
        }
        return true
      }
      if (this.isMonth)
      {
        if (this.localValue === 0 || this.localValue > 12)
        {
          return false
        }
        return true
      }
      if (this.isYear)
      {
        // TODO: Allocate to this DateTime
        if (this.localValue === 0 || this.localValue < 2023)
        {
          return false
        }
        return true
      }
      return false
    },

    maxlength ()
    {
      if (this.placeholder === "yyyy")
      {
        return 4
      }
      return 2
    },

    placeholder ()
    {
      if (this.isDay)
      {
        return "dd"
      }
      if (this.isMonth)
      {
        return "mm"
      }
      if (this.isYear)
      {
        return "yyyy"
      }
      return ""
    },
  },
  methods:
  {
    isNumber (evt)
    {
      /* c8 ignore next 3 */
      evt = (evt) ? evt : window.event
      evt.preventDefault()
      var charCode = (evt.which) ? evt.which : evt.keyCode

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) &&
        charCode !== 46)
      {
        return false
      }
      else
      {
        return true
      }
    },

    /** */
    updateParent ()
    {
      this.$emit(
        "newValue",
        this.isValid ? this.localValue : ""
      )
    },
  },
  watch:
  {
    /**
     * @param n
     */
    focused (n)
    {
      if (n)
      {
        this.$refs.myDate.focus()
        this.$emit("focus", true)
      }
    },

    value (n)
    {
      this.localValue = n
    },
  },
}

</script>
