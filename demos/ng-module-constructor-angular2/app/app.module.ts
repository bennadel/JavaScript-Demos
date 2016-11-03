
// Import the core angular services.
import { APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { OtherModule } from "./other.module";
import { OtherService } from "./other.module";


// I am just defining a class here so that I can add to the Providers collection and 
// then inject it into the Module to see how all the constructors work.
export class AppService {

	constructor() {

		console.log( "AppService constructor." );

	}

}


@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, OtherModule ],
	providers: [
		AppService,

		// Here, we're also providing a "run block" which is a function that will execute
		// at the very end of the bootstrapping process, right before the root component
		// is instantiated.
		{
			provide: APP_INITIALIZER,
			multi: true,
			deps: [],
			useFactory: function() {

				return( runblock );

				function runblock() {

					console.group( "Run Blocks." );
					console.log( "App module run block." );
					console.groupEnd();

				}

			}
		}
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	
	// I initialize the module.
	constructor( appService: AppService, otherService: OtherService ) {

		console.group( "AppModule Constructor." );
		console.log( appService );
		console.log( otherService );
		console.groupEnd();

	}

}
