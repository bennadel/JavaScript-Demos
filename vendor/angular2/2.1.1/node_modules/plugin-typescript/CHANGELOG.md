<a name="5.1.1"></a>
## [5.1.1](https://github.com/frankwallis/plugin-typescript/compare/5.1.0...5.1.1) <sub>(2016-09-04)</sub>


### Features

* **typings:** automatically resolve typings files under 'typings' packages ([b01b26a](https://github.com/frankwallis/plugin-typescript/commit/b01b26a))
* **typings:** add 'typings' compiler option ([ee8551d](https://github.com/frankwallis/plugin-typescript/commit/ee8551d))



<a name="5.0.20"></a>
## [5.0.20](https://github.com/frankwallis/plugin-typescript/compare/5.0.19...5.0.20) <sub>(2016-09-03)</sub>


### Bug Fixes

* **scoped-packages:** fix for typings resolution under scoped package, bump 5.0.20 ([956a5ad](https://github.com/frankwallis/plugin-typescript/commit/956a5ad))
* **types:** patch for jspm[@0](https://github.com/0).16 defaultJsExtensions, bump 5.0.19 ([cea087f](https://github.com/frankwallis/plugin-typescript/commit/cea087f))



<a name="5.0.18"></a>
## [5.0.18](https://github.com/frankwallis/plugin-typescript/compare/5.0.17...5.0.18) <sub>(2016-08-23)</sub>


### Bug Fixes

* **logging:** remove debug logging ([e09945c](https://github.com/frankwallis/plugin-typescript/commit/e09945c))



<a name="5.0.17"></a>
## [5.0.17](https://github.com/frankwallis/plugin-typescript/compare/5.0.16...5.0.17) <sub>(2016-08-22)</sub>


### Features

* **@types:** use existing 'types' compiler option ([caf89c1](https://github.com/frankwallis/plugin-typescript/commit/caf89c1))
* **attypes:** fix for resolving type references ([987e7f2](https://github.com/frankwallis/plugin-typescript/commit/987e7f2))
* **@types:** support type reference directives ([4527d8e](https://github.com/frankwallis/plugin-typescript/commit/4527d8e))
* **@types:** default [@types](https://github.com/types) main to index.d.ts ([1c7674d](https://github.com/frankwallis/plugin-typescript/commit/1c7674d))
* **@types:** new 'types' compiler option for [@types](https://github.com/types) support, bump 5.0.12 ([953bcf7](https://github.com/frankwallis/plugin-typescript/commit/953bcf7))



<a name="5.0.11"></a>
## [5.0.11](https://github.com/frankwallis/plugin-typescript/compare/5.0.9...5.0.11) <sub>(2016-08-21)</sub>


### Bug Fixes

* **reporting:** suppress duplicate module resolution errors ([af18c80](https://github.com/frankwallis/plugin-typescript/commit/af18c80))

### Features

* **lib-option:** provide back-support for targetLib, don't load lib files when transpiring ([3b9dc3b](https://github.com/frankwallis/plugin-typescript/commit/3b9dc3b))
* **typescript-2.0:** add support for lib compiler option ([b2367de](https://github.com/frankwallis/plugin-typescript/commit/b2367de))



<a name="5.0.9"></a>
## [5.0.9](https://github.com/frankwallis/plugin-typescript/compare/5.0.8...5.0.9) <sub>(2016-08-03)</sub>


### Features

* **perf:** prevent unnecessary calls to getAllDiagnostics ([b14ed99](https://github.com/frankwallis/plugin-typescript/commit/b14ed99))
* **rollup:** fix failing tests ([542da97](https://github.com/frankwallis/plugin-typescript/commit/542da97))
* **rollup:** fix failing tests ([6f6dd92](https://github.com/frankwallis/plugin-typescript/commit/6f6dd92))
* **rollup:** fix failing tests ([928eb88](https://github.com/frankwallis/plugin-typescript/commit/928eb88))



<a name="5.0.8"></a>
## [5.0.8](https://github.com/frankwallis/plugin-typescript/compare/5.0.6...5.0.8) <sub>(2016-07-17)</sub>


### Features

* **rollup:** don't automatically switch output from system -> es6 modules ([50198a2](https://github.com/frankwallis/plugin-typescript/commit/50198a2))
* **rollup:** default allowSyntheticDefaultImports to true ([3774d4e](https://github.com/frankwallis/plugin-typescript/commit/3774d4e))



<a name="5.0.6"></a>
## [5.0.6](https://github.com/frankwallis/plugin-typescript/compare/5.0.4...5.0.6) <sub>(2016-07-16)</sub>


### Features

* **logging:** specify type of log message ([f10d977](https://github.com/frankwallis/plugin-typescript/commit/f10d977))
* **rollup:** fix for bundling issue when outputting commonjs ([c83e7ab](https://github.com/frankwallis/plugin-typescript/commit/c83e7ab))



<a name="5.0.4"></a>
## [5.0.4](https://github.com/frankwallis/plugin-typescript/compare/5.0.1...5.0.4) <sub>(2016-07-16)</sub>


### Features

* **strict-mode:** improve typeCheck 'strict' ([217d67b](https://github.com/frankwallis/plugin-typescript/commit/217d67b))
* **rollup:** support rollup when bundling ([f4bbce2](https://github.com/frankwallis/plugin-typescript/commit/f4bbce2))
* **strict-mode:** improve typeCheck 'strict' ([dd81c4a](https://github.com/frankwallis/plugin-typescript/commit/dd81c4a))


### Bug Fixes

* **augmentation:** warn when trying to resolve module 'global', patch for [#144](https://github.com/frankwallis/plugin-typescript/issues/144) ([0890792](https://github.com/frankwallis/plugin-typescript/commit/0890792))



<a name="5.0.1"></a>
## [5.0.1](https://github.com/frankwallis/plugin-typescript/compare/5.0.0...5.0.1) <sub>(2016-07-12)</sub>


### Features

* **wildcard-modules:** remove deprecated supportHtmlImports/resolveAmbientRefs from examples and docs ([8cb83f6](https://github.com/frankwallis/plugin-typescript/commit/8cb83f6))
* **esm-deps:** es modules now support metadata.deps, remove workaround ([0a88fda](https://github.com/frankwallis/plugin-typescript/commit/0a88fda))
* **typescript-2.0.0:** upgrade to typescript[@2](https://github.com/2).0.0, bump 5.0.0 ([1aa05b3](https://github.com/frankwallis/plugin-typescript/commit/1aa05b3))



<a name="4.0.16"></a>
## [4.0.16](https://github.com/frankwallis/plugin-typescript/compare/4.0.15...4.0.16) <sub>(2016-05-16)</sub>


### Bug Fixes

* **plugin-json:** fix for issue importing json with plugin-json, bump 4.0.16 ([d47f836](https://github.com/frankwallis/plugin-typescript/commit/d47f836))



<a name="4.0.15"></a>
## [4.0.15](https://github.com/frankwallis/plugin-typescript/compare/4.0.10...4.0.15) <sub>(2016-05-15)</sub>


### Bug Fixes

* **html-imports:** fix for html imports using commonjs/es6, bump 4.0.15 ([ea6bd13](https://github.com/frankwallis/plugin-typescript/commit/ea6bd13))
* **logging:** turn off debug logging, bump 4.0.14 ([8beb22f](https://github.com/frankwallis/plugin-typescript/commit/8beb22f))
* **elided-imports:** add fix for plugin, bump 4.0.12 ([da5a93e](https://github.com/frankwallis/plugin-typescript/commit/da5a93e))
* **elided-imports:** add fix for es6 output, bump 4.0.11 ([bc9bfb0](https://github.com/frankwallis/plugin-typescript/commit/bc9bfb0))
* **elided-imports:** add fix to set metadata.deps after instantiation ([647828a](https://github.com/frankwallis/plugin-typescript/commit/647828a))

### Features

* **e2e:** add some integration tests ([ba1ca96](https://github.com/frankwallis/plugin-typescript/commit/ba1ca96))
* **elided-imports:** add tests for builder ([c5b26ee](https://github.com/frankwallis/plugin-typescript/commit/c5b26ee))
* **elided-imports:** add tests for execution ([d75baaa](https://github.com/frankwallis/plugin-typescript/commit/d75baaa))


<a name="4.0.10"></a>
## [4.0.10](https://github.com/frankwallis/plugin-typescript/compare/4.0.9...4.0.10) <sub>(2016-05-09)</sub>


### Bug Fixes

* **ambientExternalModules:** fix for issue compiling `declare module '../somemodule'`, closes [#125](https://github.com/frankwallis/plugin-typescript/issues/125), bump 4.0.10 ([ea8a49c](https://github.com/frankwallis/plugin-typescript/commit/ea8a49c))



<a name="4.0.9"></a>
## [4.0.9](https://github.com/frankwallis/plugin-typescript/compare/4.0.8...4.0.9) <sub>(2016-05-04)</sub>


### Bug Fixes

* **relative-typings:** lookup typings for all js imports, add test, bump 4.0.9 ([a15da0d](https://github.com/frankwallis/plugin-typescript/commit/a15da0d))



<a name="4.0.8"></a>
## [4.0.8](https://github.com/frankwallis/plugin-typescript/compare/4.0.7...4.0.8) <sub>(2016-04-30)</sub>


### Bug Fixes

* **build-execution:** use metadata.deps to inject files into build or add import source when outputting es6 ([08631fc](https://github.com/frankwallis/plugin-typescript/commit/08631fc))



<a name="4.0.7"></a>
## [4.0.7](https://github.com/frankwallis/plugin-typescript/compare/4.0.6...4.0.7) <sub>(2016-04-22)</sub>


### Bug Fixes

* **double-evaluation:** fix for modules being evaluated twice, closes [#119](https://github.com/frankwallis/plugin-typescript/issues/119), bump 4.0.7 ([3ae63b7](https://github.com/frankwallis/plugin-typescript/commit/3ae63b7))



<a name="4.0.6"></a>
## [4.0.6](https://github.com/frankwallis/plugin-typescript/compare/4.0.5...4.0.6) <sub>(2016-04-17)</sub>


### Bug Fixes

* **elided-imports:** fix for issue where .ts import file was being elided, closes [#117](https://github.com/frankwallis/plugin-typescript/issues/117), bump 4.0.6 ([58cc11c](https://github.com/frankwallis/plugin-typescript/commit/58cc11c))



<a name="4.0.5"></a>
## [4.0.5](https://github.com/frankwallis/plugin-typescript/compare/4.0.4...4.0.5) <sub>(2016-03-27)</sub>


### Bug Fixes

* **strict:** fix for typeCheck: 'strict' ([7560f57](https://github.com/frankwallis/plugin-typescript/commit/7560f57))



<a name="4.0.4"></a>
## [4.0.4](https://github.com/frankwallis/plugin-typescript/compare/4.0.2...4.0.4) <sub>(2016-03-27)</sub>

### Bug Fixes

* **hot-reload:** add relativeTo setting for chokidar ([6c6fd1c](https://github.com/frankwallis/plugin-typescript/commit/6c6fd1c))
* **html-import:** fix for importing html with module: 'es6' ([7455a00](https://github.com/frankwallis/plugin-typescript/commit/7455a00))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/frankwallis/plugin-typescript/compare/4.0.1...4.0.2) <sub>(2016-03-02)</sub>


### Bug Fixes

* **angular2:** fix the clear button ([72bd341](https://github.com/frankwallis/plugin-typescript/commit/72bd341))
* **errors:** improve error reporting when files are missing ([5d03379](https://github.com/frankwallis/plugin-typescript/commit/5d03379))


### Features

* **angular2:** improve angular2 example ([e1047f6](https://github.com/frankwallis/plugin-typescript/commit/e1047f6))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/frankwallis/plugin-typescript/compare/4.0.0...4.0.1) <sub>(2016-02-22)</sub>

### Features

* **typings:** enable typings to be specified with filename of bundle ([0d99c42](https://github.com/frankwallis/plugin-typescript/commit/0d99c42))
* **typings:** get typings configuration from meta ([b055f46](https://github.com/frankwallis/plugin-typescript/commit/b055f46))



<a name="3.0.3"></a>
## [3.0.3](https://github.com/frankwallis/plugin-typescript/compare/3.0.2...3.0.3) <sub>(2016-02-14)</sub>


### Features

* **typingsMap:** add typingsMap option ([e843a48](https://github.com/frankwallis/plugin-typescript/commit/e843a48))
* **typingsMap:** enable type-checking in angular2 example ([4334271](https://github.com/frankwallis/plugin-typescript/commit/4334271))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/frankwallis/plugin-typescript/compare/3.0.1...3.0.2) <sub>(2016-02-08)</sub>


### Bug Fixes

* **bundling:** revert rollup support change ([57c0250](https://github.com/frankwallis/plugin-typescript/commit/57c0250))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/frankwallis/plugin-typescript/compare/2.6.0...3.0.1) <sub>(2016-02-06)</sub>


### Bug Fixes

* **transpile:** override noEmit option in tsconfig ([921a829](https://github.com/frankwallis/plugin-typescript/commit/921a829))

### Features

* **rollup:** output es6 when bundling ([c81dd2d](https://github.com/frankwallis/plugin-typescript/commit/c81dd2d))



<a name="2.6.0"></a>
# [2.6.0](https://github.com/frankwallis/plugin-typescript/compare/2.5.11...2.6.0) <sub>(2016-02-04)</sub>


### Bug Fixes

* **sourceMap:** set metadata.sourceMap as object not string ([9563d72](https://github.com/frankwallis/plugin-typescript/commit/9563d72))



<a name="2.5.11"></a>
## [2.5.11](https://github.com/frankwallis/plugin-typescript/compare/2.5.10...2.5.11) <sub>(2016-02-04)</sub>


### Features

* **targetLib:** add the targetLib option to use lib.d.ts ([22cf0d8](https://github.com/frankwallis/plugin-typescript/commit/22cf0d8))



<a name="2.5.10"></a>
## [2.5.10](https://github.com/frankwallis/plugin-typescript/compare/2.5.8...2.5.10) <sub>(2016-02-03)</sub>


### Bug Fixes

* **bundling:** switch to using System.import instead of metadata.deps ([671ad1e](https://github.com/frankwallis/plugin-typescript/commit/671ad1e))
* **transpile:** add new 'suppressOutputPathCheck' option when transpiling ([d2158e0](https://github.com/frankwallis/plugin-typescript/commit/d2158e0))



<a name="2.5.8"></a>
## [2.5.8](https://github.com/frankwallis/plugin-typescript/compare/2.5.3...2.5.8) <sub>(2016-01-31)</sub>


### Bug Fixes

* **source-maps:** undo previous change to fix source maps ([9a8937f](https://github.com/frankwallis/plugin-typescript/commit/9a8937f))
* **js-transpile:** redirect transpiler output to prevent 'cannot overwrite existing file' error in typescript-1.8.0-beta ([6a02fe5](https://github.com/frankwallis/plugin-typescript/commit/6a02fe5))
* **windows:** fix tests on windows ([9183e0d](https://github.com/frankwallis/plugin-typescript/commit/9183e0d))



<a name="2.5.3"></a>
## [2.5.3](https://github.com/frankwallis/plugin-typescript/compare/2.5.1...2.5.3) <sub>(2016-01-26)</sub>


### Bug Fixes

* **example:** add workaround for module detection issue ([8743a79](https://github.com/frankwallis/plugin-typescript/commit/8743a79))
* **references:** fix to suppress type errors from reference files without references ([2dc7b8a](https://github.com/frankwallis/plugin-typescript/commit/2dc7b8a))


### Features

* **hot-reload:** add support for hot-reloading css in examples ([8ecbf6b](https://github.com/frankwallis/plugin-typescript/commit/8ecbf6b))
* **jspm-0.17:** fix the bundle, rename bundle -> build ([28b8ccf](https://github.com/frankwallis/plugin-typescript/commit/28b8ccf))
* **jspm-0.17:** update angular2 project (zonejs issue in browser) ([bffdf6e](https://github.com/frankwallis/plugin-typescript/commit/bffdf6e))
* **jspm-0.17:** update readme ([0ded2dc](https://github.com/frankwallis/plugin-typescript/commit/0ded2dc))
* **jspm-0.17:** upgrade react and angular packages ([679a06e](https://github.com/frankwallis/plugin-typescript/commit/679a06e))
* **jspm-0.17:** use plugin-typescript as default transpiler ([edd5b6c](https://github.com/frankwallis/plugin-typescript/commit/edd5b6c))
* **npm:** exclude files from npm ([5fb8a43](https://github.com/frankwallis/plugin-typescript/commit/5fb8a43))



<a name="2.5.1"></a>
## [2.5.1](https://github.com/frankwallis/plugin-typescript/compare/2.5.0...2.5.1) <sub>(2016-01-23)</sub>


### Bug Fixes

* **example:** fix react example ([17e4dc0](https://github.com/frankwallis/plugin-typescript/commit/17e4dc0))
* **hot-reload:** re-check files when dependents change ([33e7505](https://github.com/frankwallis/plugin-typescript/commit/33e7505))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/frankwallis/plugin-typescript/compare/2.4.9...2.5.0) <sub>(2016-01-23)</sub>


### Features

* **hot-reload:** support hot-reloading ([95fd23e](https://github.com/frankwallis/plugin-typescript/commit/95fd23e))
* **warnings:** add a warning if output format is not system.register ([8282b3c](https://github.com/frankwallis/plugin-typescript/commit/8282b3c))



<a name="2.4.9"></a>
## [2.4.9](https://github.com/frankwallis/plugin-typescript/compare/2.4.8...2.4.9) <sub>(2016-01-20)</sub>


### Bug Fixes

* **bundling:** fix for babel bundling ([2ae35c3](https://github.com/frankwallis/plugin-typescript/commit/2ae35c3))



<a name="2.4.8"></a>
## [2.4.8](https://github.com/frankwallis/plugin-typescript/compare/2.4.7...2.4.8) <sub>(2016-01-20)</sub>


### Bug Fixes

* **bundling:** workaround for resolution errors when bundling, switch to system.register format ([467cada](https://github.com/frankwallis/plugin-typescript/commit/467cada))



<a name="2.4.7"></a>
## [2.4.7](https://github.com/frankwallis/plugin-typescript/compare/2.4.6...2.4.7) <sub>(2016-01-16)</sub>


### Bug Fixes

* **source-maps:** fix for source-maps not working ([d628f2a](https://github.com/frankwallis/plugin-typescript/commit/d628f2a))
* **tests:** fix paths issue when running tests on windows ([396adbc](https://github.com/frankwallis/plugin-typescript/commit/396adbc))



<a name="2.4.6"></a>
## [2.4.6](https://github.com/frankwallis/plugin-typescript/compare/2.4.5...2.4.6) <sub>(2016-01-09)</sub>


### Bug Fixes

* **translate:** translate should return load.source instead of load, closes [#81](https://github.com/frankwallis/plugin-typescript/issues/81) ([ff32996](https://github.com/frankwallis/plugin-typescript/commit/ff32996))
* **typings:** fix for non-relative typings path, closes [#80](https://github.com/frankwallis/plugin-typescript/issues/80) ([dca6aca](https://github.com/frankwallis/plugin-typescript/commit/dca6aca))



<a name="2.4.5"></a>
## [2.4.5](https://github.com/frankwallis/plugin-typescript/compare/2.4.4...2.4.5) <sub>(2016-01-02)</sub>


### Bug Fixes

* **moduleResolution:** force module resolution into classic mode, bump 2.4.5 ([c3b71bf](https://github.com/frankwallis/plugin-typescript/commit/c3b71bf))



<a name="2.4.4"></a>
## [2.4.4](https://github.com/frankwallis/plugin-typescript/compare/2.4.3...2.4.4) <sub>(2015-12-23)</sub>


### Bug Fixes

* **noEmitOnErrors:** fix for transpiler not reporting/overriding options which are invalid with isolatedModules, closes [#75](https://github.com/frankwallis/plugin-typescript/issues/75), bump 2.4.4 ([c95c40f](https://github.com/frankwallis/plugin-typescript/commit/c95c40f))



<a name="2.4.3"></a>
## [2.4.3](https://github.com/frankwallis/plugin-typescript/compare/2.4.2...2.4.3) <sub>(2015-12-12)</sub>


### Bug Fixes

* **source-maps:** fix for source-maps not work due to previous change ([f3f4d21](https://github.com/frankwallis/plugin-typescript/commit/f3f4d21))



<a name="2.4.2"></a>
## [2.4.2](https://github.com/frankwallis/plugin-typescript/compare/2.4.1...2.4.2) <sub>(2015-12-10)</sub>


### Bug Fixes

* **parse-error:** fix for parse error when source map undefined ([2eb92c0](https://github.com/frankwallis/plugin-typescript/commit/2eb92c0))



<a name="2.4.1"></a>
## [2.4.1](https://github.com/frankwallis/plugin-typescript/compare/2.4.0...2.4.1) <sub>(2015-12-10)</sub>


### Bug Fixes

* **IE10-Map:** remove references to map, bump 2.4.1, closes [#70](https://github.com/frankwallis/plugin-typescript/issues/70) ([59df643](https://github.com/frankwallis/plugin-typescript/commit/59df643))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/frankwallis/plugin-typescript/compare/2.3.2...2.4.0) <sub>(2015-12-05)</sub>


### Bug Fixes

* **module:** support output of js in module formats other than 'system' (e.g. 'es6' piped to babel), bump 2.4.0 ([f2a6554](https://github.com/frankwallis/plugin-typescript/commit/f2a6554))



<a name="2.3.2"></a>
## [2.3.2](https://github.com/frankwallis/plugin-typescript/compare/2.3.0...2.3.2) <sub>(2015-12-01)</sub>


### Bug Fixes

* **__moduleName:** don't emit __moduleName in build mode ([1cee03a](https://github.com/frankwallis/plugin-typescript/commit/1cee03a))
* **strict-mode:** fail the build when typeCheck errors in strict mode ([14141ab](https://github.com/frankwallis/plugin-typescript/commit/14141ab))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/frankwallis/plugin-typescript/compare/2.2.3...2.3.0) <sub>(2015-12-01)</sub>



<a name="2.2.3"></a>
## [2.2.3](https://github.com/frankwallis/plugin-typescript/compare/2.2.2...2.2.3) <sub>(2015-11-29)</sub>


### Bug Fixes

* **Object.assign:** remove usage of Object.assign, closes [#61](https://github.com/frankwallis/plugin-typescript/issues/61) ([7ee0da7](https://github.com/frankwallis/plugin-typescript/commit/7ee0da7))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/frankwallis/plugin-typescript/compare/2.2.0...2.2.2) <sub>(2015-11-15)</sub>


### Features

* **typings:** support loading typings from package.son (resolveTypings: true) ([519baa1](https://github.com/frankwallis/plugin-typescript/commit/519baa1))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/frankwallis/plugin-typescript/compare/2.1.6...2.2.0) <sub>(2015-11-04)</sub>


### Bug Fixes

* **extensions:** sanitize extensions ([b3c1fc5](https://github.com/frankwallis/plugin-typescript/commit/b3c1fc5))
* **resolution:** fix for json file resolution ([f642d49](https://github.com/frankwallis/plugin-typescript/commit/f642d49))


### Features

* **no-lib:** observe no-lib option ([591dca4](https://github.com/frankwallis/plugin-typescript/commit/591dca4))
* **no-lib-check:** use the built in skipDefaultLibCheck compiler option ([1d2d09d](https://github.com/frankwallis/plugin-typescript/commit/1d2d09d))



<a name="2.1.6"></a>
## [2.1.6](https://github.com/frankwallis/plugin-typescript/compare/2.1.5...2.1.6) <sub>(2015-11-03)</sub>


### Bug Fixes

* **module:** fix for __moduleName reference error ([7d8b545](https://github.com/frankwallis/plugin-typescript/commit/7d8b545))
* **source-maps:** fix for source maps ([dcd2a3f](https://github.com/frankwallis/plugin-typescript/commit/dcd2a3f))
* **tsconfig:** fix for error when declaration files present but typeCheck false, bump 2.1.6 ([c92c0c1](https://github.com/frankwallis/plugin-typescript/commit/c92c0c1))


### Features

* **0.17:** convert source to typescript and precompile ([2310fbd](https://github.com/frankwallis/plugin-typescript/commit/2310fbd))
* **0.17:** target es5 but use lib.es6.d.ts, strip comments ([800f702](https://github.com/frankwallis/plugin-typescript/commit/800f702))
* **examples:** use jspm.Builder instead of systemjs-builder ([d1e064d](https://github.com/frankwallis/plugin-typescript/commit/d1e064d))



<a name="2.1.5"></a>
## [2.1.5](https://github.com/frankwallis/plugin-typescript/compare/2.1.4...2.1.5) <sub>(2015-11-01)</sub>


### Bug Fixes

* **example:** fix angular2 config ([b3a56dd](https://github.com/frankwallis/plugin-typescript/commit/b3a56dd))
* **logger:** fix for typo in logger, bump 2.1.5 ([de4e46b](https://github.com/frankwallis/plugin-typescript/commit/de4e46b))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/frankwallis/plugin-typescript/compare/2.1.3...2.1.4) <sub>(2015-10-26)</sub>


### Features

* **linked-errors:** link errors to location in source file, bump 2.1.4 ([aeabfa9](https://github.com/frankwallis/plugin-typescript/commit/aeabfa9))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/frankwallis/plugin-typescript/compare/2.1.2...2.1.3) <sub>(2015-10-26)</sub>


### Bug Fixes

* **strict:** fix bug in strict mode, bump 2.1.3 ([e36836c](https://github.com/frankwallis/plugin-typescript/commit/e36836c))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/frankwallis/plugin-typescript/compare/2.1.1...2.1.2) <sub>(2015-10-21)</sub>


### Bug Fixes

* **config:** fix for config parsing [#47](https://github.com/frankwallis/plugin-typescript/issues/47) ([0f9e78a](https://github.com/frankwallis/plugin-typescript/commit/0f9e78a))
* **typescript@1.7:** add support for typescript 1.7 nightly build ([05bfa62](https://github.com/frankwallis/plugin-typescript/commit/05bfa62))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/frankwallis/plugin-typescript/compare/2.0.17...2.1.0) <sub>(2015-10-14)</sub>


### Features

* **strict:** add a strict mode which fails the build on type-check errors ([673f416](https://github.com/frankwallis/plugin-typescript/commit/673f416))
* **tsconfig:** load compiler options from tsconfig.json ([70c10bf](https://github.com/frankwallis/plugin-typescript/commit/70c10bf))
* **tsconfig:** load declaration files from tsconfig.json ([2760c34](https://github.com/frankwallis/plugin-typescript/commit/2760c34))
* **tsconfig:** use tsconfig in examples ([5ad7e45](https://github.com/frankwallis/plugin-typescript/commit/5ad7e45))



<a name="2.0.17"></a>
## [2.0.17](https://github.com/frankwallis/plugin-typescript/compare/2.0.11...2.0.17) <sub>(2015-09-19)</sub>


### Bug Fixes

* **bundling:** fix for type-checking error when bundling with systemjs-builder[@0](https://github.com/0).14, bump 2.0.17 ([c33811e](https://github.com/frankwallis/plugin-typescript/commit/c33811e))
* **transpiler:** fix for incorrect return type from resolveModuleNames, bump 2.0.16 ([07e7162](https://github.com/frankwallis/plugin-typescript/commit/07e7162))
* **type-checker:** put back unneeded code, bump 2.0.15 ([e2da77d](https://github.com/frankwallis/plugin-typescript/commit/e2da77d))
* **incremental-build:** fix the flow task ([916c38b](https://github.com/frankwallis/plugin-typescript/commit/916c38b))



<a name="2.0.11"></a>
## [2.0.11](https://github.com/frankwallis/plugin-typescript/compare/2.0.10...2.0.11) <sub>(2015-09-01)</sub>


### Features

* **host-resolution:** sanitisation of tsx.ts -> tsx is no longer needed ([9c6c01f](https://github.com/frankwallis/plugin-typescript/commit/9c6c01f))
* **multiple-packages:** support type-checking over multiple packages ([a702177](https://github.com/frankwallis/plugin-typescript/commit/a702177))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/frankwallis/plugin-typescript/compare/2.0.9...2.0.10) <sub>(2015-08-31)</sub>


### Features

* **angular2:** try out ng-model ([6cc6802](https://github.com/frankwallis/plugin-typescript/commit/6cc6802))
* **external-modules:** import example-service from external package ([490a1f9](https://github.com/frankwallis/plugin-typescript/commit/490a1f9))
* **html-templates:** add support for importing .html files as strings without type-check errors, bump 2.0.10 ([0d138e2](https://github.com/frankwallis/plugin-typescript/commit/0d138e2))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/frankwallis/plugin-typescript/compare/2.0.8...2.0.9) <sub>(2015-08-27)</sub>


### Features

* **react:** add support for tsx files ([773f75a](https://github.com/frankwallis/plugin-typescript/commit/773f75a))
* **react:** allow import a from "file.tsx", bump 2.0.9 ([1e46a2b](https://github.com/frankwallis/plugin-typescript/commit/1e46a2b))



<a name="2.0.8"></a>
## [2.0.8](https://github.com/frankwallis/plugin-typescript/compare/2.0.7...2.0.8) <sub>(2015-08-27)</sub>


### Bug Fixes

* **example:** fix the example project bundling ([fa80ac1](https://github.com/frankwallis/plugin-typescript/commit/fa80ac1))


### Features

* **react:** add angular1 example back again ([fda0002](https://github.com/frankwallis/plugin-typescript/commit/fda0002))
* **react:** add react example ([eec3ce4](https://github.com/frankwallis/plugin-typescript/commit/eec3ce4))
* **react:** move angular2 example to subfolder ([408975d](https://github.com/frankwallis/plugin-typescript/commit/408975d))
* **react:** support the jsx configuration option, bump 2.0.8 ([e51793d](https://github.com/frankwallis/plugin-typescript/commit/e51793d))



<a name="2.0.7"></a>
## [2.0.7](https://github.com/frankwallis/plugin-typescript/compare/2.0.0...2.0.7) <sub>(2015-08-24)</sub>


### Bug Fixes

* **source-maps:** fix source-maps, bump 2.0.6 ([a74c768](https://github.com/frankwallis/plugin-typescript/commit/a74c768))
* **es3:** add support for target="es3" ([d899a97](https://github.com/frankwallis/plugin-typescript/commit/d899a97))
* **example:** add correct jspm version to devDependencies ([df46c9a](https://github.com/frankwallis/plugin-typescript/commit/df46c9a))
* **typescriptOptions:** fix for undefined error when typescriptOptions not specified ([d0f24bb](https://github.com/frankwallis/plugin-typescript/commit/d0f24bb))
* **bundling:** fix for bundling error ([f4d945e](https://github.com/frankwallis/plugin-typescript/commit/f4d945e))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/frankwallis/plugin-typescript/compare/2.0.0-beta...2.0.0) <sub>(2015-07-02)</sub>


### Bug Fixes

* **performance:** don't type-check the default lib for better performance ([1c093c8](https://github.com/frankwallis/plugin-typescript/commit/1c093c8))
* **deps:** fix to use anonymous modules ([475a4ea](https://github.com/frankwallis/plugin-typescript/commit/475a4ea))
* **reference-errors:** trap compiler errors in reference files ([b5b8066](https://github.com/frankwallis/plugin-typescript/commit/b5b8066))
* **module-name:** set __moduleName variable ([848c475](https://github.com/frankwallis/plugin-typescript/commit/848c475))


### Features

* **transpile:** working transpile ([df0354c](https://github.com/frankwallis/plugin-typescript/commit/df0354c))
* **transpiler:** error on syntax error ([a75c497](https://github.com/frankwallis/plugin-typescript/commit/a75c497))
* **type-check:** implement type-checking ([ec0fa6d](https://github.com/frankwallis/plugin-typescript/commit/ec0fa6d))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/frankwallis/plugin-typescript/compare/1.0.4...1.0.5) <sub>(2015-06-08)</sub>


### Features

* **es6:** enable setting of target output via options ([2ee7380](https://github.com/frankwallis/plugin-typescript/commit/2ee7380))
* **inject:** add index-inject.html ([71a2216](https://github.com/frankwallis/plugin-typescript/commit/71a2216))
* **resolveAmbientRefs:** add option "resolveAmbientRefs" to disable systems resolution of ambient reference files, default is true ([7c9f531](https://github.com/frankwallis/plugin-typescript/commit/7c9f531))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/frankwallis/plugin-typescript/compare/1.0.0...1.0.4) <sub>(2015-05-19)</sub>


### Bug Fixes

* **inject:** enable using bundles created with jspm bundle --inject, fixes [#19](https://github.com/frankwallis/plugin-typescript/issues/19) ([dfc8e5d](https://github.com/frankwallis/plugin-typescript/commit/dfc8e5d))
* **import-css:** bundling issue when css import present, fixes [#19](https://github.com/frankwallis/plugin-typescript/issues/19) ([ecc42a3](https://github.com/frankwallis/plugin-typescript/commit/ecc42a3))
* **import-js:** fix to enable importing javascript files and for strange compiler bug ([93387eb](https://github.com/frankwallis/plugin-typescript/commit/93387eb))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/frankwallis/plugin-typescript/compare/0.6.7...1.0.0) <sub>(2015-04-20)</sub>


### Features

* **es6:** update the example project to use Map ([3e11374](https://github.com/frankwallis/plugin-typescript/commit/3e11374))
* **es6:** use lib.es6.d.ts to enable Symbol ([76f0928](https://github.com/frankwallis/plugin-typescript/commit/76f0928))



<a name="0.6.7"></a>
## [0.6.7](https://github.com/frankwallis/plugin-typescript/compare/0.6.4...0.6.7) <sub>(2015-04-09)</sub>


### Bug Fixes

* **export-import:** export import no longer available ([e20930c](https://github.com/frankwallis/plugin-typescript/commit/e20930c))
* **ts-15:** add tests for export import ([3f8174e](https://github.com/frankwallis/plugin-typescript/commit/3f8174e))
* **ts-15:** rename Filename -> FileName ([38f11c4](https://github.com/frankwallis/plugin-typescript/commit/38f11c4))



<a name="0.6.4"></a>
## [0.6.4](https://github.com/frankwallis/plugin-typescript/compare/0.6.3...0.6.4) <sub>(2015-04-02)</sub>


### Bug Fixes

* **deps:** pin typescript at 1.4.1 ([84fe362](https://github.com/frankwallis/plugin-typescript/commit/84fe362))
* **bundling:** fix the bundling example ([d1e95b4](https://github.com/frankwallis/plugin-typescript/commit/d1e95b4))


### Features

* **jspm-0.15:** update to jspm 0.15 ([92efd81](https://github.com/frankwallis/plugin-typescript/commit/92efd81))
* **options:** add support for "typescriptOptions" ([a7a53f2](https://github.com/frankwallis/plugin-typescript/commit/a7a53f2))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/frankwallis/plugin-typescript/compare/0.6.1...0.6.2) <sub>(2015-03-26)</sub>


### Bug Fixes

* **ambient-refs:** ensure that the ambient references are resolved to the same file ([693fa53](https://github.com/frankwallis/plugin-typescript/commit/693fa53))
* **bundling:** change the registry from nom -> jspm ([3aae941](https://github.com/frankwallis/plugin-typescript/commit/3aae941))
* **bundling:** update to systemjs-builder 0.10.0 and fix the bundle task ([7467a61](https://github.com/frankwallis/plugin-typescript/commit/7467a61))
* **lib.d.ts:** improve performance by tagging lib.d.ts correctly ([e382d99](https://github.com/frankwallis/plugin-typescript/commit/e382d99))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/frankwallis/plugin-typescript/compare/0.5.10...0.6.1) <sub>(2015-03-24)</sub>


### Bug Fixes

* **lib.d.ts:** put in workaround for __moduleName not set correctly with traceur 0.0.84 ([32a3d60](https://github.com/frankwallis/plugin-typescript/commit/32a3d60))
* **lib.d.ts:** yet another fix for lib.d.ts resolution ([af9d9d9](https://github.com/frankwallis/plugin-typescript/commit/af9d9d9))
* **reference-errors:** fix for issue where errors in reference files were not picked up ([950b2dc](https://github.com/frankwallis/plugin-typescript/commit/950b2dc))
* **references:** add tests for ambient references ([c162d8a](https://github.com/frankwallis/plugin-typescript/commit/c162d8a))
* **references:** add tests for circular references and reference file type errors ([22cbf3b](https://github.com/frankwallis/plugin-typescript/commit/22cbf3b))


### Features

* **ambient-references:** add proper support for ambient references ([8af5cca](https://github.com/frankwallis/plugin-typescript/commit/8af5cca))



<a name="0.5.10"></a>
## [0.5.10](https://github.com/frankwallis/plugin-typescript/compare/0.5.7...0.5.10) <sub>(2015-02-22)</sub>


### Bug Fixes

* **dependencies:** add the jspm dependencies back in and bump 0.5.9 ([3cbf1e6](https://github.com/frankwallis/plugin-typescript/commit/3cbf1e6))
* **example:** swap http-server for live-server (high cpu) ([b6bbf3f](https://github.com/frankwallis/plugin-typescript/commit/b6bbf3f))
* **nested-types:** add fix for nested type errors issue ([fa152c1](https://github.com/frankwallis/plugin-typescript/commit/fa152c1))
* **nested-types:** bump 0.5.10 ([02fe3e9](https://github.com/frankwallis/plugin-typescript/commit/02fe3e9))
* **dependencies:** fix the development dependencies & tests ([809352e](https://github.com/frankwallis/plugin-typescript/commit/809352e))


### Features

* **example:** open the example project automatcally ([2b108c7](https://github.com/frankwallis/plugin-typescript/commit/2b108c7))
* **travis-ci:** add the travis configuration ([a79978f](https://github.com/frankwallis/plugin-typescript/commit/a79978f))



<a name="0.5.7"></a>
## [0.5.7](https://github.com/frankwallis/plugin-typescript/compare/0.5.5...0.5.7) <sub>(2015-02-06)</sub>


### Features

* **default-lib:** resolve the default lib properly ([789f616](https://github.com/frankwallis/plugin-typescript/commit/789f616))
* **es6:** restructure and es6ify ([ecb6a6f](https://github.com/frankwallis/plugin-typescript/commit/ecb6a6f))
* **integration:** configure the example project ([ef08576](https://github.com/frankwallis/plugin-typescript/commit/ef08576))
* **language-service:** working build with language service ([13ab811](https://github.com/frankwallis/plugin-typescript/commit/13ab811))
* **language-services:** Compile with language services ([14809bf](https://github.com/frankwallis/plugin-typescript/commit/14809bf))
* **plugin:** get the example project/plugin working ([6213f36](https://github.com/frankwallis/plugin-typescript/commit/6213f36))
* **publish:** reduce logging ([ba47c5a](https://github.com/frankwallis/plugin-typescript/commit/ba47c5a))
* **source-maps:** get the source maps working ([4705ac8](https://github.com/frankwallis/plugin-typescript/commit/4705ac8))



