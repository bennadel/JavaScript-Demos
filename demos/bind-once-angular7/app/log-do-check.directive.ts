
// Import the core angular services.
import { Directive } from "@angular/core";
import { DoCheck } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[logDoCheck]",
	inputs:[ "logDoCheck" ]
})
export class LogDoCheckDirective implements DoCheck {

	public logDoCheck!: string;

	// I get called whenever a change-detection digest has been triggered in the
	// current view context.
	public ngDoCheck() : void {

		console.warn( "[", this.logDoCheck, "]: ngDoCheck() invoked." );

	}

}
