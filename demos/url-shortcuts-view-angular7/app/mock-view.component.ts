
// Import the core angular services.
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "mock-view",
	styleUrls: [ "./mock-view.component.less" ],
	template:
	`
		<p>
			This is a mock view: <code>{{ path }}</code>
		</p>
	`
})
export class MockViewComponent {

	public path: string;
	
	// I initialize the mock-view component.
	constructor( router: Router ) {

		this.path = router.url;

	}

}
