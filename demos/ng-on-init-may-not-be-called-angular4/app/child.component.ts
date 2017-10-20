
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	styleUrls: [ "./child.component.css" ],
	template: 
	`
		<p>
			This is the <strong>Child</strong> component.
		</p>

		<p>
			<a [routerLink]="[ '../' ]">Back to Root</a>
		</p>
	`
})
export class ChildComponent implements OnInit, OnDestroy {
	
	// I initialize the child-view component.
	constructor( activatedRoute: ActivatedRoute, router: Router ) {

		console.log( "Child :: Constructor" );

		// If we have the OPTIONAL parameter to redirect, let's immediately redirect
		// back to the root of the application.
		// --
		// CAUTION: This type of an action should probably be performed in the ngOnInit()
		// method as it encompasses more than simple property initialization. However,
		// I'm putting here in the constructor in order to demonstrate the functionality.
		if ( activatedRoute.snapshot.paramMap.get( "redirect" ) ) {

			console.warn( "Child :: Redirecting back to root." );
			router.navigateByUrl( "/" );

		}


	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is about to be destroyed.
	public ngOnDestroy() : void {

		console.log( "Child :: ngOnDestroy" );

	}


	// I get called once after the component's inputs have been initialized.
	public ngOnInit() : void {

		console.log( "Child :: ngOnInit" );

	}

}
