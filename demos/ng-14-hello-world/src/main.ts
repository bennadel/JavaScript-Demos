
// Import core Angular modules.
import { bootstrapApplication } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import application modules.
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { ROUTES } from "./app/app.routes";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// NOTE: The module resolution for this file changes depending on the build. See the
// "fileReplacements" option in the angular.json configuration file.
if ( environment.production ) {

	enableProdMode();

}

bootstrapApplication(
	AppComponent,
	{
		providers: [
			importProvidersFrom(
				RouterModule.forRoot(
					ROUTES,
					{
						useHash: true,
						paramsInheritanceStrategy: "always"
					}
				)
			)
		]
	}
).catch(
	( error ) => {

		console.warn( "There was a problem bootstrapping the Angular application." );
		console.error( error );

	}
);
