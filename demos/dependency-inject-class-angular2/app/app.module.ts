
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { GreeterService } from "./greeter.service";
import { NewableGreeterService } from "./greeter.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I provide an alternate implementation of GreeterService (for the video demo).
class MeanGreeterService extends GreeterService {

	// I return a mean-spirited greeting message.
	public getGreeting() : string {

		return( `Go away, ${ this.name }, you smell funny!` );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	providers: [
		// In this application, the NewableGreeterService acts as a Type annotation, an
		// Interface (that describes the "newability"), and a dependency-injection token.
		// When one of the components / services needs to receive the GreeterService 
		// Class definition, we can have it ask for a value of Type NewableGreeterService.
		// By using the ** useValue ** property here, in the providers, Angular will 
		// inject the Class itself, rather than trying to instantiate the Class.
		{
			provide: NewableGreeterService,
			useValue: GreeterService

			// By injecting the Class definition, rather than having the recipient import
			// it directly means that we can override which Class is instantiated using
			// dependency-injection.
			// --
			// useValue: MeanGreeterService
		}
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ...
}
