
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractDemoComponent } from "../abstract-demo.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "demo-b",
	styleUrls: [ "./demo-b.component.less" ],
	templateUrl: "./demo-b.component.html"
})
export class DemoBComponent extends AbstractDemoComponent {
	
	// All logic is handled by base class.

}
