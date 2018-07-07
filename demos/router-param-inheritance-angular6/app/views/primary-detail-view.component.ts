
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Params } from "@angular/router";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "primary-detail-view",
	styleUrls: [ "./primary-detail-view.component.less" ],
	template:
	`
		<h2>
			Primary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Primary Detail view for <strong>ID: {{ primaryDetailID }}</strong>.
		</p>
	`
})
export class PrimaryDetailViewComponent {
	
	public primaryDetailID: number;

	private activatedRoute: ActivatedRoute;
	private paramSubscription: Subscription;

	// I initialize the primary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.activatedRoute = activatedRoute;

		this.paramSubscription = null;
		this.primaryDetailID = 0;

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

				this.primaryDetailID = +params.primaryDetailID;

				console.group( "Primary Detail View" );
				console.table( params );
				console.groupEnd();

			}
		);

	}

}
