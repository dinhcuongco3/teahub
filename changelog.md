0.0.3 - b33fee667af2a182e400de16f111a05d51e37a61
  * Add exports for the rest of the components
	* Lint files
	* Under the hood:
	** Eslint
	*** Ignore `/dist`
	*** Move `vue` rule `js` for index.js file
	*** `style` typo (should be `styles`)
	** Add back firebase because of dependency cleanup that needs done

0.0.2 - b4dc79cadb2cd572fb3c767e3b76fc72ceab1d46
  * MyButton - Bugs
	** Still focus on exporting just the one component
	** Ensure styles are included in the npm build
	** Ensure component is exported from `src/`
	** Ensure files are built in `dist` appropriately
	**

0.0.1 - a7bdd2c78c57697d6810e9f5a22f6954155b8d6b
	* MyButton
	** Focus on exporting just the one module through npm
	** Ensure styles and component were separated
	* Under the hood:
	** vite.config
	*** Cleanup file
	*** Ensure `lib` property is configured
	*** Ensure `rollupOptions` are utilized
  ** package.json
  *** Add `vue-cal` to keywords
	*** Make storybook as devDep

0.0.0 - 3a7859d0802f90bb1e638fbedf8127bae9f3347a..58a9e0f8551e83f22c4da41b3179895b0f0a362f
  * Initialize vue components from personal projects
	** 31 components pulled in
	** Get coverage as close to 100% as possible
	* Setup framework for project
	** Eslint
	** Vitest
	*** Setup testing for those components - 99% coverages
	*** 
	** Vite
	** Vue3
	** Storybook
	** Less CSS
	** Some mock data
	** MIT License
