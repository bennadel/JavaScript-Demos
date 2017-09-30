
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { UserProjectsViewComponent } from "../user-projects-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "prototypes-view",
	styleUrls: [ "./prototypes-view.component.less" ],
	templateUrl: "./prototypes-view.component.htm"
})
export class PrototypesViewComponent {

	public parentView: UserProjectsViewComponent;

	// I initialize the prototypes-view component.
	constructor( parentView: UserProjectsViewComponent ) {
		
		this.parentView = parentView;

	}

}
