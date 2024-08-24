
// Import vendor modules.
import { bootstrapApplication } from "@angular/platform-browser";

// Import app modules.
import { AppComponent } from "~/app/app.component";
import { appConfig } from "~/app/app.config";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

bootstrapApplication( AppComponent, appConfig )
	.then(
		( applicationRef ) => {

			( window as any ).applicationRef = applicationRef;

		}
	)
	.catch(
		( error ) => {

			console.group( "Application Bootstrapping Error" );
			console.error( error );
			console.groupEnd();

		}
	)
;
