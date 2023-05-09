<template>
  <div
    class="map-card-wrapper"
    :class="{'hidden': !shown, 'shown': shown}"
  >
    <div class="top-section">
      <div class="row">
        <div class="map-card-title">
          {{ formattedTitle }}
        </div>
        <div class="favorites-star">
          <font-awesome-icon
            :icon="['fa', 'star']"
            inverse
          />
        </div>
      </div>
      <div class="map-card-subtitle">
        {{ formattedSubtitle }}
      </div>
    </div>
    <div class="map-card-map">
      <img
        height="140"
        :src="url"
        width="140"
      >
    </div>
    <button
      class="map-card-button"
      @click="gotoItem(activity.id)"
    >
      View Details
    </button>
  </div>
</template>

<script>

export default {
  name: "MapCard",
  data: function() 
  {
    return {}
  },
  props:
  {
    /** Title, subtitle, addy, phone, etc. object */
    activity: {
      required: true,
      type: Object,
    },

    /** Is the card shown or not */
    shown: Boolean,
  },
  computed:
  {
    formattedSubtitle ()
    {
      return this.activity.subtitle || "-"
    },

    formattedTitle ()
    {
      return this.activity.title || "-"
    },

    // TODO: Setup as a prop
    url ()
    {
      //     if (this.$store.state.isOnline)
      //     {
      //       return "https://firebasestorage.googleapis.com/v0/b/votel-f1c47.appspot.com/o/cat-with-hammer.png?alt=media&token=e717e395-6406-4a57-83ac-b8c838427d91"
      //     }
      return "assets/imgs/cat-with-hammer.png"
    },
  },
  methods: {
    /**
     * @todo Setup to do an emit instead
     * @param {string} id - Poorly names object s.t. id is string and not int
     */
    gotoItem (id) 
    {
      //     this.$router.push({
      //       name: "mapItem", 
      //       params: {
      //         id, 
      //       },
      //     })
      console.info(id)
    },
  },
}
</script>
