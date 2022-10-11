
// Import core Angular modules.
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import application modules.
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-admin-view",
	standalone: true,
	imports: [
		CommonModule,
		RouterModule
	],
	templateUrl: "./admin-view.component.html",
	styleUrls: [ "./admin-view.component.less" ]
})
export class AdminViewComponent {

	/**
	* I initialize the admin-view component with the given dependencies.
	*/
	constructor( session: Session ) {

		console.group( "Admin-View" );
		console.log( session );
		console.groupEnd();

	}

}
