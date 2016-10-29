
// Import the core angular services.
import { NgModule } from "@angular/core";

// Import the application components and services.
import { CoreGreetTransformer } from "./transformers";
import { Greeter } from "./greeter";
import { GREETER_TRANSFORMERS } from "./greeter";

// "Barrel" exports. 
// --
// NOTE: Traditionally, this kind of exporting of the "public" values from a module is 
// done in a "barrel" file (ie, index.ts). However, in order to keep this demo smaller, 
// I'm co-opting the Module file to play double-duty as both the module and the "barrel".
export { Greeter } from "./greeter";
export { GREETER_TRANSFORMERS } from "./greeter";
export { IGreetTransformer } from "./transformers";

@NgModule({
	providers: [
		Greeter,

		// When Angular instantiates the Greeter class, it's going to inject this 
		// collection of Transformers. By default, the Greeter module is configured to
		// supply the one "core" Transformer. However, the application at large can 
		// easily add to this "multi" dependency collection.
		{
			provide: GREETER_TRANSFORMERS,
			multi: true,
			useClass: CoreGreetTransformer
		}
	]
})
export class GreeterModule {
	// ... nothing to do here.
}
