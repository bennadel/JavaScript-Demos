(function( global ) {

	// Alias the path to the common rc6 vendor scripts.
	var paths = {
		"rc6/*": "../../../vendor/angularjs-2-beta/rc6/*",
		"~/*": "./app/*"
	};

	// Tell Angular how normalize path and package aliases.
	var  map = {
		"@angular": "rc6/node_modules/@angular",
		"plugin-typescript": "rc6/node_modules/plugin-typescript/lib/plugin.js",
		"rxjs": "rc6/node_modules/rxjs",
		"tsconfig.json": "rc6/tsconfig.json",
		"typescript": "rc6/node_modules/typescript"
	};

	// Setup meta data for individual areas of the application.
	var packages = {
		"app": { 
			main: "main.ts",
			defaultExtension: "ts",
			meta: {
				"*.ts": {
					loader: "plugin-typescript"
				}
			}
		},
		"rc6/node_modules": {
			defaultExtension: "js"
		},
		"rxjs": {
			meta: {
				"*.js": {
					typings: true
				}
			}
		},
		"typescript": { 
			main: "lib/typescript.js",
			meta: {
				"lib/typescript.js": {
					exports: "ts"
				}
			}
		}
	};

	var ngPackageNames = [
		"common",
		"compiler",
		"core",
		"forms",
		"http",
		"platform-browser",
		"platform-browser-dynamic",
		"router"
	];

	ngPackageNames.forEach(
		function iterator( packageName ) {

			var filename = ( "bundles/" + packageName  + ".umd.js" );
			
			var ngPackage = packages[ "@angular/" + packageName ] = {
				main: filename,
				meta: {}
			};

			ngPackage.meta[ filename ] = {
				typings: ( packageName + "/index.d.ts" )
			};

		}
	);

	System.config({
		paths: paths,
		map: map,
		packages: packages,
		transpiler: "plugin-typescript",
		typescriptOptions: {
			tsconfig: true
		},
		meta: {
			typescript: {
				exports: "ts"
			}
		}
	});

	// Load "./app/main.ts" (gets full path from package configuration above).
	global.bootstrapping = System
		.import( "app" )
		.then(
			function handleResolve() {

				console.info( "System.js successfully bootstrapped app." );

			},
			function handleReject( error ) {

				console.warn( "System.js could not bootstrap the app." );
				console.error( error );

				return( Promise.reject( error ) );

			}
		)
	;

})( window );
