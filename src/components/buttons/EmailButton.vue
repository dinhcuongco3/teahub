<template>
  <MyButton
    class="email-button"
    pill
    tabindex="-1"
  >
    <a
      :href="mailto"
      target="_blank"
    >
      <slot/>
    </a>
  </MyButton>
</template>

<script>
import MyButton from "components/buttons/MyButton"

export default {
  name: "EmailButton",
  components:
	{
	  MyButton,
	},
  props: {
    /** Who the email is going to */
    email:
		{
		  default: "foo@bar.com",
		  required: true,
		  type: String,
		},

    /** Is current filter being applied */
    inactive: Boolean,
  },
  computed:
	{
	  /**
			 * @returns {string} An email link disguised as a button
			 */
	  mailto ()
	  {
	    return `mailto:${this.email}`
	  },
	},
}
</script>

<style scoped lang="less">
@import "../../../assets/styles/styles";
.email-button {
	a {
		font-weight: bold;
		color: @color-third-font;
	}

	min-height: 32px;
	margin-left: 10px;
	margin-right: 10px;
	max-width: 200px;
	min-width: 100px;
	width: auto;
}
</style>

