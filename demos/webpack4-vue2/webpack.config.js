
// Load the core node modules.
var CleanWebpackPlugin = require( "clean-webpack-plugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
var path = require( "path" );
var VueLoaderPlugin = require( "vue-loader/lib/plugin" );
var webpack = require( "webpack" );

// We are exporting a Function instead of a configuration object so that we can
// dynamically define the configuration object based on the execution mode.
module.exports = ( env, argv ) => {

	var isDevelopmentMode = ( argv.mode === "development" );

	// Locally, we want robust source-maps. However, in production, we want something
	// that can help with debugging without giving away all of the source-code. This
	// production setting will give us proper file-names and line-numbers for debugging;
	// but, without actually providing any code content.
	var devtool = isDevelopmentMode
		? "eval-source-map"
		: "nosources-source-map"
	;

	// By default, each module is identified based on Webpack's internal ordering. This
	// can cause issues for cache-busting and long-term browser caching as a localized
	// change can create a rippling effect on module identifiers. As such, we want to
	// identify modules based on a name that is order-independent. Both of the following
	// plugins do roughly the same thing; only, the one in development provides a longer
	// and more clear ID.
	var moduleIdentifierPlugin = isDevelopmentMode
		? new webpack.NamedModulesPlugin()
		: new webpack.HashedModuleIdsPlugin()
	;

	// Locally, Vue will dyanmically inject a Style tag for each type of mounted
	// component. This makes it easier to understand how the page is currently working.
	// However, in production, it will be more efficient if we just extract the CSS and
	// link it as a single external CSS file.
	var vueStyleLoader = isDevelopmentMode
		? "vue-style-loader"
		: MiniCssExtractPlugin.loader
	;

	return({
		// I define the base-bundles that will be generated.
		// --
		// NOTE: There is no explicit "vendor" bundle. With Webpack 4, that level of
		// separation is handled by default. You just include your entry bundle and 
		// Webpack's splitChunks optimization DEFAULTS will automatically separate out
		// modules that are in the "node_modules" folder.
		entry: {
			main: "./app/main.js"
			// NOTE: I'm currently including the polyfill directly in the main.ts file.
			// If I have it as an Entry, I get a "cyclic dependency" error since I had to
			// ALSO change my "chunksSortMode" to "none" in order to get Lazy Loading
			// modules to work.
			// --
			// polyfill: "./app/main.polyfill.ts",
		},
		// I define the bundle file-name scheme.
		output: {
			filename: "[name].[contenthash].js",
			path: path.join( __dirname, "build" ),
			publicPath: "build/"
		},
		devtool: devtool,
		resolve: {
			extensions: [ ".vue", ".js" ],
			alias: {
				"~/app": path.resolve( __dirname, "app" ),
				"vue$": "vue/dist/vue.esm.js"
			}
		},
		module: {
			rules: [
				{
					test: /.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
					exclude: /node_modules/
				},
				{ 
					test: /\.css$/, 
					loaders: [
						vueStyleLoader,
						"css-loader"
					]
				},
				{
					test: /\.less$/,
					loaders: [
						vueStyleLoader,
						"css-loader",
						"less-loader"
					]
				}
			]
		},
		plugins: [
			// I facilitate the vue-loader functionality.
			new VueLoaderPlugin(),

			// I clean the build directory before each build.
			new CleanWebpackPlugin([
				path.join( __dirname, "build/*.css" ),
				path.join( __dirname, "build/*.css.map" ),
				path.join( __dirname, "build/*.js" ),
				path.join( __dirname, "build/*.js.map" )
			]),

			// I generate the main "index" file and inject Script tags for the files emitted
			// by the compilation process.
			new HtmlWebpackPlugin({
				// Notice that we are saving the index UP ONE DIRECTORY, so that it is output
				// in the root of the demo.
				filename: "../index.htm",
				template: "./app/main.htm",
				// CAUTION: I had to switch this to "none" when using Lazy Loading
				// modules otherwise I was getting a "Cyclic dependency" error in the
				// Toposort module in this plug-in. As a side-effect of this, I had to
				// start including the Polyfill file directly in the main.ts (as opposed
				// to including it as an entry point).
				// --
				// Read More: https://github.com/jantimon/html-webpack-plugin/issues/870
				chunksSortMode: "none"
			}),

			// I extract the Vue CSS into an external file (if loader is enabled).
			new MiniCssExtractPlugin({
				filename: "[name].[contenthash].css"
			}),

			// I facilitate better caching for generated bundles.
			moduleIdentifierPlugin			
		],
		optimization: {
			splitChunks: {
				// Apply optimizations to all chunks, even initial ones (not just the
				// ones that are lazy-loaded).
				chunks: "all"
			},
			// I pull the Webpack runtime out into its own bundle file so that the
			// contentHash of each subsequent bundle will remain the same as long as the
			// source code of said bundles remain the same.
			runtimeChunk: "single"
		}
	});

};
