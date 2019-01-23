
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { MyService } from "./my-service/my-service.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		Testing forRoot() configuration, see console logging.
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor( myService: MyService ) {

		console.group( "AppComponent Constructor" );
		console.log( "myService injectable" );
		console.log( myService );
		console.groupEnd();

	}

}
