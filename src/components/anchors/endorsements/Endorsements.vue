<template>
	<div class="flex-box endorsements-wrapper">
		<ul>
			<li
				v-for="endorser in endorsers"
				:key="endorser.id"
			>
				<Endorsement
					:href="endorser.href"
					:fullname="endorser.fullname"
					:position="endorser.position"
				/>
			</li>
			<li>
				Engaged Citizens:
				<ul>
					<li
						v-for="endorser in ENDORSERS.CITIZENS"
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
import Endorsement from "components/anchors/endorsements/Endorsement"
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
}
</script>

<style lang="less">
@import "../../../../assets/styles/styles";

</style>
