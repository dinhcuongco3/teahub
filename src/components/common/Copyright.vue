<template>
  <div class="copyright-wrapper">
    Copyright
    <font-awesome-icon
			data-testid="teahub-copyright"
			icon="fa fa-copyright"
		/>&nbsp;
    {{ formattedYear }}
    Tanner Woody All Rights Reserved
  </div>
</template>

<script>
import {DateTime} from "luxon"

export default {
  name: "Copyright",
  computed:
  {
    /**
     * @returns {string} Year in yyyy format
     */
    formattedYear ()
    {
      return DateTime.local().toFormat("yyyy")
    },
  },
}
</script>
