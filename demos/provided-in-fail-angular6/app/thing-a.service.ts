
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { SubModule } from "./sub.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: SubModule
})
export class ThingAService {
	// ...
}
