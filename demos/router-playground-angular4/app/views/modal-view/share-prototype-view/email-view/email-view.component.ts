
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { SharePrototypeViewComponent } from "../share-prototype-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "email-view",
	styleUrls: [ "./email-view.component.less" ],
	templateUrl: "./email-view.component.htm"
})
export class EmailViewComponent {

	public parentView: SharePrototypeViewComponent;

	// I initialize the email-view component.
	constructor( parentView: SharePrototypeViewComponent ) {
		
		this.parentView = parentView;

	}

}
