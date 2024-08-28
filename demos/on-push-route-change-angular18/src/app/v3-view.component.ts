
// Import vendor modules.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-v3-view",
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	// Since we're using the "withComponentInputBinding()" route configuration, Angular
	// will automatically bind route parameters to component inputs (if the component has
	// a matching property). In this case, we're going to alias the input so that we can
	// manually review and transform the input before we store it into the pageID.
	inputs: [
		"routePageID: pageID" // Maps route[pageID] => component[routePageID]
	],
	imports: [
		RouterLink
	],
	styleUrl: "./v-view.component.less",
	templateUrl: "./v-view.component.html"
})
export class V3ViewComponent {

	public segment = "v3";
	public note = "Binding route param to component input.";
	public pageID = 0;

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I get called whenever the bound inputs change.
	*/
	public ngOnChanges( changes: SimpleChanges ) {

		// Note: Even with an OnPush change detection strategy, Angular will automatically
		// trigger change detection when the input bindings change. And, since we're
		// mapping the route params to the component inputs, relevant changes in the route
		// will automatically trigger change detection within the view.
		this.pageID = ( + changes.routePageID?.currentValue || 0 );

	}

}
