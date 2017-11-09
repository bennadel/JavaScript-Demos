
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "main-view",
	styleUrls: [ "./main-view.component.less" ],
	template:
	`
		This is the main-view.
		<a [routerLink]="[{ foo: 'bar' }]">Add optional params</a>
	`
})
export class MainViewComponent {
	// ...
}
