
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { UserProjectsViewComponent } from "../user-projects-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "boards-view",
	styleUrls: [ "./boards-view.component.less" ],
	templateUrl: "./boards-view.component.htm"
})
export class BoardsViewComponent {

	public parentView: UserProjectsViewComponent;

	// I initialize the boards-view component.
	constructor( parentView: UserProjectsViewComponent ) {
		
		this.parentView = parentView;

	}

}
