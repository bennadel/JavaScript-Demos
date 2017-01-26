(function( global ) {

	System.config({
		map: {
			"plugin-typescript": "../../vendor/angular2/2.4.4/node_modules/plugin-typescript/lib/plugin.js",
			"ts": "../../vendor/angular2/2.4.4/node_modules/plugin-typescript",
			"typescript": "../../vendor/angular2/2.4.4/node_modules/typescript"
		},
		packages: {
			"app": { 
				main: "main.ts",
				defaultExtension: "ts",
				meta: {
					"*.ts": {
						loader: "ts"
					}
				}
			},
			"ts": {
				main: "lib/plugin.js"
			},
			"typescript": {
				main: "lib/typescript.js",
				meta: {
					"lib/typescript.js": {
						exports: "ts"
					}
				}
			}
		},
		transpiler: "plugin-typescript",
		transpiler: "ts",
		typescriptOptions: {
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			module: "commonjs",
			moduleResolution: "node",
			noImplicitAny: true,
			removeComments: false,
			sourceMap: true,
			suppressImplicitAnyIndexErrors: true,
			target: "es5",
			typeCheck: true
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
