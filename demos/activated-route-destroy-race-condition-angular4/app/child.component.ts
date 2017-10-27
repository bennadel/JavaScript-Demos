
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "child-component",
	styleUrls: [ "./child.component.less" ],
	template: 
	`
		This is the <strong>Child</strong> component.
	`
})
export class ChildComponent {

	private activatedRoute: ActivatedRoute;
	private paramMapSubscription: Subscription;
	private router: Router;
	
	// I initialize the child-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

		console.group( "Child Component Instantiated." );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

		console.log( "ngOnDestroy() called." );
		console.groupEnd();

	}


	// I get called once, after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.activatedRoute.paramMap
			// CAUTION: Without the .delay(0) here, the component will be destroyed and
			// immediately re-created under certain circumstances (such as when hand 
			// crafting a bad URL or by clicking on a bad HREF). As best I can GUESS,
			// there's some sort of RACE CONDITION when the navigation is performed too
			// close (timing-wise) to the execution of the ParamMap callback. To be 
			// honest, I am not sure I fully understand what is going on....
			// --
			// .delay(0)
			// --
			.subscribe(
				( paramMap: ParamMap ) : void => {

					console.warn( "Param-map value:", paramMap.get( "id" ) );
					this.router.navigate( [ "/" ] );
					
				}
			)
		;

	}

}
