
// Import the core angular services.
import { APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ComplimentTransformer } from "./app-transformers";
import { Greeter } from "./greeter/greeter.module";
import { GreeterModule } from "./greeter/greeter.module";
import { GREETER_TRANSFORMERS } from "./greeter/greeter.module";
import { YellingTransformer } from "./app-transformers";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, GreeterModule ],
	providers: [
		// As part of the Greeter "configuration", we can setup a collection of 
		// Transformers to be injected into the Greeter as part of the instantiation
		// process. In this way, we are replacing the Angular 1 "configuration phase" 
		// with dependency-injection mechanics.
		{
			provide: GREETER_TRANSFORMERS,
			multi: true, // <-- This creates an array for a single injectable.
			useClass: ComplimentTransformer
		},
		

		// However, configuration is NOT AN EITHER-OR CONCEPT. We can configure a
		// service using dependency-injection (above); but, we can also, at the very
		// same time, use a run-block to call methods on instantiated services as the 
		// last step prior to running the application.

		// This is the transformer that we want to add to our Greeter service. In order
		// to make it available in the "run block", we have to "provide" it so that 
		// Angular can instantiate it as a dependency.
		YellingTransformer,

		// Now, let's create a "run block" that will inject the above YellingTransformer
		// into the already-instantiated Greeter service.
		{
			provide: APP_INITIALIZER,
			multi: true,
			deps: [ Greeter, YellingTransformer ],
			useFactory: function( greeter: Greeter, yellingTransformer: YellingTransformer ) : () => void {

				return( runblock );

				function runblock() : void {

					greeter.addTransformer( yellingTransformer );

				};

			}
		}
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ... nothing to do here.
}
