<template>
	<div class="dialog-modal" v-if="visible">
		<div
			class="dialog-overlay"
			@click="close"/>
		<div
			class="dialog-content"
			:style="{ backgroundColor: backgroundColor }"
		>
			<h2
				class="dialog-header"
				:style="{ backgroundColor: headerColor }"
			>
				<slot name="title"/>
			</h2>
			<div
				class="dialog-body"
				:style="{ backgroundColor: bodyColor }"
			>
				<slot name="body"/>
			</div>
			<div
				class="dialog-footer"
				:style="{ backgroundColor: footerColor }"
			>
				<MyButton
					class="dialog-button"
					:style="{ backgroundColor: buttonColor }"
					@click="close"
				>
					{{ closeButtonLabel }}
				</MyButton>
			</div>
		</div>
	</div>
</template>

<script>
import MyButton from "components/buttons/MyButton"

export default {
	name: "DialogModal",
	components:
	{
		MyButton,
	},
	props: {
		backgroundColor: {
			default: "#FFFFFF",
			type: String,
		},
		bodyColor: {
			default: "#FFFFFF",
			type: String,
		},
		buttonColor: {
			default: "#FFFFFF",
			type: String,
		},
		closeButtonLabel: {
			default: "Close",
			type: String,
		},
		footerColor: {
			default: "#2196F3",
			type: String,
		},
		headerColor: {
			default: "#2196F3",
			type: String,
		},
		visible: {
			required: true,
			type: Boolean,
		},
	},
	methods: {
		close () 
		{
			this.$emit("close")
		},
	},
}
</script>

<style>
.dialog-modal {
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 9999;
}

.dialog-overlay {
	background-color: rgba(0, 0, 0, 0.5);
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}

.dialog-content {
	border-radius: 5px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	max-width: 440px;
	padding: 20px;
	position: relative;
	z-index: 1;
}

.dialog-header {
	border-radius: 5px 5px 0 0;
	color: #FFFFFF;
	font-weight: bold;
	margin-bottom: 20px;
}
.dialog-body {
	color: #FFFFFF;
	font-weight: 600;
	margin: 0;
	padding: 0;
}
.dialog-footer {
	background-color: #2196F3;
	border-radius: 0 0 5px 5px;
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
	padding: 10px 20px;

	.dialog-button {
		border: 2px solid #2196F3;
		border-radius: 5px;
		cursor: pointer;
		margin-left: 10px;
		padding: 10px 20px;
		transition: all 0.2s ease-in-out;
	}
}
</style>
