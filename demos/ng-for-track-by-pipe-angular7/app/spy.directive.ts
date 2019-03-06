
// Import the core angular services.
import { Directive } from "@angular/core";
import { OnInit } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[mySpy]",
	inputs: [ "mySpy" ]
})
export class SpyDirective implements OnInit {

	public mySpy!: string;

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs are bound for the first time.
	public ngOnInit() : void {

		console.log( `Spy initialized on element [${ this.mySpy }].` );

	}

}
