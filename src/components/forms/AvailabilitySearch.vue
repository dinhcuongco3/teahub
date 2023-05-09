<template>
  <div class="availability-search-wrapper">
    <div class="content-section">
      <form
        class="search-box"
        :class="{'is-loading': isLoading}"
      >
        <AvailabilitySearchBar
          class="inputs-container"
          :end="selectedDates[0].end"
          :isLoading="isLoading"
          :start="selectedDates[0].start"
          @updateEndDate="selectedDates[0].end = $event"
          @updateStartDate="selectedDates[0].start = $event"
        />
        <VueCal
          active-view="month"
          class="vue-cal-container vuecal--rounded-theme vuecal--date-picker"
          :disable-views="['day', 'week']"
          :events="selectedDates"
          hide-view-selector
          :min-date="minDate"
          :time="false"
          xsmall
          @cell-click="processDateSelection($event)"
        />
        <BookButton
          :disabled="!isBookingEnabled"
          :isLoading="isLoading"
          :totalPrice="totalPrice"
          @click="handleAvailabilitySearch()"
        />
      </form>
    </div>
  </div>
</template>

<script>
import {DateTime} from "luxon"
import {Duration} from "luxon"

import AvailabilitySearchBar from "@/components/inputs/AvailabilitySearchBar.vue"
import BookButton from "@/components/buttons/submissions/BookButton.vue"
import VueCal from "vue-cal"
import "vue-cal/dist/vuecal.css"

export default {
  name: "AvailabilitySearch",
  components:
  {
    AvailabilitySearchBar,
    BookButton,
    VueCal,
  },
  data: function()
  {
    return {
      cleaningFee: 100,
      dailyRate: 85,
      hasError: false,
      isLoading: false,
      maxDate: "2025-01-01",
      searchQuery: "",
      selectedDates: [
        {
          end: "",
          start: "",
        },
      ],
    }
  },
  props:
  {},
  computed: 
  {
    /** @returns {boolean} - Can the booking button be clicked */
    isBookingEnabled () 
    {
      if (!this.selectedDates[0].start) 
      {
        return false
      }
      if (!this.selectedDates[0].end) 
      {
        return false
      }
      return true
    },

    /** @returns {string} ISO representation of "today" s.t. an earlier date is invalid */
    minDate () 
    {
      return DateTime.fromJSDate(new Date().addDays(0)).toISODate()
    },

    totalDays ()
    {
      const startDateTime = DateTime.fromISO(this.selectedDates[0].start)
      const startDuration = Duration.fromObject(startDateTime.c)

      const endDateTime = DateTime.fromISO(this.selectedDates[0].end)
      const endDuration = Duration.fromObject(endDateTime.c)

      // Keep in track of days
      const totalDuration = endDuration.minus(startDuration).shiftTo("days")

      // Add one since count starts at zero
      const totalDays = totalDuration.days + 1
      return totalDays
    },

    totalPrice ()
    {
      if (!this.isBookingEnabled) 
      {
        return ""
      }
      const total = (this.totalDays * this.dailyRate) + this.cleaningFee
      return total + ""
    },
  },
  methods:
  {
    /**
     * @todo docblock
     * @todo acutally send this request to firebase 
     */
    async handleAvailabilitySearch ()
    {
      if (!this.isBookingEnabled) 
      {
        // Do nothing and tell user why "nothing"
        this.hasError = true
      }
      else 
      {
        await this.processBookingRequeset()
      }
    },

    async processBookingRequeset () 
    {
      this.hasError = false
      this.isLoading = true
      try
      {
        // sleep for .5 seconds for faux https mgmt
        await new Promise((r) => setTimeout(r, 2000))
      }
      /* c8 ignore next 4 */
      catch (error)
      {
        this.hasError = true
      }
      this.isLoading = false
    },

    /**
     * @param selected
     * @returns {boolean} Whether the date selected was accurately processed
     */
    processDateSelection (selected)
    {
      let d = DateTime.fromJSDate(new Date(selected))
      let start = DateTime.fromISO(this.selectedDates[0].start)
      let min = DateTime.fromISO(this.minDate)
      let max = DateTime.fromISO(this.maxDate)

      // Selected date cannot be out of bounds
      if (d < min || d > max)
      {
        console.error("Illegal date selection")
        return false
      }

      // If a current start date does not exist, make first selection the start date
      if (!this.selectedDates[0].start)
      {
        this.selectedDates[0].start = d.toISODate()
      }

      // If user clicks their start date, it clears the selection
      if (d.toFormat("yyyyMMdd") === start.toFormat("yyyyMMdd"))
      {
        this.selectedDates[0].start = ""
        this.selectedDates[0].end = ""
      }
      // If user clicks a date before their currently selected start, move back the start
      else if (d < start)
      {
        this.selectedDates[0].start = d.toISODate()
      }
      // Else, always just adjust the end date
      else
      {
        this.selectedDates[0].end = d.toISODate()
      }

      return true
    },
  },
}
</script>
