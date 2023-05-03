import MyButton from 'components/buttons/MyButton.vue'

export default {
	install: (app, options) => {
		app.component('MyButton', MyButton);
	},
}
