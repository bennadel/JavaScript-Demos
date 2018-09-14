
// Import the core angular services.
import { Directive } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I toggle between "display:block" and "display:none" based on the truthy input value.
@Directive({
	selector: "[appShowBlock]",
	inputs: [ "appShowBlock" ],
	host: {
		"[style.display]": "( appShowBlock ? 'block' : 'none' )"
	}
})
export class ShowBlockDirective {

	// Because we are treating the input as a "truthy", we want to be able to accept 
	// any type of data that can be used in a truthy evaluation.
	public appShowBlock: any;

}
