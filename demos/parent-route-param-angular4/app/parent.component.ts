
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

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

		<ng-template [ngIf]="! isLoading">

			<div class="view">
				<p>
					Parent data is <strong>loaded</strong>
				</p>

				<p>
					<strong>Parent ID</strong>: {{ id }}<br />
					<strong>Child ID</strong>: {{ childID }}
				</p>

				<router-outlet></router-outlet>
			</div>

		</ng-template>
	`
})
export class ParentComponent {

	public childID: string;
	public id: string;
	public isLoading: boolean;

	private childParamSubscription: Subscription;
	private paramSubscription: Subscription;
	private timer: number;

	// I initialize the parent component.
	constructor( activatedRoute: ActivatedRoute ) {

		console.warn( "Parent component initialized." );

		this.childID = "";
		this.id = "";
		this.isLoading = true;
		this.timer = null;

		// Get the current route segment's :id. While the Parent Component is rendered, 
		// it's possible that the :id parameter in the route will change. As such, we 
		// want to subscribe to the activated route so that we can load the new data as
		// the :id value changes (this will also give us access to the FIRST id value 
		// as well).
		// --
		// NOTE: If you only wanted the initial value of the parameter, you could use the
		// route snapshot - activatedRoute.snapshot.paramMap.get( "id" ).
		this.paramSubscription = activatedRoute.paramMap.subscribe(
			( params: ParamMap ) : void => {

				console.log( "Parent ID changed:", params.get( "id" ) );

				this.id = params.get( "id" );
				
				// Simulate loading the data from some external service.
				this.isLoading = true;
				this.timer = this.timer = setTimeout(
					() : void => {

						this.isLoading = false;

					},
					1000
				);

			}
		);

		// Get the child route segment's :id. The ActivatedRoute provides a simple means
		// to walk up and down the route hierarchy. The "firstChild" property gives us
		// direct access to the ActivatedRoute instance associated with the child segment
		// of the current route. Since the child segment's :id can change while the 
		// Parent Component is rendered, we want to subscribe to the changes.
		this.childParamSubscription = activatedRoute.firstChild.paramMap.subscribe(
			( params: ParamMap ) : void => {

				this.childID = params.get( "id" );

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
		// for ActivatedRoute observables; however, if you log the changes, you will 
		// see that the observables don't always get torn-down when the route component 
		// is destroyed. As such, it should be considered a best practice to always 
		// unsubscirbe from observables.
		this.paramSubscription.unsubscribe();
		this.childParamSubscription.unsubscribe();
		clearTimeout( this.timer );

	}

}
