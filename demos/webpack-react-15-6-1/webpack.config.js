
// Load the core node modules.
var HtmlWebpackPlugin = require( "../../vendor/reactjs/15.6.1-webpack-tsc/node_modules/html-webpack-plugin" );
var path = require( "path" );
var webpack = require( "../../vendor/reactjs/15.6.1-webpack-tsc/node_modules/webpack" );

module.exports = {
	// I am going to generate 3 separate JavaScript files (that the HtmlWebpackPlugin
	// will automatically inject into my HTML template). Creating three files helps me
	// isolate the parts of the code that change often (my code) from the parts of the
	// code that change infrequently (the vendor code).
	entry: {
		polyfill: "./app/main.polyfill.ts",
		vendor: "./app/main.vendor.ts",
		main: "./app/main.tsx"
	},
	// In normal development, I might use "[name].[chunkhash].js"; however, since this
	// is just getting committed to GitHub, I don't want to create a new hash-based file
	// for every file-save event. Instead, I can use the "hash" option in the
	// HtmlWebpackPlugin to help with cache-busting per build.
	output: {
		filename: "[name].js",
		path: path.join( __dirname, "build" )
	},
	resolve: {
		// NOTE: The .ts extension needs to come before the .tsx extension, otherwise,
		// the code seems to struggle to import .ts modules.
		extensions: [ ".ts", ".tsx", ".js" ],
		// Tell Webpack to use my shared vendor folder when resolving modules that it
		// finds in "import" statements.
		modules: [
			"../../vendor/reactjs/15.6.1-webpack-tsc/node_modules/"
		]
	},
	resolveLoader: {
		// Tell Webpack to use my shared vendor folder when resolving loaders that it 
		// finds in this config (ex, "ts-loader") (or in inline references, I suppose).
		modules: [
			"../../vendor/reactjs/15.6.1-webpack-tsc/node_modules/"
		]
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loaders: [ 
					// I compile the TypeScript content into ES5 JavaScript. In addition
					// to transpiling the code, it is also running type-checks based on 
					// the tsconfig.json file.
					"ts-loader"
				]
			}
		]
	},
	plugins: [
		// I move common references in the Entry files down into the lowest-common entry
		// file in this list.
		// --
		// CAUTION: The order of these chunk names has to be in the REVERSE order of the
		// order in which you intent to include them in the Browser. I believe, but am not
		// sure, that this is because common dependencies are moved to the next file down 
		// in this list. So, if "main" and "vendor" have things in common, they will be
		// moved down to "vendor". Were the order reversed, with "vendor" above "main", 
		// then common dependencies would be moved down to "main" (which is what we want 
		// to avoid).
		new webpack.optimize.CommonsChunkPlugin({
			names: [ 
				"main",
				"vendor",
				"polyfill",
				// Extract the Webpack bootstrap logic into its own file by providing a
				// name that wasn't listed in the "entry" file list.
				// --
				// NOTE: I don't really need this for my kind of GitHub based development;
				// but, this seems to be a common pattern as it moves frequently changing
				// code out of the "vendor" file.
				"manifest"
			]
		}),
		// I generate the main "index" file and inject Script tags for the files emitted
		// by the compilation process.
		new HtmlWebpackPlugin({
			// Notice that we are saving the index UP ONE DIRECTORY, so that it is output
			// in the root of the demo.
			filename: "../index.htm",
			template: "./app/main.htm",

			// This will append a unique query-string hash (for cache busting) to the 
			// injected files after each build. All files get the same hash, which makes
			// this DIFFERENT from using the "chunkhash" in the "output" config.
			hash: true
		}),
		// I compact the JavaScript content.
		new webpack.optimize.UglifyJsPlugin({
			keep_fnames: true
		})
	]
};
