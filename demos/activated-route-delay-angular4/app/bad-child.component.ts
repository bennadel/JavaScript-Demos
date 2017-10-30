
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "bad-child-component",
	styleUrls: [ "./child.component.less" ],
	template: 
	`
		This is the <strong>Bad-Child</strong> component.
	`
})
export class BadChildComponent {

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

		console.group( "Bad Child Component Instantiated." );

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

		this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
			( paramMap: ParamMap ) : void => {

				console.warn( "Param-map value:", paramMap.get( "id" ) );

				if ( paramMap.get( "id" ) === "3" ) {

					console.warn( "Navigating back to root." );
					this.router.navigate( [ "/" ] );
					
				}
				
			}
		);

	}

}
