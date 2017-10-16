
// Load the core node modules.
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var path = require( "path" );
var webpack = require( "webpack" );

module.exports = {
	// I am going to generate 3 separate JavaScript files (that the HtmlWebpackPlugin
	// will automatically inject into my HTML template). Creating three files helps me
	// isolate the parts of the code that change often (my code) from the parts of the
	// code that change infrequently (the vendor code).
	entry: {
		polyfill: "./app/main.polyfill.ts",
		vendor: "./app/main.vendor.ts",
		main: "./app/main.ts"
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
		extensions: [ ".ts", ".js" ]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [ 
					// I compile the TypeScript content into ES5 JavaScript. In addition
					// to transpiling the code, it is also running type-checks based on 
					// the tsconfig.json file.
					"ts-loader",
					// Given the transpiled code, I convert Template and Style URL 
					// references into require() statements that will subsequently get 
					// consumed by the raw-loader.
					// --
					// NOTE: Do not include the "keepUrl=true" that is in some examples;
					// that inlines the content, but does not replace the property name
					// used in the component meta-data.
					"angular2-template-loader"
				]
			},
			// When the "angualr2-template-loader" runs, it will replace the @Component()
			// "templateUrl" and "styleUrls" with inline "require()" calls. As such, we
			// need the raw-loader so that require() will know how to load .htm and .css
			// file as plain-text.
			{ 
				test: /\.(htm|css)$/, 
				loader: "raw-loader"
			},
			// In addition to loading .css files into the @Component(), we can also load
			// LESS CSS files and have them compile on-the-fly. 
			{
				test: /\.less$/,
				loaders: [
					"raw-loader",
					"less-loader"
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
