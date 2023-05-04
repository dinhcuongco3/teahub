<template>
  <div class="availability-search-bar-wrapper">
    <transition
      name="fade"
      mode="out-in"
    >
      <div class="date-container">
        <div class="flex-box">
          <span
            class="label"
            data-testid="date-selector-start-label"
          >
            Start Date
          </span>
          <!-- /* c8 ignore next 7 */ -->
          <DateSelector
            data-testid="date-selector-start"
            :isLoading="isLoading"
            :maxDate="maxDate"
            :minDate="today"
            :value="start"
            @newDate="updateStartDate($event)"
          />
        </div>
        <div class="flex-box">
          <span
            class="label"
            data-testid="date-selector-end-label"
          >
            End Date
          </span>
          <!-- /* c8 ignore next 7 */ -->
          <DateSelector
            data-testid="date-selector-end"
            :isLoading="isLoading"
            :maxDate="maxDate"
            :minDate="minDateEnd"
            :value="end"
            @newDate="updateEndDate($event)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {DateTime} from "luxon"
import DateSelector from "@/components/inputs/DateSelector.vue"

export default {
  name: "AvailabilitySearchBar",
  components:
  {
    DateSelector,
  },
  data: function()
  {
    return {}
  },
  props:
  {
    /** Selected end date for the calendar */
    end:
    {
      default: "",
      required: false,
      type: String,
    },

    /** Whether we are in loading state or not */
    isLoading: Boolean,

    /** Selected start date for the calendar */
    start:
    {
      default: "",
      required: false,
      type: String,
    },
  },
  computed:
  {
    /**
     * @returns {string} The max date the user can book out too
     */
    maxDate () 
    {
      // Eighteen months in the future
      let jump18 = DateTime.local().plus({
        months: 6,
        years: 1,
      })
      return jump18.toFormat("yyyy-MM-dd")
    },

    minDateEnd () 
    {
      return this.today
    },

    today ()
    {
      return DateTime.local().toFormat("yyyy-MM-dd")
    },
  },
  methods:
  {
    updateEndDate (v)
    {
      this.$emit("updateEndDate", v)
    },

    updateStartDate (v)
    {
      this.$emit("updateStartDate", v)
    },
  },
}
</script>
