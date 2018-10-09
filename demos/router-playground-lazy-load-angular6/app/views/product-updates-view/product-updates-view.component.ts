
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";


import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


@Component({
	selector: "product-updates-view",
	styleUrls: [ "./product-updates-view.component.less" ],
	templateUrl: "./product-updates-view.component.htm"
})
export class ProductUpdatesViewComponent {

	// I initialize the product-updates-view component.
	constructor() {

	}

}
