
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Params } from "@angular/router";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-detail-view",
	styleUrls: [ "./tertiary-detail-view.component.less" ],
	template:
	`
		<h2>
			Tertiary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Tertiary Detail view for <strong>ID: {{ tertiaryDetailID }}</strong>.
		</p>
	`
})
export class TertiaryDetailViewComponent {
	
	public tertiaryDetailID: number;

	private activatedRoute: ActivatedRoute;
	private paramSubscription: Subscription;

	// I initialize the tertiary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.activatedRoute = activatedRoute;

		this.paramSubscription = null;
		this.tertiaryDetailID = 0;

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

				this.tertiaryDetailID = +params.tertiaryDetailID;

				console.group( "Tertiary Detail View" );
				console.table( params );
				console.groupEnd();

			}
		);

	}

}
