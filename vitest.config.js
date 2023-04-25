import { defineConfig } from 'vitest/config'
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [Vue()],
	root: ".", //Define the root
	test: {
		globals: true,
		environment: "jsdom",
		// The file extension of your test files
		include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
	}
})
