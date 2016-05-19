(function() {

	// Alias the path to the common rc1 vendor scripts.
	var paths = {
		"rc1/*": "../../vendor/angularjs-2-beta/rc1/*"
	};

	// Tell Angular how normalize path and package aliases.
	var  map = {
		"@angular": "rc1/node_modules/@angular",
		"angular2-in-memory-web-api": "rc1/node_modules/angular2-in-memory-web-api",
		"rxjs": "rc1/node_modules/rxjs",
		"ts": "rc1/node_modules/plugin-typescript/lib/plugin.js",
		"tsconfig.json": "rc1/tsconfig.json",
		"typescript": "rc1/node_modules/typescript/lib/typescript.js"
	};

	// Setup meta data for individual areas of the application.
	var packages = {
		"app": { 
			main: "main.ts",
			defaultExtension: "ts"
		},
		"rc1/node_modules": {
			defaultExtension: "js"
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
		"upgrade"
	];
	
	ngPackageNames.forEach(
		function iterator( packageName ) {
			
			packages[ "@angular/" + packageName ] = {
				main: ( packageName  + ".umd.js" )
				// ,
				// defaultExtension: "js"
			};

		}
	);

	System.config({
		paths: paths,
		map: map,
		packages: packages,
		transpiler: "ts",
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
	System
		.import( "app" )
		.then(
			function handleResolve() {

				console.info( "System.js successfully bootstrapped app." );

			},
			function handleReject( error ) {

				console.warn( "System.js could not bootstrap the app." );
				console.error( error );

			}
		)
	;

})();