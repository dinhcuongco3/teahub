TODO: Hover effect
<template>
  <div
    class="accordion-wrapper"
    :class="{'has-nested': hasNested, 'selected': selected}"
  >
    <div
      class="main-bar"
      :class="{'has-nested': hasNested, 'not-selected': !selected}"
      @click="handleClick()"
    >
      <div
        class="title-section"
        :class="{'bigger': hasNested}"
      >
        <slot name="title"/>
      </div>
      <div
        class="chevron-section"
        :class="{'collapsed': !selected, 'expanded': selected}"
      >
        <font-awesome-icon
          :icon="['fa', 'chevron-right']"
        />
      </div>
    </div>
    <div
      class="accordion-content-section"
      :class="{'collapsed': !selected, 'expanded': selected}"
    >
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  data () 
  {
    return {
      selected: false,
    }
  },
  props:
  {
    /** Whether the accordion has a nested accordion inside */
    hasNested: Boolean,
  },
  methods:
  {
    /** @returns {void} Open/close the accordion; Suppresses state change during current transition */
    async handleClick ()
    {
      if (this.isClicked)
      {
        // Do nothing and wait for current selection to finish
        return
      }
      this.isClicked = true
      this.selected = !this.selected
      await new Promise((r) => setTimeout(r, 400))
      this.isClicked = false
    },
  },
}
</script>
