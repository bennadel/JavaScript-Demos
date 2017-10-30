
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
	selector: "good-child-component",
	styleUrls: [ "./child.component.less" ],
	template: 
	`
		This is the <strong>Good-Child</strong> component.
	`
})
export class GoodChildComponent {

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

		console.group( "Good Child Component Instantiated." );

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

		this.paramMapSubscription = this.activatedRoute.paramMap
			// CAUTION: Adding the .delay(10) to the ParamMap subscription helps prevent
			// several unwanted behaviors in the Angular Router (as of 4.4.6). To be 
			// clear, I AM NOT SAYING THAT THESE ARE "BUGS"; only that there things are 
			// happening that I don't want to happen, and adding .delay(10) helps prevent
			// those things. I've started adding this as the default behavior.
			.delay( 10 )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					console.warn( "Param-map value:", paramMap.get( "id" ) );

					if ( paramMap.get( "id" ) === "3" ) {

						console.warn( "Navigating back to root." );
						this.router.navigate( [ "/" ] );
						
					}
					
				}
			)
		;

	}

}
