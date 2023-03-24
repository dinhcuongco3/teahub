<template>
	<div
		aria-labelledby="toc-heading"
		class="toc-wrapper"
		role="navigation"
	>
		<h2 id="toc-heading">
			Contents
		</h2>
		<ol>
			<li
				v-for="content in contents"
				:key="content.id"
			>
				<a :href="content.href">
					{{ content.formatted }}
				</a>
			</li>
		</ol>
	</div>
</template>

<script>

export default {
	name: "TableOfContents",
	data () 
	{
		return {}
	},
	props:
	{
		/** All the content to be indexed */
		contents:
		{
			required: true,
			type: Array,
		},
	},
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/styles";
.toc-wrapper {
	align-items: center;
	display: flex;
	flex-direction: column;
	padding: 0;
	margin: 0;
	text-align: left;

	ol {
		align-items: center;
		display: flex;
		flex-gap: 11px;
		flex-wrap: wrap;
		font-size: clamp(17px, 2vw, 20px);
		justify-content: center;

		li {
			margin: 15px; 
		}
	}
}

#toc-heading {
	font-size: clamp(24px, 3vw, 35px);
	padding: 0;
	margin: 0;
}
</style>

