
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractDemoComponent } from "../abstract-demo.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "demo-a",
	styleUrls: [ "./demo-a.component.less" ],
	templateUrl: "./demo-a.component.html"
})
export class DemoAComponent extends AbstractDemoComponent {
	
	// All logic is handled by base class.

}
