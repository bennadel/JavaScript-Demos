
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ComplimentTransformer } from "./app-transformers";
import { GreeterModule } from "./greeter/greeter.module";
import { GREETER_TRANSFORMERS } from "./greeter/greeter.module";
import { YellingTransformer } from "./app-transformers";

// NOTE: This import is here for use with the Factory (which is commented-out).
import { Greeter } from "./greeter/greeter.module";

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
		{
			provide: GREETER_TRANSFORMERS,
			multi: true, // <-- This creates an array for a single injectable.
			useClass: YellingTransformer
		}

		// We could have also used a Factory function to accomplish a similar outcome,
		// letting the dependency-injection system instantiate the individual 
		// transformers and then allowing us to manually instantiate the Greeter with 
		// the given collection.
		/*
		ComplimentTransformer,
		YellingTransformer,
		{
			provide: Greeter,
			deps: [ YellingTransformer, ComplimentTransformer ],
			useFactory: function( 
				yellingTransformer: YellingTransformer,
				complimentTransformer: ComplimentTransformer
				) : Greeter {

				// When using a Factory, we have to manually assemble the collection of
				// transformers that we want to inject into the Greeter.
				return( new Greeter( [ complimentTransformer, yellingTransformer ] ) );

			}
		}
		*/
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ... nothing to do here.
}
