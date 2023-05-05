<template>
  <button
    class="my-button-wrapper"
    :class="classes"
    :type="submit ? 'submit' : 'button'"
    @animationend="onShakeEnd"
    @click.stop="onClick()"
  >
    <div
      v-if="badgeContent"
      class="badge"
    >
      {{ badgeContent }}
    </div>

    <transition
      name="fade"
      mode="out-in"
    >
      <div
        :key="transitionKey"
        ref="slotWrapper"
      >
        <Spinner v-if="inProgress" />
        <div v-else>
          <slot/>
          <font-awesome-icon
            v-if="success"
            class="check-icon"
            :icon="['fa', 'check']"
          />
        </div>
      </div>
    </transition>
  </button>
</template>

<script>
import Spinner from "components/common/loading/Spinner.vue"

export default
{
  name: "MyButton",
  components: {
    Spinner,
  },
  props:
  {
    /** Content to show in a badge */
    badgeContent: String,

    /** Is button disabled */
    disabled: Boolean,

    /** Is button currently doing a job */
    inProgress: Boolean,

    /** Invert the colors in on a light background */
    invertColors: Boolean,

    /** Whether is a smaller pill button or not */
    pill: Boolean,

    /** Is button for submitting */
    submit: Boolean,

    /** Is button showing success */
    success: Boolean,
  },
  data ()
  {
    return {
      /** Whether button is currently doign a thing locally */
      doingWork: false,

      /** Tricking vue into redoing a computed ref */
      isMounted: false,

      /** Whether button is shake animating */
      shaking: false,
    }
  },
  computed:
  {
    /**
     * @returns {object} classes -- Object of applied css classes and rules
     */
    classes ()
    {
      const classes = {
        button: true,
      }
      classes.disabled = this.disabled || this.inProgress
      classes["invert-colors"] = this.invertColors
      classes.pill = this.pill
      classes.progress = this.inProgress
      classes.success = this.success
      classes.shake = this.shaking

      return classes
    },

    /** @returns {string} Just flip the switch in parent to do transitions */
    transitionKey () 
    {
      if (!this.isMounted)
      {
        return ""
      }
      return `${this.inProgress} ${this.success}`
    },
  },
  methods:
  {
    // Begin the shaking animaion
    beginShake ()
    {
      this.shaking = true
    },

    // The user wants to click the button. Propogate event if button is not disabled.
    onClick (ev)
    {
      console.log("sanity 1")
      if (ev?.preventDefault) 
      {
        ev.preventDefault()
      }
      if (this.doingWork) 
      {
        return
      }
      console.log("sanity 2")
      this.doingWork = true

      if (this.disabled)
      {
        console.log("k")
        // Button is disabled: play animation and send event
        this.beginShake()
        this.doingWork = false
      }
      else
      {
        // Wait for animation
        this.doingWork = false
      }
    },

    // Reset the shake class so the button can shake again
    onShakeEnd ()
    {
      this.shaking = false
    },
  },
  mounted ()
  {
    this.isMounted = true
  },
}
</script>
