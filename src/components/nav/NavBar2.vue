The general navbar for our project
<template>
	<div class="nav-wrapper">
		<div class="nav-width">
			<div class="nav-items">
				<router-link
					class="nav-item"
					to="/"
				>
					Home
				</router-link>
				<router-link
					class="nav-item"
					to="/about"
				>
					About
				</router-link>
				<router-link
					class="nav-item"
					to="/stop-tolling"
				>
					<font-awesome-icon icon="fa-solid fa-ban" />&nbsp;Tolling
				</router-link>
			</div>
			<div class="flex-col action-buttons">
				<EmailButton
					:email="endorseEmail"
				>
					<span class="color-my-black font-size-">ENDORSE</span>
				</EmailButton>
				<EmailButton
					:email="email"
				>
					<span class="color-my-black font-size-">EMAIL</span>
				</EmailButton>
			</div>
		</div>
	</div>
</template>

<script>
import EmailButton from "@/components/buttons/EmailButton"

export default {
	name: "NavBar",
	components:
	{
		EmailButton,
	},
	data () 
	{
		return {
			email: "Tanner.L.Woody@gmail.com",
		}
	},
	computed:
	{
		/** @returns {string} endorsement email with subject and body auto filled */
		endorseEmail ()
		{
			const subject = "I will vote for Woody"
			const body = `Please authenticate yourself with a full name and residing 
				West Linn Neighborhood`
			return `${this.email}?subject=${subject}&body=${body}`
		},
	},
}
</script>

<style lang="less" >
@import "../../../assets/styles/styles";

/* @todo setup a main file and set margins/padding there probably */
.nav-wrapper {
	@v-padding: 30px;
	align-content: center;
	align-items: center;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	flex-wrap: nowrap;
	justify-content: center;
	padding: 10px;
	padding-bottom: @v-padding;
	padding-top: @v-padding;
	position: relative;
	width: 100%;

	.nav-width {
		align-content: center;
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		flex-wrap: nowrap;
		justify-content: center;
		max-width: @maxwidth;
		width: 100%;
	}

	.action-buttons {
		display: flex;
		flex-grow: 1;
		flex-shrink: 0;
		width: 100%;
	}
	.nav-items {
		align-self: center;
		align-content: center;
		display: flex;
		justify-content: center;
		flex-grow: 1;

		.nav-item {
			align-items: center;
			align-content: center;
			justify-content: center;
			background: @color-pastel-blue;
			border-radius: 5px;
			color: @myblack;
			display: flex;
			flex-grow: 1;
			padding: 5px;
			margin: 5px;
			//padding-bottom: 0;
			//margin-bottom: 0;
			text-decoration: none;

			&.router-link-exact-active {
				background-color: white;
			}
		}
	}
	.flex-col {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: end;
		max-width: min(35%, 200px);
		width: 100%;
	}
a.router-link-exact-active {
	color: @color-pastel-green;
	font-size: 21px;
	transition: all .25s;
}

}
</style>
