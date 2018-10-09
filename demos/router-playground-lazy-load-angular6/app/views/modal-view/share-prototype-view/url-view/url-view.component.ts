
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { SharePrototypeViewComponent } from "../share-prototype-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "url-view",
	styleUrls: [ "./url-view.component.less" ],
	templateUrl: "./url-view.component.htm"
})
export class UrlViewComponent {

	public parentView: SharePrototypeViewComponent;

	// I initialize the url-view component.
	constructor( parentView: SharePrototypeViewComponent ) {
		
		this.parentView = parentView;

	}

}
