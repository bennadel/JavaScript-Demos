(function( global ) {

	// Alias the path to the common rc4 vendor scripts.
	var paths = {
		"rc4/*": "../../vendor/angularjs-2-beta/rc4/*",
		"~/*": "./app/*"
	};

	// Tell Angular how normalize path and package aliases.
	var  map = {
		"@angular": "rc4/node_modules/@angular",
		"@ngrx": "rc4/node_modules/@ngrx",
		"isarray": "rc4/node_modules/isarray",
		"object-assign": "rc4/node_modules/object-assign",
		"path-to-regexp": "rc4/node_modules/path-to-regexp",
		"plugin-typescript": "rc4/node_modules/plugin-typescript/lib/plugin.js",
		"query-string": "rc4/node_modules/query-string",
		"rxjs": "rc4/node_modules/rxjs",
		"strict-uri-encode": "rc4/node_modules/strict-uri-encode",
		"tsconfig.json": "rc4/tsconfig.json",
		"typescript": "rc4/node_modules/typescript"
	};

	// Setup meta data for individual areas of the application.
	var packages = {
		"@ngrx/core": {
			main: "index.js",
			meta: {
				"*.js": {
					typings: true
				}
			}
		},
		"@ngrx/router": {
			main: "index.js",
			meta: {
				"*.js": {
					typings: true
				}
			}
		},
		"app": { 
			main: "main.ts",
			defaultExtension: "ts",
			meta: {
				"*.ts": {
					loader: "plugin-typescript"
				}
			}
		},
		"isarray": {
			main: "index.js"
		},  
		"object-assign": {
			main: "index.js"
		},
		"path-to-regexp": {
			main: "index.js"
		},  
		"query-string": {
			main: "index.js"
		},  
		"rc4/node_modules": {
			defaultExtension: "js"
		},
		"rxjs": {
			meta: {
				"*.js": {
					typings: true
				}
			}
		},
		"strict-uri-encode": {
			main: "index.js"
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
		"http",
		"platform-browser",
		"platform-browser-dynamic",
		"router",
		"router-deprecated",
		"upgrade",
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