
// Import the core angular services.
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// Import the application components and services.
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// NOTE: The module resolution for this file changes depending on the build. See the
// "fileReplacements" option in the angular.json configuration file.
if ( environment.production ) {
	
	enableProdMode();

}

platformBrowserDynamic()
	.bootstrapModule( AppModule)
	.catch(
		( error: any ) => {

			console.warn( "Angular application failed to bootstrap." );
			console.error( error );

		}
	)
;
