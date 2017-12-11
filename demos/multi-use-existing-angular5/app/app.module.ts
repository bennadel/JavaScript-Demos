
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { GREETERS } from "./greeters";
import { MeanGreeter } from "./greeters";
import { NiceGreeter } from "./greeters";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		// First, we're going to provide the greeters as individually injectable 
		// services. This way, each one can be referenced directly, if needed.
		MeanGreeter,
		NiceGreeter,

		// Next, we're going to provide the AFOREMENTIONED greeters as a collection
		// of services. This way, the two services can be injected as a single set of
		// services that implement the Greeter interface. By using the "useExisting"
		// configuration, the instances associated with the preceding tokens will be
		// used, rather than creating new instances of each service.
		{
			provide: GREETERS,
			multi: true,
			useExisting: MeanGreeter // ... use instance already in the DI container.
		},
		{
			provide: GREETERS,
			multi: true,
			useExisting: NiceGreeter // ... use instance already in the DI container.
		}
	]
})
export class AppModule {
	// ...
}
