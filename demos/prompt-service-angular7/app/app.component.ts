
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<!-- Primary outlet ( z-index: default ). -->
		<router-outlet></router-outlet>

		<!-- Modal outlet ( z-index: 100 ). -->
		<router-outlet name="modal"></router-outlet>

		<!--
			System prompts and confirmations ( z-index: 200 ).
			--
			NOTE: These are not "routable" views (like modals). As such, we are handling
			them explicitly as components references.
		-->
		<app-system-prompts></app-system-prompts>
	`
})
export class AppComponent {
	// ...
}
