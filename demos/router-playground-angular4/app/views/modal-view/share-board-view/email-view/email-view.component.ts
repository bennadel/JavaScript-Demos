
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ShareBoardViewComponent } from "../share-board-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "email-view",
	styleUrls: [ "./email-view.component.less" ],
	templateUrl: "./email-view.component.htm"
})
export class EmailViewComponent {

	public parentView: ShareBoardViewComponent;

	// I initialize the email-view component.
	constructor( parentView: ShareBoardViewComponent ) {
		
		this.parentView = parentView;

	}

}
