
// Import vendor modules.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { DestroyRef } from "@angular/core";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SimpleChanges } from "@angular/core";

// Import app modules.
import { WindowTitle } from "~/app/services/window-title";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "page-b-view",
	standalone: true,
	inputs: [
		"pageID"
	],
	styleUrl: "./page-b-view.component.less",
	templateUrl: "./page-b-view.component.html"
})
export class PageBViewComponent {
	
	public pageID = 0;

	private activatedRoute = inject( ActivatedRoute );
	private destroyRef = inject( DestroyRef );
	private router = inject( Router );
	private windowTitle = inject( WindowTitle );

	// ---
	// PUBLIC METHODS.`
	// ---

	/**
	* I get called once after all the inputs have been bound for the first time.
	*/
	public ngOnInit() {

		this.windowTitle.set( `Page B - ${ this.pageID }` );

		// Note: While the pageID is also available in the route params, our router
		// strategy binds the route params to the Inputs as well.
		console.group( "Page B" );
		console.log( "Page ID:", this.pageID );
		console.log( "Query Value:", this.activatedRoute.snapshot.queryParams.queryParam );
		console.groupEnd();

		this.destroyRef.onDestroy(
			() => {

				console.log( "Page B onDestroy() callback." );

			}
		);

	}

}
