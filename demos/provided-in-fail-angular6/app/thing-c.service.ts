
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
// import { SubModule } from "./sub.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// The problem becomes obvious when we log the SubModule that we're using in the meta-
// data. It will be DEFINED in only ONE of the services that is bootstrapped. Then, it
// will be UNDEFINED in the rest of the services.
// console.log( "Bootstrapping C:", SubModule );

// NOTE: By using the "providedIn: Module" syntax, we are supposed to be able to get
// better tree-shaking ability in our Angular application. However, this does not seem
// to work very intuitively.
@Injectable({
	providedIn: "root"
})
export class ThingCService {
	
	public label: string = "Thing C";

}
