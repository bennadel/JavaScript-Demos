
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Params } from "@angular/router";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-detail-view",
	styleUrls: [ "./secondary-detail-view.component.less" ],
	template:
	`
		<h2>
			Secondary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Secondary Detail view for <strong>ID: {{ secondaryDetailID }}</strong>.
		</p>
	`
})
export class SecondaryDetailViewComponent {
	
	public secondaryDetailID: number;

	private activatedRoute: ActivatedRoute;
	private paramSubscription: Subscription;

	// I initialize the secondary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.activatedRoute = activatedRoute;

		this.paramSubscription = null;
		this.secondaryDetailID = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.paramSubscription ) && this.paramSubscription.unsubscribe();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.paramSubscription = this.activatedRoute.params.subscribe(
			( params: Params ) : void => {

				this.secondaryDetailID = +params.secondaryDetailID;

				console.group( "Secondary Detail View" );
				console.table( params );
				console.groupEnd();

			}
		);

	}

}
