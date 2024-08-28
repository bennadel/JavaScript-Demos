
// Import vendor modules.
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { inject } from "@angular/core";
import { Params } from "@angular/router";
import { RouterLink } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-v1-view",
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		RouterLink
	],
	styleUrl: "./v-view.component.less",
	templateUrl: "./v-view.component.html"
})
export class V1ViewComponent {

	private activatedRoute = inject( ActivatedRoute );

	public segment = "v1";
	public note = "Subscribing to route params.";
	public pageID = 0;

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I get called once after all the inputs have been bound for the first time.
	*/
	public ngOnInit() {

		this.activatedRoute.params.subscribe(
			( params ) => this.handleParamsChange( params )
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I handle route params changes.
	*/
	private handleParamsChange( params: Params ) {

		// Note: When the route is changed due to an internal view click, Angular will
		// automatically run change detection. However, if the route is changed due to a
		// History pop/push state event, Angular won't do anything. As such, Angular may
		// or may not update the View after this change.
		this.pageID = ( + params.pageID || 0 );

	}

}
