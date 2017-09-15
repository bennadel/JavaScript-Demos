
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
	selector: "my-parent",
	styleUrls: [ "./parent.component.css" ],
	template: 
	`
		<h3>
			Parent Routing Component
		</h3>

		<ng-template [ngIf]="isLoading">

			<p>
				<em>Loading parent data...</em>
			</p>

		</ng-template>

		<!--
			Notice that the ROUTER OUTLET is not always part of the active DOM. It is 
			only rendered once the surrounding parent component data has loaded. Notice
			also that it is nested inside the layout and CANNOT be factored-out into a
			separate location in the DOM.
		-->
		<ng-template [ngIf]="! isLoading">

			<div class="view">
				<p>
					Parent data is <strong>loaded</strong> (for ID: {{ id }}).
				</p>

				<router-outlet></router-outlet>
			</div>

		</ng-template>
	`
})
export class ParentComponent {

	public id: string;
	public isLoading: boolean;

	private paramSubscription: Subscription;
	private timer: number;

	// I initialize the parent component.
	constructor( activatedRoute: ActivatedRoute ) {

		console.warn( "Parent component initialized." );

		this.id = "";
		this.isLoading = true;
		this.timer = null;

		// While the Parent Component is rendered, it's possible that the :id parameter
		// in the route will change. As such, we want to subscribe to the activated route
		// so that we can load the new data as the :id value changes (this will also give
		// us access to the FIRST id value as well).
		// --
		// NOTE: If you only wanted the initial value of the parameter, you could use the
		// route snapshot - activatedRoute.snapshot.paramMap.get( "id" ).
		this.paramSubscription = activatedRoute.paramMap.subscribe(
			( params: ParamMap ) : void => {

				console.log( "Parent ID changed:", params.get( "id" ) );

				this.isLoading = true;
				// Simulate loading the data from some external service.
				this.timer = this.timer = setTimeout(
					() : void => {

						this.id = params.get( "id" );
						this.isLoading = false;

					},
					2000
				);

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		console.warn( "Parent component destroyed." );
		
		// When the Parent component is destroyed, we need to stop listening for param
		// changes so that we don't continually load data in the background.
		// --
		// CAUTION: The Angular documentation indicates that you don't need to do this
		// for ActivatedRoute observables; however, if you log the changes, you will see
		// that the observables don't get killed when the route component is destroyed.
		this.paramSubscription.unsubscribe();
		clearTimeout( this.timer );

	}

}
