<template>
  <div class="flex-box endorsements-wrapper">
    <ul>
      <li
        v-for="endorser in notCitizens"
        :key="endorser.id"
      >
        <Endorsement
          :href="endorser.href"
          :fullname="endorser.fullname"
          :position="endorser.position"
        />
      </li>
      <li
        v-if="citizens.length"
        ref="citizens"
      >
        Engaged Citizens:
        <ul>
          <li
            v-for="endorser in citizens"
            :key="endorser.id"
          >
            <Endorsement
              :key="endorser.id"
              :fullname="endorser.fullname"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Endorsement from "components/anchors/endorsements/Endorsement.vue"
export default {
  name: "Endorsements",
  components:
  {
    Endorsement,
  },
  props: {
    endorsers: {
      required: true,
      type: Array,
    },
  },
  computed: {
    // TODO: Magic number
    /** @returns {Array} List of endorsers who are citizens */
    citizens () 
    {
      return this.endorsers.filter((endorser) => endorser.endorsementType === 1)
    },

    // TODO: Magic number
    /** @returns {Array} List of endorsers who are NOT citizens */
    notCitizens () 
    {
      return this.endorsers.filter((endorser) => endorser.endorsementType !== 1)
    },
  },
}
</script>

<style lang="less">
@import "../../../../assets/styles/styles";

</style>
