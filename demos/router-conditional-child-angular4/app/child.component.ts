
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-child",
	styleUrls: [ "./child.component.css" ],
	template: 
	`
		<h4>
			Child Routing Component
		</h4>

		<ng-template [ngIf]="isLoading">

			<p>
				<em>Loading child data...</em>
			</p>

		</ng-template>

		<ng-template [ngIf]="! isLoading">

			<div class="view">
				<p>
					Child data is <strong>loaded</strong> (for ID: {{ id }}).
				</p>
			</div>

		</ng-template>
	`
})
export class ChildComponent {

	public id: string;
	public isLoading: boolean;

	private paramSubscription: Subscription;
	private timer: number;

	// I initialize the child component.
	constructor( activatedRoute: ActivatedRoute ) {

		console.warn( "Child component initialized." );

		this.id = "";
		this.isLoading = true;
		this.timer = null;

		// While the Child Component is rendered, it's possible that the :id parameter
		// in the route will change. As such, we want to subscribe to the activated route
		// so that we can load the new data as the :id value changes (this will also give
		// us access to the FIRST id value as well).
		// --
		// NOTE: If you only wanted the initial value of the parameter, you could use the
		// route snapshot - activatedRoute.snapshot.paramMap.get( "id" ).
		this.paramSubscription = activatedRoute.paramMap
			// TIMING HACK: We need a tick-delay to allow ngOnDestroy() to fire first 
			// (before our subscribe function is invoked) if the route changes in such a 
			// way that it has to destroy the Child component before it re-renders it
			// (such as navigating from "p1-c1" to "p2-c1).
			.delay( 0 )
			.subscribe(
				( params: ParamMap ) : void => {

					console.log( "Child ID changed:", params.get( "id" ) );

					this.isLoading = true;
					// Simulate loading the data from some external service.
					this.timer = setTimeout(
						() : void => {

							this.id = params.get( "id" );
							this.isLoading = false;

						},
						2000
					);

				}
			)
		;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		console.warn( "Child component destroyed." );
		
		// When the Child component is destroyed, we need to stop listening for param
		// changes so that we don't continually load data in the background.
		// --
		// CAUTION: The Angular documentation indicates that you don't need to do this
		// for ActivatedRoute observables; however, that seems to ONLY BE TRUE if you 
		// navigate to a DIFFERENT ROUTE PATTERN. If you remain in the ROUTE PATTERN, 
		// but do so in a way that this component is destroyed, the Router WILL NOT 
		// automatically unsubscribe from the Observable (ex, going from "p1-c1" to 
		// "p2-c2"). As such, it is a best practice to ALWAYS unsubscribe from changes,
		// regardless of what the documentation says.
		this.paramSubscription.unsubscribe();
		clearTimeout( this.timer );

	}

}
