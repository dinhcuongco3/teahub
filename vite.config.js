import {resolve} from "path"
import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    vue(),
    // antd introduces configuration on demand
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
    // File suffix name that needs to be omitted Note: If an ignored suffix name is configured here, an error will be reported if it is imported with a suffix name
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
    modules: true,
  },
  // Package configuration
  build: {
    target: "modules",
    outDir: "lib", // Specify the output path
    assetsDir: "assets", // Specify the storage path of the generated static resources
    minify: "terser", // obfuscator, the file size is smaller after terser is built
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/teahub.js'),
      name: 'teahub',
      // the proper extensions will be added
      fileName: (format) => `YOUR_LIBRARY_NAME.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  // Local running configuration, and reverse proxy configuration
  server: {
    cors: true, // enable by default and allow any source
    open: true, // automatically open the application in the browser when the server starts
    // Reverse proxy configuration, pay attention to the writing of rewrite, I did not read the document at the beginning, I stepped on the pit here
    proxy: {
      "/api": {
        target: "http://localhost:9091", // Proxy interface
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
