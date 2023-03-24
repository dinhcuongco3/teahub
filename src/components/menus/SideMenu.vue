<template>
	<div
		aria-labelledby="toc-heading"
		class="sidebar"
		:class="{ collapsed: isCollapsed }"
		role="navigation"
	>
		<div
			class="sidebar-header"
			@click="toggleCollapsed"
		>
			<font-awesome-icon
				v-if="isCollapsed"
				:icon="['fa', 'chevron-right']"
			/>
			<font-awesome-icon
				v-else
				:icon="['fa', 'chevron-left']"
			/>
		</div>
		<ul class="sidebar-nav">
			<li
				v-for="content in contents"
				:key="content.id"
			>
				<a
					:href="content.href"
					@click="toggleCollapsed"
				>
					{{ content.formatted }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "SideMenu",
	data () 
	{
		return {
			isCollapsed: true,
		}
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
	methods: {
		toggleCollapsed () 
		{
			this.isCollapsed = !this.isCollapsed
		},
	},
}
</script>

<style lang="less" scoped>

.sidebar {
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	max-height: calc(60% - 120px);
	left: 0;
	overflow-x: hidden;
	overflow-y: scroll;
	position: fixed;
	top: 20;
	transition: all 0.3s ease-in-out;
	max-width: min(max-content, 200px);
	z-index: 999;

	.sidebar-header {
		align-items: center;
		background-color: #e0e0e0;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.sidebar-nav {
		height: auto;
		list-style: none;
		margin: 0;
		opacity: 1;
		padding: 10px;
		overflow: hidden;
		transition: all 0.3s ease-in-out;
		max-width: 100%;

		a {
			color: #333;
			display: block;
			padding: 5px;
			text-decoration: none;
		}
		li {
			margin-bottom: 5px;
		}
	}

	&.collapsed {
		max-height: 36px;
		max-width: 36px;

		.sidebar-nav {
			opacity: 0;
			padding: 0;
			margin: 0;
		}
	}
}

</style>
