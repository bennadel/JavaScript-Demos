(function( global ) {

	System.config({
		warnings: true,
		map: {
			"@angular/": "../../vendor/angular2/2.4.9-tsc/node_modules/@angular/",
			"rxjs/": "../../vendor/angular2/2.4.9-tsc/node_modules/rxjs/"
		},
		packages: {
			"@angular/common": {
				main: "bundles/common.umd.js"
			},
			"@angular/compiler": {
				main: "bundles/compiler.umd.js"
			},
			"@angular/core": {
				main: "bundles/core.umd.js"
			},
			"@angular/forms": {
				main: "bundles/forms.umd.js"
			},
			"@angular/http": {
				main: "bundles/http.umd.js"
			},
			"@angular/platform-browser": {
				main: "bundles/platform-browser.umd.js"
			},
			"@angular/platform-browser-dynamic": {
				main: "bundles/platform-browser-dynamic.umd.js"
			},
			"@angular/router": {
				main: "bundles/router.umd.js"
			},
			"app": { 
				main: "main",
				defaultExtension: "js",

				// The only modules that will contain template or styles URLs are the
				// component directives. And, by convention, these files will all end
				// with the suffix, ".component.js". The rest of the modules can be 
				// loaded without any in-browser translation.
				meta: {
					"*.component.js": {
						loader: "system.component-loader.js"
					}
				}
			},
			"rxjs": {
				defaultExtension: "js"
			}
		}
	});

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
