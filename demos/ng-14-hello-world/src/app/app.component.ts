
// Import core Angular modules.
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import application modules.
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		CommonModule,
		RouterModule
	],
	templateUrl: "./app.component.html",
	styleUrls: [ "./app.component.less" ]
})
export class AppComponent {

	/**
	* I initialize the root component with the given dependencies.
	*/
	constructor( session: Session ) {

		console.group( "App-Root" );
		console.log( session );
		console.groupEnd();

	}

}
