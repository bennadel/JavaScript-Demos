
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { SharePrototypeViewComponent } from "../share-prototype-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sms-view",
	styleUrls: [ "./sms-view.component.less" ],
	templateUrl: "./sms-view.component.htm"
})
export class SmsViewComponent {

	public parentView: SharePrototypeViewComponent;

	// I initialize the sms-view component.
	constructor( parentView: SharePrototypeViewComponent ) {
		
		this.parentView = parentView;

	}

}
