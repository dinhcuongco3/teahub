<template>
  <div id="app">
		<component
			id="content-wrapper"
			:is="Component"
		/>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data: function()
  {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {},
}
</script>
