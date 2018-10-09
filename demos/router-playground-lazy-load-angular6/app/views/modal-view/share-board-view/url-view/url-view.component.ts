
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ShareBoardViewComponent } from "../share-board-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "url-view",
	styleUrls: [ "./url-view.component.less" ],
	templateUrl: "./url-view.component.htm"
})
export class UrlViewComponent {

	public parentView: ShareBoardViewComponent;

	// I initialize the url-view component.
	constructor( parentView: ShareBoardViewComponent ) {
		
		this.parentView = parentView;

	}

}
