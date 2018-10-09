
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ShareBoardViewComponent } from "../share-board-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sms-view",
	styleUrls: [ "./sms-view.component.less" ],
	templateUrl: "./sms-view.component.htm"
})
export class SmsViewComponent {

	public parentView: ShareBoardViewComponent;

	// I initialize the sms-view component.
	constructor( parentView: ShareBoardViewComponent ) {
		
		this.parentView = parentView;

	}

}
