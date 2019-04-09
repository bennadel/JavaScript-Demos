
// Load the core node modules.
var CleanWebpackPlugin = require( "clean-webpack-plugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var path = require( "path" );
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

	return({
		// I define the base-bundles that will be generated.
		// --
		// NOTE: There is no explicit "vendor" bundle. With Webpack 4, that level of
		// separation is handled by default. You just include your entry bundle and 
		// Webpack's splitChunks optimization DEFAULTS will automatically separate out
		// modules that are in the "node_modules" folder.
		// --
		// CAUTION: The ORDER OF THESE KEYS is meaningful "by coincidence." Technically,
		// the order of keys in a JavaScript object shouldn't make a difference because,
		// TECHNICALLY, the JavaScript language makes to guarantees around key ordering.
		// However, from a practical standpoint, JavaScript keys are iterated over in the
		// same order in which they were defined (especially in V8). By putting the
		// POLYFILL bundle first in the object definition, it will cause the polyfill
		// bundle to be injected into the generated HTML file first. If you don't want to
		// rely on this ordering - or, if it breaks for you anyway - you can use the
		// HtmlWebpackPlugin (see: chunksSortMode) to explicitly order chunks. 
		entry: {
			main: "./app/main.js"
		},
		// I define the bundle file-name scheme.
		output: {
			filename: "[name].[contenthash].js",
			path: path.join( __dirname, "build" ),
			publicPath: "./build/"
		},
		devtool: devtool,
		resolve: {
			extensions: [ ".js" ],
			alias: {
				"~/app": path.resolve( __dirname, "app" )
			}
		},
		module: {
			rules: []
		},
		plugins: [
			// I clean the build directory before each build.
			new CleanWebpackPlugin(),

			// I generate the main "index" file and inject Script tags for the files
			// emitted by the compilation process.
			new HtmlWebpackPlugin({
				// Notice that we are saving the index UP ONE DIRECTORY, so that it is
				// output in the root of the demo.
				filename: "../index.htm",
				template: "./app/main.htm"
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
