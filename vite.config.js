import {resolve} from "path"
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    // Path alias configuration
    alias: {
      "@": resolve(__dirname, ".", "src"),
      components: resolve(__dirname, "src/components/"),
      constants: resolve(__dirname, "src/constants/"),
      find: /^~/,
      replacement: "",
      img: resolve(__dirname, "assets/img"),
      services: resolve(__dirname, "src/services/"),
      src: resolve(__dirname, "src"),
      store: resolve(__dirname, "src/store/"),
      styles: resolve(__dirname, "src/assets/styles/"),
      svgs: resolve(__dirname, "src/assets/svgs/"),

    },
    mainFields: [
      "module",
    ],
    // File suffix name that needs to be omitted
    // Note: If an ignored suffix name is configured here,
    // an error will be reported if it is imported with a suffix name
    extensions: [
      ".vue",
      ".js",
    ],
  },
  // Mandatory pre-built plugin package
  optimizeDeps: {
    include: [
      "vue-cal/dist/vuecal.common.js",
    ],
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // TODO: What does this do
    modules: true,
  },
  // Package configuration
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.js"),
      name: "teahub",
      // the proper extensions will be added
      // fileName: 'teahub'
      fileName: (format) => `teahub.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "vue",
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  // Local running configuration, and reverse proxy configuration
  server: {
    cors: true, // enable by default and allow any source
    open: true, // automatically open the application in the browser when the server starts
  },
})
