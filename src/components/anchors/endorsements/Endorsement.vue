<template>
	<div class="endorsement-wrapper">
		<a
			v-if="href"
			class="linked"
			:href="href"
			target="_blank"
		>
			{{ formattedText }}
		</a>
		<span
			v-else
			class="not-linked"
		>
			{{ formattedText }}
		</span>

	</div>
</template>

<script>

export default {
	name: "Endorsement",
	data () 
	{
		return {}
	},
	props:
	{
		/** The fullname of the person */
		fullname: 
		{
			required: true,
			type: String,
		},

		/** A relative link to visit and learn of the person */
		href: 
		{
			default: "",
			required: false,
			type: String,
		},

		/** A title or position for the person IFF applicable */
		position: 
		{
			default: "",
			required: false,
			type: String,
		},
	},
	computed:
	{
		/** @returns {string} Full text of a person */
		formattedText ()
		{
			return `${this.formattedTitle} ${this.fullname}`
		},

		/** @returns {string} Formatted title or position to prepend to a name */
		formattedTitle ()
		{
			return this.position ? `${this.position} -` : ""
		},
	},
}
</script>

<style lang="less" scoped>
@import "../../../../assets/styles/styles";
.endorsement-wrapper {
	.linked {
		color: @myblack;
		font-weight: 900;
		text-decoration: none;
	}
	.not-linked {
		font-weight: 500;
	}
}
</style>
